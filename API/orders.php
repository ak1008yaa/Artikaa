<?php
/**
 * Artikaa Gallery - Orders API
 * Handle order creation, retrieval, and management
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class OrderManager {
    private $data_dir = __DIR__ . '/../DATA';
    
    public function handle() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'POST':
                return $this->createOrder();
            case 'GET':
                return $this->getOrder();
            case 'PUT':
                return $this->updateOrder();
            default:
                return $this->error('Method not allowed', 405);
        }
    }
    
    private function createOrder() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        if (!isset($input['items']) || !isset($input['customer'])) {
            return $this->error('Missing required fields', 400);
        }
        
        if (!is_array($input['items']) || empty($input['items'])) {
            return $this->error('Items list is empty', 400);
        }
        
        // Generate order ID
        $order_id = $this->generateOrderId();
        
        // Create order object
        $order = [
            'order_id' => $order_id,
            'customer' => $input['customer'],
            'items' => $input['items'],
            'status' => 'pending',
            'total_amount' => $input['total_amount'] ?? 0,
            'currency' => $input['currency'] ?? 'AMD',
            'payment_method' => $input['payment_method'] ?? null,
            'shipping_address' => $input['shipping_address'] ?? null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        
        // Save order
        $saved = $this->saveOrder($order);
        
        if ($saved) {
            return $this->success(['order_id' => $order_id], 'Order created successfully');
        }
        
        return $this->error('Failed to create order', 500);
    }
    
    private function getOrder() {
        $order_id = $_GET['id'] ?? null;
        
        if (!$order_id) {
            return $this->error('Order ID is required', 400);
        }
        
        // Retrieve order from storage
        $order = $this->loadOrder($order_id);
        
        if ($order) {
            return $this->success($order, 'Order retrieved successfully');
        }
        
        return $this->error('Order not found', 404);
    }
    
    private function updateOrder() {
        $input = json_decode(file_get_contents('php://input'), true);
        $order_id = $_GET['id'] ?? null;
        
        if (!$order_id) {
            return $this->error('Order ID is required', 400);
        }
        
        $order = $this->loadOrder($order_id);
        
        if (!$order) {
            return $this->error('Order not found', 404);
        }
        
        // Update order fields
        if (isset($input['status'])) {
            $order['status'] = $input['status'];
        }
        
        if (isset($input['tracking_number'])) {
            $order['tracking_number'] = $input['tracking_number'];
        }
        
        $order['updated_at'] = date('Y-m-d H:i:s');
        
        // Save updated order
        $saved = $this->saveOrder($order);
        
        if ($saved) {
            return $this->success($order, 'Order updated successfully');
        }
        
        return $this->error('Failed to update order', 500);
    }
    
    private function generateOrderId() {
        return 'ORD-' . date('YmdHis') . '-' . strtoupper(substr(md5(time()), 0, 6));
    }
    
    private function saveOrder($order) {
        // TODO: Implement database save
        // For now, save to JSON file
        $orders_file = $this->data_dir . '/orders.json';
        
        $orders = [];
        if (file_exists($orders_file)) {
            $content = file_get_contents($orders_file);
            $data = json_decode($content, true);
            $orders = $data['orders'] ?? [];
        }
        
        $orders[] = $order;
        
        $result = file_put_contents(
            $orders_file,
            json_encode(['orders' => $orders], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
        
        return $result !== false;
    }
    
    private function loadOrder($order_id) {
        $orders_file = $this->data_dir . '/orders.json';
        
        if (!file_exists($orders_file)) {
            return null;
        }
        
        $content = file_get_contents($orders_file);
        $data = json_decode($content, true);
        $orders = $data['orders'] ?? [];
        
        foreach ($orders as $order) {
            if ($order['order_id'] === $order_id) {
                return $order;
            }
        }
        
        return null;
    }
    
    private function success($data = null, $message = 'Success') {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        exit;
    }
    
    private function error($message = 'Error', $code = 400) {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        exit;
    }
}

$manager = new OrderManager();
$manager->handle();
?>
