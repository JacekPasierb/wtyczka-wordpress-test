<?php
add_action('form_creator_payment_completed', 'handle_form_creator_payment_completed');

function handle_form_creator_payment_completed($order_data) {
    // Tutaj możesz obsłużyć dane po zakończeniu płatności
    error_log("dat:". print_r($order_data, true));
   $description = $order_data['description'];
    
    // Przykładowa operacja logowania do pliku
    error_log("Usługa $description została opłacona, Dziękujemy");
}

add_action('form_creator_completed', 'handle_form_creator_completed');

function handle_form_creator_completed($sanitized_fields) {
    // Tutaj możesz obsłużyć dane 
    error_log("formNotPayu:". print_r($sanitized_fields, true));
    
}

?>