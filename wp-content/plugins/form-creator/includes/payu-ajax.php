<?php
add_action('wp_ajax_form_creator_payment', 'process_form_creator_payment');
add_action('wp_ajax_nopriv_form_creator_payment', 'process_form_creator_payment');

function process_form_creator_payment() {
    check_ajax_referer('your_nonce_action_your_form', '_ajax_nonce');
    require dirname( __DIR__ ) . '/vendor/autoload.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
        $options = get_option('form_creator_options');
        $clientId = $options['client_id'];
        $clientSecret = $options['client_secret'];
        $posId = $options['pos_id'];
        $md5Key = $options['md5_key'];

        $buyerFirstName = sanitize_text_field($_POST['buyer_first_name']);
        $buyerLastName = sanitize_text_field($_POST['buyer_last_name']);
        $amount = isset($_POST['amount']) ? sanitize_text_field($_POST['amount']) : 0; 
        $description = isset($_POST['description']) ? sanitize_text_field($_POST['description']) : '';

        if ( !$buyerFirstName || !$buyerLastName || !$amount || !$description) {
            wp_send_json_error(['message' => 'Brak wymaganych danych.']);
        }

         // Konfiguracja PayU SDK
         OpenPayU_Configuration::setEnvironment('sandbox');
         OpenPayU_Configuration::setMerchantPosId($posId);
         OpenPayU_Configuration::setSignatureKey($md5Key);
         OpenPayU_Configuration::setOauthClientId($clientId);
         OpenPayU_Configuration::setOauthClientSecret($clientSecret);

          // Tworzenie strony "Thank You" po submit formularza
          form_creator_create_thank_you_page();

          // Pobierz URL strony "Thank You"
          $thank_you_page_url = form_creator_get_thank_you_page_url();
       
        
          if (!$thank_you_page_url) {
            $thank_you_page_url_with_param = get_home_url(); 
           }

        $notifyUrl = home_url('/wp-admin/admin-ajax.php?action=payu_notify');

        $orderData = [
            'notifyUrl' => $notifyUrl,
            'continueUrl' => $thank_you_page_url , 
            'customerIp' => $_SERVER['REMOTE_ADDR'],
            'merchantPosId' => $clientId,
            'description' => $description,
            'currencyCode' => 'PLN',
            'totalAmount' => $amount * 100,
            'buyer' => [
                'firstName' => $buyerFirstName,
                'lastName' => $buyerLastName,
            ],
            'products' => [
                [
                    'name' => $description,
                    'unitPrice' => $amount * 100,
                    'quantity' => 1,
                ],
            ],
        ];
        try {
            $response = OpenPayU_Order::create($orderData);
            $status = $response->getStatus();

            error_log("etap1: $status");
            error_log("res: " . print_r($response, true));
            
            if ($response->getStatus() == 'SUCCESS') {
                $redirect_url = $response->getResponse()->redirectUri;
                // Wywołanie hooka po udanej płatności
                error_log("DATAORDER:" . print_r($orderData, true));
                do_action('openpayu_payment_completed', $orderData);

                wp_send_json_success(['redirectUrl' => $redirect_url]);
            } else {
                wp_send_json_error(['message' => 'Błąd przy tworzeniu zamówienia.']);
            }
        } catch (OpenPayU_Exception $e) {
            wp_send_json_error(['message' => 'Błąd przy tworzeniu zamówienia: ' . $e->getMessage()]);
        }
    }
}
?>