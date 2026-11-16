import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
import argparse, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument('--samples', type=int, default=48); ap.add_argument('--pct', type=int, default=50)
ap.add_argument('--out', default='out/bag.png'); ap.add_argument('--blend'); ap.add_argument('--nx', type=int, default=170)
ap.add_argument('--frames', type=int, default=45); ap.add_argument('--thick', type=float, default=0.42); ap.add_argument('--crease', type=float, default=0.035)
a = ap.parse_args()
s = reset()
W, H = 6.42, 9.3
nx = a.nx; ny = round(nx*H/W)
SL, SR, SB, ST = 0.078, 0.078, 0.028, 0.205   # seal fractions (left, right, bottom, top incl. zipper)
bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
front = {}; back = {}
def interior(i, j):
    u, v = i/nx, j/ny
    return SL < u < 1-SR and SB < v < 1-ST
for j in range(ny+1):
    for i in range(nx+1):
        x, z = (i/nx-0.5)*W, j/ny*H
        front[i, j] = bm.verts.new((x, -0.004, z))
        back[i, j] = bm.verts.new((x, 0.004, z)) if interior(i, j) else front[i, j]
bm.verts.index_update()
inner_idx = set()
for k, v in front.items():
    if interior(*k): inner_idx.add(v.index); inner_idx.add(back[k].index)
for j in range(ny):
    for i in range(nx):
        q = [(i, j), (i+1, j), (i+1, j+1), (i, j+1)]
        f = bm.faces.new([front[k] for k in q]); f.material_index = 0; f.smooth = True
        for loop, (ii, jj) in zip(f.loops, q): loop[uvl].uv = (ii/nx, jj/ny)
        if any(interior(*k) for k in q):
            f = bm.faces.new([back[k] for k in reversed(q)]); f.material_index = 1; f.smooth = True
            for loop, (ii, jj) in zip(f.loops, reversed(q)): loop[uvl].uv = (1-ii/nx, jj/ny)
bm.verts.index_update()
me = bpy.data.meshes.new('bag'); bm.to_mesh(me); bm.free()
bag = bpy.data.objects.new('bag', me); bpy.context.collection.objects.link(bag)
# ---- sculpt the fill procedurally: pillow profile, heavier low down, soft creases, flat seals
from mathutils import noise
import random
random.seed(7)
x0, x1 = (SL-0.5)*W, (0.5-SR)*W; z0, z1 = SB*H, (1-ST)*H
def ramp(d, w):
    t = max(0.0, min(1.0, d/w)); return math.sin(t*math.pi/2)**0.85
creases = []
for k in range(9):
    cx = random.uniform(x0, x1); cz = random.uniform(z0, z1); ang = random.uniform(-1.2, 1.2) + (math.pi/2 if k % 3 == 0 else 0)
    creases.append((cx, cz, math.cos(ang), math.sin(ang), random.uniform(0.12, 0.3), random.uniform(-1, 1)*a.crease, random.uniform(0.8, 2.2)))
def shape(x, z, side):
    d = min(x-x0, x1-x, z-z0, z1-z)
    if d <= 0: return 0.0
    q = (z-z0)/(z1-z0)
    m = ramp(x-x0, 1.5)*ramp(x1-x, 1.5)*ramp(z-z0, 1.1)*ramp(z1-z, 2.6)
    t = a.thick*m*(0.72+0.28*(1-q))
    edge = ramp(d, 0.5)
    n = noise.noise(Vector((x*0.55, z*0.4, 3.1*side)))*0.05 + noise.noise(Vector((x*1.6, z*1.1, 7.7*side)))*0.018
    cr = 0.0
    for cx, cz, ux, uz, sig, amp, ln in creases:
        dx, dz = x-cx, z-cz
        along = dx*ux + dz*uz; across = -dx*uz + dz*ux
        cr += amp*math.exp(-(across/sig)**2)*math.exp(-(along/ln)**2)
    return t + edge*(n + cr)*(1.0 if side < 0 else 0.6)
me = bag.data
for v in me.vertices:
    x, y, z = v.co
    side = -1 if y < 0 else 1
    t = shape(x, z, side)
    vq = z/H
    pinch = 1 - 0.022*math.sin(math.pi*min(1, vq/(1-ST)))*(1 if z < z1 else 0)
    bow = 0.16*(x/(W/2))**2 - 0.10*(vq-0.5)**2
    v.co = (x*pinch, side*(0.004+t) + bow, z)
newme = me
co = np.array([v.co[:] for v in newme.vertices])
print('BBOX', co.min(0), co.max(0))
# recentre: bottom on z=0, centred x/y
off = Vector(((co[:, 0].min()+co[:, 0].max())/2, (co[:, 1].min()+co[:, 1].max())/2, co[:, 2].min()))
for v in newme.vertices: v.co -= off
sub = bag.modifiers.new('sub', 'SUBSURF'); sub.levels = 1; sub.render_levels = 1
T = os.path.join(HERE, 'tex/')
bag.data.materials.append(label_material('bag_front', T+'bag_label.png', rough=0.4, metallic=0.1, bump_png=T+'bag_bump.png', cut_png=T+'bag_cut.png'))
bag.data.materials.append(plain_material('bag_back', RED, 0.4, 0.1))
bag.rotation_euler = (math.radians(-6), 0, math.radians(-20))
bag.location = (0, 0, 0.02)
studio(scale=4.0)
camera((-6, -52, 13), (0, 0, 4.55), lens=135)
if a.blend:
    bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
render(os.path.abspath(a.out), a.samples, a.pct)
