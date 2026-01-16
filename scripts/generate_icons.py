#!/usr/bin/env python3
"""
Icon Generator for Shroud Chronicle PWA
Creates PWA icons programmatically using Pillow (no external dependencies).

Requirements:
    pip install Pillow

Usage:
    python scripts/generate_icons.py
"""

import os
import sys
from pathlib import Path
from io import BytesIO
import math

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install Pillow")
    sys.exit(1)


# Icon sizes needed for full PWA support
PNG_SIZES = [
    16,    # favicon
    32,    # favicon
    48,    # Windows
    72,    # Android
    96,    # Android
    120,   # iPhone (iOS 7+)
    128,   # Chrome Web Store
    144,   # Windows 8 tile, Android
    152,   # iPad (iOS 7+)
    180,   # iPhone 6 Plus (iOS 8+)
    192,   # Android Chrome
    384,   # Android Chrome
    512,   # Android Chrome, PWA splash
]

# Sizes for ICO file (Windows favicon)
ICO_SIZES = [16, 32, 48, 256]

# Apple touch icon sizes (including iPad Pro 12.9" at 167)
APPLE_SIZES = [120, 152, 167, 180]


def ensure_dir(path: Path):
    """Create directory if it doesn't exist."""
    path.mkdir(parents=True, exist_ok=True)


def create_icon_image(size: int) -> Image.Image:
    """
    Create the Shroud Chronicle icon programmatically.
    Design: Dark circular background with amber 'S' and cyan 'C' initials,
    representing the dual faith/science lens theme.
    """
    # Create RGBA image
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    center = size // 2
    radius = int(size * 0.48)
    
    # Background gradient circle (dark)
    for r in range(radius, 0, -1):
        # Gradient from #1a1a2e to #0a0a0a
        t = r / radius
        red = int(26 * t + 10 * (1 - t))
        green = int(26 * t + 10 * (1 - t))
        blue = int(46 * t + 10 * (1 - t))
        draw.ellipse(
            [center - r, center - r, center + r, center + r],
            fill=(red, green, blue, 255)
        )
    
    # Outer ring
    draw.ellipse(
        [center - radius, center - radius, center + radius, center + radius],
        outline=(51, 51, 51, 255),
        width=max(1, size // 128)
    )
    
    # Left amber glow (semi-circle)
    glow_radius = int(size * 0.35)
    for i in range(20):
        alpha = int(80 * (1 - i / 20))
        r = glow_radius + i * 2
        # Draw left half only by using arc
        draw.arc(
            [center - r, center - r, center + r, center + r],
            start=90, end=270,
            fill=(245, 158, 11, alpha),
            width=max(1, size // 64)
        )
    
    # Right cyan glow (semi-circle)
    for i in range(20):
        alpha = int(80 * (1 - i / 20))
        r = glow_radius + i * 2
        draw.arc(
            [center - r, center - r, center + r, center + r],
            start=270, end=90,
            fill=(34, 211, 238, alpha),
            width=max(1, size // 64)
        )
    
    # Cross motif (subtle)
    line_width = max(1, size // 170)
    cross_color = (229, 229, 229, 76)  # 30% opacity
    # Vertical line
    draw.line(
        [(center, int(size * 0.23)), (center, int(size * 0.77))],
        fill=cross_color,
        width=line_width
    )
    # Horizontal line
    draw.line(
        [(int(size * 0.31), int(size * 0.43)), (int(size * 0.69), int(size * 0.43))],
        fill=cross_color,
        width=line_width
    )
    
    # Draw S and C letters
    font_size = int(size * 0.3)
    try:
        # Try to use a serif font
        font = ImageFont.truetype("georgia.ttf", font_size)
    except (OSError, IOError):
        try:
            font = ImageFont.truetype("times.ttf", font_size)
        except (OSError, IOError):
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", font_size)
            except (OSError, IOError):
                # Fall back to default font
                font = ImageFont.load_default()
    
    # S in amber
    s_color = (245, 158, 11, 230)
    s_x = int(size * 0.22)
    s_y = int(size * 0.38)
    draw.text((s_x, s_y), "S", font=font, fill=s_color)
    
    # C in cyan
    c_color = (34, 211, 238, 230)
    c_x = int(size * 0.52)
    c_y = int(size * 0.38)
    draw.text((c_x, c_y), "C", font=font, fill=c_color)
    
    # Decorative dashed ring
    dash_radius = int(size * 0.39)
    dash_count = max(12, size // 10)
    for i in range(dash_count):
        if i % 2 == 0:
            angle_start = (360 / dash_count) * i
            angle_end = angle_start + (360 / dash_count) * 0.6
            draw.arc(
                [center - dash_radius, center - dash_radius, 
                 center + dash_radius, center + dash_radius],
                start=angle_start, end=angle_end,
                fill=(51, 51, 51, 128),
                width=max(1, size // 256)
            )
    
    return img


def create_png(output_path: Path, size: int):
    """Create PNG icon at specified size."""
    img = create_icon_image(size)
    img.save(str(output_path), "PNG")
    print(f"  Created: {output_path.name} ({size}x{size})")


def create_png_bytes(size: int) -> bytes:
    """Create PNG icon bytes at specified size."""
    img = create_icon_image(size)
    buffer = BytesIO()
    img.save(buffer, "PNG")
    return buffer.getvalue()


def create_ico(output_path: Path, sizes: list):
    """Create ICO file with multiple sizes."""
    images = []
    for size in sizes:
        png_bytes = create_png_bytes(size)
        img = Image.open(BytesIO(png_bytes))
        # Ensure RGBA mode for ICO
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        images.append(img)
    
    # Save as ICO with multiple sizes
    images[0].save(
        str(output_path),
        format='ICO',
        sizes=[(img.width, img.height) for img in images],
        append_images=images[1:]
    )
    print(f"  Created: {output_path.name} (sizes: {sizes})")


def main():
    # Determine paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    icons_dir = project_root / "icons"
    
    print("Shroud Chronicle PWA Icon Generator")
    print("=" * 50)
    print(f"Output directory: {icons_dir}")
    print()
    
    # Ensure icons directory exists
    ensure_dir(icons_dir)
    
    # Generate standard PNG icons
    print("Generating PNG icons...")
    for size in PNG_SIZES:
        output_path = icons_dir / f"icon-{size}x{size}.png"
        create_png(output_path, size)
    
    print()
    
    # Generate Apple touch icons
    print("Generating Apple touch icons...")
    for size in APPLE_SIZES:
        output_path = icons_dir / f"apple-touch-icon-{size}x{size}.png"
        create_png(output_path, size)
    
    # Also create the default apple-touch-icon.png (180x180)
    create_png(icons_dir / "apple-touch-icon.png", 180)
    
    print()
    
    # Generate ICO file
    print("Generating ICO favicon...")
    ico_path = icons_dir / "favicon.ico"
    create_ico(ico_path, ICO_SIZES)
    
    # Copy favicon.ico to root for maximum compatibility
    root_ico = project_root / "favicon.ico"
    import shutil
    shutil.copy(ico_path, root_ico)
    print(f"  Copied favicon.ico to project root")
    
    print()
    print("=" * 50)
    print("Icon generation complete!")
    print()
    print("Generated files:")
    print(f"  - {len(PNG_SIZES)} standard PNG icons")
    print(f"  - {len(APPLE_SIZES) + 1} Apple touch icons")
    print(f"  - 1 ICO favicon (with {len(ICO_SIZES)} sizes)")
    print()
    print("All PWA files already configured - ready to deploy!")


if __name__ == "__main__":
    main()
