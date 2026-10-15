"""Optimiza imágenes de proveedores para web.
uso: python3 scripts/optimizar-fotos.py <proveedor> <carpeta_origen> <carpeta_destino_repo>
"""
import sys, os, re, unicodedata
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}
MAX = 2400

def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s or "x"

prov, src, dst = sys.argv[1], sys.argv[2], sys.argv[3]
out_root = os.path.join(dst, slug(prov))
done = skipped = 0
for root, _, files in os.walk(src):
    rel = os.path.relpath(root, src)
    parts = [slug(p) for p in rel.split(os.sep) if p not in (".", "jpeg", "JPEG")]
    for f in sorted(files):
        stem, ext = os.path.splitext(f)
        if ext.lower() not in EXTS:
            continue
        out_dir = os.path.join(out_root, *[p for p in parts if p != "jpeg"])
        out = os.path.join(out_dir, slug(stem) + ".jpg")
        if os.path.exists(out):
            skipped += 1
            continue
        try:
            im = Image.open(os.path.join(root, f))
            im = ImageOps.exif_transpose(im)
            if im.mode not in ("RGB",):
                im = im.convert("RGB")
            im.thumbnail((MAX, MAX), Image.LANCZOS)
            os.makedirs(out_dir, exist_ok=True)
            im.save(out, "JPEG", quality=80, optimize=True, progressive=True)
            done += 1
        except Exception as e:
            print("ERROR", f, e)
print(f"{prov}: {done} nuevas, {skipped} ya existían")
