// Render product cards
const products = [
  { emoji: '💊', name: 'Paracetamol 500mg', price: 'Rp 12.000', desc: 'Meredakan demam dan nyeri', stock: 45 },
  { emoji: '🍊', name: 'Vitamin C', price: 'Rp 25.000', desc: 'Meningkatkan daya tahan tubuh', stock: 30 },
  { emoji: '🥤', name: 'Cough Syrup', price: 'Rp 22.000', desc: 'Meredakan batuk', stock: 20 },
  { emoji: '💊', name: 'Antacid Syrup', price: 'Rp 18.000', desc: 'Meredakan maag', stock: 15 }
];

function renderProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-placeholder">${p.emoji}</div>
      <h3>${p.name}</h3>
      <div class="desc">${p.desc}</div>
      <div class="price">${p.price}</div>
      <div class="stock">Stock: ${p.stock}</div>
      <button class="btn btn-primary open-order-modal" data-product="${p.name}">Order Now</button>
    `;
    container.appendChild(card);
  });
}

// Order Modal
function openOrderModal(productName) {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  const produkSelect = document.getElementById('modal-produk');
  if (produkSelect && productName) {
    produkSelect.value = productName;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Event delegation for dynamically rendered product cards
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('open-order-modal') && !e.target.classList.contains('btn-consult')) {
    const productName = e.target.getAttribute('data-product') || '';
    openOrderModal(productName);
  }
});

// Modal form submission
function setupModalForm() {
  const form = document.getElementById('modal-order-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (form.checkValidity()) {
      alert('✅ Order berhasil dikirim! Kami akan segera menghubungi Anda.');
      closeOrderModal();
      form.reset();
    } else {
      form.reportValidity();
    }
  });
}

// Close modal/lightbox on overlay click
document.addEventListener('click', function(e) {
  const lb = document.getElementById('lightbox');
  if (lb && e.target === lb) closeLightbox();
  const modal = document.getElementById('orderModal');
  if (modal && e.target === modal) closeOrderModal();
});

// Close modal/lightbox on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
    closeOrderModal();
  }
});

// Lightbox popup
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
}

// Navbar Order Medicine buttons - open order modal
function setupNavButtons() {
  const navOrderBtns = document.querySelectorAll('.btn-consult');
  navOrderBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openOrderModal();
    });
  });
}

// Mobile menu toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('mobile-open');
  }
}

// Hero section Order Now buttons - exclude btn-consult (handled by setupNavButtons)
function setupHeroButtons() {
  const heroButtons = document.querySelectorAll('a[href="#order"], .open-order-modal');
  heroButtons.forEach(btn => {
    if (btn.classList.contains('btn-consult')) return;
    btn.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#order' || this.classList.contains('open-order-modal')) {
        e.preventDefault();
        openOrderModal();
      }
    });
  });
}

// Intersection Observer untuk animasi scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  // Observe semua elemen dengan class fade-in
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Render products
  renderProducts('product-list');
  renderProducts('ecommerce-products');
  setupModalForm();
  setupHeroButtons();
  setupNavButtons();
});
