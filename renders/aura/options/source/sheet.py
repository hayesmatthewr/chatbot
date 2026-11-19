import sys
from PIL import Image, ImageDraw, ImageFont
out, title, *items = sys.argv[1:]
pairs = [i.split('=', 1) for i in items]; ims = [Image.open(p).convert('RGB') for _, p in pairs]
w, h = ims[0].size; pad, head = 24, 96
f1 = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf', 34); f2 = ImageFont.truetype('/usr/share/fonts/opentype/inter/Inter-Bold.otf', 26)
c = Image.new('RGB', (len(ims)*w + (len(ims)+1)*pad, h + head + pad), (246, 246, 246)); d = ImageDraw.Draw(c)
for i, ((lab, _), im) in enumerate(zip(pairs, ims)):
    x = pad + i*(w+pad); c.paste(im, (x, head)); d.text((x + 8, 30), lab, fill=(40, 20, 22), font=f1)
c.save(out); print(c.size)
