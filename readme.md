# Furnish Now — Next-Gen Website Prototype & Odoo 19 Migration Guide

**Project:** Furnish Now (Karayel Ltd, Mauritius) Website Renovation Prototype  
**Internship Lead:** Muqtadir  
**Target Platform:** Odoo 19 eCommerce (Bootstrap 5 Frontend Architecture)  
**Live Site Reference:** [furnishnow.mu](https://furnishnow.mu)  
**Showroom & Office:** Cassis, Port Louis, Mauritius (BRN: C21184074 | VAT: 27974513)  

---

## 1. Executive Summary

This prototype represents a complete, ground-up aesthetic and architectural renovation of Furnish Now's online presence, prepared specifically for presentation to management and the Odoo IT Technician for transition to **Odoo 19**.

The prototype transitions Furnish Now from a basic default template to a spacious, modern, multi-page eCommerce experience adhering strictly to authentic Furnish Now business practices and Mauritian e-commerce requirements.

### Key Renovations Built in this Prototype

1. **Clean Grey Transparent Navbar:**
   - Free-flowing, non-congested header layout matching modern design aesthetics (`container-fluid px-4 px-lg-5`).
   - Integrated non-intrusive search bar with real-time query forwarding across all 161 products.
   - Dynamic cart icon with live badge counter synchronized across all pages via local storage.

2. **Homepage (`index.html`):**
   - Authentic Furnish Now hero office chair promotion banner ("Our new office chairs have arrived — 3 Years Warranty on Mechanism").
   - 18 Modern Category Cards with sleek photography and dynamic button hover transforming into "Browse →".
   - Continuous auto-scrolling ticker carousels for **Featured Bestsellers** and **Promotional Deals** (pause on hover, manual chevron navigation).
   - Clean, uncluttered layout with authentic corporate footer.

3. **Dedicated Shop Catalog Page (`category.html`) & Mobile Architecture:**
   - **Desktop Layout:** Clean sticky sidebar with all 18 authentic collections, counts, and 3-column product grid.
   - **Mobile-First Experience:** 
     - **Mobile Search Bar:** Integrated directly in both the navbar (one-tap collapsible dropdown) and at the top of the category page for immediate real-time product filtering.
     - **Horizontal Swipeable Category Pills:** Allows mobile users to browse and switch between all collections with a single thumb swipe without opening menus.
     - **Slide-in Offcanvas Drawer:** A dedicated "All Collections" drawer sliding in with full counts and auto-close on selection.
     - **Crisp 2-Column Product Grid:** Responsive `col-6 col-md-4 col-lg-4` layout with tailored 140px image heights, preventing long 1-column mobile scroll fatigue.
   - Interactive zoom button on every product card allowing full-screen image inspection before entering the buy page.
   - Live in-catalog search and sorting (Price low/high, Title, Newest).

4. **Product Buy & Variant Detail Page (`product.html`):**
   - Dual-tier image zoom: smooth on-hover scale zoom + click-to-lightbox full-screen inspection modal.
   - Authentic variant selection (e.g. Dimensions for dining tables like Alure 180x90 / 160x90, desks, and seater configurations).
   - Color / finish swatch pills.
   - Quantity selector `[ - ] [ qty ] [ + ]`.
   - Direct "Add to cart" action that immediately routes to the dedicated cart review page.

5. **Dedicated Cart & Authentic Odoo Checkout Flow (`cart.html`, `shipping.html`, `payment.html`, `confirmation.html`):**
   - 1:1 match of Furnish Now's Odoo `/shop/cart` stepper: `Review Order > Shipping > Payment`.
   - Order overview with quantity modification, item removal, and automatic 15% VAT calculation.
   - **Delivery Mode:** Strictly **Standard delivery (300.00 Rs)** island-wide across Mauritius. No invented tiers or pickup options.
   - **Payment Method:** Strictly **MCB Juice** with the official MCB Juice badge. No invented EFT or showroom payment.
   - **Fixed Price Overflow:** Resolved the Odoo layout defect where item prices slightly spill outside the card border by applying robust container padding and flex bounds.
   - **Order Confirmation & Dynamic Quotation (`confirmation.html`):** 1:1 replica of the teal MCB Juice instruction banner (`Account: 000449247171`, color `#169db2`) with dynamic Odoo quotation references (`S` + 5 digits) rather than hardcoded static IDs.

6. **Corporate B2B Showcase (`portfolio.html`):**
   - Case studies for corporate projects in Ébène Cybercity, Grand Baie luxury venues, and Tamarin residences.
   - Karayel Ltd company milestone timeline (2021 foundation, 2023 online store, 2026 Odoo 19 upgrade).
   - Commercial RFP quotation request form.

7. **Dedicated About & Showroom Page (`about.html`):**
   - Authentic company narrative, Cassis showroom operating hours, customer hotline numbers, BRN (`C21184074`), and VAT registration (`27974513`).

---

## 2. File & Directory Architecture

```text
prototype/
├── index.html                  # Homepage (Navbar, Hero, 18 Categories, Scrolling Carousels)
├── category.html               # Full Catalog Browser (Sidebar filters, Zoom preview, Grid)
├── product.html                # Buy Page (Hover/Click Zoom, Size/Color options, Add to Cart)
├── cart.html                   # Dedicated Shopping Cart (/shop/cart 1:1 with 15% VAT)
├── shipping.html               # Shipping Address Form (/shop/address)
├── payment.html                # Authentic Payment Selection (/shop/payment - MCB Juice only)
├── confirmation.html           # Order Confirmation (/shop/confirmation - Teal MCB Juice Banner)
├── portfolio.html              # B2B Corporate Portfolio & Karayel Ltd Heritage Timeline
├── about.html                  # About Us, Cassis Showroom, and Corporate Registration
├── README.md                   # This Documentation Guide
└── assets/
    ├── css/
    │   └── styles.css          # Design tokens, typography, glassmorphism, responsive styles
    ├── js/
    │   ├── app.js              # Carousel ticker, live search, cart sync
    │   └── products-data.js    # 161 authentic products bundled globally (Offline & CORS safe)
    ├── data/
    │   └── products.json       # Raw catalog JSON export
    └── images/
        ├── furnishnow_logo.png
        ├── hero_office_chair_banner.webp
        ├── categories/         # 18 authentic category photos
        └── products/           # 150+ high-resolution product images
```

---

## 3. How to Review & Present the Prototype

### Option A: Local Offline Review (Immediate & Self-Contained)
The prototype has been engineered to be **100% self-contained and offline-safe**:
1. Simply double-click **`index.html`** in Windows File Explorer.
2. It will open in Google Chrome, Microsoft Edge, or Firefox.
3. Because all 161 products and images are loaded via relative JavaScript (`products-data.js`), there are **zero CORS errors**, zero blank images, and zero dependencies on an external backend.

### Option B: Cloud Review via Netlify Drop (For Supervisor & IT Technician)
To give your supervisor and the Odoo IT Technician a live, shareable URL on their phones and laptops:
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your web browser.
2. Drag and drop the **`prototype/`** folder directly into the browser upload box.
3. Within 10 seconds, Netlify will generate a live public URL (e.g. `https://furnishnow-renovated.netlify.app`) that you can send via WhatsApp or email.

---

## 4. Odoo 19 Developer Implementation Guide

When presenting this prototype to the Odoo IT Technician and their developer team, provide the following mapping to Odoo 19 building blocks:

| Prototype Component | Odoo 19 Technical Target | Implementation Strategy |
| :--- | :--- | :--- |
| **Clean Grey Navbar** | `website.layout` header snippet | Set header background to `rgba(246, 247, 249, 0.92)` with `backdrop-filter: blur(18px)`. Use default search input hook. |
| **Category Cards with "Browse" Hover** | Custom Web Snippet (`s_category_cards`) | Wrap `product.public.category` in CSS grid with hover transformation rule. |
| **Continuous Scrolling Carousels** | `s_dynamic_snippet_carousel` | Configure Odoo dynamic product carousel with infinite scroll animation. |
| **Sidebar Filter Catalog** | `/shop` template (`website_sale.products`) | Enable left category hierarchy with product counts enabled. |
| **Product Zoom & Size Selector** | `website_sale.product` detail view | Connect Odoo 19 native image zoom with `product.template.attribute.line` (Sizes / Colors). |
| **Dedicated Cart Page** | `website_sale.cart` | Customize order summary card, enforce 15% VAT display, style grey Checkout button. |
| **Payment Flow** | `website_sale.payment` | Pre-configure Custom Bank Wire / MCB Juice payment provider with Account `000449247171`. |

---

## 5. Authentic Furnish Now Operating Facts

To prevent discrepancies during management review, all data in this prototype strictly reflects authentic company records:
- **Trading Entity:** Karayel Ltd trading as Furnish Now
- **BRN:** C21184074 | **VAT:** 27974513
- **Location:** Cassis, Port Louis, Mauritius
- **Hotlines:** 5 282 15 35 / 5 277 9778
- **Currency:** Mauritian Rupees (Rs) with 15% VAT included
- **Payment Method:** Standard Odoo cart checkout with MCB Juice mobile transfer to account `000449247171` (no unverified WhatsApp order buttons)
- **Warranty Scope:** Warranty is only applicable to office chair mechanisms as advertised on the specific promotional banner (no unverified company-wide warranty claims).
