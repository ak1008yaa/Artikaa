/**
 * Analytics Module - Track user interactions and events
 */

export default class Analytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.sessionStart = new Date();
        this.trackPageView();
    }

    /**
     * Generate unique session ID
     * @returns {string} Session ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Track page view
     */
    trackPageView() {
        this.track('page_view', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });
    }

    /**
     * Track custom event
     * @param {string} eventName - Event name
     * @param {object} data - Event data
     */
    track(eventName, data = {}) {
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userAgent: navigator.userAgent
        };

        this.events.push(event);

        // Send to server if in production
        if (this.shouldSendAnalytics()) {
            this.sendToServer(event);
        }

        console.log(`📊 Event tracked: ${eventName}`, data);
    }

    /**
     * Track product view
     * @param {object} product - Product object
     */
    trackProductView(product) {
        this.track('product_view', {
            productId: product.id,
            productName: product.name,
            category: product.category,
            price: product.price,
            artist: product.artist
        });
    }

    /**
     * Track product search
     * @param {string} query - Search query
     */
    trackSearch(query) {
        this.track('product_search', {
            query: query
        });
    }

    /**
     * Track add to cart
     * @param {object} product - Product object
     * @param {number} quantity - Quantity added
     */
    trackAddToCart(product, quantity = 1) {
        this.track('add_to_cart', {
            productId: product.id,
            productName: product.name,
            price: product.price,
            quantity: quantity,
            value: product.price * quantity
        });
    }

    /**
     * Track checkout start
     * @param {object} cartData - Cart data
     */
    trackCheckoutStart(cartData) {
        this.track('checkout_start', {
            itemCount: cartData.items.length,
            value: cartData.total,
            currency: cartData.currency
        });
    }

    /**
     * Track purchase
     * @param {object} orderData - Order data
     */
    trackPurchase(orderData) {
        this.track('purchase', {
            orderId: orderData.orderId,
            value: orderData.total,
            currency: orderData.currency,
            itemCount: orderData.items.length,
            items: orderData.items.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        });
    }

    /**
     * Track form submission
     * @param {string} formName - Form name
     * @param {object} formData - Form data (sanitized)
     */
    trackFormSubmission(formName, formData = {}) {
        this.track('form_submission', {
            formName: formName,
            fields: Object.keys(formData)
        });
    }

    /**
     * Track error
     * @param {string} errorName - Error name/type
     * @param {string} message - Error message
     * @param {string} stack - Error stack trace
     */
    trackError(errorName, message, stack = '') {
        this.track('error', {
            errorName: errorName,
            message: message,
            stack: stack,
            url: window.location.href
        });
    }

    /**
     * Track exception
     * @param {Error} error - Error object
     */
    trackException(error) {
        this.trackError(
            error.name,
            error.message,
            error.stack
        );
    }

    /**
     * Track time spent on page
     */
    trackTimeOnPage() {
        const timeSpent = Math.round((new Date() - this.sessionStart) / 1000);
        this.track('time_on_page', {
            seconds: timeSpent,
            minutes: Math.round(timeSpent / 60)
        });
    }

    /**
     * Get all tracked events
     * @returns {array} Array of events
     */
    getEvents() {
        return this.events;
    }

    /**
     * Get events by name
     * @param {string} eventName - Event name
     * @returns {array} Filtered events
     */
    getEventsByName(eventName) {
        return this.events.filter(event => event.name === eventName);
    }

    /**
     * Clear events (for privacy)
     */
    clearEvents() {
        this.events = [];
    }

    /**
     * Get session duration
     * @returns {number} Duration in seconds
     */
    getSessionDuration() {
        return Math.round((new Date() - this.sessionStart) / 1000);
    }

    /**
     * Get event count
     * @returns {number} Total events tracked
     */
    getEventCount() {
        return this.events.length;
    }

    /**
     * Should send analytics to server
     * @returns {boolean} True if in production
     */
    shouldSendAnalytics() {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1';
    }

    /**
     * Send event to analytics server
     * @param {object} event - Event object
     */
    async sendToServer(event) {
        try {
            await fetch('/API/analytics.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
        } catch (error) {
            console.warn('Failed to send analytics:', error);
        }
    }

    /**
     * Export analytics data
     * @returns {object} Analytics data
     */
    export() {
        return {
            sessionId: this.sessionId,
            sessionStart: this.sessionStart,
            sessionDuration: this.getSessionDuration(),
            eventCount: this.getEventCount(),
            events: this.events
        };
    }
}
