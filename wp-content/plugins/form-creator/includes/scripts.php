<?php
function form_creator_enqueue_scripts() {
    wp_enqueue_script('form-creator-ajax', plugin_dir_url(__DIR__) . '/form-creator-ajax.js', ['jquery'], null, true);

    wp_localize_script('form-creator-ajax', 'formCreatorAjax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('your_nonce_action')
    ]);
}
add_action('wp_enqueue_scripts', 'form_creator_enqueue_scripts');
?>