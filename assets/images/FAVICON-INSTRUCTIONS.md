# Favicon Creation Instructions

This portfolio website requires the following favicon files to be created:

## Required Files

1. **favicon.ico** (root directory)
   - Location: `./favicon.ico`
   - Format: ICO
   - Sizes: 16x16, 32x32, 48x48 (multi-size ICO)

2. **favicon-32x32.png**
   - Location: `assets/images/favicon-32x32.png`
   - Format: PNG
   - Size: 32x32 pixels

3. **favicon-16x16.png**
   - Location: `assets/images/favicon-16x16.png`
   - Format: PNG
   - Size: 16x16 pixels

4. **apple-touch-icon.png**
   - Location: `assets/images/apple-touch-icon.png`
   - Format: PNG
   - Size: 180x180 pixels

## Design Recommendations

- Use the portfolio's accent color (#ff6b6b) as the primary color
- Dark background (#2b2d31) to match the site theme
- Consider using initials "RAG" or "RA" as the favicon symbol
- Keep design simple and recognizable at small sizes
- Ensure good contrast for visibility

## Tools for Creating Favicons

### Online Tools (Easiest)
- **Favicon.io** (https://favicon.io/)
  - Text to Favicon: Generate from text/initials
  - Image to Favicon: Upload a logo/image
  - Automatically generates all required sizes

- **RealFaviconGenerator** (https://realfavicongenerator.net/)
  - Comprehensive favicon generator
  - Supports all platforms and sizes
  - Preview across different devices

### Image Editing Software
- **GIMP** (Free) - Can create and export ICO files
- **Photoshop** - Requires ICO plugin
- **Figma/Sketch** - Design, then export and convert

### Command Line (ImageMagick)
```bash
# Install ImageMagick first
# From a square PNG source image (e.g., 512x512):

# Generate PNG favicons
convert source.png -resize 32x32 favicon-32x32.png
convert source.png -resize 16x16 favicon-16x16.png
convert source.png -resize 180x180 apple-touch-icon.png

# Generate multi-size ICO
convert source.png -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico
```

## Current Status

Referenced in HTML files but not yet created:
- [index.html](../../index.html) - Lines 11-14
- [404.html](../../404.html) - Lines 11-14
- [portfolio.html](../../portfolio.html) - Lines with favicon references

## Next Steps

1. Create or obtain a source image (minimum 512x512px recommended)
2. Use one of the tools above to generate all required sizes
3. Place files in the correct locations as specified above
4. Test by viewing the website and checking browser tabs/bookmarks

---

**Note:** Until favicons are created, browsers will show default favicon or no icon.
