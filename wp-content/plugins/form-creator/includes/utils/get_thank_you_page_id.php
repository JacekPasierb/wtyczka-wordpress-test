<?php
// Funkcja pomocnicza do pobrania ID strony dziękuję za dokonanie płatności
function get_thank_you_page_id() {
    $query = new WP_Query([
        'post_type' => 'page',
        'meta_key' => '_form_creator_thank_you_page',
        'meta_value' => true,
        'post_status' => 'publish',
        'posts_per_page' => 1,
    ]);

    if ($query->have_posts()) {
        return $query->posts[0]->ID;
    }
    return 0; // Zwróć 0 lub inny wartość domyślną, jeśli strona nie została znaleziona
}

?>