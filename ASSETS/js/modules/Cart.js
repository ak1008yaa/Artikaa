/**
 * Cart Module - Manages shopping cart functionality
 */

export default class Cart {
    constructor() {
        this.items = [];
        this.currency = 'AMD';
        this.storageKey = 'artikaa_cart';
        this.loadFromStorage();
    }

    /**
     * Initialize cart functionality
     */
    initialize() {
        this.setupEventListeners();
        this.render();
        this.updateTotal();
    }

    /**
     * Add item to cart
     * @param {object} product - Product object
     * @param {number} quantity - Quantity to add (default 1)
     */
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                artist: product.artist
            });
        }
        
        this.saveToStorage();
        this.render();
        this.updateTotal();
    }

    /**
     * Remove item from cart
     * @param {string} itemId - Item ID to remove
     */
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveToStorage();
        this.render();
        this.updateTotal();
    }

    /**
     * Update item quantity
     * @param {string} itemId - Item ID
     * @param {number} quantity - New quantity
     */
    updateQuantity(itemId, quantity) {
        const item = this.items.find(item => item.id === itemId);
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                this.removeItem(itemId);
                return;
            }
            this.saveToStorage();
            this.render();
            this.updateTotal();
        }
    }

    /**
     * Get total number of items
     * @returns {number} Total item count
     */
    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Get cart subtotal
     * @returns {number} Subtotal amount
     */
    getSubtotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    /**
     * Get cart total with tax
     * @returns {number} Total amount with tax
     */
    getTotal() {
        const subtotal = this.getSubtotal();
        const taxRate = 0.10; // 10% tax
        return subtotal + (subtotal * taxRate);
    }

    /**
     * Clear entire cart
     */
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.render();
        this.updateTotal();
    }

    /**
     * Get all items
     * @returns {array} Cart items
     */
    getItems() {
        return this.items;
    }

    /**
     * Save cart to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('Failed to save cart to storage:', error);
        }
    }

    /**
     * Load cart from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.items = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Failed to load cart from storage:', error);
            this.items = [];
        }
    }

    /**
     * Render cart in sidebar
     */
    render() {
        const cartBody = document.getElementById('cartBody');
        if (!cartBody) return;

        if (this.items.length === 0) {
            cartBody.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            return;
        }

        let html = '<div class="cart-items">';
        
        this.items.forEach(item => {
            html += `
                <div class="cart-item" data-item-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-artist">${item.artist}</p>
                        <p class="cart-item-price">${this.formatCurrency(item.price)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn qty-minus" data-item-id="${item.id}">−</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" data-item-id="${item.id}">
                        <button class="qty-btn qty-plus" data-item-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-subtotal">
                        ${this.formatCurrency(item.price * item.quantity)}
                    </div>
                    <button class="cart-item-remove" data-item-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        html += '</div>';
        cartBody.innerHTML = html;

        // Setup event listeners for cart items
        this.setupCartItemListeners();
    }

    /**
     * Setup event listeners for cart items
     */
    setupCartItemListeners() {
        // Quantity change buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.itemId;
                const item = this.items.find(i => i.id === itemId);
                
                if (e.target.classList.contains('qty-plus')) {
                    this.updateQuantity(itemId, item.quantity + 1);
                } else if (e.target.classList.contains('qty-minus')) {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            });
        });

        // Quantity input change
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemId = e.target.dataset.itemId;
                const quantity = parseInt(e.target.value) || 1;
                this.updateQuantity(itemId, Math.max(1, quantity));
            });
        });

        // Remove item buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.currentTarget.dataset.itemId;
                this.removeItem(itemId);
            });
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.items.length === 0) {
                    window.showNotification('Your cart is empty!', 'error');
                } else {
                    window.checkout();
                }
            });
        }
    }

    /**
     * Format currency
     * @param {number} amount - Amount to format
     * @returns {string} Formatted currency
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('hy-AM', {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    /**
     * Update cart total display
     */
    updateTotal() {
        const totalElement = document.getElementById('cartTotal');
        const cartCount = document.getElementById('cartCount');
        
        if (totalElement) {
            totalElement.textContent = this.formatCurrency(this.getTotal());
        }
        
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }
    }

    /**
     * Export cart data for checkout
     * @returns {object} Cart data for checkout
     */
    exportForCheckout() {
        return {
            items: this.items,
            subtotal: this.getSubtotal(),
            tax: this.getSubtotal() * 0.10,
            total: this.getTotal(),
            currency: this.currency,
            timestamp: new Date().toISOString()
        };
    }
}
