import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
import argparse
ap = argparse.ArgumentParser(); ap.add_argument('--samples', type=int, default=48); ap.add_argument('--pct', type=int, default=50)
ap.add_argument('--out', default='out/vial.png'); ap.add_argument('--blend'); ap.add_argument('--alpha', action='store_true')
a = ap.parse_args()
s = reset()
N = 240
def lathe(name, profile, uv=None, rib=None):
    """profile: list of (r, z). uv: (z0, z1) maps label v. rib: fn(i_ring, j) -> radius delta"""
    bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap')
    rings = []
    for i, (r, z) in enumerate(profile):
        if r < 1e-6: rings.append([bm.verts.new((0, 0, z))]); continue
        ring = []
        for j in range(N):
            ang = (j/N - 0.5)*2*math.pi
            rr = r + (rib(i, j) if rib else 0)
            ring.append(bm.verts.new((rr*math.sin(ang), -rr*math.cos(ang), z)))
        rings.append(ring)
    for i in range(len(rings)-1):
        A, B = rings[i], rings[i+1]
        for j in range(N):
            j2 = (j+1) % N
            if len(A) == 1: vs = [(A[0], j+.5, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
            elif len(B) == 1: vs = [(A[j], j, i), (A[j2], j+1, i), (B[0], j+.5, i+1)]
            else: vs = [(A[j], j, i), (A[j2], j+1, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
            try: f = bm.faces.new([v for v, _, _ in vs])
            except ValueError: continue
            f.smooth = True
            for loop, (v, ju, ii) in zip(f.loops, vs):
                z = profile[ii][1]
                loop[uvl].uv = (ju/N, (z-uv[0])/(uv[1]-uv[0]) if uv else 0)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    return o
def arc(cx, cz, rad, a0, a1, n=14):
    return [(cx + rad*math.cos(math.radians(a0 + (a1-a0)*i/n)), cz + rad*math.sin(math.radians(a0 + (a1-a0)*i/n))) for i in range(n+1)]
H = 6.5
body = [(0, 0), (0.3, 0)] + arc(0.62, 0.38, 0.38, -90, 0) + [(1, 1.5), (1, 3), (1, 4.5)] + arc(0.58, H-0.42, 0.42, 0, 82) + [(0.6, H+0.02), (0.6, H+0.5)]
bo = lathe('vial_body', body, uv=(0, H))
bo.data.materials.append(label_material('vial_red', os.path.join(HERE, 'tex/vial_label.png'), rough=0.36, coat=0.15))
# cap
c0, c1 = H+0.13, 7.5; R = 1.015
def rib(i, j):
    return 0
cap_prof = [(0.62, c0), (R-0.05, c0)] + arc(R-0.05, c0+0.05, 0.05, -90, 0, 4) + [(R, c0+0.12)]
r0 = len(cap_prof)
nr = 10
cap_prof += [(R, c0+0.16 + (0.44)*i/(nr-1)) for i in range(nr)]
r1 = len(cap_prof)
cap_prof += [(R, c0+0.66)] + [(R, c1-0.1)] + arc(R-0.07, c1-0.07, 0.07, 0, 90, 6) + [(0.5, c1), (0, c1)]
RIBS = 60
def rib(i, j):
    if r0 <= i < r1:
        t = (j*RIBS/N) % 1.0
        edge = min(1, (i-r0+0.5)/1.5, (r1-i-0.5)/1.5)
        return -0.035*edge*(0.5-0.5*math.cos(2*math.pi*t))
    return 0
co = lathe('vial_cap', cap_prof, rib=rib)
co.data.materials.append(plain_material('cap_red', RED, 0.42))
for o in (bo, co):
    m = o.modifiers.new('sub', 'SUBSURF'); m.levels = 1; m.render_levels = 1
    o.rotation_euler = (0, 0, math.radians(-14))
studio(scale=3.2)
camera((-3.0, -40, 9.5), (0, 0, 3.7), lens=135)
if a.blend:
    bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
render(os.path.abspath(a.out), a.samples, a.pct)
