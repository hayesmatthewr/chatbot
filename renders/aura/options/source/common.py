import bpy, bmesh, math, sys, os
from mathutils import Vector
HERE = os.path.dirname(os.path.abspath(__file__))
def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
    return [x/12.92 if x <= .04045 else ((x+.055)/1.055)**2.4 for x in c] + [1]
RED = srgb('b00a12')

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    s = bpy.context.scene
    s.render.engine = 'CYCLES'
    s.cycles.device = 'CPU'
    s.cycles.use_denoising = True
    s.cycles.max_bounces = 8
    s.view_settings.view_transform = 'Standard'
    s.view_settings.look = 'None'
    s.render.image_settings.file_format = 'PNG'
    s.render.threads_mode = 'AUTO'
    return s

def label_material(name, label_png, rough=0.4, metallic=0.0, bump_png=None, cut_png=None, coat=0.0, sheen=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; N = nt.nodes; L = nt.links
    bsdf = N['Principled BSDF']
    tex = N.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(label_png); tex.extension = 'CLIP'
    mix = N.new('ShaderNodeMix'); mix.data_type = 'RGBA'
    mix.inputs['A'].default_value = RED
    L.new(tex.outputs['Alpha'], mix.inputs['Factor']); L.new(tex.outputs['Color'], mix.inputs['B'])
    L.new(mix.outputs['Result'], bsdf.inputs['Base Color'])
    bsdf.inputs['Roughness'].default_value = rough
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Coat Weight'].default_value = coat
    bsdf.inputs['Coat Roughness'].default_value = 0.25
    bsdf.inputs['Sheen Weight'].default_value = sheen
    bsdf.inputs['Specular IOR Level'].default_value = 0.38
    if bump_png:
        bt = N.new('ShaderNodeTexImage'); bt.image = bpy.data.images.load(bump_png); bt.image.colorspace_settings.name = 'Non-Color'
        bump = N.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.6; bump.inputs['Distance'].default_value = 0.02
        L.new(bt.outputs['Color'], bump.inputs['Height']); L.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    if cut_png:
        ct = N.new('ShaderNodeTexImage'); ct.image = bpy.data.images.load(cut_png); ct.image.colorspace_settings.name = 'Non-Color'
        L.new(ct.outputs['Color'], bsdf.inputs['Alpha'])
    return m

def plain_material(name, color=RED, rough=0.45, metallic=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Specular IOR Level'].default_value = 0.3
    b.inputs['Base Color'].default_value = color; b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metallic
    return m

def area(name, loc, target, size, power, color=(1, 1, 1), size_y=None):
    d = bpy.data.lights.new(name, 'AREA'); d.energy = power; d.color = color
    d.shape = 'RECTANGLE'; d.size = size; d.size_y = size_y or size
    o = bpy.data.objects.new(name, d); bpy.context.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    if name in ('fill', 'rimL', 'rimR'): d.use_shadow = False
    return o

def studio(scale=1.0, floor_z=0.0):
    """white cyclorama + softboxes. scale ~ subject height."""
    s = bpy.context.scene
    k = scale
    # cyc: floor curving up into back wall
    bm = bmesh.new()
    prof = [(-30*k, 0)] + [(6*k + 3*k*math.sin(a), 3*k - 3*k*math.cos(a)) for a in [i*math.pi/2/24 for i in range(25)]] + [(9*k, 40*k)]
    rows = []
    for y, z in prof:
        rows.append([bm.verts.new((x, y, z + floor_z)) for x in (-40*k, 40*k)])
    for a, b in zip(rows, rows[1:]):
        bm.faces.new((a[0], a[1], b[1], b[0]))
    me = bpy.data.meshes.new('cyc'); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    cyc = bpy.data.objects.new('cyc', me); bpy.context.collection.objects.link(cyc)
    cyc.is_shadow_catcher = True
    cyc.data.materials.append(plain_material('backdrop', (0.8, 0.8, 0.8, 1), 0.9))
    w = bpy.data.worlds.new('w'); s.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs[0].default_value = (1, 1, 1, 1)
    w.node_tree.nodes['Background'].inputs[1].default_value = 0.22
    c = (0, 0, 0.5*k + floor_z)
    P = k*k*0.24
    area('key', (-2.2*k, -3.0*k, 3.2*k), c, 2.6*k, 520*P)
    area('fill', (3.0*k, -2.2*k, 1.4*k), c, 2.4*k, 170*P)
    area('top', (0, 0.3*k, 4.2*k), c, 3.0*k, 260*P)
    area('rimL', (-2.6*k, 1.6*k, 1.2*k), c, 0.7*k, 240*P, size_y=3.2*k)
    area('rimR', (2.6*k, 1.4*k, 1.4*k), c, 0.6*k, 200*P, size_y=3.2*k)

def camera(loc, target, lens=85, res=(1600, 2000)):
    s = bpy.context.scene
    cd = bpy.data.cameras.new('cam'); cd.lens = lens; cd.sensor_width = 36
    o = bpy.data.objects.new('cam', cd); bpy.context.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    s.camera = o; s.render.resolution_x, s.render.resolution_y = res
    return o

def render(path, samples=64, pct=100, bg=(246, 246, 246)):
    """Renders with transparent film + shadow catcher -> <path>_alpha.png, and composites on bg -> <path>.png"""
    from PIL import Image
    s = bpy.context.scene
    s.cycles.samples = samples; s.render.resolution_percentage = pct
    s.render.film_transparent = True
    s.render.image_settings.color_mode = 'RGBA'
    base = path[:-4]
    s.render.filepath = base + '_alpha.png'
    bpy.ops.render.render(write_still=True)
    im = Image.open(base + '_alpha.png').convert('RGBA')
    out = Image.new('RGBA', im.size, bg + (255,)); out.alpha_composite(im)
    out.convert('RGB').save(path)
