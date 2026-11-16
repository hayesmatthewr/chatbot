import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import *
import argparse
ap = argparse.ArgumentParser(); ap.add_argument('--samples', type=int, default=64); ap.add_argument('--pct', type=int, default=45)
ap.add_argument('--out', default='out/tube.png'); ap.add_argument('--blend')
a = ap.parse_args()
s = reset()
# real sizes: tube 2.25 in across x 3.5 in tall; softgel assumed 11.5 mm x 7.5 mm (a typical small oval softgel)
INCH = 3.076                         # scene units per inch
R, H, wall = 1.125*INCH, 3.5*INCH, 0.18
SA, SB = 11.5/25.4/2*INCH, 7.5/25.4/2*INCH
gel_ml = 4/3*math.pi*(11.5/2)*(7.5/2)**2/1000
inner_ml = math.pi*((1.125*25.4)-1.5)**2*(3.5*25.4-6)/1000
print('TUBE inner ml', round(inner_ml), '| 90 softgels need about', round(90*gel_ml/0.6), 'ml | softgel length / tube width', round(11.5/(2.25*25.4), 3))
N = 256
def arc(cx, cz, rad, a0, a1, n=8):
    return [(cx + rad*math.cos(math.radians(a0+(a1-a0)*i/n)), cz + rad*math.sin(math.radians(a0+(a1-a0)*i/n))) for i in range(n+1)]
seam = H*0.62; rim = 0.14
prof = [(0, 0.1), (R-0.5, 0.1), (R-2*rim, 0.1)] + arc(R-rim, rim, rim, 180, 360, 10)[1:] \
     + [(R, H*0.2), (R, H*0.45), (R, seam-0.05), (R-0.03, seam-0.02), (R-0.03, seam+0.02), (R, seam+0.05), (R, H*0.8), (R, H-rim)] \
     + arc(R-rim, H-rim, rim, 0, 180, 10)[1:] + [(R-2*rim, H-0.12), (R-0.5, H-0.12), (0, H-0.12)]
bm = bmesh.new(); uvl = bm.loops.layers.uv.new('UVMap'); rings = []
for r, z in prof:
    if r < 1e-6: rings.append([bm.verts.new((0, 0, z))]); continue
    rings.append([bm.verts.new((r*math.sin((j/N-.5)*2*math.pi), -r*math.cos((j/N-.5)*2*math.pi), z)) for j in range(N)])
side = lambda i: prof[i][0] >= R-0.035
for i in range(len(rings)-1):
    A, B = rings[i], rings[i+1]
    for j in range(N):
        j2 = (j+1) % N
        if len(A) == 1: vs = [(A[0], j+.5, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
        elif len(B) == 1: vs = [(A[j], j, i), (A[j2], j+1, i), (B[0], j+.5, i+1)]
        else: vs = [(A[j], j, i), (A[j2], j+1, i), (B[j2], j+1, i+1), (B[j], j, i+1)]
        f = bm.faces.new([v for v, _, _ in vs]); f.smooth = True
        on_side = side(i) and side(i+1)
        for loop, (v, ju, ii) in zip(f.loops, vs):
            loop[uvl].uv = (ju/N, prof[ii][1]/H) if on_side else (-1, -1)   # only the wall carries the label
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
me = bpy.data.meshes.new('tube'); bm.to_mesh(me); bm.free()
tube = bpy.data.objects.new('tube', me); bpy.context.collection.objects.link(tube)
m = tube.modifiers.new('sub', 'SUBSURF'); m.levels = 1; m.render_levels = 1
mat = label_material('paper', os.path.join(HERE, 'tex/tube_label.png'), rough=0.82)
nt = mat.node_tree; b = nt.nodes['Principled BSDF']; b.inputs['Specular IOR Level'].default_value = 0.25
nz = nt.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 60; nz.inputs['Detail'].default_value = 6
bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 0.08; bp.inputs['Distance'].default_value = 0.05
nt.links.new(nz.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
tube.data.materials.append(mat)
tube.rotation_euler = (0, 0, math.radians(-14))
# one softgel on the table for scale
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=48, v_segments=24, radius=1.0)
for v in bm.verts: v.co = (v.co.x*SA, v.co.y*SB, v.co.z*SB)
for f in bm.faces: f.smooth = True
gm = bpy.data.meshes.new('softgel'); bm.to_mesh(gm); bm.free()
g = bpy.data.materials.new('softgel'); g.use_nodes = True; gb = g.node_tree.nodes['Principled BSDF']
gb.inputs['Base Color'].default_value = (0.62, 0.008, 0.014, 1); gb.inputs['Transmission Weight'].default_value = 0.45
gb.inputs['Roughness'].default_value = 0.06; gb.inputs['IOR'].default_value = 1.45
gb.inputs['Coat Weight'].default_value = 1.0; gb.inputs['Coat Roughness'].default_value = 0.03
gm.materials.append(g)
gel = bpy.data.objects.new('softgel', gm); bpy.context.collection.objects.link(gel)
gel.location = (R + 1.5, -1.9, SB); gel.rotation_euler = (0, 0, math.radians(25))
k = H/2.2
studio(scale=k)
cx = 0.9
camera((cx - 0.08*H*6, -7.2*H, 1.75*H), (cx, 0, H*0.47), lens=135)
if a.blend: bpy.ops.file.pack_all(); bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(a.blend))
render(os.path.abspath(a.out), a.samples, a.pct)
