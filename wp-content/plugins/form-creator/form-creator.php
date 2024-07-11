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
require_once plugin_dir_path(__FILE__) . 'includes/scripts.php';
require_once plugin_dir_path(__FILE__) . 'includes/hooks/hooks.php';
require_once plugin_dir_path(__FILE__) . 'includes/hooks-usage.php';

function my_custom_form_styles() {
    // Ścieżka do stylów w wtyczce
    $style_path = plugins_url('src/form-styles.css', __FILE__);

    // Zarejestruj style
    wp_register_style('form-styles', $style_path, array(), '1.0', 'all');

    // Załaduj style w edytorze
    add_editor_style($style_path);

    // Załaduj style na froncie
    wp_enqueue_style('form-styles');
}
add_action('enqueue_block_editor_assets', 'my_custom_form_styles');
add_action('wp_enqueue_scripts', 'my_custom_form_styles');

