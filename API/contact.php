<?php
/**
 * Artikaa Gallery - Contact Form API
 * Handle contact form submissions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

class ContactHandler {
    private $required_fields = ['name', 'email', 'message'];
    private $admin_email = 'contact@artikaa.am';
    
    public function handle() {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate input
        $validation = $this->validate($input);
        if (!$validation['valid']) {
            return $this->error($validation['message'], 400);
        }
        
        // Sanitize input
        $data = $this->sanitize($input);
        
        // Save contact message
        $saved = $this->saveMessage($data);
        
        if (!$saved) {
            return $this->error('Failed to save message', 500);
        }
        
        // Send email notifications
        $this->sendAdminEmail($data);
        $this->sendConfirmationEmail($data['email']);
        
        return $this->success(['message' => 'Your message has been sent successfully']);
    }
    
    private function validate($input) {
        if (!$input) {
            return ['valid' => false, 'message' => 'Invalid JSON input'];
        }
        
        // Check required fields
        foreach ($this->required_fields as $field) {
            if (!isset($input[$field]) || empty(trim($input[$field]))) {
                return ['valid' => false, 'message' => "Field '$field' is required"];
            }
        }
        
        // Validate email
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            return ['valid' => false, 'message' => 'Invalid email format'];
        }
        
        // Validate message length
        if (strlen($input['message']) < 10 || strlen($input['message']) > 5000) {
            return ['valid' => false, 'message' => 'Message must be between 10 and 5000 characters'];
        }
        
        return ['valid' => true];
    }
    
    private function sanitize($input) {
        return [
            'name' => htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8'),
            'email' => filter_var($input['email'], FILTER_SANITIZE_EMAIL),
            'subject' => htmlspecialchars(trim($input['subject'] ?? 'General Inquiry'), ENT_QUOTES, 'UTF-8'),
            'message' => htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8'),
            'submitted_at' => date('Y-m-d H:i:s'),
            'ip_address' => $_SERVER['REMOTE_ADDR']
        ];
    }
    
    private function saveMessage($data) {
        $data_dir = __DIR__ . '/../DATA';
        $file = $data_dir . '/contact_messages.json';
        
        $messages = [];
        if (file_exists($file)) {
            $content = file_get_contents($file);
            $json = json_decode($content, true);
            $messages = $json['messages'] ?? [];
        }
        
        $messages[] = $data;
        
        $result = file_put_contents(
            $file,
            json_encode(['messages' => $messages], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
        
        return $result !== false;
    }
    
    private function sendAdminEmail($data) {
        $to = $this->admin_email;
        $subject = "New Contact Form Submission: " . $data['subject'];
        
        $message = "New contact form submission:\n\n";
        $message .= "Name: " . $data['name'] . "\n";
        $message .= "Email: " . $data['email'] . "\n";
        $message .= "Subject: " . $data['subject'] . "\n";
        $message .= "Submitted: " . $data['submitted_at'] . "\n\n";
        $message .= "Message:\n" . $data['message'];
        
        $headers = "From: " . $data['email'] . "\r\n";
        $headers .= "Reply-To: " . $data['email'] . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Uncomment to enable email sending
        // mail($to, $subject, $message, $headers);
        
        return true;
    }
    
    private function sendConfirmationEmail($email) {
        $subject = "We received your message - Artikaa Gallery";
        
        $message = "Thank you for contacting Artikaa Gallery!\n\n";
        $message .= "We have received your message and will get back to you as soon as possible.\n\n";
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

$handler = new ContactHandler();
$handler->handle();
?>
