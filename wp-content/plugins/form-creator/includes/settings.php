<?php
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
?>