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
?>