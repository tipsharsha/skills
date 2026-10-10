---
name: ppt_generator
description: Generate professional PowerPoint (.pptx) presentations from structured content. Use this skill when the user asks to create a PPT, presentation, slide deck, or PowerPoint file.
---

# PowerPoint Presentation Generator

This skill generates professional `.pptx` PowerPoint presentations using the `python-pptx` library.

## When to Use

Activate this skill when the user requests:
- Creating a PowerPoint presentation / PPT / PPTX
- Building a slide deck
- Generating presentation slides
- Converting content into a presentation format

## Prerequisites

Ensure `python-pptx` is installed before generating any presentation:

```bash
pip install python-pptx
```

## Workflow

1. **Understand the Request**: Clarify the topic, number of slides, style, and any specific content requirements.
2. **Plan the Slide Structure**: Outline the slides with titles, bullet points, and any visual elements.
3. **Generate the Python Script**: Create a Python script using `python-pptx` that builds the presentation.
4. **Run the Script**: Execute the script to produce the `.pptx` file.
5. **Deliver**: Provide the file path to the user.

## Script Generation Guidelines

When generating the Python script, follow these patterns:

### Imports and Setup

```python
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os
```

### Color Palette (Modern & Professional)

Use these curated color palettes for a premium look:

```python
# Dark Professional Theme
COLORS = {
    "bg_dark":       RGBColor(0x1A, 0x1A, 0x2E),  # Deep navy
    "bg_medium":     RGBColor(0x16, 0x21, 0x3E),  # Dark blue
    "accent_primary": RGBColor(0x00, 0xD2, 0xFF),  # Cyan
    "accent_warm":   RGBColor(0xFF, 0x6B, 0x6B),  # Coral
    "accent_green":  RGBColor(0x4E, 0xCB, 0x71),  # Green
    "accent_purple": RGBColor(0xA855, 0xF7, 0x00)[0:3],  # Purple — use RGBColor(0xA8, 0x55, 0xF7)
    "text_white":    RGBColor(0xFF, 0xFF, 0xFF),
    "text_light":    RGBColor(0xB0, 0xB0, 0xC0),
    "text_subtle":   RGBColor(0x80, 0x80, 0x99),
}

# Light Corporate Theme
COLORS_LIGHT = {
    "bg_white":      RGBColor(0xFF, 0xFF, 0xFF),
    "bg_light":      RGBColor(0xF8, 0xF9, 0xFA),
    "accent_blue":   RGBColor(0x2D, 0x5B, 0xE3),
    "accent_teal":   RGBColor(0x0D, 0x94, 0x88),
    "text_dark":     RGBColor(0x1A, 0x1A, 0x2E),
    "text_medium":   RGBColor(0x4A, 0x4A, 0x5A),
    "divider":       RGBColor(0xE0, 0xE0, 0xE8),
}
```

### Slide Patterns

#### Title Slide
```python
def add_title_slide(prs, title, subtitle):
    slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout for full control
    # Background
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = RGBColor(0x1A, 0x1A, 0x2E)
    
    # Accent bar
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(3.2), Inches(2.5), Inches(0.06))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor(0x00, 0xD2, 0xFF)
    shape.line.fill.background()
    
    # Title
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(8.4), Inches(1.5))
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    
    # Subtitle
    txBox2 = slide.shapes.add_textbox(Inches(0.8), Inches(3.5), Inches(8.4), Inches(1.0))
    tf2 = txBox2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = subtitle
    p2.font.size = Pt(18)
    p2.font.color.rgb = RGBColor(0xB0, 0xB0, 0xC0)
```

#### Content Slide with Bullet Points
```python
def add_content_slide(prs, title, bullets):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = RGBColor(0x16, 0x21, 0x3E)
    
    # Title
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8.4), Inches(0.8))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    
    # Accent underline
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(1.5), Inches(0.04))
    shape.fill.solid()
    shape.fill.fore_color.rgb = RGBColor(0x00, 0xD2, 0xFF)
    shape.line.fill.background()
    
    # Bullets
    txBox2 = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(8.4), Inches(4.5))
    tf2 = txBox2.text_frame
    tf2.word_wrap = True
    for i, bullet in enumerate(bullets):
        if i == 0:
            p = tf2.paragraphs[0]
        else:
            p = tf2.add_paragraph()
        p.text = bullet
        p.font.size = Pt(18)
        p.font.color.rgb = RGBColor(0xB0, 0xB0, 0xC0)
        p.space_after = Pt(12)
        p.level = 0
```

