import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
from mathutils import noise
import argparse, random
ap = argparse.ArgumentParser(); ap.add_argument('style', choices=['matte', 'foil', 'standup', 'mirror', 'satin', 'laminate', 'chrome'])
ap.add_argument('--samples', type=int, default=64); ap.add_argument('--pct', type=int, default=62); ap.add_argument('--out'); ap.add_argument('--blend'); ap.add_argument('--gel', action='store_true')
a = ap.parse_args(); s = reset(); random.seed(11)
STAND = a.style == 'standup'
W, H = 6.2, 9.3                       # 100 x 150 mm; 1 unit = 16.13 mm
GLOSS = a.style in ('mirror', 'satin', 'laminate', 'chrome')   # smooth-fronted: contents do not show through
nx = 170 if GLOSS else 230; ny = round(nx*H/W)
SL = SR = 0.07; SB = 0.0 if STAND else 0.03; ST = 0.2
ZZ = 0.835*H                          # zipper track height
x0, x1 = (SL-0.5)*W, (0.5-SR)*W; z0, z1 = SB*H, (1-ST)*H
def interior(i, j):
    u, v = i/nx, j/ny
    return SL < u < 1-SR and (v < 1-ST) and (STAND or v > SB)
bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap'); front = {}; back = {}
for j in range(ny+1):
    for i in range(nx+1):
        x, z = (i/nx-0.5)*W, j/ny*H
        front[i, j] = bm.verts.new((x, -0.004, z)); back[i, j] = bm.verts.new((x, 0.004, z)) if interior(i, j) else front[i, j]
for j in range(ny):
    for i in range(nx):
        q = [(i, j), (i+1, j), (i+1, j+1), (i, j+1)]
        f = bm.faces.new([front[k] for k in q]); f.material_index = 0; f.smooth = True
        for loop, (ii, jj) in zip(f.loops, q): loop[uvl].uv = (ii/nx, jj/ny)
        if any(interior(*k) for k in q):
            f = bm.faces.new([back[k] for k in reversed(q)]); f.material_index = 1; f.smooth = True
if STAND:                             # the gusset: an oval base joining the two panels along the floor
    for i in range(nx):
        if front[i, 0] is not back[i, 0] or front[i+1, 0] is not back[i+1, 0]:
            vs = [front[i+1, 0], front[i, 0], back[i, 0], back[i+1, 0]]; vs = [v for n, v in enumerate(vs) if v not in vs[:n]]
            if len(vs) >= 3: f = bm.faces.new(vs); f.material_index = 1; f.smooth = False
me = bpy.data.meshes.new('bag'); bm.to_mesh(me); bm.free()
bag = bpy.data.objects.new('bag', me); bpy.context.collection.objects.link(bag)
def ramp(d, w):
    t = max(0.0, min(1.0, d/w)); return math.sin(t*math.pi/2)**0.85
creases = []
for k in range(11):
    cx = random.uniform(x0, x1); cz = random.uniform(z0, z1); ang = random.uniform(-1.2, 1.2) + (math.pi/2 if k % 3 == 0 else 0)
    creases.append((cx, cz, math.cos(ang), math.sin(ang), random.uniform(0.08, 0.22), random.uniform(-1, 1)*0.035, random.uniform(0.7, 2.0)))
for sx, cxn in ((1, x0), (-1, x1)):   # tension creases running in from the lower corners
    creases.append((cxn + sx*0.9, z0 + 0.9, sx*0.7, 0.7, 0.11, -0.045, 1.5))
