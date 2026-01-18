/**
 * Payment Module - Handle payment processing
 */

export default class Payment {
    constructor() {
        this.paymentMethods = [
            'credit_card',
            'paypal',
            'stripe',
            'bank_transfer'
        ];
        this.currentMethod = null;
        this.transactionId = null;
    }

    /**
     * Get available payment methods
     * @returns {array} List of payment methods
     */
    getPaymentMethods() {
        return this.paymentMethods;
    }

    /**
     * Process payment
     * @param {object} paymentData - Payment data
     * @param {string} method - Payment method
     * @returns {Promise<object>} Payment result
     */
    async processPayment(paymentData, method = 'credit_card') {
        if (!this.paymentMethods.includes(method)) {
            throw new Error(`Invalid payment method: ${method}`);
        }

        this.currentMethod = method;
        this.transactionId = this.generateTransactionId();

        try {
            const result = await fetch('/API/payment.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    method: method,
                    amount: paymentData.amount,
                    currency: paymentData.currency || 'AMD',
                    description: paymentData.description,
                    customerId: paymentData.customerId,
                    transactionId: this.transactionId,
                    paymentDetails: this.preparePaymentDetails(paymentData, method)
                })
            });

            const data = await result.json();

            if (result.ok && data.success) {
                return {
                    success: true,
                    transactionId: this.transactionId,
                    method: method,
                    data: data
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Payment failed',
                    transactionId: this.transactionId
                };
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            return {
                success: false,
                error: error.message,
                transactionId: this.transactionId
            };
        }
    }

    /**
     * Process credit card payment
     * @param {object} cardData - Card data
     * @param {number} amount - Payment amount
     * @returns {Promise<object>} Payment result
     */
    async processCardPayment(cardData, amount) {
        return this.processPayment({
            amount: amount,
            description: 'Artikaa Gallery Purchase',
            cardData: cardData
        }, 'credit_card');
    }

    /**
     * Process PayPal payment
     * @param {object} paypalData - PayPal data
     * @param {number} amount - Payment amount
     * @returns {Promise<object>} Payment result
     */
    async processPayPalPayment(paypalData, amount) {
        return this.processPayment({
            amount: amount,
            description: 'Artikaa Gallery Purchase',
            paypalEmail: paypalData.email
        }, 'paypal');
    }

    /**
     * Process Stripe payment
     * @param {string} stripeToken - Stripe token
     * @param {number} amount - Payment amount
     * @returns {Promise<object>} Payment result
     */
    async processStripePayment(stripeToken, amount) {
        return this.processPayment({
            amount: amount,
            description: 'Artikaa Gallery Purchase',
            stripeToken: stripeToken
        }, 'stripe');
    }

    /**
     * Process bank transfer
     * @param {object} bankData - Bank transfer data
     * @param {number} amount - Payment amount
     * @returns {Promise<object>} Payment result
     */
    async processBankTransfer(bankData, amount) {
        return this.processPayment({
            amount: amount,
            description: 'Artikaa Gallery Purchase',
            bankData: bankData
        }, 'bank_transfer');
    }

    /**
     * Prepare payment details based on method
     * @param {object} paymentData - Payment data
     * @param {string} method - Payment method
     * @returns {object} Prepared details
     */
    preparePaymentDetails(paymentData, method) {
        switch (method) {
            case 'credit_card':
                return {
                    cardNumber: this.maskCardNumber(paymentData.cardData?.cardNumber),
                    expiryDate: paymentData.cardData?.expiryDate,
                    cvv: this.maskCVV()
                };

            case 'paypal':
                return {
                    email: paymentData.paypalEmail
                };

            case 'stripe':
                return {
                    token: paymentData.stripeToken
                };

            case 'bank_transfer':
                return {
                    bankCode: paymentData.bankData?.bankCode,
                    accountNumber: this.maskAccountNumber(paymentData.bankData?.accountNumber)
                };

            default:
                return {};
        }
    }

    /**
     * Mask card number for security
     * @param {string} cardNumber - Card number
     * @returns {string} Masked card number
     */
    maskCardNumber(cardNumber) {
        if (!cardNumber) return '';
        const last4 = cardNumber.slice(-4);
        return `****-****-****-${last4}`;
    }

    /**
     * Mask CVV for security
     * @returns {string} Masked CVV
     */
    maskCVV() {
        return '***';
    }

    /**
     * Mask account number for security
     * @param {string} accountNumber - Account number
     * @returns {string} Masked account number
     */
    maskAccountNumber(accountNumber) {
        if (!accountNumber) return '';
        const last4 = accountNumber.slice(-4);
        return `****${last4}`;
    }

    /**
     * Generate unique transaction ID
     * @returns {string} Transaction ID
     */
    generateTransactionId() {
        return 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get payment status
     * @param {string} transactionId - Transaction ID
     * @returns {Promise<object>} Payment status
     */
    async getPaymentStatus(transactionId) {
        try {
            const response = await fetch(`/API/payment.php?transactionId=${transactionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to get payment status:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Validate payment data
     * @param {object} paymentData - Payment data
     * @param {string} method - Payment method
     * @returns {object} Validation result
     */
    validatePayment(paymentData, method) {
        const errors = [];

        if (!paymentData.amount || paymentData.amount <= 0) {
            errors.push('Invalid amount');
        }

        switch (method) {
            case 'credit_card':
                if (!paymentData.cardData?.cardNumber) {
                    errors.push('Card number is required');
                }
                if (!paymentData.cardData?.expiryDate) {
                    errors.push('Expiry date is required');
                }
                if (!paymentData.cardData?.cvv) {
                    errors.push('CVV is required');
                }
                break;

            case 'paypal':
                if (!paymentData.paypalEmail) {
                    errors.push('PayPal email is required');
                }
                break;

            case 'stripe':
                if (!paymentData.stripeToken) {
                    errors.push('Stripe token is required');
                }
                break;

            case 'bank_transfer':
                if (!paymentData.bankData?.bankCode) {
                    errors.push('Bank code is required');
                }
                break;
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Get supported currencies
     * @returns {array} List of currencies
     */
    getSupportedCurrencies() {
        return ['AMD', 'USD', 'EUR', 'RUB'];
    }

    /**
     * Format payment amount
     * @param {number} amount - Amount to format
     * @param {string} currency - Currency code
     * @returns {string} Formatted amount
     */
    formatAmount(amount, currency = 'AMD') {
        return new Intl.NumberFormat('hy-AM', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
}
