<?php
/**
 * Artikaa Gallery - Newsletter Subscription API
 * Handle newsletter subscriptions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class NewsletterManager {
    private $admin_email = 'newsletter@artikaa.am';
    private $data_dir;
    
    public function __construct() {
        $this->data_dir = __DIR__ . '/../DATA';
    }
    
    public function handle() {
        $method = $_SERVER['REQUEST_METHOD'];
        
        switch ($method) {
            case 'POST':
                return $this->subscribe();
            case 'DELETE':
                return $this->unsubscribe();
            default:
                return $this->error('Method not allowed', 405);
        }
    }
    
    private function subscribe() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate email
        if (!isset($input['email']) || empty($input['email'])) {
            return $this->error('Email is required', 400);
        }
        
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->error('Invalid email format', 400);
        }
        
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        
        // Check if already subscribed
        if ($this->isSubscribed($email)) {
            return $this->error('This email is already subscribed', 400);
        }
        
        // Add subscription
        $subscription = [
            'email' => $email,
            'name' => htmlspecialchars($input['name'] ?? '', ENT_QUOTES, 'UTF-8'),
            'subscribed_at' => date('Y-m-d H:i:s'),
            'ip_address' => $_SERVER['REMOTE_ADDR'],
            'status' => 'active'
        ];
        
        $saved = $this->saveSubscription($subscription);
        
        if ($saved) {
            // Send confirmation email
            $this->sendConfirmationEmail($email, $input['name'] ?? '');
            
            return $this->success(
                ['email' => $email],
                'Successfully subscribed to our newsletter'
            );
        }
        
        return $this->error('Failed to subscribe', 500);
    }
    
    private function unsubscribe() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($input['email']) || empty($input['email'])) {
            return $this->error('Email is required', 400);
        }
        
        $email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
        
        // Remove subscription
        $removed = $this->removeSubscription($email);
        
        if ($removed) {
            return $this->success(
                ['email' => $email],
                'Successfully unsubscribed from newsletter'
            );
        }
        
        return $this->error('Email not found in subscription list', 404);
    }
    
    private function isSubscribed($email) {
        $file = $this->data_dir . '/newsletter_subscribers.json';
        
        if (!file_exists($file)) {
            return false;
        }
        
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        $subscribers = $data['subscribers'] ?? [];
        
        foreach ($subscribers as $subscriber) {
            if ($subscriber['email'] === $email) {
                return true;
            }
        }
        
        return false;
    }
    
    private function saveSubscription($subscription) {
        $file = $this->data_dir . '/newsletter_subscribers.json';
        
        $subscribers = [];
        if (file_exists($file)) {
            $content = file_get_contents($file);
            $data = json_decode($content, true);
            $subscribers = $data['subscribers'] ?? [];
        }
        
        $subscribers[] = $subscription;
        
        $result = file_put_contents(
            $file,
            json_encode(['subscribers' => $subscribers], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
        
        return $result !== false;
    }
    
    private function removeSubscription($email) {
        $file = $this->data_dir . '/newsletter_subscribers.json';
        
        if (!file_exists($file)) {
            return false;
        }
        
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        $subscribers = $data['subscribers'] ?? [];
        
        $updated = [];
        $found = false;
        
        foreach ($subscribers as $subscriber) {
            if ($subscriber['email'] !== $email) {
                $updated[] = $subscriber;
            } else {
                $found = true;
            }
        }
        
        if ($found) {
            file_put_contents(
                $file,
                json_encode(['subscribers' => $updated], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
            );
            return true;
        }
        
        return false;
    }
    
    private function sendConfirmationEmail($email, $name) {
        $subject = "Welcome to Artikaa Newsletter!";
        
        $message = "Hello" . (!empty($name) ? " " . htmlspecialchars($name) : "") . "!\n\n";
        $message .= "Thank you for subscribing to our newsletter.\n";
        $message .= "You will now receive updates about new artworks, exhibitions, and exclusive offers.\n\n";
        $message .= "Best regards,\n";
        $message .= "Artikaa Team";
        
        $headers = "From: " . $this->admin_email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Uncomment to enable email sending
        // mail($email, $subject, $message, $headers);
        
        return true;
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

$manager = new NewsletterManager();
$manager->handle();
?>
