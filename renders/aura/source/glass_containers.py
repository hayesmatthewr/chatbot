import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
from mathutils import noise
import argparse
ap = argparse.ArgumentParser(); ap.add_argument('which'); ap.add_argument('--samples', type=int, default=64); ap.add_argument('--pct', type=int, default=45)
ap.add_argument('--out'); ap.add_argument('--blend'); ap.add_argument('--smooth-cap', action='store_true'); ap.add_argument('--aura', action='store_true')
a = ap.parse_args()
s = reset()
s.cycles.max_bounces = 16; s.cycles.transmission_bounces = 12; s.cycles.glossy_bounces = 6
N = 288
def lathe(name, profile, uv=None, rib=None, sub=1):
    bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap'); rings = []
    for i, (r, z) in enumerate(profile):
        if r < 1e-6: rings.append([bm.verts.new((0, 0, z))]); continue
        ring = []
        for j in range(N):
            ang = (j/N-.5)*2*math.pi; rr = r + (rib(i, j) if rib else 0)
            ring.append(bm.verts.new((rr*math.sin(ang), -rr*math.cos(ang), z)))
        rings.append(ring)
    for i in range(len(rings)-1):
        A, B = rings[i], rings[i+1]
        for j in range(N):
            j2 = (j+1) % N
            if len(A) == 1: vs = [(A[0], j+.5, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
            elif len(B) == 1: vs = [(A[j], j, i), (A[j2], j+1, i), (B[0], j+.5, i+1)]
            else: vs = [(A[j], j, i), (A[j2], j+1, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
            f = bm.faces.new([v for v, _, _ in vs]); f.smooth = True
            for loop, (v, ju, ii) in zip(f.loops, vs):
                z = profile[ii][1]; loop[uvl].uv = (ju/N, (z-uv[0])/(uv[1]-uv[0]) if uv else 0)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o)
    if sub: m = o.modifiers.new('sub', 'SUBSURF'); m.levels = 1; m.render_levels = 1
    return o
def arc(cx, cz, rad, a0, a1, n=10):
    return [(cx + rad*math.cos(math.radians(a0+(a1-a0)*i/n)), cz + rad*math.sin(math.radians(a0+(a1-a0)*i/n))) for i in range(n+1)]
def glass_material(name, label_png, tint, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; N_ = nt.nodes; L = nt.links
    g = N_['Principled BSDF']; out = N_['Material Output']
    g.inputs['Base Color'].default_value = tint; g.inputs['Transmission Weight'].default_value = 1.0
    g.inputs['Roughness'].default_value = rough; g.inputs['IOR'].default_value = 1.33 if a.aura else 1.5
    ink = N_.new('ShaderNodeBsdfPrincipled'); ink.inputs['Roughness'].default_value = 0.6
    t = N_.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(label_png); t.extension = 'CLIP'
    L.new(t.outputs['Color'], ink.inputs['Base Color'])
    mix = N_.new('ShaderNodeMixShader'); L.new(t.outputs['Alpha'], mix.inputs['Fac']); L.new(g.outputs['BSDF'], mix.inputs[1]); L.new(ink.outputs['BSDF'], mix.inputs[2])
    L.new(mix.outputs['Shader'], out.inputs['Surface'])
    return m
T = os.path.join(HERE, 'tex/')
if a.which == 'jar':
    R, H, wall, floor = 5.35, 11.5, 0.3, 0.55
    RL, lid_h, ring_h, ribs = 5.35, 2.15, 0.3, 150
    fill, tint, rough = 0.70, (0.005, 0.04, 0.014, 1), 0.6
    k, cam, tgt, rot = 6.0, (-8, -88, 14), (0, 0, 6.9), -12
    bot_r, sh_r = 0.75, 0.55
else:
    R, H, wall, floor = 2.125, 15.4, 0.22, 0.5
    RL, lid_h, ring_h, ribs = 2.125, 1.75, 0.22, 72
    fill, tint, rough = 0.76, (0.01, 0.115, 0.026, 1), 0.55
    k, cam, tgt, rot = 6.4, (-6, -98, 16), (0, 0, 8.6), -12
    bot_r, sh_r = 0.5, 0.3
if a.aura:
    tint = (0.6, 0.04, 0.06, 1) if a.which == 'jar' else (0.7, 0.06, 0.08, 1)
neck = R - sh_r*0.75
# glass body: outer wall up over the shoulder to the neck, then back down the inside
body = [(0, 0), (R*0.5, 0)] + arc(R-bot_r, bot_r, bot_r, -90, 0) + [(R, H*0.3), (R, H*0.55), (R, H*0.8), (R, H-sh_r)] + arc(R-sh_r, H-sh_r, sh_r, 0, 70, 8) \
     + [(neck, H+0.05), (neck, H+0.6), (neck-wall, H+0.6), (neck-wall, H-0.3), (R-wall, H-sh_r-0.5), (R-wall, H*0.5), (R-wall, floor+bot_r)] \
     + arc(R-wall-bot_r*0.7, floor+bot_r*0.7, bot_r*0.7, 0, -90, 6) + [(R*0.4, floor), (0, floor)]
bo = lathe(a.which+'_glass', body, uv=(0, H))
bo.data.materials.append(glass_material('frosted_glass', T+('aura_' if a.aura else '')+a.which+'_label.png', tint, 0.42 if a.aura else rough))
ci = R-wall-0.06; top = floor + (H-floor)*fill
if not a.aura:
    # contents: a dark mass of capsules filling the lower part, lumpy on top
    cont = lathe(a.which+'_contents', [(0, floor+0.05), (ci-0.3, floor+0.05), (ci, floor+0.4), (ci, top*0.5), (ci, top-0.3), (ci, top), (ci*0.66, top), (ci*0.33, top), (0, top)], sub=0)
    for v in cont.data.vertices:
        if v.co.z > top-0.35:
            v.co.z += (noise.noise(Vector((v.co.x*0.9/ci*3, v.co.y*0.9/ci*3, 1.7)))*0.5 + noise.noise(Vector((v.co.x*2.3, v.co.y*2.3, 5.1)))*0.2)*R*0.28
    cont.data.materials.append(plain_material('capsules', (0.004, 0.02, 0.008, 1), 0.35))
    contents = [cont]
else:
    # contents: a pile of small oval softgels, dropped in one at a time so they settle against each other
    import numpy as np, random
    rng = np.random.default_rng(4); random.seed(4)
    SA, SB = 1.01, 0.68           # softgel half-length and half-width
    MAXN = 120 if a.which == 'jar' else 30
    r = 0.78; lim = ci - r - 0.02; ztop = floor + (H-floor)*0.9
    P = np.zeros((0, 3)); misses = 0
    while misses < 25 and len(P) < MAXN:
        K = 48; rad = lim*np.sqrt(rng.random(K)); ang = rng.random(K)*2*math.pi
        c = np.stack([rad*np.cos(ang), rad*np.sin(ang)], 1); z = np.full(K, floor + r)
        if len(P):
            d2 = ((c[:, None, :] - P[None, :, :2])**2).sum(2); hit = d2 < 4*r*r
            z = np.maximum(z, np.where(hit, P[None, :, 2] + np.sqrt(np.clip(4*r*r - d2, 0, None)), 0).max(1))
        i = int(z.argmin())
        if z[i] > ztop - r: misses += 1; continue
        P = np.vstack([P, [c[i, 0], c[i, 1], z[i]]])
    print('SOFTGELS', len(P), 'top', round(float(P[:, 2].max()+r), 2), 'of', round(H, 2))
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=10, radius=1.0)
    for v in bm.verts: v.co = (v.co.x*SB, v.co.y*SB, v.co.z*SA)
    for f in bm.faces: f.smooth = True
    gm = bpy.data.meshes.new('softgel'); bm.to_mesh(gm); bm.free()
    g = bpy.data.materials.new('softgel'); g.use_nodes = True; gb = g.node_tree.nodes['Principled BSDF']
    gb.inputs['Base Color'].default_value = (0.62, 0.008, 0.014, 1); gb.inputs['Transmission Weight'].default_value = 0.3; gb.inputs['Coat Weight'].default_value = 1.0; gb.inputs['Coat Roughness'].default_value = 0.04
    gb.inputs['Roughness'].default_value = 0.08; gb.inputs['IOR'].default_value = 1.45
    gm.materials.append(g)
    contents = []
    for n, p in enumerate(P):
        o = bpy.data.objects.new(f'{a.which}_softgel_{n:04d}', gm); bpy.context.collection.objects.link(o)
        o.location = p; o.rotation_euler = (random.uniform(0, math.pi), random.uniform(0, math.pi), random.uniform(0, 2*math.pi)); contents.append(o)
    pivot = bpy.data.objects.new(a.which+'_contents', None); bpy.context.collection.objects.link(pivot)
    for o in contents: o.parent = pivot
    cont = pivot
# ribbed screw cap + tamper ring
c0 = H + 0.02 + ring_h; c1 = c0 + lid_h; bev = lid_h*0.09
cap = [(neck-wall, c0), (RL-0.12, c0), (RL-0.03, c0+0.02), (RL, c0+0.1)]
r0 = len(cap); nr = 12
cap += [(RL, c0+0.14 + (lid_h-bev-0.3)*i/(nr-1)) for i in range(nr)]
r1 = len(cap)
cap += arc(RL-bev, c1-bev, bev, 0, 90, 6) + [(RL-bev-0.15, c1), (RL*0.5, c1), (0, c1)]
depth = RL*0.012
def rib(i, j):
    if a.smooth_cap or not (r0 <= i < r1): return 0
    edge = min(1, (i-r0+0.5)/1.5, (r1-i-0.5)/1.5)
    return -depth*edge*(0.5-0.5*math.cos(2*math.pi*((j*ribs/N) % 1.0)))
N_save = N
N = ribs*4 if not a.smooth_cap else N
co = lathe(a.which+'_cap', cap, rib=rib)
N = N_save
ring = lathe(a.which+'_ring', [(neck-wall, H+0.03), (RL-0.2, H+0.03), (RL-0.13, H+0.08), (RL-0.13, H+ring_h-0.04), (RL-0.2, H+ring_h+0.01), (neck-wall, H+ring_h+0.01)])
plastic = plain_material('cap_plastic', srgb('960a12') if a.aura else srgb('182c1e'), 0.55)
co.data.materials.append(plastic); ring.data.materials.append(plastic)
for o in (bo, cont, co, ring): o.rotation_euler = (0, 0, math.radians(rot))
studio(scale=k)
camera(cam, tgt, lens=135)
if a.blend: bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
render(os.path.abspath(a.out), a.samples, a.pct)