ph = [random.uniform(0, 6.28) for _ in range(8)]
def shape(x, z, side):
    if not (x0 < x < x1 and z < z1 and (STAND or z > z0)): return 0.0
    q = max(0.0, (z-z0)/(z1-z0)); u = (x-(x0+x1)/2)/((x1-x0)/2)
    if STAND:
        m = ramp(x-x0, 1.3)*ramp(x1-x, 1.3)*ramp(z1-z, 2.8)
        t = 1.22*(1-q)**1.25*(1-u*u)**0.55 + 0.34*m*math.sin(math.pi*min(1, q*1.15))**1.2
        d = min(x-x0, x1-x, z1-z)
    else:
        m = ramp(x-x0, 1.5)*ramp(x1-x, 1.5)*ramp(z-z0, 1.1)*ramp(z1-z, 2.6)
        t = 0.88*m*(0.6+0.4*(1-q)**1.3); d = min(x-x0, x1-x, z-z0, z1-z)
    # softgels pressing through the film, low in the pouch
    lump = 0.0 if GLOSS else (noise.noise(Vector((x*1.15, z*1.15, 11.3*side)))*0.07 + noise.noise(Vector((x*2.3, z*2.3, 4.2*side)))*0.028)*min(1.0, m*1.6)*(0.35+0.65*(1-q))
    edge = ramp(d, 0.5)
    n = noise.noise(Vector((x*0.55, z*0.4, 3.1*side)))*0.05 + noise.noise(Vector((x*1.6, z*1.1, 7.7*side)))*0.02
    cr = sum(amp*math.exp(-((-(x-cx)*uz + (z-cz)*ux)/sig)**2)*math.exp(-(((x-cx)*ux + (z-cz)*uz)/ln)**2) for cx, cz, ux, uz, sig, amp, ln in creases)
    # puckers where the full body meets the side seals, and gathers hanging under the zipper
    pk = 0.032*(math.sin(z*8.5 + ph[0])*math.exp(-(x-x0)/0.42) + math.sin(z*7.7 + ph[1])*math.exp(-(x1-x)/0.42))*min(1.0, q*4)*min(1.0, (1-q)*3)
    ga = 0.026*math.sin(x*6.3 + ph[2] + 0.6*math.sin(x*2.1))*math.exp(-(z1-z)/0.75)*ramp(x-x0, 0.5)*ramp(x1-x, 0.5)
    if GLOSS: n *= 0.45; cr *= 0.35; pk *= 0.6; ga *= 0.6
    return t + lump + edge*(n + cr) + (pk + ga)*(1.0 if side < 0 else 0.7)
for v in me.vertices:
    x, y, z = v.co; side = -1 if y < 0 else 1; t = shape(x, z, side); vq = z/H
    zip_ridge = 0.05*math.exp(-((z-ZZ)/0.075)**2)*ramp(x+W/2-0.25, 0.2)*ramp(W/2-0.25-x, 0.2)
    if STAND:
        pinch = 1 - 0.11*(1-min(1, vq/(1-ST)))**1.6        # the base draws the lower sides in
        bow = 0.05*(x/(W/2))**2*max(0.0, vq-0.5)
        lean = 0.0
    else:
        pinch = 1 - 0.05*math.sin(math.pi*min(1, vq/(1-ST)))*(1 if z < z1 else 0); bow = 0.16*(x/(W/2))**2 - 0.10*(vq-0.5)**2
    v.co = (x*pinch, side*(0.004+t) - (zip_ridge if side < 0 or front else 0) + bow, z)
