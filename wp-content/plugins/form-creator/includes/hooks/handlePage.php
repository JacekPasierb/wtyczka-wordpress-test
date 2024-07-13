<?php

add_action('form_creator_payment_status', 'handle_payment_status');

function handle_payment_status(status) {
    error_log("Stat: $status");
    // Przekierowanie na stronę "Thank You" z parametrem GET `status`
    $thank_you_page_url = add_query_arg('status', $status, form_creator_get_thank_you_page_url());
    error_log("Redirecting to: $thank_you_page_url");
    wp_redirect($thank_you_page_url);
    exit;
}

?>