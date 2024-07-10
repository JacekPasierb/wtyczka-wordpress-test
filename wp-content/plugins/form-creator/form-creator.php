<?php
/**
 * Plugin Name:       Form Creator S
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       form-creator
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_form_creator_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_form_creator_block_init' );


// ********************************    KONFIGURACJA PAYU   ****************************************** //
function form_creator_add_admin_menu() {
    add_options_page(
        'Konfiguracja PayU',
        'Konfiguracja PayU',
        'manage_options',
        'form-creator-settings',
        'form_creator_settings_page'
    );
}
add_action('admin_menu', 'form_creator_add_admin_menu');

function form_creator_settings_page() {
    ?>
    <div class="wrap">
        <h1>Konfiguracja PayU</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('form_creator_options_group');
            do_settings_sections('form-creator-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

function form_creator_settings_init() {
    register_setting('form_creator_options_group', 'form_creator_options');

    register_setting('form_creator_options_group', 'form_creator_payu_client_id');
    register_setting('form_creator_options_group', 'form_creator_payu_client_secret');
    register_setting('form_creator_options_group', 'form_creator_payu_pos_id');
    register_setting('form_creator_options_group', 'form_creator_payu_md5_key');
    
    add_settings_section(
        'form_creator_main_section',
        'Główne ustawienia',
        'form_creator_section_text',
        'form-creator-settings'
    );

    add_settings_field(
        'form_creator_client_id',
        'Client ID',
        'form_creator_setting_client_id',
        'form-creator-settings',
        'form_creator_main_section'
    );

    add_settings_field(
        'form_creator_client_secret',
        'Client Secret',
        'form_creator_setting_client_secret',
        'form-creator-settings',
        'form_creator_main_section'
    );

    add_settings_field(
        'form_creator_pos_id',
        'Pos ID',
        'form_creator_setting_pos_id',
        'form-creator-settings',
        'form_creator_main_section'
    );

    add_settings_field(
        'form_creator_md5_key',
        'MD5 Key',
        'form_creator_setting_md5_key',
        'form-creator-settings',
        'form_creator_main_section'
    );
}

add_action('admin_init', 'form_creator_settings_init');

function form_creator_section_text() {
    echo '<p>Wprowadź swoje ustawienia PayU poniżej:</p>';
}

function form_creator_setting_client_id() {
    $options = get_option('form_creator_options');
    $client_id = isset($options['client_id']) ? esc_attr($options['client_id']) : '';
    echo "<input id='form_creator_client_id' name='form_creator_options[client_id]' size='40' type='text' value='$client_id' />";
}

function form_creator_setting_client_secret() {
    $options = get_option('form_creator_options');
    $client_secret = isset($options['client_secret']) ? esc_attr($options['client_secret']) : '';
    echo "<input id='form_creator_client_secret' name='form_creator_options[client_secret]' size='40' type='text' value='$client_secret' />";
}

function form_creator_setting_pos_id() {
    $options = get_option('form_creator_options');
    $pos_id = isset($options['pos_id']) ? esc_attr($options['pos_id']) : '';
    echo "<input id='form_creator_pos_id' name='form_creator_options[pos_id]' size='40' type='text' value='$pos_id' />";
}

function form_creator_setting_md5_key() {
    $options = get_option('form_creator_options');
    $md5_key = isset($options['md5_key']) ? esc_attr($options['md5_key']) : '';
    echo "<input id='form_creator_md5_key' name='form_creator_options[md5_key]' size='40' type='text' value='$md5_key' />";
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    KONFIGURACJA PAYU   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //


// Rejestracja akcji AJAX dla zalogowanych i niezalogowanych użytkowników
add_action('wp_ajax_form_creator_payment', 'process_form_creator_payment');
add_action('wp_ajax_nopriv_form_creator_payment', 'process_form_creator_payment');


// ***************  Tworzenie strony "Thank You" po zakończeniu płatności *************** //
function form_creator_create_thank_you_page() {
    $query = new WP_Query([
        'post_type' => 'page',
        'meta_key' => '_form_creator_thank_you_page',
        'meta_value' => true,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    ]);

    if (!$query->have_posts()) {
        $thank_you_page_id = wp_insert_post([
            'post_title'   => "",
            'post_content' => '[payment_status_message]', // Tutaj dodaj shortcode
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ]);
       error_log("pay:$payment_status");
        if ($thank_you_page_id && !is_wp_error($thank_you_page_id)) {
            update_post_meta($thank_you_page_id, '_form_creator_thank_you_page', true);
        }
    }
  

}


// ^^^^^^^^^^^^^^^^^  Tworzenie strony "Thank You" po zakończeniu płatności ^^^^^^^^^^^^^^^^^^^ //





// ***************                       FUNKCJA PAYU                *************** //
function process_form_creator_payment() {
    check_ajax_referer('your_nonce_action', '_ajax_nonce');
    require 'vendor/autoload.php';

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

        error_log("Received POST data: ");
        error_log("buyer_first_name: $buyerFirstName");
        error_log("buyer_last_name: $buyerLastName");
        error_log("amount: $amount");
        error_log("description: $description");

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
            $thank_you_page_url_with_param = get_home_url(); // Domyślny URL, jeśli strona nie istnieje
        }

        $notifyUrl = home_url('/wp-admin/admin-ajax.php?action=payu_notify');


error_log("notify22: $notifyUrl");
        $orderData = [
            'notifyUrl' => $notifyUrl,
            'continueUrl' => $thank_you_page_url , // Domyślny parametr payment_success=0
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
                error_log("yes");
                
                $redirect_url = $response->getResponse()->redirectUri;
                error_log("etap2: $redirect_url");
                wp_send_json_success(['redirectUrl' => $redirect_url]);
                
                
            } else {
                wp_send_json_error(['message' => 'Błąd przy tworzeniu zamówienia.']);
            }
        } catch (OpenPayU_Exception $e) {
            wp_send_json_error(['message' => 'Błąd przy tworzeniu zamówienia: ' . $e->getMessage()]);
        }
    }
}

// ^^^^^^^^^^^^^^^^^                FUNKCJA PAYU              ^^^^^^^^^^^^^^^^^^^^^^^^^ //


// Dodaj skrypt JavaScript do obsługi AJAX
function form_creator_enqueue_scripts() {
    wp_enqueue_script('form-creator-ajax', plugin_dir_url(__FILE__) . 'form-creator-ajax.js', ['jquery'], null, true);

    wp_localize_script('form-creator-ajax', 'formCreatorAjax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('your_nonce_action')
    ]);
}
add_action('wp_enqueue_scripts', 'form_creator_enqueue_scripts');


function form_creator_get_thank_you_page_url() {
    $query = new WP_Query([
        'post_type' => 'page',
        'meta_key' => '_form_creator_thank_you_page',
        'meta_value' => true,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    ]);

    if ($query->have_posts()) {
       
       $thank_you_page_url = get_permalink($query->posts[0]->ID);
      
       

        return $thank_you_page_url;
    }

    return '';
}




function payu_notify_handler() {
    require 'vendor/autoload.php';
    
    // Odczytaj dane z ciała żądania POST
    $data = file_get_contents('php://input');
    $body = trim($data);
    error_log("body: $body");

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

            // Weryfikacja podpisu
            $options = get_option('form_creator_options');
            $clientId = $options['client_id'];
            $posId = $options['pos_id'];
            $md5_key = $options['md5_key'];
            error_log("MD5 Key: $md5_key");
 // Otwórz PayU SDK
 OpenPayU_Configuration::setEnvironment('sandbox');
 OpenPayU_Configuration::setOauthClientId($clientId);
 OpenPayU_Configuration::setSignatureKey($md5_key);
 OpenPayU_Configuration::setMerchantPosId($posId);

            // Konstruowanie oczekiwanego podpisu
            $expected_signature = md5($body . $md5_key);
            error_log("Expected Signature: $expected_signature");
            // Upewnienie się, że oba są ciągami znaków
                      if (!is_string($signature)) {
                      error_log("Original signature is not a string. Type: " . gettype($signature));
                      $signature = (string)$signature;
                      }
                      if (!is_string($expected_signature)) {
                      error_log("Expected signature is not a string. Type: " . gettype($expected_signature));
                      $expected_signature = (string)$expected_signature;
                      }
                      if ($signature && hash_equals($expected_signature, $signature)) {
                      error_log("Signature is valid");
                      // Logowanie przed wywołaniem funkcji OpenPayU_Order::consumeNotification
                      error_log("Calling OpenPayU_Order::consumeNotification with body: $body");

                      // Podpis jest prawidłowy, kontynuuj przetwarzanie notyfikacji
                      $result = OpenPayU_Order::consumeNotification($data,$signatureHeader);
                      error_log("TO JUZ SIE NIE WYSWIETLA");
                      error_log("Notification consumed: " . print_r($result, true));

                      // Obsługa rezultatu notyfikacji
                                    if ($result->getResponse()->order->orderId) {
                                    $order = OpenPayU_Order::retrieve($result->getResponse()->order->orderId);
                                    $orderId = $result->getResponse()->order->orderId;
                                    error_log("id:" . print_r($order, true));
                                    $status = $result->getResponse()->order->status;
                                    error_log("Order Retrieved Status: $status");
                                    if ($status == 'CANCELED') {
                                        $payment_success = "2";
 
                                        // Wykonaj odpowiednie akcje dla anulowanego zamówienia
                                        error_log("Order is canceled");
                                        // Na przykład: zaktualizuj status zamówienia w bazie danych
                                    } elseif ($status === 'COMPLETED') {
                                        $payment_success = "1";

                                        
                                                  error_log("Order is successful");
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
                } else {
                    error_log("Empty body");
                }

    // Brak danych do przetworzenia
    header("HTTP/1.1 400 Bad Request");
    echo "Invalid PayU Notification";
    exit;
} catch (OpenPayU_Exception $e) {
    error_log("OpenPayU Exception: " . $e->getMessage());
    header("HTTP/1.1 500 Internal Server Error");
    echo "Error processing PayU Notification: " . $e->getMessage();
    exit;
} catch (Exception $e) {
    error_log("General Exception: " . $e->getMessage());
    header("HTTP/1.1 500 Internal Server Error");
    echo "Error processing PayU Notification: " . $e->getMessage();
    exit;
}
}




// Rejestracja funkcji AJAX dla zalogowanych i niezalogowanych użytkowników
add_action('wp_ajax_payu_notify', 'payu_notify_handler');
add_action('wp_ajax_nopriv_payu_notify', 'payu_notify_handler');


    

// Rejestracja funkcji AJAX dla zalogowanych i niezalogowanych użytkowników
add_action('wp_ajax_payu_notify', 'payu_notify_handler');
add_action('wp_ajax_nopriv_payu_notify', 'payu_notify_handler');





// shortcode do strony z dynamicnzym statusem
function display_payment_status_message() {
    if (isset($_GET['payment_success'])) {
        $payment_success = $_GET['payment_success'];
error_log("ddd:$payment_success");
        if ($payment_success == '1') {
            echo '<h1>Dziękujemy za dokonanie płatności!</h1>';
            echo '<p>Twoja transakcja została pomyślnie zrealizowana. Dziękujemy za dokonanie zakupu.</p>';
        } elseif ($payment_success == '2') {
            echo '<h1>Płatność nie powiodła się</h1>';
            echo '<p>Twoja transakcja nie została zrealizowana. Prosimy spróbować ponownie.</p>';
        }
    } else {
        echo '<h1>Nieznany status płatności</h1>';
        echo '<p>Nie można określić statusu płatności. Prosimy skontaktować się z obsługą klienta.</p>';
    }
}
add_shortcode('payment_status_message', 'display_payment_status_message');

