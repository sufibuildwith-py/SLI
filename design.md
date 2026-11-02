# Supreme Leather Industries — Belt Collection
## Design Specification

**Page:** Collection — Page 02  
**Status:** Design proposal  
**Visual direction:** Premium leather editorial / heritage craftsmanship  
**Primary interaction:** Manually controlled, one-product-at-a-time slider  
**Assets:** `/belts/`  
**Background:** `sli/public/images/craftsmanship/background_clean_plate.webp`

---

# 1. Design Vision

## 1.1 The concept

Create a premium, editorial-style belt collection experience where each belt receives its own moment of attention.

This should not look like a conventional online shopping catalogue with a grid of product cards. The experience should feel closer to browsing a carefully curated leather collection in a luxury showroom.

The visitor sees one featured belt at a time, studies its design, reads its individual name and moves to the next product whenever they choose.

The design should communicate:

- Heritage and craftsmanship.
- Individuality of every belt design.
- Rich leather textures and intricate embossing.
- The character of antique-finish buckles.
- A premium, understated visual identity.

## 1.2 Design principles

1. **Product first:** The belt must be the visual centrepiece.
2. **One product at a time:** No crowded product grids.
3. **User-controlled pace:** No automatic slideshow or forced transitions.
4. **Quiet luxury:** Restrained typography, subtle motion and generous spacing.
5. **Visual consistency:** Maintain the existing Supreme Leather website's coffee-brown and warm-neutral aesthetic.
6. **Authenticity:** Never invent product features, materials or specifications based on appearance alone.

---

# 2. Visual Direction

## 2.1 Background

Use the existing background asset:

`/sli/public/images/craftsmanship/background_clean_plate.webp`

This background should extend across the entire collection experience.

Requirements:

- Preserve the original image's intended appearance.
- Use an appropriate cover treatment without distorting the image.
- Maintain sufficient contrast between the background and the product.
- Avoid introducing unrelated gradients or colourful background panels.
- If a subtle overlay is necessary for text readability, keep it restrained.
- Avoid visible seams between the background and adjacent website sections.

The background should feel like a continuation of the existing leather craftsmanship section.

## 2.2 Colour palette

Use the existing website's design tokens wherever possible.

Proposed palette:

| Purpose | Colour direction |
|---|---|
| Primary background | Existing coffee-brown photographic background |
| Main text | Warm ivory |
| Secondary text | Muted beige |
| Accent | Antique bronze |
| Interactive hover | Subtle warm gold |
| Dividers | Low-contrast warm grey/brown |

Do not introduce bright UI colours.

The turquoise, burgundy, red and copper colours should come from the actual belt photography, not the interface.

## 2.3 Typography

Follow the typography already established by the website.

Recommended hierarchy:

- Small uppercase eyebrow: `THE COLLECTION`
- Main heading: `Crafted to be distinct.`
- Product name: Large, elegant editorial typography.
- Product description: Small, readable supporting text.
- Product counter: Monospaced or restrained uppercase styling.

Avoid excessive font weights and oversized decorative text.

---

# 3. Page Structure

The page should consist of four primary areas.

## 3.1 Collection introduction

A compact introduction at the top.

Content:

**Eyebrow:** THE COLLECTION

**Heading:** Crafted to be distinct.

**Supporting copy:**

Every belt carries its own character. Explore a collection shaped by intricate detailing, expressive patterns and distinctive hardware.

Keep this section visually restrained. It should introduce the collection without competing with the product showcase.

## 3.2 Featured product stage

This is the most important part of the page.

Display one belt at a time inside a large, carefully composed visual stage.

Desktop composition:

- Product photography occupies approximately 60–70% of the available visual attention.
- Product information sits alongside it.
- The product image should remain large and clearly visible.
- Preserve its original proportions.
- Avoid unnecessary cropping.
- Maintain consistent visual balance between products with different source-image dimensions.

The product should feel like an object being presented in a luxury showroom.

