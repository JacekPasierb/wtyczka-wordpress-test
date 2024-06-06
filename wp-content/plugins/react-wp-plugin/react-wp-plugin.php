<?php
/*
Plugin Name: React WP Plugin
Description: A simple plugin to integrate React with WordPress.
Version: 1.0
Author: Twoje Imię
*/

// Zarejestruj CPT
function create_custom_post_type() {
    register_post_type('react_post',
        array(
            'labels'      => array(
                'name'          => __('React Posts'),
                'singular_name' => __('React Post'),
            ),
            'public'      => true,
            'has_archive' => true,
            'show_in_rest' => true, // To jest ważne, aby móc używać REST API
            'supports'    => array('title', 'editor', 'custom-fields'),
        )
    );
}
add_action('init', 'create_custom_post_type');

// Enqueue skrypty i style React
function enqueue_react_scripts() {
    wp_enqueue_script(
        'react-app',
        plugin_dir_url(__FILE__) . './dist/assets/index-BDmq7y5j.js',
        array('wp-element'),
        time(),
        true
    );

    wp_enqueue_style(
        'react-app-style',
        plugin_dir_url(__FILE__) . 'dist/assets/index-BPvgi06w.css'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_react_scripts');

// Shortcode do wyświetlania aplikacji React
function react_app_shortcode() {
    return '<div id="react-app"></div>';
}
add_shortcode('react_app', 'react_app_shortcode');
