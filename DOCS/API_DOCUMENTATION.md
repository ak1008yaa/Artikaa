# Artikaa Gallery - API Documentation

## 📚 API Overview

Artikaa Gallery provides a RESTful API for managing products, orders, payments, and customer interactions.

### Base URL
```
https://artikaa.am/API
```

### Authentication
Most endpoints don't require authentication for GET requests. POST/PUT/DELETE requests may require API keys or JWT tokens.

### Content Type
All requests should include:
```
Content-Type: application/json
```

## 🛒 Products API

### Get All Products
```http
GET /API/products.php
```

**Parameters:**
- `category` (optional): Filter by category (painting, sculpture, clothing, accessory)
- `limit` (optional): Number of products per page (default: 20)
- `offset` (optional): Pagination offset (default: 0)
- `sort` (optional): Sort by (name, price, date)

**Response:**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Minimalist Abstract Collection",
      "category": "painting",
      "price": 14500,
      "currency": "AMD",
      "image": "images/1768645063.png",
      "description": "A stunning trio of abstract boards...",
      "artist": "Artist Name",
      "featured": true
    }
  ]
}
```

### Get Single Product
```http
GET /API/products.php?id=1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Minimalist Abstract Collection",
    "category": "painting",
    "price": 14500,
    "description": "...",
    "images": ["..."],
    "artist": {...},
    "reviews": [...],
    "in_stock": true
  }
}
```

## 📦 Orders API

### Create Order
```http
POST /API/orders.php
Content-Type: application/json

{
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 14500
    }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+374..."
  },
  "shipping_address": {
    "street": "123 Main St",
    "city": "Yerevan",
    "zip": "0010",
    "country": "Armenia"
  },
  "total_amount": 14500,
  "currency": "AMD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "order_id": "ORD-20260118123456-ABCD1234"
  }
}
```

### Get Order Status
```http
GET /API/orders.php?id=ORD-20260118123456-ABCD1234
```

**Response:**
```json
{
  "success": true,
  "data": {
    "order_id": "ORD-20260118123456-ABCD1234",
    "status": "pending",
    "items": [...],
    "total_amount": 14500,
    "created_at": "2026-01-18 12:34:56",
    "updated_at": "2026-01-18 12:34:56"
  }
}
```

### Update Order Status
```http
PUT /API/orders.php?id=ORD-20260118123456-ABCD1234
Content-Type: application/json

{
  "status": "shipped",
  "tracking_number": "TRK123456789"
}
```

## 💬 Contact API

### Submit Contact Form
```http
POST /API/contact.php
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Art Consultation",
  "message": "I'm interested in your services..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully",
  "data": {
    "message": "Thank you for contacting us"
  }
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `message`: Required, 10-5000 characters

## 📧 Newsletter API

### Subscribe to Newsletter
```http
POST /API/newsletter.php
Content-Type: application/json

{
  "email": "john@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to our newsletter",
  "data": {
    "email": "john@example.com"
  }
}
```

### Unsubscribe from Newsletter
```http
DELETE /API/newsletter.php
Content-Type: application/json

{
  "email": "john@example.com"
}
```

## 💳 Payment API

### Process Payment
```http
POST /API/payment.php
Content-Type: application/json

{
  "order_id": "ORD-20260118123456-ABCD1234",
  "amount": 14500,
  "currency": "AMD",
  "payment_method": "credit_card",
  "card_number": "4111111111111111",
  "cvv": "123",
  "expiry": "12/25"
}
```

**Supported Payment Methods:**
- `credit_card`: Visa, Mastercard
- `paypal`: PayPal
- `stripe`: Stripe payment
- `bank_transfer`: Direct bank transfer

**Response:**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "data": {
    "payment_id": "PAY-20260118123456",
    "status": "completed",
    "order_id": "ORD-20260118123456-ABCD1234"
  }
}
```

### Get Payment Status
```http
GET /API/payment.php?id=PAY-20260118123456
```

**Response:**
```json
{
  "success": true,
  "data": {
    "payment_id": "PAY-20260118123456",
    "order_id": "ORD-20260118123456-ABCD1234",
    "amount": 14500,
    "status": "completed",
    "method": "credit_card",
    "created_at": "2026-01-18 12:34:56"
  }
}
```

## 🔄 Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2026-01-18 12:34:56"
}
```

### HTTP Status Codes
- `200 OK`: Success
- `400 Bad Request`: Invalid request
- `404 Not Found`: Resource not found
- `405 Method Not Allowed`: Invalid HTTP method
- `500 Internal Server Error`: Server error

### Common Errors
```json
// Missing required field
{
  "success": false,
  "message": "Field 'email' is required"
}

// Invalid email format
{
  "success": false,
  "message": "Invalid email format"
}

// Order not found
{
  "success": false,
  "message": "Order not found"
}
```

## 🔐 Rate Limiting

API requests are rate-limited to prevent abuse:
- **Public endpoints**: 100 requests per minute
- **Authenticated endpoints**: 1000 requests per minute
- **Payment endpoints**: 10 requests per minute

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642512896
```

## 📊 Response Headers

All responses include:
```
Content-Type: application/json
X-API-Version: 1.0
X-Response-Time: 125ms
```

## 🔗 API Examples

### JavaScript/Fetch
```javascript
// Get products
fetch('https://artikaa.am/API/products.php')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Submit contact form
fetch('https://artikaa.am/API/contact.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### PHP/cURL
```php
// Get products
$ch = curl_init('https://artikaa.am/API/products.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$data = json_decode($response, true);

// Create order
$order_data = json_encode([
  'items' => [...],
  'customer' => [...],
  'total_amount' => 14500
]);

$ch = curl_init('https://artikaa.am/API/orders.php');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
  CURLOPT_POSTFIELDS => $order_data
]);
$response = curl_exec($ch);
```

## 📝 API Versioning

Current version: **1.0**

Endpoints may change in future versions. Always include the version in requests if required:
```
GET /API/v1/products.php
```

## 🚀 Webhooks (Coming Soon)

Future versions will support webhooks for:
- Order status changes
- Payment confirmations
- Newsletter subscriptions
- Contact form submissions

---

**Questions?** Contact: support@artikaa.am