Do not put every product inside a generic bordered card.

### Product image treatment

- Use `object-fit: contain` for the primary product images.
- Keep the entire belt visible wherever possible.
- Preserve the buckle and the belt's complete length.
- Use a consistent image-stage size.
- Allow the image itself to have different natural proportions.
- Use subtle entrance and exit transitions.
- Never stretch an image to force it into a fixed aspect ratio.

For images photographed on dark fabric, avoid aggressive background removal. Their original photographic backgrounds are part of the product presentation.

## 3.3 Product information

Each featured belt should have:

1. Collection number.
2. Distinct product name.
3. Short editorial description.
4. Navigation controls.

Example:

**01 / 14**

**EMBER SCROLL**

A richly detailed scrollwork design with a distinctive antique-finish buckle.

Descriptions must remain grounded in visible features. Do not claim a particular leather grade, manufacturing technique or material composition unless verified separately.

## 3.4 Navigation area

Place the navigation directly below or beside the featured product stage.

Required elements:

- Previous control.
- Next control.
- Current product number.
- Total product count.
- Progress indicator.

Example:

`01 ━━━━━━━━━━━━━━━━━ 14`

The progress indicator should update as the user changes products.

Use Lucide icons where appropriate:

- `arrow-left`
- `arrow-right`

Keep the controls minimal and visually consistent with the existing website.

---

# 4. Product Slider Experience

## 4.1 Core behaviour

The visitor controls the entire experience.

There must be:

- No autoplay.
- No automatic product advancement.
- No timed slideshow.
- No automatic looping unless explicitly approved later.

The user moves through the collection using the previous and next controls.

## 4.2 Transition design

Use a restrained transition system.

Suggested sequence:

1. Current product image exits with a subtle fade and horizontal movement.
2. Product information transitions with a slight stagger.
3. New product image enters smoothly.
4. Product counter and progress indicator update.

The transition should feel deliberate, not theatrical.

Avoid:

- Excessive 3D rotations.
- Large zoom effects.
- Flashy page transitions.
- Heavy blur filters.
- Long delays between navigation.
- Animations that make the controls feel unresponsive.

The interaction must remain quick even on lower-powered mobile devices.

## 4.3 Input methods

Support:

**Mouse**
- Previous and next buttons.
- Optional clickable thumbnail navigation if introduced in a later refinement.

**Keyboard**
- Left arrow: Previous product.
- Right arrow: Next product.

**Touch**
- Swipe left: Next product.
- Swipe right: Previous product.

Do not make a swipe gesture the only way to navigate.

## 4.4 Navigation boundaries

At the first product, disable or visually reduce the previous control.

At the last product, disable or visually reduce the next control.

Do not silently wrap from the last product to the first unless a deliberate infinite-carousel behaviour is approved.

---

# 5. Product Asset Inventory

The ZIP contains 17 image files.

The photographs appear to represent approximately 14 primary product presentations and 3 additional detail photographs. The final product count and detail-image relationships must be confirmed during Phase 1.

## 5.1 Proposed primary product names

Names are based on visible colours, patterns and buckle designs.

