import sys, os, math; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
S = sys.argv[1]
s = reset(); s.cycles.max_bounces = 16; s.cycles.transmission_bounces = 12
MM = 3.076/25.4                 # scene units per millimetre (tube is modelled at 3.076 units per inch)
GLASS = 11.5/2.02*MM            # vial units -> scene, so its softgels are 11.5 mm long
BAG = GLASS*4.25/2              # bag units -> scene (bag was drawn with the vial 2 units across)
def bring(blend, pick, scale, x, y=0.0):
    with bpy.data.libraries.load(blend) as (f, t): t.objects = [n for n in f.objects if pick(n)]
    root = bpy.data.objects.new('root_'+os.path.basename(blend), None); bpy.context.collection.objects.link(root)
    for o in t.objects:
        bpy.context.collection.objects.link(o)
        if o.parent is None: o.parent = root
    root.scale = (scale,)*3; root.location = (x, y, 0)
    return t.objects
bring(S+'/work/final/aura-bag.blend', lambda n: n == 'bag', BAG, -9.6)
bring(S+'/seed/final/aura-vial.blend', lambda n: n.startswith('vial_'), GLASS, -2.0)
objs = bring(S+'/tube/final/aura-tube.blend', lambda n: n in ('tube', 'softgel'), 1.0, 4.3)
for o in objs:
    if o.name.startswith('softgel'): o.location = (5.6, -2.2, o.location.z)
print('SIZES mm: bag', round(6.42*BAG/MM), 'x', round(9.3*BAG/MM), '| vial', round(4.25*GLASS/MM, 1), 'x', round(17.37*GLASS/MM), '| tube 57 x 89 | softgel 11.5 x 7.5')
studio(scale=7.0)
camera((-9, -118, 24), (-1.6, 0, 6.2), lens=135, res=(2000, 1300))
bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=S+'/tube/final/aura-lineup.blend')
render(S+'/tube/final/aura-lineup.png', int(sys.argv[2]), int(sys.argv[3]))
