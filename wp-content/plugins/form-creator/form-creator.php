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
            'post_title'   => '',
            'post_content' => '<h1>Dziękujemy za dokonanie płatności!</h1><p>Twoja transakcja została pomyślnie zrealizowana. Dziękujemy za dokonanie zakupu.</p>',
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ]);

       

        if ($thank_you_page_id && !is_wp_error($thank_you_page_id)) {
            update_post_meta($thank_you_page_id, '_form_creator_thank_you_page', true);
          
        } 
    } 
}

// ^^^^^^^^^^^^^^^^^  Tworzenie strony "Thank You" po zakończeniu płatności ^^^^^^^^^^^^^^^^^^^ //


// ***************                       FUNKCJA PAYU                *************** //
function process_form_creator_payment() {
    check_ajax_referer('your_nonce_action', '_ajax_nonce');

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

          // Tworzenie strony "Thank You" po submit formularza
          form_creator_create_thank_you_page();

          // Pobierz URL strony "Thank You"
        $thank_you_page_url = form_creator_get_thank_you_page_url();
        $thank_you_page_url_with_param = add_query_arg('payment_success', '1', $thank_you_page_url);
        
        if (!$thank_you_page_url_with_param) {
            $thank_you_page_url_with_param = get_home_url(); // Domyślny URL, jeśli strona nie istnieje
        }

        $orderData = [
            'notifyUrl' => get_home_url() . '/payu-notify',
            'continueUrl' =>  $thank_you_page_url_with_param,
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

        $tokenUrl = 'https://secure.snd.payu.com/pl/standard/user/oauth/authorize';
        $orderUrl = 'https://secure.snd.payu.com/api/v2_1/orders';

        
        // Uzyskiwanie tokenu za pomocą cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $tokenUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'grant_type' => 'client_credentials',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
        ]);
        $tokenResponse = curl_exec($ch);
        if(curl_errno($ch)) {
            wp_send_json_error(['message' => 'Błąd przy uzyskiwaniu tokenu.']);
        }
        curl_close($ch);

        $tokenData = json_decode($tokenResponse, true);
        if (isset($tokenData['access_token'])) {
            $accessToken = $tokenData['access_token'];
        } else {
            wp_send_json_error(['message' => 'Błąd przy uzyskiwaniu tokenu.']);
        }

        // Tworzenie zamówienia za pomocą cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $orderUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $accessToken,
        ]);
        $orderResponse = curl_exec($ch);
        if(curl_errno($ch)) {
            wp_send_json_error(['message' => 'Błąd przy tworzeniu zamówienia.']);
        }
        curl_close($ch);

        $orderBody = $orderResponse;
        $orderData = json_decode($orderBody, true);

        $redirectUrl = isset($orderData['redirectUri']) ? $orderData['redirectUri'] : null;
        if (!$redirectUrl) {
            wp_send_json_error(['message' => 'Brak adresu URL do przekierowania.']);
        }

        wp_send_json_success(['redirectUrl' => $redirectUrl]);
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
        return get_permalink($query->posts[0]->ID);
    }

    return '';
}

function restrict_thank_you_page() {
    if (is_page('Thank You') && (!isset($_GET['payment_success']) || $_GET['payment_success'] !== '1')) {
        wp_redirect(home_url()); // Przekieruj do strony głównej, jeśli parametr nie istnieje
        exit;
    }
}
add_action('template_redirect', 'restrict_thank_you_page');


// Funkcja usuwająca stronę "Thank You"
function form_creator_delete_thank_you_page() {
    error_log('Funkcja form_creator_delete_thank_you_page została wywołana.');
    check_ajax_referer('your_nonce_action', '_ajax_nonce');
    error_log('Rozpoczęcie usuwania strony "Thank You"');
    $query = new WP_Query([
        'post_type' => 'page',
        'meta_key' => '_form_creator_thank_you_page',
        'meta_value' => true,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    ]);

    if ($query->have_posts()) {
        $thank_you_page_id = $query->posts[0]->ID;
        error_log('Znaleziono stronę "Thank You" z ID: ' . $thank_you_page_id);
        $result = wp_delete_post($thank_you_page_id, true); // true oznacza natychmiastowe usunięcie bez przeniesienia do kosza

        if ($result) {
            error_log('Strona "Thank You" została usunięta.');
            wp_send_json_success(['message' => 'Strona "Thank You" została usunięta.']);
        } else {
            error_log('Błąd podczas usuwania strony 11"Thank You".');
            wp_send_json_error(['message' => 'Błąd podczas usuwania strony "Thank You".']);
        }
    } else {
        error_log('Strona "Thank You" nie została znaleziona.');
        wp_send_json_error(['message' => 'Strona "Thank You" nie została znaleziona.']);
    }
}
add_action('wp_ajax_delete_thank_you_page', 'form_creator_delete_thank_you_page');
add_action('wp_ajax_nopriv_delete_thank_you_page', 'form_creator_delete_thank_you_page');