| Proposed order | Working name | Visual distinction | Primary asset |
|---|---|---|---|
| 01 | Ember Scroll | Deep reddish-brown scrollwork with rectangular antique-finish buckle | `WhatsApp Image 2026-10-31 at 10.08.41 (1).jpeg` |
| 02 | Turquoise Relic | Brown straps with turquoise accents and prominent medallion detailing | `WhatsApp Image 2026-10-31 at 10.08.41.jpeg` |
| 03 | Verdant Heritage | Dark leather with green accents and an illustrated central motif | `WhatsApp Image 2026-10-31 at 10.08.42 (1).jpeg` |
| 04 | Azure Crest | Blue and reddish floral detailing with a prominent round buckle | `WhatsApp Image 2026-10-31 at 10.08.42.jpeg` |
| 05 | Burgundy Sovereign | Deep burgundy floral design with ornate antique hardware | `WhatsApp Image 2026-10-31 at 10.08.43 (1).jpeg` |
| 06 | Cobalt Vine | Bright blue floral scrollwork with gold-toned hardware | `WhatsApp Image 2026-10-31 at 10.08.43.jpeg` |
| 07 | Antique Seal | Dark brown embossed pattern with a rectangular medallion-style buckle | `WhatsApp Image 2026-10-31 at 10.08.44 (1).jpeg` |
| 08 | Copper Filigree | Warm copper-red embossed floral design with ornate buckle | `WhatsApp Image 2026-10-31 at 10.08.44.jpeg` |
| 09 | Saffron Bloom | Brown and orange floral detailing with turquoise and gold accents | `WhatsApp Image 2026-10-31 at 10.08.45 (1).jpeg` |
| 10 | Crimson Scroll | Deep red embossed floral scrollwork | `WhatsApp Image 2026-10-31 at 10.08.45 (2).jpeg` |
| 11 | Turquoise Bloom | Bright turquoise floral pattern with dark contrasting outlines | `WhatsApp Image 2026-10-31 at 10.08.45.jpeg` |
| 12 | Amber Medallion | Orange-brown embossed design with a prominent oval medallion buckle | `WhatsApp Image 2026-10-31 at 10.08.46 (1).jpeg` |
| 13 | Ruby Medallion | Red embossed floral design with a silver-toned central medallion | `WhatsApp Image 2026-10-31 at 10.08.47 (1).jpeg` |
| 14 | Burnished Ember | Orange-brown patterned belt with a contrasting buckle arrangement | `WhatsApp Image 2026-10-31 at 10.08.47.jpeg` |

These are editorial working names, not confirmed commercial product names.

## 5.2 Supporting detail photographs

The following images appear to be close-up photographs rather than independent full-product presentations.

| Asset | Proposed usage |
|---|---|
| `WhatsApp Image 2026-10-31 at 10.08.44 (2).jpeg` | Close-up of ornate buckle and embossed leather |
| `WhatsApp Image 2026-10-31 at 10.08.46.jpeg` | Close-up of turquoise belt and buckle |
| `WhatsApp Image 2026-10-31 at 10.08.47 (2).jpeg` | Close-up of an illustrated medallion buckle |

During implementation, inspect these against the primary photographs and assign them to the correct products only when the visual match is clear.

Do not display these three detail images as separate products merely to reach a total of 17.

## 5.3 Asset handling requirements

- Keep the original source files intact.
- Do not rename or overwrite the originals during the initial implementation.
- Create a central product data configuration.
- Use explicit asset paths.
- Avoid scattering image paths throughout UI components.
- Do not introduce placeholder products.
- Ensure every primary asset is represented exactly once.

---

# 6. Desktop Layout

The desktop experience should feel spacious and editorial.

Suggested layout:

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│                   THE COLLECTION                         │
│                                                          │
│                Crafted to be distinct.                    │
│                                                          │
│                                                          │
│    ┌──────────────────────────┐   ┌───────────────────┐  │
│    │                          │   │  01 / 14          │  │
│    │                          │   │                   │  │
│    │      FEATURED BELT       │   │  EMBER SCROLL     │  │
│    │                          │   │                   │  │
│    │                          │   │  Short editorial  │  │
│    │                          │   │  description      │  │
│    │                          │   │                   │  │
│    │                          │   │  ← Previous       │  │
│    │                          │   │  Next →           │  │
│    └──────────────────────────┘   └───────────────────┘  │
│                                                          │
│    01  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  14       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

This is a compositional reference, not a requirement to use visible boxes or borders.

### Desktop requirements

- Maintain generous negative space.
- Keep the belt large enough to inspect.
- Align product information consistently.
- Avoid excessive vertical scrolling.
- Preserve the website's existing header and footer.
- Ensure the background transitions naturally into neighbouring sections.

