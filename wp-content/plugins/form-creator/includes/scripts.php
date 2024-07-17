
<?php
function form_creator_enqueue_scripts() {
    // Rejestrowanie skryptów
    wp_register_script('validation-script', plugin_dir_url(__FILE__) . '../validation.js', [], null, true);
    wp_register_script('form-creator-ajax', plugin_dir_url(__DIR__) . '/form-creator-ajax.js', [], null, true);

    // Kolejkowanie skryptów
    
    wp_enqueue_script('validation-script');
    wp_enqueue_script('form-creator-ajax'); // Później rejestrujemy skrypt form-creator-ajax

    // Lokalizowanie skryptu form-creator-ajax
    wp_localize_script('form-creator-ajax', 'formCreatorAjax', [
        'ajax_url' => admin_url('admin-ajax.php'),   
        'nonce_your_form' => wp_create_nonce('your_nonce_action_your_form'),
        'nonce_other_form' => wp_create_nonce('your_nonce_action_other_form'),
    ]);
}
add_action('wp_enqueue_scripts', 'form_creator_enqueue_scripts');

?>