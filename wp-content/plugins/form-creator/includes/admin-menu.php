<?php
function form_creator_add_admin_menu() {
    add_options_page(
        'Konfiguracja PayU',
        'Konfiguracja PayU',
        'manage_options',
        'form-creator-settings',
        'form_creator_settings_page'
    );
}
add_action('admin_menu', 'form_creator_add_admin_menu');

function form_creator_settings_page() {
    ?>
    <div class="wrap">
        <h1>Konfiguracja PayU</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('form_creator_options_group');
            do_settings_sections('form-creator-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
?>