---

# 7. Tablet Layout

Tablet should retain the editorial character without compressing the desktop layout.

Requirements:

- Reduce horizontal spacing.
- Keep the product visually dominant.
- Move product information below or beside the image depending on available width.
- Keep navigation accessible.
- Avoid clipping the belt or buckle.
- Prevent the text from becoming too narrow.

Do not simply scale down the desktop layout.

---

# 8. Mobile Layout

Mobile deserves a deliberate composition of its own.

Suggested order:

```text
┌──────────────────────────┐
│                          │
│      THE COLLECTION      │
│                          │
│  Crafted to be distinct. │
│                          │
│                          │
│                          │
│      FEATURED BELT       │
│                          │
│                          │
│                          │
│       01 / 14            │
│                          │
│      EMBER SCROLL        │
│                          │
│   Short description      │
│                          │
│                          │
│   ← Previous   Next →    │
│                          │
│   ━━━━━━━━━━━━━━━━━━━    │
│                          │
└──────────────────────────┘
```

### Mobile requirements

- Product image takes priority.
- Avoid tiny product photographs.
- Keep the entire belt visible.
- Avoid horizontal page overflow.
- Keep previous and next controls easy to tap.
- Keep product text readable.
- Support swipe navigation.
- Maintain comfortable spacing around the screen edges.
- Do not allow the background image to become visually distracting.

Test at approximately 390px and 430px viewport widths.

---

# 9. Motion and Technical Direction

## 9.1 GSAP

Use GSAP selectively for:

- Product entrance and exit.
- Text transitions.
- Progress indicator movement.
- Small interface interactions.

Do not use GSAP for animations that can be handled efficiently with CSS.

Avoid creating multiple competing animation timelines.

## 9.2 Lenis

Use Lenis only if the existing website already uses it or the overall page experience genuinely benefits from it.

Do not introduce a second smooth-scrolling implementation.

The product slider itself must not depend on smooth scrolling.

## 9.3 Lucide

Use Lucide for simple navigation icons.

Keep icon sizes and stroke weights consistent with the existing site.

## 9.4 Component inspiration

Cherry-pick ideas rather than importing entire design systems.

- **Aceternity UI:** restrained transitions and polished interactive elements.
- **Componentry:** navigation and interaction patterns.
- **Codrops:** editorial image presentation and refined motion inspiration.
- **GSAP:** precise, performant transitions.
- **Lenis:** consistent page scrolling, if already used.
- **Lucide:** minimal navigation icons.
- **Design Spells:** visual polish and detail.
- **UI Guideline:** responsive and interface consistency.
- **Unsplash:** photographic presentation inspiration only; the actual belt imagery must come from the supplied assets.

The final implementation must feel native to Supreme Leather, not like a collection of copied components.

---

# 10. Accessibility

Requirements:

- Previous and next controls must be actual buttons.
- Provide accessible labels for icon-only controls.
- Maintain sufficient text contrast.
- Support keyboard navigation.
- Respect `prefers-reduced-motion`.
- Do not rely exclusively on colour to communicate the active product.
- Keep focus indicators visible.
- Provide meaningful image alt text.
- Ensure swipe support does not interfere with ordinary page scrolling.

---

# 11. Performance Requirements

The website must remain responsive on mid-range and lower-powered mobile devices.

Requirements:

- Avoid unnecessary animation libraries or duplicate dependencies.
- Avoid animating expensive CSS properties.
- Prefer opacity and transform animations.
- Do not preload all full-resolution images without a reason.
- Preload the initial featured product.
- Load subsequent product images efficiently.
- Avoid layout shifts when changing products.
- Use stable image containers.
- Avoid excessive blur, backdrop filters and WebGL.
- Clean up animation timelines and event listeners.
- Prevent rapid navigation from creating overlapping transitions.

The visitor should never have to wait through an unnecessarily long animation to inspect another belt.

---

