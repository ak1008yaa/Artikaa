// Gallery.js - Gallery Module for Artikaa
// Handles product display, filtering, and interactions

export default class Gallery {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentSort = 'featured';
        this.container = document.getElementById('gallery');
    }

    /**
     * Load products from JSON data
     */
    async loadProducts() {
        try {
            const response = await fetch('DATA/products.json');
            if (!response.ok) throw new Error('Failed to load products');
            
            const data = await response.json();
            this.products = data.products || [];
            this.filteredProducts = [...this.products];
            
            return this.products;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }

    /**
     * Filter products by category
     */
    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(p => p.category === category);
        }
        
        this.render();
    }

    /**
     * Sort products
     */
    sort(sortBy) {
        this.currentSort = sortBy;
        
        switch(sortBy) {
            case 'featured':
                this.filteredProducts.sort((a, b) => b.featured - a.featured);
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price_amd - b.price_amd);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price_amd - a.price_amd);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.year - a.year);
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        
        this.render();
    }

    /**
     * Search products
     */
    search(query) {
        const q = query.toLowerCase();
        this.filteredProducts = this.products.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.name_en.toLowerCase().includes(q) ||
            p.artist.toLowerCase().includes(q) ||
            p.artist_en.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.description_en.toLowerCase().includes(q)
        );
        
        this.render();
    }

    /**
     * Render gallery grid
     */
    render() {
        if (!this.container) return;
        
        if (this.filteredProducts.length === 0) {
            this.container.innerHTML = '<div class="no-products">No products found</div>';
            return;
        }
        
        this.container.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
        
        // Attach event listeners to product cards
        this.attachEventListeners();
    }

    /**
     * Create product card HTML
     */
    createProductCard(product) {
        const lang = document.documentElement.lang || 'en';
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
     * Attach event listeners to product cards
     */
    attachEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const product = this.products.find(p => p.id === productId);
                if (product && window.app && window.app.cart) {
                    window.app.cart.add(product);
                }
            });
        });
        
        // Product cards click for modal
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-add-cart')) {
                    const productId = card.dataset.id;
                    this.showModal(productId);
                }
            });
        });
    }

    /**
     * Show product modal
     */
    showModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = this.createModalContent(product);
        document.body.appendChild(modal);
        
        // Close modal on click outside or close button
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-btn')) {
                modal.remove();
            }
        });
    }

    /**
     * Create modal content
     */
    createModalContent(product) {
        const lang = document.documentElement.lang || 'en';
        const name = lang === 'hy' ? product.name : product.name_en;
        const description = lang === 'hy' ? product.description : product.description_en;
        const material = lang === 'hy' ? product.material : product.material_en;
        const dimensions = product.dimensions_en;
        
        return `
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <div class="modal-grid">
                    <div class="modal-image">
                        <img src="${product.image}" alt="${name}">
                    </div>
                    <div class="modal-info">
                        <h2>${name}</h2>
                        <p class="artist">${product.artist}</p>
                        <div class="rating">
                            <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
                            (${product.reviews} reviews)
                        </div>
                        <p class="description">${description}</p>
                        <div class="details">
                            <div><strong>Year:</strong> ${product.year}</div>
                            <div><strong>Dimensions:</strong> ${dimensions}</div>
                            <div><strong>Material:</strong> ${material}</div>
                            <div><strong>Category:</strong> ${product.category}</div>
                        </div>
                        <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get featured products
     */
    getFeatured() {
        return this.products.filter(p => p.featured);
    }

    /**
     * Get products by category
     */
    getByCategory(category) {
        return this.products.filter(p => p.category === category);
    }
}
