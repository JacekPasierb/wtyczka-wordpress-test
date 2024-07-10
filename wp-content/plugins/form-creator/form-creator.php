<?php
/**
 * Plugin Name:       Form Creator S
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       form-creator
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'includes/block-registration.php';
require_once plugin_dir_path(__FILE__) . 'includes/admin-menu.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings.php';
require_once plugin_dir_path(__FILE__) . 'includes/payu-ajax.php';
require_once plugin_dir_path(__FILE__) . 'includes/thank-you-page.php';
require_once plugin_dir_path(__FILE__) . 'includes/payu-notify.php';

// Dodaj skrypt JavaScript do obsługi AJAX
function form_creator_enqueue_scripts() {
    wp_enqueue_script('form-creator-ajax', plugin_dir_url(__FILE__) . 'form-creator-ajax.js', ['jquery'], null, true);

    wp_localize_script('form-creator-ajax', 'formCreatorAjax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('your_nonce_action')
    ]);
}
add_action('wp_enqueue_scripts', 'form_creator_enqueue_scripts');
