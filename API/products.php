<?php
/**
 * Artikaa Gallery - API Endpoints
 * Handle various API requests for the gallery
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle CORS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database configuration
require_once 'config.php';

// API Router
class APIRouter {
    private $request_uri;
    private $request_method;
    
    public function __construct() {
        $this->request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $this->request_method = $_SERVER['REQUEST_METHOD'];
    }
    
    public function route() {
        $uri = explode('/', trim($this->request_uri, '/'));
        $endpoint = end($uri);
        
        switch ($endpoint) {
            case 'products':
                return $this->handleProducts();
            case 'orders':
                return $this->handleOrders();
            case 'contact':
                return $this->handleContact();
            case 'newsletter':
                return $this->handleNewsletter();
            case 'payment':
                return $this->handlePayment();
            default:
                return $this->error('Endpoint not found', 404);
        }
    }
    
    private function handleProducts() {
        if ($this->request_method === 'GET') {
            // Return products list
            $products = $this->getProducts();
            return $this->success($products);
        }
        return $this->error('Method not allowed', 405);
    }
    
    private function handleOrders() {
        if ($this->request_method === 'POST') {
            // Create new order
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['items']) || !isset($data['customer'])) {
                return $this->error('Missing required fields', 400);
            }
            
            $order_id = $this->createOrder($data);
            return $this->success(['order_id' => $order_id]);
        } elseif ($this->request_method === 'GET') {
            // Get order status
            $order_id = $_GET['id'] ?? null;
            if (!$order_id) {
                return $this->error('Order ID required', 400);
            }
            
            $order = $this->getOrder($order_id);
            return $this->success($order);
        }
        return $this->error('Method not allowed', 405);
    }
    
    private function handleContact() {
        if ($this->request_method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $required_fields = ['name', 'email', 'message'];
            foreach ($required_fields as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return $this->error("Missing required field: $field", 400);
                }
            }
            
            // Validate email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->error('Invalid email format', 400);
            }
            
            // Save contact message
            $saved = $this->saveContactMessage($data);
            
            if ($saved) {
                // Send email notification
                $this->sendContactEmail($data);
                return $this->success(['message' => 'Contact message saved successfully']);
            }
            
            return $this->error('Failed to save message', 500);
        }
        return $this->error('Method not allowed', 405);
    }
    
    private function handleNewsletter() {
        if ($this->request_method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            if (!isset($data['email']) || empty($data['email'])) {
                return $this->error('Email is required', 400);
            }
            
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return $this->error('Invalid email format', 400);
            }
            
            // Subscribe to newsletter
            $subscribed = $this->subscribeNewsletter($data['email']);
            
            if ($subscribed) {
                return $this->success(['message' => 'Successfully subscribed to newsletter']);
            }
            
            return $this->error('Failed to subscribe', 500);
        }
        return $this->error('Method not allowed', 405);
    }
    
    private function handlePayment() {
        if ($this->request_method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            
            $required_fields = ['order_id', 'amount', 'payment_method'];
            foreach ($required_fields as $field) {
                if (!isset($data[$field]) || empty($data[$field])) {
                    return $this->error("Missing required field: $field", 400);
                }
            }
            
            // Process payment
            $payment_result = $this->processPayment($data);
            
            if ($payment_result['success']) {
                return $this->success(['payment_id' => $payment_result['payment_id']]);
            }
            
            return $this->error($payment_result['message'], 400);
        }
        return $this->error('Method not allowed', 405);
    }
    
    // Helper methods
    private function getProducts() {
        // Load products from JSON file
        $products_file = __DIR__ . '/../DATA/products.json';
        if (file_exists($products_file)) {
            $content = file_get_contents($products_file);
            $data = json_decode($content, true);
            return $data['products'] ?? [];
        }
        return [];
    }
    
    private function createOrder($data) {
        // Generate order ID
        $order_id = 'ORD-' . date('YmdHis') . '-' . rand(1000, 9999);
        
        // Save order to database or file
        // TODO: Implement database save
        
        return $order_id;
    }
    
    private function getOrder($order_id) {
        // TODO: Retrieve order from database
        return [
            'order_id' => $order_id,
            'status' => 'pending',
            'created_at' => date('Y-m-d H:i:s')
        ];
    }
    
    private function saveContactMessage($data) {
        // TODO: Save to database
        return true;
    }
    
    private function sendContactEmail($data) {
        $to = 'contact@artikaa.am';
        $subject = 'New Contact Message from ' . $data['name'];
        $message = "Name: " . $data['name'] . "\n";
        $message .= "Email: " . $data['email'] . "\n";
        $message .= "Subject: " . ($data['subject'] ?? 'General Inquiry') . "\n\n";
        $message .= "Message:\n" . $data['message'];
        
        $headers = "From: " . $data['email'] . "\r\n";
        $headers .= "Reply-To: " . $data['email'] . "\r\n";
        
        // mail($to, $subject, $message, $headers);
        return true;
    }
    
    private function subscribeNewsletter($email) {
        // TODO: Save subscription to database
        return true;
    }
    
    private function processPayment($data) {
        // TODO: Implement payment processing logic
        // This would typically integrate with payment gateways
        
        // For now, simulate successful payment
        if ($data['amount'] > 0) {
            return [
                'success' => true,
                'payment_id' => 'PAY-' . date('YmdHis')
            ];
        }
        
        return [
            'success' => false,
            'message' => 'Invalid payment amount'
        ];
    }
    
    // Response helpers
    private function success($data = null, $message = 'Success') {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }
    
    private function error($message = 'Error', $code = 400) {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'message' => $message
        ]);
        exit;
    }
}

// Initialize and route the API
$router = new APIRouter();
$router->route();
?>