# 12. Implementation Plan — Three Phases

## Phase 1 — Foundation and Product Architecture

**Objective:** Establish the page structure, visual foundation and complete product inventory.

### Tasks

1. Inspect the existing Supreme Leather website structure.
2. Identify the current routing and navigation conventions.
3. Inspect existing global styles, typography and colour tokens.
4. Locate the supplied craftsmanship background image.
5. Map all 17 belt photographs.
6. Identify primary product images and supporting detail images.
7. Finalize the working product names.
8. Create a centralized product data configuration.
9. Build the collection page layout.
10. Implement responsive desktop, tablet and mobile structure.
11. Establish the product image stage and product information region.
12. Ensure the existing site header and footer remain consistent.

### Expected result

A fully structured collection page with:

- The correct background.
- All primary products mapped.
- Distinct product names.
- Responsive layout.
- A static initial featured product.

The page does not yet need its final animated slider experience.

### Acceptance criteria

- Every primary product image is mapped correctly.
- No detail photograph is accidentally presented as an independent product.
- No image is stretched.
- The initial page looks consistent with the existing website.
- No horizontal overflow on mobile.
- Existing website sections are unaffected.

---

## Phase 2 — Interactive Slider and Product Navigation

**Objective:** Turn the static product stage into a smooth, user-controlled collection experience.

### Tasks

1. Implement previous and next navigation.
2. Maintain the current product index in application state.
3. Update product name, number and description together.
4. Implement the progress indicator.
5. Add keyboard navigation.
6. Add touch-swipe navigation.
7. Handle first-product and last-product boundaries.
8. Implement controlled GSAP transitions.
9. Prevent overlapping transitions during rapid navigation.
10. Ensure image loading does not cause layout shifts.
11. Keep the experience entirely manual.

### Expected result

Visitors can browse the collection one belt at a time at their own pace.

### Acceptance criteria

- Navigation always displays the correct product.
- The product counter remains accurate.
- Previous and next controls work correctly.
- Keyboard and touch navigation work.
- There is no autoplay.
- Transitions are smooth without noticeable lag.
- Navigation remains responsive on mobile.

---

## Phase 3 — Refinement, Performance and Final QA

**Objective:** Polish the experience and prepare it for production.

### Tasks

1. Refine product image sizing and positioning.
2. Review typography and spacing across screen sizes.
3. Fine-tune animation duration and easing.
4. Verify reduced-motion behaviour.
5. Optimize image loading.
6. Review background image positioning.
7. Verify all 17 source assets are accounted for.
8. Check detail-image associations.
9. Test keyboard accessibility.
10. Test mobile touch behaviour.
11. Test on lower-powered devices.
12. Check browser console errors.
13. Verify navigation to and from the collection page.
14. Check that existing pages remain unchanged.

### Expected result

A polished, production-ready collection experience.

### Acceptance criteria

- No broken images.
- No layout shifts during navigation.
- No horizontal overflow.
- No unnecessary animation lag.
- No accessibility regressions.
- No unintended changes to other pages.
- Consistent visual identity across desktop, tablet and mobile.

---

# 13. Scope Boundaries

The initial collection page is a visual showcase, not a complete e-commerce system.

Do not add these features without separate approval:

- Shopping cart.
- Checkout.
- Payment integration.
- Product pricing.
- Stock availability.
- User accounts.
- Wishlist.
- Product reviews.
- Automatic slideshow.
- Unverified product specifications.

The initial goal is to present the belt designs beautifully and let visitors explore them.

---

# 14. Final Design Direction

The finished page should feel like opening a curated collection of handcrafted leather pieces.

Each belt should receive enough space to communicate its individual character. The photography should remain authentic, the interface should stay quiet, and the movement should support the experience rather than become the experience.

**The product is the artwork. The interface is the frame.**

Implementation must follow the three phases in order. Do not jump directly into elaborate animation before the product mapping, responsive structure and visual foundation are correct.
