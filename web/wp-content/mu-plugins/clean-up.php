<?php

/**
 * Remove Wordpress bloat
 */
add_action("init", function () {
    remove_action("wp_head", "print_emoji_detection_script", 7);
    remove_action("admin_print_scripts", "print_emoji_detection_script");
    remove_action("wp_print_styles", "print_emoji_styles");
    remove_filter("the_content_feed", "wp_staticize_emoji");
    remove_action("admin_print_styles", "print_emoji_styles");
    remove_filter("comment_text_rss", "wp_staticize_emoji");
    remove_filter("wp_mail", "wp_staticize_emoji_for_email");
    remove_action("wp_head", "wp_generator");
    remove_action('rest_api_init', 'wp_oembed_register_route');
    add_filter('embed_oembed_discover', '__return_false');
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
    remove_action('wp_head', 'wp_oembed_add_host_js');
    remove_action('wp_footer', 'the_block_template_skip_link');

    /**
     * Disable extra RSS, recent comment css, gallery css
     */
    add_filter("feed_links_show_comments_feed", "__return_false");
    remove_action('wp_head', 'feed_links_extra', 3);
    remove_action('wp_head', 'feed_links', 2);
    add_filter("show_recent_comments_widget_style", "__return_false");
    add_filter("use_default_gallery_style", "__return_false");

    /**
     * Disable emojis
     */
    add_filter("tiny_mce_plugins", function ($plugins) {
        if (is_array($plugins)) {
            return array_diff($plugins, ["wpemoji"]);
        } else {
            return [];
        }
    });

});
