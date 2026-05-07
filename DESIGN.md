---
name: Professional Workshop System
colors:
  surface: '#fcf8f8'
  surface-dim: '#ddd9d9'
  surface-bright: '#fcf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f1eded'
  surface-container-high: '#ebe7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#45474a'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#75777a'
  outline-variant: '#c5c6ca'
  surface-tint: '#5d5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1a1c1e'
  on-primary-container: '#838486'
  inverse-primary: '#c6c6c9'
  secondary: '#5b5f63'
  on-secondary: '#ffffff'
  secondary-container: '#dde0e5'
  on-secondary-container: '#5f6367'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#201a17'
  on-tertiary-container: '#8b827d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e5'
  primary-fixed-dim: '#c6c6c9'
  on-primary-fixed: '#1a1c1e'
  on-primary-fixed-variant: '#454749'
  secondary-fixed: '#e0e3e7'
  secondary-fixed-dim: '#c3c7cb'
  on-secondary-fixed: '#181c20'
  on-secondary-fixed-variant: '#43474b'
  tertiary-fixed: '#ece0db'
  tertiary-fixed-dim: '#cfc4bf'
  on-tertiary-fixed: '#201a17'
  on-tertiary-fixed-variant: '#4c4541'
  background: '#fcf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  h1:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  h2:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  h3:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  stack-xs: 4px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
  gutter: 24px
  margin: 40px
---

## Brand & Style

This design system is built upon the principles of **Architectural Minimalism**. It is designed for high-end professional environments where precision, stability, and "Calm Authority" are paramount. The aesthetic rejects decorative trends in favor of structural clarity and functional beauty.

The brand personality is expert and disciplined. It evokes the feeling of a well-organized, high-tech workshop: every tool has its place, and every line has a purpose. The UI avoids all organic or "soft" flourishes, leaning instead into sharp geometries and high-contrast layouts that provide immediate cognitive clarity. The emotional response should be one of quiet confidence and unwavering reliability.

## Colors

The palette, "Calm Authority," utilizes a high-contrast foundation of off-whites and deep charcoals to create an environment of focus. 

- **Primary & Secondary:** Deep Charcoal and Slate Gray are used for typography and structural elements to establish a grounded hierarchy.
- **Backgrounds:** Off-white surfaces prevent the clinical feel of pure white while maintaining high legibility.
- **Accent:** A single Muted Technical Blue is used sparingly for primary actions and status indicators. It is intentional and functional, never decorative.
- **Interaction:** State changes are indicated through tonal shifts (e.g., Charcoal to Slate) rather than hue changes, maintaining a monochromatic discipline.

## Typography

The typography strategy pairs technical geometric forms with utilitarian readability.

**Headlines:** Space Grotesk is utilized for its architectural qualities. The generous letter spacing in headers reinforces a premium, gallery-like feel. All display text should be treated as a structural element.

**Body:** Inter provides a functional, neutral counterpoint. It is selected for its exceptional legibility in dense professional data environments. 

**Labels:** Small-scale labels use Space Grotesk in uppercase with wide tracking (10%) to denote technical specifications, categories, or metadata.

## Layout & Spacing

This design system employs a **Fixed Grid** model to ensure a sense of permanence and order.

- **Grid:** A 12-column grid system is used for desktop layouts, with a substantial 40px outer margin to provide visual "breathing room." 
- **Rhythm:** Spacing follows a strict 4px baseline. Components are separated by generous whitespace to avoid visual clutter and emphasize the "minimalist workshop" aesthetic.
- **Alignment:** Elements should align to the grid edges with zero-tolerance for "floating" or unanchored components. Vertical rhythm is maintained through standardized stack units (16px, 32px, 64px).

## Elevation & Depth

Depth is communicated through **Structural Layering** and **Low-Contrast Outlines** rather than shadows or gradients. 

- **Flatness:** The UI is strictly flat. Surfaces do not "float" above the background using shadows; they are distinguished by subtle tonal changes in the background or crisp 1px borders (#D1D3D4).
- **Tonal Hierarchy:** Primary content sits on an Off-White surface. Navigation or secondary toolbars use a slightly deeper gray or the Primary Charcoal to create clear regional differentiation.
- **Borders:** Use solid, thin lines to define containers. This reinforces the architectural and precise nature of the system.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—from buttons and input fields to large container cards—features 90-degree angles. This rejection of rounded corners communicates precision, industrial strength, and a "no-frills" professional attitude. Consistency in these sharp edges is vital to maintaining the system's architectural integrity.

## Components

Components in this design system are treated as precision instruments.

- **Buttons:** Primary buttons are solid Deep Charcoal with white text. Secondary buttons are outlined with 1px Slate Gray. Interaction is indicated by a subtle fill change (e.g., Slate Gray to Deep Charcoal). No rounded corners.
- **Input Fields:** Bottom-bordered or fully outlined with 1px lines. Labels sit above the field in "label-caps" typography. Focused states use the Technical Blue accent for the border color.
- **Cards:** Defined by a 1px border. No shadows. Internal padding is generous (minimum 24px) to emphasize the minimalist style.
- **Chips/Status:** Rectangular blocks with high-contrast text. Use the Technical Blue for "Active" states and Slate Gray for "Inactive" states.
- **Data Tables:** Clean, horizontal-only dividers. Header rows use "label-caps" typography for a technical, schematic appearance.
- **Additional Components:** This system benefits from "Technical Readouts"—small data blocks with monospace-adjacent styling (Space Grotesk) used to display system status or professional metrics.