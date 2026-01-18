/**
 * Artikaa Gallery - Main Application File
 * Initializes the application and manages core functionality
 */

// Global state
const app = {
    cart: [],
    products: [],
    currentLanguage: localStorage.getItem('language') || 'hy',
    translations: {}
};

/**
 * Initialize the application
 */
async function initializeApp() {
    try {
        console.log('🚀 Starting Artikaa Gallery initialization...');
        
        // Show preloader
        const preloader = document.getElementById('preloader');
        
        // Load translations
        console.log('📚 Loading translations...');
        await loadTranslations();
        
        // Load products
        console.log('🎨 Loading products...');
        await loadProducts();
        
        // Initialize cart from localStorage
        console.log('🛒 Initializing cart...');
        const stored = localStorage.getItem('artikaa_cart');
        if (stored) {
            try {
                app.cart = JSON.parse(stored);
            } catch(e) {
                console.log('Cart data corrupted, resetting');
                app.cart = [];
            }
        }
        
        // Render gallery
        console.log('🖼️ Rendering gallery...');
        renderGallery();
        
        // Load and render artists
        console.log('👥 Loading artists...');
        await loadArtists();
        
        // Load and render testimonials
        console.log('⭐ Loading testimonials...');
        await loadTestimonials();
        
        // Setup event listeners
        console.log('⚙️ Setting up event listeners...');
        setupEventListeners();
        
        // Setup navigation
        setupNavigation();
        
        // Set language
        setLanguage(app.currentLanguage);
        
        // Hide preloader
        setTimeout(() => {
            if (preloader) {
                preloader.style.display = 'none';
            }
            console.log('✅ Artikaa Gallery loaded successfully!');
        }, 500);
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        // Still hide preloader even on error
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
    }
}

/**
 * Load translations from JSON
 */
async function loadTranslations() {
    try {
        const response = await fetch('DATA/translations.json');
        if (!response.ok) throw new Error('Failed to load translations');
        app.translations = await response.json();
        console.log('✓ Translations loaded');
        return app.translations;
    } catch (error) {
        console.error('Error loading translations:', error);
        app.translations = { hy: {}, en: {}, ru: {} };
        return {};
    }
}

/**
 * Load products from JSON
 */
async function loadProducts() {
    try {
        const response = await fetch('DATA/products.json');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        app.products = data.products || [];
        console.log(`✓ Loaded ${app.products.length} products`);
        return app.products;
    } catch (error) {
        console.error('Error loading products:', error);
        app.products = [];
        return [];
    }
}

/**
 * Load artists from JSON
 */
async function loadArtists() {
    try {
        const response = await fetch('DATA/artists.json');
        if (!response.ok) throw new Error('Failed to load artists');
        const data = await response.json();
        const artistsGrid = document.getElementById('artistsGrid');
        if (artistsGrid && data.artists) {
            artistsGrid.innerHTML = data.artists.map(artist => createArtistCard(artist)).join('');
            console.log(`✓ Loaded ${data.artists.length} artists`);
        }
    } catch (error) {
        console.error('Error loading artists:', error);
    }
}

/**
 * Load testimonials from JSON
 */
