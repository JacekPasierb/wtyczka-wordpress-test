<?php
add_action('wp_ajax_my_custom_action', 'process_form_creator_other_action');
add_action('wp_ajax_nopriv_my_custom_action', 'process_form_creator_other_action');

function process_form_creator_other_action() {
    check_ajax_referer('your_nonce_action_other_form', '_ajax_nonce');
    
    error_log('Received form fields:');

  

    // Przykład odpowiedzi JSON z sukcesem
    wp_send_json_success(['message' => 'Formularz przetworzony pomyślnie']);
}
?>
