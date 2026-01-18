/**
 * Gallery Module - Manages product gallery display and filtering
 */

export default class Gallery {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.categories = [];
        this.currentCategory = 'all';
        this.currentSort = 'featured';
    }

    /**
     * Load products from API/Data
     */
    async loadProducts() {
        try {
            const response = await fetch('DATA/products.json');
            const data = await response.json();
            this.products = data.products || [];
            this.categories = Object.keys(data.categories || {});
            this.filteredProducts = [...this.products];
            return true;
        } catch (error) {
            console.error('Failed to load products:', error);
            return false;
        }
    }

    /**
     * Filter products by category
     * @param {string} category - Category name
     */
    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(
                product => product.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        this.sortProducts();
        this.render();
    }

    /**
     * Sort products
     * @param {string} sortBy - Sort criteria (featured, price-low, price-high, newest)
     */
    sortProducts(sortBy = null) {
        if (sortBy) {
            this.currentSort = sortBy;
        }

        switch (this.currentSort) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => {
                    return (b.createdAt || 0) - (a.createdAt || 0);
                });
                break;
            case 'featured':
            default:
                this.filteredProducts.sort((a, b) => (b.featured || 0) - (a.featured || 0));
        }
    }

    /**
     * Search products
     * @param {string} query - Search query
     */
    search(query) {
        const q = query.toLowerCase();
        this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.artist.toLowerCase().includes(q)
        );
        this.render();
    }

    /**
     * Get product by ID
     * @param {string} id - Product ID
     * @returns {object} Product object
     */
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }

    /**
     * Get product price formatted
     * @param {object} product - Product object
     * @returns {string} Formatted price
     */
    formatPrice(product) {
        return new Intl.NumberFormat('hy-AM', {
            style: 'currency',
            currency: product.currency || 'AMD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(product.price);
    }

    /**
     * Render gallery grid
     */
    render() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        if (this.filteredProducts.length === 0) {
            galleryGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <p>No products found</p>
                </div>
            `;
            return;
        }

        let html = '';
        
        this.filteredProducts.forEach(product => {
            const stock = product.stock > 0 ? 'in-stock' : 'out-of-stock';
            const stockText = product.stock > 0 ? 'Available' : 'Out of Stock';
            
            html += `
                <div class="gallery-card ${stock}" data-product-id="${product.id}">
                    <div class="gallery-card-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="gallery-card-overlay">
                            <button class="btn btn-secondary" onclick="viewProduct('${product.id}')">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="btn btn-primary" onclick="addToCart({
                                id: '${product.id}',
                                name: '${product.name.replace(/'/g, "\\'")}',
                                price: ${product.price},
                                image: '${product.image}',
                                artist: '${product.artist.replace(/'/g, "\\'")}'
                            })">
                                <i class="fas fa-shopping-bag"></i> Add
                            </button>
                        </div>
                    </div>
                    <div class="gallery-card-content">
                        <div class="gallery-card-category">${product.category}</div>
                        <h3>${product.name}</h3>
                        <p class="gallery-card-artist">${product.artist}</p>
                        <div class="gallery-card-footer">
                            <span class="gallery-card-price">${this.formatPrice(product)}</span>
                            <span class="gallery-card-stock ${stock}">${stockText}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        galleryGrid.innerHTML = html;
    }

    /**
     * Get gallery statistics
     * @returns {object} Gallery stats
     */
    getStats() {
        return {
            totalProducts: this.products.length,
            totalValue: this.products.reduce((sum, p) => sum + p.price, 0),
            categories: this.categories.length,
            inStock: this.products.filter(p => p.stock > 0).length
        };
    }
}

// Global function to view product details
window.viewProduct = function(productId) {
    const product = window.artikaaApp?.gallery?.getProductById(productId);
    if (product) {
        showProductModal(product);
    }
};

/**
 * Show product modal with details
 * @param {object} product - Product object
 */
function showProductModal(product) {
    const modalHTML = `
        <div class="product-modal" id="productModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="closeProductModal()">×</button>
                <div class="product-modal-body">
                    <div class="product-modal-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-modal-info">
                        <div class="product-modal-category">${product.category}</div>
                        <h2>${product.name}</h2>
                        <p class="product-modal-artist">by ${product.artist}</p>
                        <p class="product-modal-description">${product.description}</p>
                        <div class="product-modal-specs">
                            <div class="spec">
                                <span class="spec-label">Price:</span>
                                <span class="spec-value">${window.formatCurrency(product.price)}</span>
                            </div>
                            <div class="spec">
                                <span class="spec-label">Stock:</span>
                                <span class="spec-value">${product.stock} available</span>
                            </div>
                            <div class="spec">
                                <span class="spec-label">Category:</span>
                                <span class="spec-value">${product.category}</span>
                            </div>
                        </div>
                        <div class="product-modal-actions">
                            <button class="btn btn-primary" onclick="addToCart({
                                id: '${product.id}',
                                name: '${product.name.replace(/'/g, "\\'")}',
                                price: ${product.price},
                                image: '${product.image}',
                                artist: '${product.artist.replace(/'/g, "\\'")}'
                            }); closeProductModal();">
                                <i class="fas fa-shopping-bag"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary" onclick="closeProductModal()">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existing = document.getElementById('productModal');
    if (existing) existing.remove();

    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Setup close on overlay click
    document.querySelector('.modal-overlay').addEventListener('click', closeProductModal);
}

/**
 * Close product modal
 */
window.closeProductModal = function() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.remove();
    }
};