zs = [v.co.z for v in me.vertices]; ys = [v.co.y for v in me.vertices]
for v in me.vertices: v.co.z -= min(zs); v.co.y -= (min(ys)+max(ys))/2
sub = bag.modifiers.new('sub', 'SUBSURF'); sub.levels = 1; sub.render_levels = 1
T = os.path.join(HERE, 'tex/'); kind = 'standup' if (STAND or GLOSS) else 'flat'   # the 'standup' cut-out has no hang hole
def film(name, front_face):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; N = nt.nodes; L = nt.links; b = N['Principled BSDF']
    #            metallic rough  coat  crinkle scale  base colour
    P = {'matte':    (0.0,  0.56, 0.0, 0.06, 180, RED),
         'standup':  (0.0,  0.46, 0.0, 0.06, 180, RED),
         'foil':     (0.88, 0.20, 0.6, 0.22, 26,  srgb('c00c16')),
         'mirror':   (0.94, 0.10, 0.5, 0.035, 9,  srgb('c40b15')),     # smooth mirror foil, broad clean highlights
         'satin':    (0.88, 0.30, 0.0, 0.03, 12,  srgb('be0c15')),     # brushed metallic sheen, softer reflections
         'laminate': (0.0,  0.30, 1.0, 0.03, 10,  srgb('a8080f')),     # deep lacquer red under a wet clear gloss
         'chrome':   (1.0,  0.12, 0.0, 0.03, 9,   (0.66, 0.66, 0.68, 1))}[a.style]
    metal, rough, coat, crk, crs, base = P; foil = metal > 0
    b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    b.inputs['Specular IOR Level'].default_value = 0.5 if (foil or coat) else 0.32
    b.inputs['Sheen Weight'].default_value = 0.0 if (foil or coat) else 0.35; b.inputs['Sheen Roughness'].default_value = 0.4
    b.inputs['Coat Weight'].default_value = coat; b.inputs['Coat Roughness'].default_value = 0.05
    nz = N.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = crs; nz.inputs['Detail'].default_value = 8; nz.inputs['Roughness'].default_value = 0.62
    bp2 = N.new('ShaderNodeBump'); bp2.inputs['Strength'].default_value = crk; bp2.inputs['Distance'].default_value = 0.03
    L.new(nz.outputs['Fac'], bp2.inputs['Height'])
    if front_face:
        tex = N.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(T+('label_black.png' if a.style == 'chrome' else 'label.png')); tex.extension = 'CLIP'
        mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'; mix.inputs['A'].default_value = base
        L.new(tex.outputs['Alpha'], mix.inputs['Factor']); L.new(tex.outputs['Color'], mix.inputs['B']); L.new(mix.outputs['Result'], b.inputs['Base Color'])
        if foil:                       # printed white ink is matte, not mirror foil
            inv = N.new('ShaderNodeMath'); inv.operation = 'MULTIPLY'; inv.inputs[1].default_value = -metal
            add = N.new('ShaderNodeMath'); add.operation = 'ADD'; add.inputs[1].default_value = metal
            L.new(tex.outputs['Alpha'], inv.inputs[0]); L.new(inv.outputs[0], add.inputs[0]); L.new(add.outputs[0], b.inputs['Metallic'])
            rmix = N.new('ShaderNodeMapRange'); rmix.inputs['To Min'].default_value = rough; rmix.inputs['To Max'].default_value = 0.7
            L.new(tex.outputs['Alpha'], rmix.inputs['Value']); L.new(rmix.outputs['Result'], b.inputs['Roughness'])
            smix = N.new('ShaderNodeMapRange'); smix.inputs['To Min'].default_value = 0.5; smix.inputs['To Max'].default_value = 0.12
            L.new(tex.outputs['Alpha'], smix.inputs['Value']); L.new(smix.outputs['Result'], b.inputs['Specular IOR Level'])
        bt = N.new('ShaderNodeTexImage'); bt.image = bpy.data.images.load(T+('bump_flat.png' if GLOSS else f'bump_{kind}.png')); bt.image.colorspace_settings.name = 'Non-Color'
        bp = N.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.55; bp.inputs['Distance'].default_value = 0.02
        L.new(bt.outputs['Color'], bp.inputs['Height']); L.new(bp2.outputs['Normal'], bp.inputs['Normal']); L.new(bp.outputs['Normal'], b.inputs['Normal'])
        ct = N.new('ShaderNodeTexImage'); ct.image = bpy.data.images.load(T+f'cut_{kind}.png'); ct.image.colorspace_settings.name = 'Non-Color'
        L.new(ct.outputs['Color'], b.inputs['Alpha'])
    else:
        b.inputs['Base Color'].default_value = base; L.new(bp2.outputs['Normal'], b.inputs['Normal'])
    return m
