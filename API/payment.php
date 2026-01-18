<?php
/**
 * Artikaa Gallery - Payment Processing API
 * Handle payment processing and verification
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class PaymentProcessor {
    private $supported_methods = ['credit_card', 'paypal', 'stripe', 'bank_transfer'];
    
    public function handle() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'POST':
                return $this->processPayment();
            case 'GET':
                return $this->getPaymentStatus();
            default:
                return $this->error('Method not allowed', 405);
        }
    }
    
    private function processPayment() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['order_id', 'amount', 'currency', 'payment_method'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty($input[$field])) {
                return $this->error("Field '$field' is required", 400);
            }
        }
        
        // Validate payment method
        if (!in_array($input['payment_method'], $this->supported_methods)) {
            return $this->error('Unsupported payment method', 400);
        }
        
        // Validate amount
        if (!is_numeric($input['amount']) || $input['amount'] <= 0) {
            return $this->error('Invalid amount', 400);
        }
        
        // Process based on payment method
        $result = $this->handlePaymentMethod($input);
        
        if ($result['success']) {
            // Save payment record
            $this->savePaymentRecord($input, $result);
            
            return $this->success(
                [
                    'payment_id' => $result['payment_id'],
                    'status' => $result['status'],
                    'order_id' => $input['order_id']
                ],
                'Payment processed successfully'
            );
        }
        
        return $this->error($result['message'], 400);
    }
    
    private function getPaymentStatus() {
        $payment_id = $_GET['id'] ?? null;
        
        if (!$payment_id) {
            return $this->error('Payment ID is required', 400);
        }
        
        // Retrieve payment status from records
        $payment = $this->getPaymentRecord($payment_id);
        
        if ($payment) {
            return $this->success($payment, 'Payment status retrieved');
        }
        
        return $this->error('Payment not found', 404);
    }
    
    private function handlePaymentMethod($input) {
        $method = $input['payment_method'];
        
        switch ($method) {
            case 'credit_card':
                return $this->processCreditCard($input);
            case 'paypal':
                return $this->processPayPal($input);
            case 'stripe':
                return $this->processStripe($input);
            case 'bank_transfer':
                return $this->processBankTransfer($input);
            default:
                return ['success' => false, 'message' => 'Unsupported payment method'];
        }
    }
    
    private function processCreditCard($input) {
        // Validate card details
        if (!isset($input['card_number']) || !isset($input['cvv']) || !isset($input['expiry'])) {
            return ['success' => false, 'message' => 'Missing card details'];
        }
        
        // Simulate card processing
        // In production, use a payment gateway like Stripe or Square
        
        return [
            'success' => true,
            'payment_id' => 'CC-' . $this->generateTransactionId(),
            'status' => 'completed'
        ];
    }
    
    private function processPayPal($input) {
        // PayPal integration would go here
        // For now, return mock response
        
        return [
            'success' => true,
            'payment_id' => 'PP-' . $this->generateTransactionId(),
            'status' => 'pending'
        ];
    }
    
    private function processStripe($input) {
        // Stripe integration would go here
        // For now, return mock response
        
        return [
            'success' => true,
            'payment_id' => 'STRIPE-' . $this->generateTransactionId(),
            'status' => 'completed'
        ];
    }
    
    private function processBankTransfer($input) {
        // Bank transfer would be processed manually
        
        return [
            'success' => true,
            'payment_id' => 'BANK-' . $this->generateTransactionId(),
            'status' => 'pending'
        ];
    }
    
    private function generateTransactionId() {
        return strtoupper(substr(md5(time() . rand()), 0, 12));
    }
    
    private function savePaymentRecord($input, $result) {
        $data_dir = __DIR__ . '/../DATA';
        $file = $data_dir . '/payments.json';
        
        $payments = [];
        if (file_exists($file)) {
            $content = file_get_contents($file);
            $data = json_decode($content, true);
            $payments = $data['payments'] ?? [];
        }
        
        $payment_record = [
            'payment_id' => $result['payment_id'],
            'order_id' => $input['order_id'],
            'amount' => $input['amount'],
            'currency' => $input['currency'],
            'method' => $input['payment_method'],
            'status' => $result['status'],
            'created_at' => date('Y-m-d H:i:s'),
            'ip_address' => $_SERVER['REMOTE_ADDR']
        ];
        
        $payments[] = $payment_record;
        
        file_put_contents(
            $file,
            json_encode(['payments' => $payments], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }
    
    private function getPaymentRecord($payment_id) {
        $data_dir = __DIR__ . '/../DATA';
        $file = $data_dir . '/payments.json';
        
        if (!file_exists($file)) {
            return null;
        }
        
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        $payments = $data['payments'] ?? [];
        
        foreach ($payments as $payment) {
            if ($payment['payment_id'] === $payment_id) {
                return $payment;
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

$processor = new PaymentProcessor();
$processor->handle();
?>
