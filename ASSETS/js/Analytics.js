// Analytics.js - Analytics and Tracking Module
// Tracks user events and behavior

export default class Analytics {
    constructor() {
        this.events = [];
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
    }

    /**
     * Track event
     */
    trackEvent(eventName, eventData = {}) {
        const event = {
            name: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            userId: this.userId,
            url: window.location.href
        };
        
        this.events.push(event);
        this.sendEvent(event);
    }

    /**
     * Track page view
     */
    trackPageView(pageName = null) {
        const page = pageName || window.location.pathname;
        
        this.trackEvent('page_view', {
            page: page,
            referrer: document.referrer,
            title: document.title
        });
    }

    /**
     * Track product view
     */
    trackProductView(productId, productName) {
        this.trackEvent('product_view', {
            productId: productId,
            productName: productName
        });
    }

    /**
     * Track add to cart
     */
    trackAddToCart(productId, productName, price) {
        this.trackEvent('add_to_cart', {
            productId: productId,
            productName: productName,
            price: price
        });
    }

    /**
     * Track purchase
     */
    trackPurchase(orderId, amount, items) {
        this.trackEvent('purchase', {
            orderId: orderId,
            amount: amount,
            itemCount: items.length,
            items: items
        });
    }

    /**
     * Track search
     */
    trackSearch(query, resultsCount) {
        this.trackEvent('search', {
            query: query,
            resultsCount: resultsCount
        });
    }

    /**
     * Send event to server
     */
    async sendEvent(event) {
        try {
            await fetch('API/analytics.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(event)
            });
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }

    /**
     * Get session ID
     */
    generateSessionId() {
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    }

    /**
     * Get user ID from localStorage or generate
     */
    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }
}