#### Two-Column Slide
```python
def add_two_column_slide(prs, title, left_items, right_items):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = RGBColor(0x16, 0x21, 0x3E)
    
    # Title
    txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8.4), Inches(0.8))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
    
    # Left column
    left_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(4.0), Inches(4.5))
    ltf = left_box.text_frame
    ltf.word_wrap = True
    for i, item in enumerate(left_items):
        p = ltf.paragraphs[0] if i == 0 else ltf.add_paragraph()
        p.text = item
        p.font.size = Pt(16)
        p.font.color.rgb = RGBColor(0xB0, 0xB0, 0xC0)
        p.space_after = Pt(10)
    
    # Right column
    right_box = slide.shapes.add_textbox(Inches(5.2), Inches(1.5), Inches(4.0), Inches(4.5))
    rtf = right_box.text_frame
    rtf.word_wrap = True
    for i, item in enumerate(right_items):
        p = rtf.paragraphs[0] if i == 0 else rtf.add_paragraph()
        p.text = item
        p.font.size = Pt(16)
        p.font.color.rgb = RGBColor(0xB0, 0xB0, 0xC0)
        p.space_after = Pt(10)
```

#### Thank You / End Slide
```python
def add_thank_you_slide(prs, message="Thank You", contact_info=""):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = RGBColor(0x1A, 0x1A, 0x2E)
    
    txBox = slide.shapes.add_textbox(Inches(1), Inches(2.5), Inches(8), Inches(1.5))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.text = message
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = RGBColor(0x00, 0xD2, 0xFF)
    p.alignment = PP_ALIGN.CENTER
    
    if contact_info:
        txBox2 = slide.shapes.add_textbox(Inches(1), Inches(4.0), Inches(8), Inches(1.0))
        tf2 = txBox2.text_frame
        p2 = tf2.paragraphs[0]
        p2.text = contact_info
        p2.font.size = Pt(16)
        p2.font.color.rgb = RGBColor(0x80, 0x80, 0x99)
        p2.alignment = PP_ALIGN.CENTER
```

### Saving the Presentation
```python
output_path = os.path.join(os.path.expanduser("~"), "Desktop", "presentation.pptx")
prs.save(output_path)
print(f"Presentation saved to: {output_path}")
```

## Design Principles

1. **Use blank layouts** (`prs.slide_layouts[6]`) for full control over positioning and styling.
2. **Set solid background fills** on every slide for consistency.
3. **Add accent shapes** (thin rectangles, circles) to break up visual monotony.
4. **Use consistent font sizing**: Title = 28-40pt, Body = 16-18pt, Captions = 12-14pt.
5. **Maintain generous whitespace**: Start content at `Inches(0.8)` from edges.
6. **Use the dark theme by default** unless the user requests a light/corporate theme.
7. **Add slide numbers** on content slides when the deck has 5+ slides.
8. **Keep bullet points concise** — max 6-7 bullets per slide for readability.

## Output Location

- Save presentations to the user's **Desktop** by default: `~/Desktop/<name>.pptx`
- If the user specifies a different location, use that instead.
- Always print the full file path after saving.

## Advanced Features (Use When Appropriate)

- **Charts**: Use `pptx.chart` for data-driven slides (bar, pie, line charts).
- **Tables**: Use `slide.shapes.add_table()` for structured data.
- **Images**: Use `slide.shapes.add_picture()` to embed images.
- **Shapes**: Use decorative shapes for visual polish (rounded rectangles, circles, arrows).
- **Gradients**: Use gradient fills for backgrounds when the user wants extra polish.

## Error Handling

Always wrap the script in a try-except block and provide helpful error messages:

```python
try:
    # ... presentation generation code ...
    prs.save(output_path)
    print(f"✅ Presentation saved to: {output_path}")
except ImportError:
    print("❌ python-pptx is not installed. Run: pip install python-pptx")
except Exception as e:
    print(f"❌ Error generating presentation: {e}")
```
