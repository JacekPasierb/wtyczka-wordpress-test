<?php


// Funkcja do weryfikacji podpisu PayU
function verify_signature($body, $signature,$signatureHeader) {
    require_once __DIR__ . '/get_thank_you_page_id.php';

    $options = get_option('form_creator_options');
            $clientId = $options['client_id'];
            $posId = $options['pos_id'];
            $md5_key = $options['md5_key'];
            error_log("MD5 Key: $md5_key");

    OpenPayU_Configuration::setEnvironment('sandbox');
    OpenPayU_Configuration::setOauthClientId($clientId);
    OpenPayU_Configuration::setSignatureKey($md5_key);
    OpenPayU_Configuration::setMerchantPosId($posId);

    $expected_signature = md5($body . $md5_key);
    
                 if (!is_string($signature)) {
                      $signature = (string)$signature;
                 }

                 if (!is_string($expected_signature)) {
                      $expected_signature = (string)$expected_signature;
                 }
                      
                 if ($signature && hash_equals($expected_signature, $signature)) {
                     // Podpis jest prawidłowy, kontynuuj przetwarzanie notyfikacji
                      $result = OpenPayU_Order::consumeNotification($body,$signatureHeader);
                      
                      // Obsługa rezultatu notyfikacji
                                    if ($result->getResponse()->order->orderId) {
                                    $order = OpenPayU_Order::retrieve($result->getResponse()->order->orderId);
                                    $orderId = $result->getResponse()->order->orderId;
                                    $status = $result->getResponse()->order->status;
                                 
                                           if ($status == 'CANCELED') {
                                             // Znajdź ID strony dziękuję za dokonanie płatności
                $thank_you_page_id = get_thank_you_page_id(); // Pobierz ID strony dziękuję za płatność
                error_log("id strony: $thank_you_page_id");
                                if ($thank_you_page_id) {
                                    // Aktualizuj meta dane posta
                                    update_post_meta($thank_you_page_id, '_payment_status', 'CANCELED');
                                }
                                            error_log("Order is canceled");
                                           } elseif ($status === 'COMPLETED') {
                                             // Znajdź ID strony dziękuję za dokonanie płatności
                $thank_you_page_id = get_thank_you_page_id(); // Pobierz ID strony dziękuję za płatność
error_log("id strony: $thank_you_page_id");
                if ($thank_you_page_id) {
                    // Aktualizuj meta dane posta
                    update_post_meta($thank_you_page_id, '_payment_status', 'COMPLETED');
                }
                                            error_log("Order is completed");
                                            // Uaktualnij status zamówienia lub wykonaj odpowiednie akcje
                                           header("HTTP/1.1 200 OK");
                                           exit;
                                           }
                                    }
                 } else {
                         error_log("Invalid PayU Signature");
                         // Błąd weryfikacji podpisu
                         header("HTTP/1.1 400 Bad Request");
                         echo "Invalid PayU Signature";
                         exit;
                }
}


?>