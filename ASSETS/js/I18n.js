// I18n.js - Internationalization Module
// Handles multi-language support

export default class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage();
        this.translations = {};
    }

    /**
     * Load translations from JSON
     */
    async loadTranslations() {
        try {
            const response = await fetch('DATA/translations.json');
            if (!response.ok) throw new Error('Failed to load translations');
            
            const data = await response.json();
            this.translations = data;
            
            return data;
        } catch (error) {
            console.error('Error loading translations:', error);
            return {};
        }
    }

    /**
     * Get translation by key
     */
    t(key, lang = null) {
        lang = lang || this.currentLanguage;
        const langData = this.translations[lang];
        
        if (!langData) return key;
        
        return langData[key] || key;
    }

    /**
     * Change language
     */
    setLanguage(lang) {
        if (['hy', 'en', 'ru'].includes(lang)) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            this.updateUI();
            return true;
        }
        return false;
    }

    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get stored language or default
     */
    getStoredLanguage() {
        return localStorage.getItem('language') || 'hy';
    }

    /**
     * Update page UI with translations
     */
    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    /**
     * Format number for language
     */
    formatNumber(num, lang = null) {
        lang = lang || this.currentLanguage;
        const formatter = new Intl.NumberFormat(lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US');
        return formatter.format(num);
    }

    /**
     * Format currency
     */
    formatCurrency(amount, currency = 'AMD', lang = null) {
        lang = lang || this.currentLanguage;
        
        if (currency === 'AMD') {
            return `${this.formatNumber(amount, lang)} ֏`;
        } else {
            return `$${this.formatNumber(amount, lang)}`;
        }
    }

    /**
     * Format date for language
     */
    formatDate(date, lang = null) {
        lang = lang || this.currentLanguage;
        const dateObj = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        
        const localeMap = {
            'hy': 'hy-AM',
            'en': 'en-US',
            'ru': 'ru-RU'
        };
        
        return dateObj.toLocaleDateString(localeMap[lang], options);
    }
}
