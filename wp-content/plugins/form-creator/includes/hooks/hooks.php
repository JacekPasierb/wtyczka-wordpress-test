<?php
add_action('openpayu_payment_completed', 'form_creator_handle_payment_completed');
function form_creator_handle_payment_completed($orderData) {
    // Wywołanie nowego hooka, przekazującego dane zamówienia
    do_action('form_creator_payment_completed', $orderData);
}

add_action('form_completed', 'form_creator_handle_form_completed');

function form_creator_handle_form_completed($sanitized_fields) {
    // Wywołanie nowego hooka, przekazującego dane zamówienia
    do_action('form_creator_completed', $sanitized_fields);
}
?>