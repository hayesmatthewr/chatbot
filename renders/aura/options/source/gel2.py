import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
import argparse
ap = argparse.ArgumentParser(); ap.add_argument('style', choices=['ruby', 'seam', 'opaque'])
ap.add_argument('--samples', type=int, default=96); ap.add_argument('--pct', type=int, default=62); ap.add_argument('--out')
a = ap.parse_args(); s = reset()
s.cycles.max_bounces = 24; s.cycles.transmission_bounces = 20; s.cycles.glossy_bounces = 10; s.cycles.volume_bounces = 2
U = 1/5.0                              # 1 unit = 5 mm; softgel is 15 x 8 x 7 mm
A, B, C = 7.5*U, 4.0*U, 3.5*U
def ovoid(name, k, mat, seam=0.0):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=128, v_segments=96, radius=1.0)
    for v in bm.verts:
        x, y, z = v.co                 # long axis along x; the seam runs round the outline where z = 0
        r = 1.0 + seam*math.exp(-(z/0.07)**2)
        v.co = (z*A*k[0], y*B*k[1]*r, -x*C*k[2]) if False else (x*A*k[0]*r, y*B*k[1]*r, z*C*k[2])
    for f in bm.faces: f.smooth = True
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); return o
def gel(name, color, absorb, density, ior, rough, trans=1.0, coat=0.0, sss=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = color; b.inputs['Transmission Weight'].default_value = trans
    b.inputs['Roughness'].default_value = rough; b.inputs['IOR'].default_value = ior
    b.inputs['Coat Weight'].default_value = coat; b.inputs['Coat Roughness'].default_value = 0.03
    if sss: b.inputs['Subsurface Weight'].default_value = sss; b.inputs['Subsurface Radius'].default_value = (0.6, 0.05, 0.05); b.inputs['Subsurface Scale'].default_value = 0.4
    if density:
        va = nt.nodes.new('ShaderNodeVolumeAbsorption'); va.inputs['Color'].default_value = absorb; va.inputs['Density'].default_value = density
        nt.links.new(va.outputs['Volume'], nt.nodes['Material Output'].inputs['Volume'])
    return m
parts = []
if a.style == 'ruby':       # clear gelatin shell around a dark oil fill: deep, jewel-like
    parts.append(ovoid('shell', (1, 1, 1), gel('gelatin', (1.0, 0.12, 0.12, 1), (0.9, 0.03, 0.04, 1), 0.45, 1.5, 0.015)))
    parts.append(ovoid('fill', (0.92, 0.9, 0.86), gel('oil', (0.9, 0.03, 0.04, 1), (0.6, 0.006, 0.01, 1), 1.7, 1.47, 0.0)))
elif a.style == 'seam':     # brighter translucent red, lit from within, with the moulding seam a real softgel has
    parts.append(ovoid('shell', (1, 1, 1), gel('gelatin', (1.0, 0.2, 0.2, 1), (0.95, 0.05, 0.06, 1), 0.3, 1.5, 0.03), seam=0.022))
    parts.append(ovoid('fill', (0.9, 0.88, 0.84), gel('oil', (0.95, 0.04, 0.05, 1), (0.85, 0.01, 0.02, 1), 0.75, 1.47, 0.0)))
else:                       # opaque, near-black red with a wet gloss, like a real astaxanthin softgel
    parts.append(ovoid('shell', (1, 1, 1), gel('gelatin', (0.11, 0.004, 0.007, 1), None, 0, 1.5, 0.07, trans=0.0, coat=1.0, sss=0.5), seam=0.02))
for o in parts: o.location = (0, 0, C); o.rotation_euler = (math.radians(8), 0, math.radians(24))
k = 1.5
studio(scale=k)
for o in bpy.data.objects:
    if o.type == 'LIGHT': o.data.energy *= {'fill': 0.5, 'rimL': 1.6, 'rimR': 1.5}.get(o.name, 1.0)
area('back', (0.6, 3.4, 0.5), (0, 0, C), 2.2, 60)                 # light coming through the gel from behind
camera((-2.5, -19, 8.5), (0, 0, C*0.9), lens=135, res=(1600, 1280))
render(os.path.abspath(a.out), a.samples, a.pct)