async function loadTestimonials() {
    try {
        const response = await fetch('DATA/testimonials.json');
        if (!response.ok) throw new Error('Failed to load testimonials');
        const data = await response.json();
        const testimonialsGrid = document.getElementById('testimonialsGrid');
        if (testimonialsGrid && data.testimonials) {
            testimonialsGrid.innerHTML = data.testimonials.map(t => createTestimonialCard(t)).join('');
            console.log(`✓ Loaded ${data.testimonials.length} testimonials`);
        }
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

/**
 * Render gallery products
 */
function renderGallery() {
    const gallery = document.getElementById('galleryGrid');
    if (!gallery) return;
    
    if (app.products.length === 0) {
        gallery.innerHTML = '<div class="no-products">No products found</div>';
        return;
    }
    
    gallery.innerHTML = app.products.map(product => createProductCard(product)).join('');
    
    // Attach event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterGallery(btn.dataset.filter));
    });
    
    // Attach event listeners to add to cart buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const product = app.products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

/**
 * Create product card HTML
 */
function createProductCard(product) {
    const lang = app.currentLanguage || 'en';
    const name = lang === 'hy' ? product.name : product.name_en;
    const artist = lang === 'hy' ? product.artist : product.artist_en;
    const price = lang === 'hy' ? `${product.price_amd.toLocaleString()} ֏` : `$${product.price_usd}`;
    
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${name}" loading="lazy">
                ${product.featured ? '<div class="featured-badge">Featured</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${name}</h3>
                <p class="product-artist">${artist}</p>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-footer">
                    <span class="product-price">${price}</span>
                    <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create artist card HTML
 */
function createArtistCard(artist) {
    const lang = app.currentLanguage || 'en';
    const name = lang === 'hy' ? artist.name : artist.name_en;
    
    return `
        <div class="artist-card">
            <img src="${artist.image}" alt="${name}" class="artist-image">
            <div class="artist-info">
                <h3>${name}</h3>
                <p class="artist-bio">${artist.bio || artist.bio_en}</p>
                <div class="artist-stats">
                    <span>⭐ ${artist.rating}</span>
                    <span>📊 ${artist.works_count} works</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create testimonial card HTML
 */
function createTestimonialCard(testimonial) {
    const lang = app.currentLanguage || 'en';
    const text = lang === 'hy' ? testimonial.text : testimonial.text_en;
    
    return `
        <div class="testimonial-card">
            <div class="testimonial-stars">
                ${'★'.repeat(testimonial.rating)}
            </div>
            <p class="testimonial-text">"${text}"</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                <div>
                    <p class="author-name">${testimonial.name}</p>
                    <p class="author-title">${testimonial.title || 'Customer'}</p>
                </div>
            </div>
        </div>
    `;
}

/**
 * Filter gallery by category
 */
function filterGallery(category) {
    const cards = document.querySelectorAll('.product-card');
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter and show/hide cards
    cards.forEach(card => {
        const product = app.products.find(p => p.id === card.dataset.id);
        if (category === 'all' || product.category === category) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Cart button
    const cartBtn = document.getElementById('navCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const overlay = document.getElementById('overlay');
    
    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }
    
    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    if (overlay && cartSidebar) {
        overlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Language switcher
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.dataset.lang;
            setLanguage(lang);
        });
    });
    
    
    // Smooth scroll navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                // Send to API
                const formData = new FormData(contactForm);
                const response = await fetch('API/contact.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Failed to send message', 'error');
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showNotification('Error sending message', 'error');
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const email = newsletterForm.querySelector('input[type="email"]').value;
                const response = await fetch('API/newsletter.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
                if (response.ok) {
                    showNotification('Subscribed successfully!', 'success');
                    newsletterForm.reset();
                } else {
                    showNotification('Failed to subscribe', 'error');
                }
            } catch (error) {
                console.error('Newsletter error:', error);
                showNotification('Error subscribing', 'error');
            }
        });
    }
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Setup navbar behavior
 */
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Update active nav link
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Update active navigation link
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Set language
 */
function setLanguage(lang) {
    if (!['hy', 'en', 'ru'].includes(lang)) return;
    
    app.currentLanguage = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Re-render dynamic content
    renderGallery();
    
    // Store preference
    localStorage.setItem('language', lang);
    
    console.log('✓ Language switched to:', lang);
}

/**
 * Add product to cart
 */
function addToCart(product) {
    const existingItem = app.cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        app.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('artikaa_cart', JSON.stringify(app.cart));
    
    // Update UI
    updateCartUI();
    
    // Show notification
    showNotification('Product added to cart!', 'success');
}

/**
 * Update cart UI
 */
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    
    // Update cart count
    const count = app.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCount) {
        cartCount.textContent = count;
    }
    
    // Update cart body
    if (cartBody) {
        if (app.cart.length === 0) {
            cartBody.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartBody.innerHTML = app.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="price">${item.price_amd.toLocaleString()} ֏</p>
                        <input type="number" value="${item.quantity || 1}" min="1" 
                               onchange="updateCartQuantity('${item.id}', this.value)">
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    // Update cart total
    const total = app.cart.reduce((sum, item) => sum + (item.price_amd * (item.quantity || 1)), 0);
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        totalElement.textContent = total.toLocaleString() + ' ֏';
    }
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    app.cart = app.cart.filter(item => item.id !== productId);
    localStorage.setItem('artikaa_cart', JSON.stringify(app.cart));
    updateCartUI();
    showNotification('Item removed from cart', 'info');
}

/**
 * Update cart item quantity
 */
function updateCartQuantity(productId, quantity) {
    const item = app.cart.find(i => i.id === productId);
    if (item) {
        item.quantity = parseInt(quantity) || 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('artikaa_cart', JSON.stringify(app.cart));
            updateCartUI();
        }
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const container = document.getElementById('notificationsContainer') || document.body;
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Checkout function
 */
function checkout() {
    if (app.cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';


// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Make global for console access
window.app = app;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.showNotification = showNotification;
window.checkout = checkout;
