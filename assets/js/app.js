/**
 * FURNISH NOW — E-Commerce Prototype Logic (Odoo 19 Ready)
 * Handles: Scrolling Carousels (Featured & On Sale), Live Navbar Search,
 * Cart Badge Sync, and Direct Product Routing.
 */

let allProducts = [];
let cart = [];
let carouselTimers = {};

document.addEventListener('DOMContentLoaded', async () => {
  await loadCatalog();
  initCarousels();
  initSearch();
  initCartBadge();
});

// 1. Load Products from JavaScript Data (Offline & file:/// safe) or Fallback
async function loadCatalog() {
  if (window.FURNISH_PRODUCTS && window.FURNISH_PRODUCTS.length > 0) {
    allProducts = window.FURNISH_PRODUCTS;
  } else {
    try {
      const res = await fetch('assets/data/products.json');
      if (res.ok) {
        allProducts = await res.json();
      }
    } catch (err) {
      console.warn('Could not load products.json, using fallback:', err);
    }
  }

  renderCarousels();
}

// 2. Render Featured & Promo Carousels
function renderCarousels() {
  const featuredTrack = document.getElementById('featured-carousel');
  const promoTrack = document.getElementById('promo-carousel');

  // Featured items
  const featuredItems = allProducts.filter(p => p.is_featured || p.id <= 14);
  if (featuredTrack) {
    featuredTrack.innerHTML = (featuredItems.length ? featuredItems : allProducts.slice(0, 12))
      .map(p => createCarouselCard(p, false)).join('');
  }

  // Promotional / On Sale items
  const promoItems = allProducts.filter(p => p.is_promo || (p.orig_price && p.orig_price !== p.price));
  if (promoTrack) {
    promoTrack.innerHTML = (promoItems.length ? promoItems : allProducts.slice(0, 8))
      .map(p => createCarouselCard(p, true)).join('');
  }
}

function createCarouselCard(p, isSale) {
  const hasDiscount = p.orig_price && p.orig_price !== p.price;
  const badgeHtml = hasDiscount 
    ? `<span class="badge-discount-tag">${p.discount_tag || 'SALE'}</span>` 
    : '';
  const strikeHtml = hasDiscount 
    ? `<span class="price-strike">Rs ${p.orig_price}</span>` 
    : '';

  return `
    <div class="carousel-product-card" data-product-id="${p.id}">
      <a href="product.html?id=${p.id}" class="carousel-product-img-wrap text-decoration-none">
        ${badgeHtml}
        <img src="${p.local_image || p.img_url}" alt="${p.title}" loading="lazy">
      </a>
      <div class="carousel-product-body">
        <a href="product.html?id=${p.id}" class="text-decoration-none">
          <h6 class="carousel-product-title" title="${p.title}">${p.title}</h6>
        </a>
        <div class="carousel-product-sku">Ref: FN-${String(p.id).padStart(4, '0')}</div>
        <div class="carousel-price-row">
          <div>
            <span class="price-bold">Rs ${p.price}</span>
            ${strikeHtml}
          </div>
          <a href="product.html?id=${p.id}" class="btn-card-add text-decoration-none" title="View Options & Buy">
            <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

// 3. Carousel Scrolling & Automated Ticker
function initCarousels() {
  setupAutoScroll('featured-carousel', 3600);
  setupAutoScroll('promo-carousel', 3200);
}

function setupAutoScroll(elementId, intervalMs) {
  const el = document.getElementById(elementId);
  if (!el) return;

  function stepForward() {
    const cardWidth = 295;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScroll - 20) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }

  carouselTimers[elementId] = setInterval(stepForward, intervalMs);

  el.addEventListener('mouseenter', () => clearInterval(carouselTimers[elementId]));
  el.addEventListener('mouseleave', () => {
    clearInterval(carouselTimers[elementId]);
    carouselTimers[elementId] = setInterval(stepForward, intervalMs);
  });
}

function scrollCarousel(elementId, direction) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const cardWidth = 295;
  el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// 4. Live Search Bar in Navbar (Desktop & Mobile)
function initSearch() {
  const inputs = document.querySelectorAll('#navbar-search-input, .navbar-search-field, .mobile-nav-search-field, #mobile-navbar-search-input');
  inputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          window.location.href = `category.html?search=${encodeURIComponent(val)}`;
        }
      }
    });
  });
}

// 5. Cart Badge Sync across pages
function initCartBadge() {
  const saved = localStorage.getItem('fn_cart');
  let cartData = [];
  if (saved) {
    try {
      cartData = JSON.parse(saved);
    } catch (e) {
      cartData = [];
    }
  }
  const totalQty = cartData.reduce((sum, item) => sum + (item.qty || 1), 0);
  document.querySelectorAll('.cart-badge, .nav-cart-badge, #nav-cart-badge').forEach(b => {
    b.textContent = totalQty;
  });
}
