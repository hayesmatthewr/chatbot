import bpy, sys, os, numpy as np
from PIL import Image
S = sys.argv[1]; HERE = S + '/share'
RED = (176, 10, 18)
def lin(c): return [((x/255)/12.92 if x/255 <= .04045 else ((x/255+.055)/1.055)**2.4) for x in c] + [1]
def img(path, noncolor=False):
    i = bpy.data.images.load(path)
    if noncolor: i.colorspace_settings.name = 'Non-Color'
    return i
def mat(name, color=None, color_png=None, rough=0.4, metallic=0.0, normal_png=None, alpha=False, trans_png=None, ior=None):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metallic
    if ior: b.inputs['IOR'].default_value = ior
    if color_png:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = img(color_png); nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
        if alpha: nt.links.new(t.outputs['Alpha'], b.inputs['Alpha']); m.blend_method = 'CLIP'
    else: b.inputs['Base Color'].default_value = lin(color)
    if normal_png:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = img(normal_png, True)
        nm = nt.nodes.new('ShaderNodeNormalMap'); nt.links.new(t.outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    if trans_png:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = img(trans_png, True); nt.links.new(t.outputs['Color'], b.inputs['Transmission Weight'])
    return m
def prep(blend, keep):
    bpy.ops.wm.open_mainfile(filepath=blend)
    for o in list(bpy.data.objects):
        if not keep(o): bpy.data.objects.remove(o)
def export(out, materials=True):
    kw = dict(filepath=out, export_format='GLB', export_apply=False, export_yup=True)
    if not materials: kw['export_materials'] = 'PLACEHOLDER'
    bpy.ops.export_scene.gltf(**kw); print('EXPORTED', out, os.path.getsize(out))
# ---------- textures
T = HERE + '/tex/'
lab = Image.open(S+'/work/tex/bag_label.png').convert('RGBA'); bg = Image.new('RGBA', lab.size, RED+(255,)); bg.alpha_composite(lab)
bg.putalpha(Image.open(S+'/work/tex/bag_cut.png').convert('L')); bg.resize((1380, 2000), Image.LANCZOS).save(T+'bag_color.png')
h = np.asarray(Image.open(S+'/work/tex/bag_bump.png').convert('L').resize((1035, 1500), Image.LANCZOS), dtype=np.float32)/255
dx = (np.roll(h, -1, 1)-np.roll(h, 1, 1))*6; dy = (np.roll(h, -1, 0)-np.roll(h, 1, 0))*6
n = np.dstack([-dx, dy, np.ones_like(h)]); n /= np.linalg.norm(n, axis=2, keepdims=True)
Image.fromarray(((n*0.5+0.5)*255).astype(np.uint8)).save(T+'bag_normal.png')
vl = Image.open(S+'/seed/tex/aura_vial_label.png').convert('RGBA').resize((1600, 1876), Image.LANCZOS)
vb = Image.new('RGBA', vl.size, (190, 26, 34, 255)); vb.alpha_composite(vl); vb.convert('RGB').save(T+'vial_color.png')
Image.eval(vl.getchannel('A'), lambda a: 255-a).save(T+'vial_trans.png')
MM = 0.001
for materials in (True, False):
    # ---------- bag: 100 x 150 mm, ~28 mm deep
    prep(S+'/work/final/aura-bag-90.blend', lambda o: o.name == 'bag')
    o = bpy.data.objects['bag']; o.rotation_euler = (0, 0, 0); o.location = (0, 0, 0)
    o.scale = (100/6.42*MM, 16.3*MM, 150/9.3*MM)
    if materials:
        o.material_slots[0].material = mat('AURA bag front', color_png=T+'bag_color.png', rough=0.42, metallic=0.1, normal_png=T+'bag_normal.png', alpha=True)
        o.material_slots[1].material = mat('AURA bag back', color=RED, rough=0.42, metallic=0.1)
    export(HERE+'/out/' + ('aura-bag.glb' if materials else 'geo-bag.glb'), materials)
    # ---------- travel vial: 76 x 19.5 mm, 13 softgels (15 x 8 x 7 mm)
    prep(S+'/seed/real/aura-vial-real.blend', lambda o: o.name.startswith('vial_'))
    sc = (19.5/4.25*MM, 19.5/4.25*MM, 76/17.37*MM)
    for o in bpy.data.objects:
        if o.parent is None: o.scale = sc; o.location = (0, 0, 0)
        if o.parent is None and o.type == 'MESH': o.rotation_euler = (0, 0, 0)
    if materials:
        glass = mat('AURA frosted glass', color_png=T+'vial_color.png', rough=0.6, trans_png=T+'vial_trans.png', ior=1.33)
        plastic = mat('AURA cap', color=(150, 10, 18), rough=0.55); gel = mat('AURA softgel', color=(120, 8, 14), rough=0.12)
        done = set()
        for o in bpy.data.objects:
            if o.type != 'MESH' or o.data.name in done: continue
            done.add(o.data.name)
            o.data.materials.clear(); o.data.materials.append(glass if 'glass' in o.name else gel if 'softgel' in o.name else plastic)
    export(HERE+'/out/' + ('aura-travel-vial.glb' if materials else 'geo-tvial.glb'), materials)
