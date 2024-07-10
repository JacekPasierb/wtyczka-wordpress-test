<?php
add_action('wp_ajax_payu_notify', 'payu_notify_handler');
add_action('wp_ajax_nopriv_payu_notify', 'payu_notify_handler');

function payu_notify_handler() {
    require dirname(__DIR__) . '/vendor/autoload.php';
    require_once __DIR__ . '/utils/verify_signature.php';

    // Odczytaj dane z ciała żądania POST
    $data = file_get_contents('php://input');
    $body = trim($data);

            try {
            error_log("Inside try block");
                       if (!empty($body)) {
                       error_log("Body is not empty");

                       // Odczytaj notyfikację jako obiekt JSON
                       $notification = json_decode($body);
                       error_log("Notification decoded: " . print_r($notification, true));
                       $headers = getallheaders();
                       error_log("Headers: " . print_r($headers, true));

                       // Sprawdzenie, czy nagłówek 'Openpayu-Signature' istnieje
                                   if (isset($headers['Openpayu-Signature'])) {
                                    error_log("WW");
                                   $signatureHeader = $headers['Openpayu-Signature'];
                                   } elseif (isset($headers['X-Openpayu-Signature'])) {
                                    error_log("OO");
                                   $signatureHeader = $headers['X-Openpayu-Signature'];
                                   } else {
                                   throw new Exception("Signature header not found");
                                   }
        
                        // Wyciąganie wartości podpisu z nagłówka
                        $signatureParts = explode(';', $signatureHeader);
                        $signature = '';
                                 foreach ($signatureParts as $part) {
                                         if (strpos($part, 'signature=') === 0) {
                                         $signature = substr($part, 10);
                                         break;
                                         }
                                 }
                        error_log("Signature: $signature");
                                 if (empty($signature)) {
                                 throw new Exception("Signature not found");
                                 }
                                 
                        verify_signature($body, $signature,$signatureHeader);
                        
                       } else {
                           error_log("Empty body");
                       }

                // Brak danych do przetworzenia
                header("HTTP/1.1 400 Bad Request");
                echo "Invalid PayU Notification";
                exit;
        
        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            echo "Error processing PayU Notification: " . $e->getMessage();
           exit;
        }
}
?>