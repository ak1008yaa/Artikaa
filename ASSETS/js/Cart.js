// Cart.js - Shopping Cart Module
// Manages shopping cart operations

export default class Cart {
    constructor() {
        this.items = [];
        this.storageKey = 'artikaa_cart';
        this.cartCount = document.getElementById('cart-count');
    }

    /**
     * Initialize cart from localStorage
     */
    initialize() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            this.items = JSON.parse(stored);
            this.updateUI();
        }
    }

    /**
     * Add item to cart
     */
    add(product, quantity = 1) {
        const existing = this.items.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.save();
        this.updateUI();
        this.showNotification('Added to cart');
    }

    /**
     * Remove item from cart
     */
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    }

    /**
     * Update item quantity
     */
    updateQuantity(productId, quantity) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
                this.save();
                this.updateUI();
            }
        }
    }

    /**
     * Get cart total
     */
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price_amd * item.quantity), 0);
    }

    /**
     * Get item count
     */
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Clear cart
     */
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    }

    /**
     * Save to localStorage
     */
    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    /**
     * Update UI elements
     */
    updateUI() {
        if (this.cartCount) {
            this.cartCount.textContent = this.getCount();
        }
    }

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 2000);
    }
}