bag.data.materials.append(film('film_front', True)); bag.data.materials.append(film('film_back', False))
bag.rotation_euler = (0 if STAND else math.radians(-5), 0, math.radians(-24 if STAND else -20)); bag.location = (0, 0, 0.02)
studio(scale=4.0)
for o in bpy.data.objects:            # more shape: weaker fill, stronger edge lights
    if o.type == 'LIGHT': o.data.energy *= {'fill': 0.45, 'rimL': 1.5, 'rimR': 1.4, 'key': 1.1}.get(o.name, 1.0)
if a.style == 'chrome':               # chrome only reads as chrome with dark shapes to reflect: black cards the camera cannot see
    for nm, loc, rot, sz in (('cardL', (-9, -6, 6), (0, math.radians(90), 0), (9, 16)), ('cardR', (10, -3, 5), (0, math.radians(90), 0), (7, 14)), ('cardF', (2, -30, -4), (math.radians(70), 0, 0), (26, 10))):
        cb = bmesh.new(); bmesh.ops.create_grid(cb, x_segments=1, y_segments=1, size=0.5); cm = bpy.data.meshes.new(nm); cb.to_mesh(cm); cb.free()
        co = bpy.data.objects.new(nm, cm); bpy.context.collection.objects.link(co); co.location = loc; co.rotation_euler = rot; co.scale = (sz[0], sz[1], 1)
        cm.materials.append(plain_material(nm, (0.004, 0.004, 0.004, 1), 0.9)); co.visible_camera = False; co.visible_shadow = False; co.visible_diffuse = False
if a.gel:                             # one softgel beside the bag at true scale: 15 x 8 x 7 mm, clear ruby shell around a dark fill
    s.cycles.max_bounces = 20; s.cycles.transmission_bounces = 16; s.cycles.volume_bounces = 2
    MMU = 1/16.13
    def ovoid(name, k, mat):
        gb = bmesh.new(); bmesh.ops.create_uvsphere(gb, u_segments=96, v_segments=64, radius=1.0)
        for v in gb.verts: v.co = (v.co.x*7.5*MMU*k[0], v.co.y*4.0*MMU*k[1], v.co.z*3.5*MMU*k[2])
        for f in gb.faces: f.smooth = True
        gm = bpy.data.meshes.new(name); gb.to_mesh(gm); gb.free(); gm.materials.append(mat)
        o = bpy.data.objects.new(name, gm); bpy.context.collection.objects.link(o)
        o.location = (W/2 + 1.25, -1.5, 3.5*MMU); o.rotation_euler = (math.radians(6), 0, math.radians(28)); return o
    def gelmat(name, color, absorb, density, ior, rough):
        m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
        b.inputs['Base Color'].default_value = color; b.inputs['Transmission Weight'].default_value = 1.0
        b.inputs['Roughness'].default_value = rough; b.inputs['IOR'].default_value = ior
        va = nt.nodes.new('ShaderNodeVolumeAbsorption'); va.inputs['Color'].default_value = absorb; va.inputs['Density'].default_value = density
        nt.links.new(va.outputs['Volume'], nt.nodes['Material Output'].inputs['Volume']); return m
    ovoid('softgel_shell', (1, 1, 1), gelmat('gelatin', (1.0, 0.12, 0.12, 1), (0.9, 0.03, 0.04, 1), 1.45, 1.5, 0.015))
    ovoid('softgel_fill', (0.92, 0.9, 0.86), gelmat('oil', (0.9, 0.03, 0.04, 1), (0.6, 0.006, 0.01, 1), 5.4, 1.47, 0.0))
    camera((-7, -60, 15), (0.75, 0, 4.4), lens=135)
else:
    camera((-7, -52, 15 if STAND else 13), (0, 0, 4.55), lens=135)
if a.blend: bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
render(os.path.abspath(a.out), a.samples, a.pct)
