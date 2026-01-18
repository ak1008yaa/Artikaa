/**
 * I18n Module - Internationalization and localization
 */

export default class I18n {
    constructor(defaultLanguage = 'hy') {
        this.currentLanguage = defaultLanguage;
        this.translations = {};
        this.supportedLanguages = ['hy', 'en', 'ru'];
    }

    /**
     * Load translations from JSON file
     */
    async loadTranslations() {
        try {
            const response = await fetch('DATA/translations.json');
            const data = await response.json();
            this.translations = data;
            
            // Load user's preferred language
            const savedLang = localStorage.getItem('language');
            if (savedLang && this.supportedLanguages.includes(savedLang)) {
                this.currentLanguage = savedLang;
            }
            
            return true;
        } catch (error) {
            console.error('Failed to load translations:', error);
            return false;
        }
    }

    /**
     * Set current language
     * @param {string} language - Language code
     */
    setLanguage(language) {
        if (this.supportedLanguages.includes(language)) {
            this.currentLanguage = language;
            localStorage.setItem('language', language);
            return true;
        }
        return false;
    }

    /**
     * Get translation for key
     * @param {string} key - Translation key (e.g., 'home.title')
     * @param {object} params - Parameters for interpolation
     * @returns {string} Translated text or key if not found
     */
    t(key, params = {}) {
        let value = this.translations[this.currentLanguage]?.[key];

        if (!value) {
            // Fallback to English
            value = this.translations['en']?.[key];
        }

        if (!value) {
            // Return key as fallback
            return key;
        }

        // Handle parameter interpolation
        if (typeof value === 'string' && Object.keys(params).length > 0) {
            Object.keys(params).forEach(key => {
                value = value.replace(`{{${key}}}`, params[key]);
            });
        }

        return value;
    }

    /**
     * Get current language
     * @returns {string} Current language code
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get supported languages
     * @returns {array} Array of supported language codes
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    /**
     * Get translated object (useful for complex structures)
     * @param {string} baseKey - Base key for the object
     * @returns {object} Translated object
     */
    getObject(baseKey) {
        return this.translations[this.currentLanguage]?.[baseKey] || 
               this.translations['en']?.[baseKey] || 
               {};
    }

    /**
     * Check if key exists in current language
     * @param {string} key - Translation key
     * @returns {boolean} True if key exists
     */
    has(key) {
        return key in (this.translations[this.currentLanguage] || {});
    }

    /**
     * Get plural form
     * @param {string} key - Translation key with plural forms
     * @param {number} count - Count for determining plural form
     * @returns {string} Translated text with correct plural form
     */
    plural(key, count) {
        // Simple plural handling - can be extended for complex languages
        const singular = this.t(`${key}.singular`);
        const plural = this.t(`${key}.plural`);
        
        if (count === 1) {
            return singular.replace('{{count}}', count);
        }
        return plural.replace('{{count}}', count);
    }

    /**
     * Format date based on language
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    formatDate(date) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const locales = {
            'hy': 'hy-AM',
            'en': 'en-US',
            'ru': 'ru-RU'
        };

        return new Date(date).toLocaleDateString(
            locales[this.currentLanguage] || 'en-US',
            options
        );
    }

    /**
     * Format time based on language
     * @param {Date} date - Date object
     * @returns {string} Formatted time string
     */
    formatTime(date) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const locales = {
            'hy': 'hy-AM',
            'en': 'en-US',
            'ru': 'ru-RU'
        };

        return new Date(date).toLocaleTimeString(
            locales[this.currentLanguage] || 'en-US',
            options
        );
    }

    /**
     * Format number based on language
     * @param {number} number - Number to format
     * @param {object} options - Intl.NumberFormat options
     * @returns {string} Formatted number
     */
    formatNumber(number, options = {}) {
        const locales = {
            'hy': 'hy-AM',
            'en': 'en-US',
            'ru': 'ru-RU'
        };

        return new Intl.NumberFormat(
            locales[this.currentLanguage] || 'en-US',
            options
        ).format(number);
    }

    /**
     * Get currency symbol based on language
     * @returns {string} Currency symbol
     */
    getCurrencySymbol() {
        const symbols = {
            'hy': '֏',
            'en': '֏',
            'ru': '֏'
        };
        return symbols[this.currentLanguage] || '֏';
    }

    /**
     * Get text direction based on language
     * @returns {string} 'ltr' or 'rtl'
     */
    getDirection() {
        const directions = {
            'hy': 'ltr',
            'en': 'ltr',
            'ru': 'ltr'
        };
        return directions[this.currentLanguage] || 'ltr';
    }
}
