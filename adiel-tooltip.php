<?php
/**
 * Plugin Name:       Adiel Tooltip
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Adiel Ben Msohe
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

class Adiel_Tooltip {

  public function __construct() {

    add_action('wp_ajax_nopriv_', array($this, 'ajax_handler'));
    add_action('wp_ajax_', array($this, 'ajax_handler'));

    add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
  }

  public function enqueue_scripts() {

    wp_register_script('adiel_tooltip', plugins_url('dist/main.js', __FILE__), array(), false, true);
    wp_localize_script('adiel_tooltip', 'adiel_tooltip', array('ajaxurl' => admin_url('admin-ajax.php')));
    wp_enqueue_script('adiel_tooltip');

  }


  public function ajax_handler() {

    // Get Post URL:
    $post_url = parse_url($_POST['postUrl'], PHP_URL_PATH);

    $post_url = str_replace(array('wordpress', 'glossary', '/'), '', $post_url);

    // Get Post OBJECT Using URL:
    $post = get_page_by_path($post_url, OBJECT, 'glossary');

    // Get Post Contect Using Post OBJECT:
    $post_contect = strip_shortcodes(strip_tags(get_the_content(null, false, $post)));
    $post_contect = substr($post_contect, 0, 600);
    $post_title = get_the_title($post);
    $post_parmalink = get_the_permalink($post);
    $post_img = get_the_post_thumbnail_url($post);


    // Ajax Response.
    $return = array(
      'post_contect' => $post_contect,
      'post_title' => $post_title,
      'post_img' => $post_img,
      'post_parmalink' => $post_parmalink
    );

    wp_send_json_success($return);
  }
}

new Adiel_Tooltip;
