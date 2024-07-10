<?php
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
        if ($thank_you_page_id && !is_wp_error($thank_you_page_id)) {
            update_post_meta($thank_you_page_id, '_form_creator_thank_you_page', true);
        }
    }
}

function form_creator_get_thank_you_page_url() {
    $query = new WP_Query([
        'post_type' => 'page',
        'meta_key' => '_form_creator_thank_you_page',
        'meta_value' => true,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    ]);

    if ($query->have_posts()) {
      return $thank_you_page_url = get_permalink($query->posts[0]->ID);
    }
    return '';
}

add_shortcode('payment_status_message', 'display_payment_status_message');

function display_payment_status_message() {
   
    $query_string = $_SERVER['QUERY_STRING'];
    parse_str($query_string, $params);
               if (isset($params['error'])) {
               $error_value = $params['error'];
                        if($error_value === "501"){
                        echo '<h1>Płatność nie powiodła się</h1>';
                        echo '<p>Twoja transakcja nie została zrealizowana. Prosimy spróbować ponownie.</p>';
                        return;
                    }
                
                }
    echo '<h1>Dziękujemy za dokonanie płatności!</h1>';
    echo '<p>Twoja transakcja została pomyślnie zrealizowana. Dziękujemy za dokonanie zakupu.</p>';




// ***  TEN KOD PO ZMIANIE META WYMAGAL RECZNEGO ODSWIEZANIA ***  //

    // function display_payment_status_message() {
    //     require_once __DIR__ . '/utils/get_thank_you_page_id.php';
    //     // Pobierz ID strony dziękuję za dokonanie płatności
    //     $thank_you_page_id = get_thank_you_page_id();
    //     $payment_status = get_post_meta($thank_you_page_id, '_payment_status', true);
    // error_log("STST: $payment_status");
    // if ($payment_status === 'COMPLETED') {
    //     echo '<h1>Dziękujemy za dokonanie płatności!</h1>';
    //     echo '<p>Twoja transakcja została pomyślnie zrealizowana. Dziękujemy za dokonanie zakupu.</p>';
    // } elseif ($payment_status === 'CANCELED') {
    //     echo '<h1>Płatność nie powiodła się</h1>';
    //     echo '<p>Twoja transakcja nie została zrealizowana. Prosimy spróbować ponownie.</p>';
    // }
         
    // }
}
?>



