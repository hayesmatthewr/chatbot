import sys, os, math; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
S = sys.argv[1]
s = reset(); s.cycles.max_bounces = 20; s.cycles.transmission_bounces = 16; s.cycles.volume_bounces = 2
U = 1/5.0                        # scene units per millimetre
def bring(blend, pick, scale, x):
    with bpy.data.libraries.load(blend) as (f, t): t.objects = [n for n in f.objects if pick(n)]
    root = bpy.data.objects.new('root_'+os.path.basename(blend), None); bpy.context.collection.objects.link(root)
    for o in t.objects:
        bpy.context.collection.objects.link(o)
        if o.parent is None: o.parent = root
    root.scale = scale; root.location = (x, 0, 0)
# bag: 100 mm wide x 150 mm tall, about 28 mm deep when holding 90 softgels (model is 6.42 x 9.3 units)
bring(S+'/work/final/aura-bag-90.blend', lambda n: n == 'bag', (100/6.42*U, 16.3*U, 150/9.3*U), -7.5)
# travel vial: 76 mm tall x 19.5 mm wide, 12 softgels inside
bring(S+'/seed/real/aura-vial-real.blend', lambda n: n.startswith('vial_'), (19.5/4.25*U, 19.5/4.25*U, 76/17.37*U), 7.2)
# softgel: 15 x 8 x 7 mm oval (length and width measured from the ruler photo), clear shell around a darker fill
def ovoid(name, k, mat):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=64, v_segments=48, radius=1.0)
    for v in bm.verts: v.co = (v.co.x*4.0*U*k[0], v.co.y*3.5*U*k[1], v.co.z*7.5*U*k[2])
    for f in bm.faces: f.smooth = True
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free(); me.materials.append(mat)
    o = bpy.data.objects.new(name, me); bpy.context.collection.objects.link(o); return o
def gelmat(name, color, absorb, density, ior, rough):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = color; b.inputs['Transmission Weight'].default_value = 1.0
    b.inputs['Roughness'].default_value = rough; b.inputs['IOR'].default_value = ior
    va = nt.nodes.new('ShaderNodeVolumeAbsorption'); va.inputs['Color'].default_value = absorb; va.inputs['Density'].default_value = density
    nt.links.new(va.outputs['Volume'], nt.nodes['Material Output'].inputs['Volume']); return m
# densities are per scene unit (5 mm here), so they are half the hero scene's per-10-mm values
shell = ovoid('softgel_shell', (1, 1, 1), gelmat('gelatin', (1.0, 0.12, 0.12, 1), (0.9, 0.03, 0.04, 1), 0.45, 1.5, 0.015))
core = ovoid('softgel_fill', (0.9, 0.88, 0.95), gelmat('oil', (0.9, 0.03, 0.04, 1), (0.6, 0.006, 0.01, 1), 1.6, 1.47, 0.0))
for o in (shell, core): o.location = (12.6, -2.0, 7.5*U); o.rotation_euler = (0, 0, math.radians(-14))
# US quarter for scale: 24.26 mm across, 1.75 mm thick, reeded edge (plain faces, no engraving)
CR, CH, NN = 24.26/2*U, 1.75/2*U, 238
prof = [(0, -CH+0.12*U), (CR-1.7*U, -CH+0.12*U), (CR-1.3*U, -CH), (CR-0.15*U, -CH), (CR, -CH+0.15*U), (CR, CH-0.15*U), (CR-0.15*U, CH), (CR-1.3*U, CH), (CR-1.7*U, CH-0.12*U), (0, CH-0.12*U)]
bm = bmesh.new(); rings = []
for i, (r, z) in enumerate(prof):
    if r < 1e-9: rings.append([bm.verts.new((0, 0, z))]); continue
    reed = 0.09*U if i in (4, 5) else 0.0
    rings.append([bm.verts.new(((r - (reed if j % 2 else 0))*math.cos(2*math.pi*j/NN), (r - (reed if j % 2 else 0))*math.sin(2*math.pi*j/NN), z)) for j in range(NN)])
for A, B in zip(rings, rings[1:]):
    for j in range(NN):
        j2 = (j+1) % NN
        if len(A) == 1: f = bm.faces.new((A[0], B[j2], B[j]))
        elif len(B) == 1: f = bm.faces.new((A[j], A[j2], B[0]))
        else: f = bm.faces.new((A[j], A[j2], B[j2], B[j]))
        f.smooth = len(A) > 1 and len(B) > 1 and abs(A[0].co.z - B[0].co.z) < 1e-9
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
cme = bpy.data.meshes.new('quarter'); bm.to_mesh(cme); bm.free()
cm = bpy.data.materials.new('coin_metal'); cm.use_nodes = True; cb = cm.node_tree.nodes['Principled BSDF']
cb.inputs['Base Color'].default_value = (0.5, 0.5, 0.49, 1); cb.inputs['Metallic'].default_value = 1.0; cb.inputs['Roughness'].default_value = 0.34
cme.materials.append(cm)
coin = bpy.data.objects.new('quarter', cme); bpy.context.collection.objects.link(coin)
coin.location = (17.4, -2.4, CR); coin.rotation_euler = (math.radians(90), 0, math.radians(-16))
studio(scale=12.0)
camera((-11, -204, 40), (-0.2, 0, 14.4), lens=135, res=(1800, 1500))
bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=S+'/tube/final/aura-bag-vial-softgel.blend')
render(S+'/tube/final/aura-bag-vial-softgel.png', int(sys.argv[2]), int(sys.argv[3]))
