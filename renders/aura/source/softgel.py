import sys, os, math; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
import argparse
ap = argparse.ArgumentParser(); ap.add_argument('--samples', type=int, default=96); ap.add_argument('--pct', type=int, default=50)
ap.add_argument('--out', default='out/gel.png'); ap.add_argument('--blend'); ap.add_argument('--light', action='store_true')
a = ap.parse_args()
s = reset(); s.cycles.max_bounces = 24; s.cycles.transmission_bounces = 24; s.cycles.glossy_bounces = 12; s.cycles.volume_bounces = 2
s.cycles.caustics_refractive = True
# softgel: 17 mm long, widened to the oval in the reference photo (about 8.8 mm), 7 mm thick. 1 unit = 10 mm
A, B, C = 0.85, 0.44, 0.35
def ovoid(name, k, mat):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=96, v_segments=64, radius=1.0)
    for v in bm.verts: v.co = (v.co.x*B*k[0], v.co.y*C*k[1], v.co.z*A*k[2])
    for f in bm.faces: f.smooth = True
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); return o
def gelmat(name, color, absorb, density, ior, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = color; b.inputs['Transmission Weight'].default_value = 1.0
    b.inputs['Roughness'].default_value = rough; b.inputs['IOR'].default_value = ior
    va = nt.nodes.new('ShaderNodeVolumeAbsorption'); va.inputs['Color'].default_value = absorb; va.inputs['Density'].default_value = density
    nt.links.new(va.outputs['Volume'], nt.nodes['Material Output'].inputs['Volume']); return m
shell = ovoid('softgel_shell', (1, 1, 1), gelmat('gelatin', (1.0, 0.12, 0.12, 1), (0.9, 0.03, 0.04, 1), 0.9, 1.5, 0.015))
core = ovoid('softgel_fill', (0.9, 0.88, 0.95), gelmat('oil', (0.9, 0.03, 0.04, 1), (0.6, 0.006, 0.01, 1), 3.2, 1.47, 0.0))
for o in (shell, core): o.rotation_euler = (0, math.radians(-4), math.radians(-18))
# dark backdrop with a soft red glow behind the softgel
bm = bmesh.new(); bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=14)
me = bpy.data.meshes.new('backdrop'); bm.to_mesh(me); bm.free()
bd = bpy.data.objects.new('backdrop', me); bpy.context.collection.objects.link(bd); bd.location = (0, 5, 0); bd.rotation_euler = (math.radians(90), 0, 0)
m = bpy.data.materials.new('backdrop'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
out = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission'); tc = nt.nodes.new('ShaderNodeTexCoord')
mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (0.7, 0.45, 1)
gr = nt.nodes.new('ShaderNodeTexGradient'); gr.gradient_type = 'SPHERICAL'; ramp = nt.nodes.new('ShaderNodeValToRGB')
dark = (0.035, 0.03, 0.032, 1) if not a.light else (0.8, 0.8, 0.8, 1)
ramp.color_ramp.elements[0].color = dark; ramp.color_ramp.elements[1].color = (0.14, 0.008, 0.01, 1) if not a.light else (0.95, 0.95, 0.95, 1)
nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], gr.inputs['Vector']); nt.links.new(gr.outputs['Fac'], ramp.inputs['Fac'])
nt.links.new(ramp.outputs['Color'], em.inputs['Color']); nt.links.new(em.outputs['Emission'], out.inputs['Surface']); me.materials.append(m)
w = bpy.data.worlds.new('w'); s.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (0.02, 0.018, 0.018, 1) if not a.light else (1, 1, 1, 1)
w.node_tree.nodes['Background'].inputs[1].default_value = 1.0 if not a.light else 0.4
area('stripL', (-2.4, -2.2, 0.5), (0, 0, 0.1), 0.95, 70, size_y=3.4)
area('stripR', (2.0, -1.2, 0.3), (0, 0, 0), 0.3, 26, size_y=3.0)
area('top', (0.3, -0.4, 2.8), (0, 0, 0), 1.6, 28)
area('back', (0.2, 2.6, -0.9), (0, 0, 0), 1.4, 150, color=(1, 0.5, 0.45))
area('under', (0, -0.6, -2.2), (0, 0, 0), 1.2, 30, color=(1, 0.4, 0.4))
camera((0, -6.2, 0.2), (0, 0, 0), lens=100, res=(1600, 1600))
s.cycles.samples = a.samples; s.render.resolution_percentage = a.pct; s.render.film_transparent = False
s.render.image_settings.color_mode = 'RGB'; s.render.filepath = os.path.abspath(a.out)
if a.blend: bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
bpy.ops.render.render(write_still=True)
