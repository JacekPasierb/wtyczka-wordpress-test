<?php
function create_block_form_creator_block_init() {
	register_block_type( dirname( __DIR__ ) . '/build' );
}
add_action( 'init', 'create_block_form_creator_block_init' );
?>
