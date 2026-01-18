/**
 * Checkout Page Script
 */

// Load cart data and display summary
function loadCheckoutSummary() {
    const cartData = JSON.parse(localStorage.getItem('artikaa_cart') || '[]');
    
    if (!cartData.length) {
        window.location.href = '/';
        return;
    }

    // Display items
    const summaryItems = document.getElementById('summaryItems');
    let subtotal = 0;

    cartData.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemHTML = `
            <div class="summary-item">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} × ${formatCurrency(item.price)}</p>
                </div>
                <div class="item-total">${formatCurrency(itemTotal)}</div>
            </div>
        `;
        summaryItems.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Calculate totals
    const tax = subtotal * 0.10;
    const shipping = 2500;
    const total = subtotal + tax + shipping;

    // Update summary
    document.getElementById('summarySubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('summaryTax').textContent = formatCurrency(tax);
    document.getElementById('summaryShipping').textContent = formatCurrency(shipping);
    document.getElementById('summaryTotal').textContent = formatCurrency(total);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('hy-AM', {
        style: 'currency',
        currency: 'AMD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Handle payment method change
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.getElementById('cardPayment').style.display = 
            e.target.value === 'card' ? 'block' : 'none';
        document.getElementById('bankPayment').style.display = 
            e.target.value === 'bank' ? 'block' : 'none';
        document.getElementById('cashPayment').style.display = 
            e.target.value === 'cash' ? 'block' : 'none';
    });
});

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        zipCode: formData.get('zipCode'),
        paymentMethod: formData.get('payment'),
        items: JSON.parse(localStorage.getItem('artikaa_cart') || '[]'),
        timestamp: new Date().toISOString()
    };

    try {
        const response = await fetch('/API/orders.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (result.success) {
            // Clear cart
            localStorage.removeItem('artikaa_cart');
            
            // Redirect to success page
            window.location.href = `/order-confirmation.html?orderId=${result.orderId}`;
        } else {
            alert('Order failed: ' + result.message);
        }
    } catch (error) {
        console.error('Checkout error:', error);
        alert('An error occurred during checkout');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', loadCheckoutSummary);
