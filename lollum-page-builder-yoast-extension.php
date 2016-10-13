<?php
/**
 * Plugin Name:       Lollum Page Builder Yoast Extension
 * Plugin URI:        http://lollum.com/
 * Description:       Add content of Lollum Page Builder to Yoast SEO content analysis.
 * Version:           1.0.1
 * Author:            Lollum
 * Author URI:        http://lollum.com/
 * Requires at least: 4.1
 * Tested up to:      4.6.1
 * License:           GPLv3
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       lollum-page-builder-yoast-extension
 * Domain Path:       languages
 *
 * @package  Lollum_Page_Builder_Yoast_Extension
 * @category Core
 * @author   Lollum
 */

/**
 * Plugin main class.
 */
class LPB_Yoast_Extension {

	/**
	 * @var string
	 */
	public $version = '1.0.0';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->setup_constants();
		$this->init_hooks();
	}

	/**
	 * Hook into actions and filters
	 */
	private function init_hooks() {
		add_action( 'plugins_loaded', array( $this, 'init' ), 0 );
	}

	/**
	 * Setup plugin constants
	 *
	 * @access private
	 * @return void
	 */
	private function setup_constants() {
		// Plugin version
		if ( ! defined( 'LPB_YOAST_EXTENSION_VERSION' ) ) {
			define( 'LPB_YOAST_EXTENSION_VERSION', $this->version );
		}

		// Plugin Folder URL
		if ( ! defined( 'LPB_YOAST_EXTENSION_PLUGIN_URL' ) ) {
			define( 'LPB_YOAST_EXTENSION_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
		}
	}

	/**
	 * Init.
	 *
	 * @access public
	 * @return void
	 */
	public function init() {
		if ( ! class_exists( 'WPSEO_Admin' ) ) {
			return;
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue scripts.
	 */
	public function enqueue_scripts( $hook ) {
		global $post;

		if ( ( $hook == 'post-new.php' || $hook == 'post.php' ) && ( isset( $post->post_type ) && 'page' == $post->post_type ) ) {

			wp_enqueue_script( 'lollum-page-builder-yoast-seo', LPB_YOAST_EXTENSION_PLUGIN_URL . 'assets/js/lollum-page-builder-yoast-extension.min.js', array( 'jquery', 'yoast-seo-post-scraper' ), LPB_YOAST_EXTENSION_VERSION );
		}
	}
}

new LPB_Yoast_Extension();
