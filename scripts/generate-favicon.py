#!/usr/bin/env python3
"""Generate Vincentina favicon assets from images/ff-favicon-old.png."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "ff-favicon-old.png"
MASTER_OUT = ROOT / "images" / "ff-favicon.png"
ICO_OUT = ROOT / "favicon.ico"
ICON32_OUT = ROOT / "icon.png"
APPLE_OUT = ROOT / "apple-touch-icon.png"

MASTER_SIZE = 512
FILL_RATIO = 0.94


def is_paper_pixel(r: int, g: int, b: int, a: int) -> bool:
    return a > 20 and r > 235 and g > 230 and b > 225


def trim_paper(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_paper_pixel(r, g, b, a):
                pixels[x, y] = (0, 0, 0, 0)
    bbox = rgba.getchannel("A").getbbox()
    if not bbox:
        raise RuntimeError("No visible content found in source favicon image.")
    return rgba.crop(bbox)


def compose_square(image: Image.Image, size: int, fill_ratio: float) -> Image.Image:
    content_w, content_h = image.size
    target = int(size * fill_ratio)
    scale = target / max(content_w, content_h)
    resized = image.resize(
        (max(1, round(content_w * scale)), max(1, round(content_h * scale))),
        Image.Resampling.LANCZOS,
    )
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    offset = ((size - resized.width) // 2, (size - resized.height) // 2)
    canvas.paste(resized, offset, resized)
    return canvas


def save_derivatives(master: Image.Image) -> None:
    master.save(MASTER_OUT, format="PNG", optimize=True)

    icon32 = master.resize((32, 32), Image.Resampling.LANCZOS)
    icon32.save(ICON32_OUT, format="PNG", optimize=True)

    apple = master.resize((180, 180), Image.Resampling.LANCZOS)
    apple.save(APPLE_OUT, format="PNG", optimize=True)

    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [
        master.resize(dim, Image.Resampling.LANCZOS) for dim in ico_sizes
    ]
    ico_images[0].save(
        ICO_OUT,
        format="ICO",
        sizes=ico_sizes,
        append_images=ico_images[1:],
    )


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source image: {SRC}")

    trimmed = trim_paper(Image.open(SRC))
    master = compose_square(trimmed, MASTER_SIZE, FILL_RATIO)
    save_derivatives(master)

    print(f"Wrote {MASTER_OUT.relative_to(ROOT)}")
    print(f"Wrote {ICO_OUT.relative_to(ROOT)}")
    print(f"Wrote {ICON32_OUT.relative_to(ROOT)}")
    print(f"Wrote {APPLE_OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
