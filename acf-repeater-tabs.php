<?php
/*
Plugin Name: ACF - Repeater Field Tabs
Plugin URI:  http://jamespark.ninja
Description: Adds "tab" functionality to ACF Repeater Fields
Version:     3.8
Author:      JamesPark.ninja
Author URI:  http://jamespark.ninja/
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: acf-repeater-tabs
Domain Path: /languages
GitHub Plugin URI: JamesParkNINJA/acf-repeater-tabs
*/

add_action( 'admin_enqueue_scripts', 'jpn_acf_tabs_admin_enqueue_scripts' );
function jpn_acf_tabs_admin_enqueue_scripts( $hook_suffix ) {
    // Enqueues jQuery
    wp_enqueue_script('jquery');
    
    $plugins = get_plugins();
    $acf_version = false;
    foreach ($plugins as $plugin) {
        if ($plugin['Name'] == 'Advanced Custom Fields PRO') {
            $acf_version = $plugin['Version'];
        }
    }
    
    wp_enqueue_style( 'jpn_acf_tabs_styles', plugins_url('css/jpn_acf_tabs.css', __FILE__ ), array(), '1.0.0', false);
    wp_enqueue_script( 'jpn_acf_tabs_scripts', plugins_url('js/jpn_acf_tabs.js', __FILE__ ), array(), '1.0.0', false);
    wp_enqueue_script( 'jQueryUI', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js', array(), '1.12.1', false);
    
    if ($acf_version) {
        $jpn_acf_tabs_args = array(
            'acf_version' => $acf_version
        );
        
        wp_localize_script( 'jpn_acf_tabs_scripts', 'jpn_acf_tabs_args', $jpn_acf_tabs_args );
    }
}

add_action('acf/render_field_settings/type=repeater', 'jpn_acf_tabs_settings');
function jpn_acf_tabs_settings( $field ) {
	
	acf_render_field_setting( $field, array(
        'label'			=> __('Activate Repeater Tabs?'),
		'instructions'	=> 'Turn on and select repeater tab orientation',
		'name'			=> 'jpn-tabs',
		'type'			=> 'radio',
        'layout'        => 'horizontal',
		'choices'       => array(
			false => __('Off'),
			'vertical' => __('Vertical'),
			/* 'horizontal' => __('Horizontal') DISABLED DUE TO STYLING CONFLICTS */
		)
	), true);
	
}

add_filter('acf/render_field/type=repeater', 'jpn_acf_tabs_render_pre', 9, 1);
function jpn_acf_tabs_render_pre( $field ) {
	
	// bail early if no 'admin_only' setting
	if( strcmp($field['jpn-tabs'], 'horizontal')===0 || strcmp($field['jpn-tabs'], 'vertical')===0 ) {
        	echo '<br><div class="jpn-tabs-activated jpn-'.$field['jpn-tabs'].'">';
    	}
	
}

add_filter('acf/render_field/type=repeater', 'jpn_acf_tabs_render_post', 11, 1);
function jpn_acf_tabs_render_post( $field ) {
	
	// bail early if no 'admin_only' setting
	if( !empty($field['jpn-tabs']) ) {
        echo '</div>';
    }
	
}

add_action( 'wp_ajax_jpn_move', 'jpn_move' );
function jpn_move() {
    $dir = $_POST['dir'];
    $jpn = $_POST['jpn'];
    $id = $_POST['id'];
    
    $return['dir'] = $dir;
    $return['jpn'] = $jpn;
    $return['id'] = $id;
    
    echo json_encode($return);
    die();
}

?>
