# Site photography

## The current problem

Every file in this folder is a thumbnail. Measured dimensions:

| File | Actual pixels |
| --- | --- |
| `hero-slide-1.jpg` | 270 × 148 |
| `hero-slide-2.jpg` | 299 × 168 |
| `hero-slide-3.jpg` | 259 × 194 |
| `hero-slide-4.jpg` | 260 × 194 |
| `proj-1.jpg` | 300 × 168 |
| `proj-2.jpg` | 304 × 166 |
| `proj-3.jpg` | 301 × 167 |
| `proj-4.jpg` | 299 × 168 |
| `proj-5.jpg` | 282 × 179 |
| `proj-6.jpg` | 612 × 408 |
| `proj-7.jpg` | 299 × 168 |
| `ace-logo.jpeg` | 169 × 198 |

A photograph cannot be sharpened into detail it never captured. Upscaling
software — including AI upscalers — invents plausible pixels; on a building it
produces smeared brick, wobbling window lines and mushy signage, which reads as
*worse* than a small sharp image. The only real fix is to replace the files.

Until then the layout deliberately caps how large any photo is drawn
(`--photo-max`, currently 460px) so nothing is stretched much beyond its
captured size.

## What to supply

Shoot or export at these minimums, then drop the files in here **using the same
filenames**. Nothing else needs to change.

| Purpose | Minimum width | Aspect | Notes |
| --- | --- | --- | --- |
| `hero-slide-*.jpg` | 2400 px | 4:3 or wider | Landscape, strong subject left of centre |
| `proj-*.jpg` | 1600 px | 3:2 | One clear hero shot per project |
| `ace-logo.jpeg` | 512 px | square-ish | Ideally supply an SVG instead |

Export as JPEG at quality 80–85, sRGB colour profile. Aim for under 400 KB per
file; anything over 800 KB should be re-exported rather than uploaded.

## Raising the cap once real photography lands

In `client/src/styles.css`, the `--photo-max` custom property limits displayed
width. With 1600 px+ files, raise or remove it:

```css
:root { --photo-max: 720px; }   /* or delete the declaration entirely */
```

The project grid will also comfortably return to two columns at desktop width
(`.proj-grid`), and the hero image can span its full column again.

## A note on stock photography

Do not label stock images as ACE projects. Using a stock building under the
caption "Emerald Heights — Karen" misrepresents the portfolio, which is the
opposite of what this site is for. Stock is defensible only for clearly
decorative, uncaptioned imagery.
