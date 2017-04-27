<?php
/*
Plugin Name: ACF - Repeater Field Tabs
Plugin URI:  http://jamespark.ninja
Description: Adds "tab" functionality to ACF Repeater Fields
Version:     1.0
Author:      JamesPark.ninja
Author URI:  http://jamespark.ninja/
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: acf-repeater-tabs
Domain Path: /languages
*/

add_action( 'admin_enqueue_scripts', 'jpn_acf_tabs_admin_enqueue_scripts' );
function jpn_acf_tabs_admin_enqueue_scripts( $hook_suffix ) {
    // Enqueues jQuery
    wp_enqueue_script('jquery');
    
    wp_enqueue_style( 'jpn_acf_tabs_styles', plugins_url('css/jpn_acf_tabs.css', __FILE__ ), array(), '1.0.0', false);
    wp_enqueue_script( 'jpn_acf_tabs_scripts', plugins_url('js/jpn_acf_tabs.js', __FILE__ ), array(), '1.0.0', false);
}

?>