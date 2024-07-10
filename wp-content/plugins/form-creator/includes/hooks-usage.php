<?php
// Użycie hooka form_creator_payment_completed w innej części wtyczki
add_action('form_creator_payment_completed', 'handle_form_creator_payment_completed');

function handle_form_creator_payment_completed($order_data) {
    // Tutaj możesz obsłużyć dane po zakończeniu płatności

    error_log("hOOK-USAGE");
    error_log("dat:". print_r($order_data, true));
    
   $description = $order_data['description'];
    
    // Przykładowa operacja logowania do pliku
    error_log("Usługa $description została opłacona, Dziękujemy");
}
?>