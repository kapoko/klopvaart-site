<?php

add_action("init", function () {
    remove_action("wp_head", "print_emoji_detection_script", 7);
    remove_action("admin_print_scripts", "print_emoji_detection_script");
    remove_action("wp_print_styles", "print_emoji_styles");
    remove_filter("the_content_feed", "wp_staticize_emoji");
    remove_action("admin_print_styles", "print_emoji_styles");
    remove_filter("comment_text_rss", "wp_staticize_emoji");
    remove_filter("wp_mail", "wp_staticize_emoji_for_email");
    add_filter("tiny_mce_plugins", function ($plugins) {
        if (is_array($plugins)) {
            return array_diff($plugins, ["wpemoji"]);
        } else {
            return [];
        }
    });
});

function smartwp_remove_wp_block_library_css()
{
    // wp_dequeue_style("wp-block-library");
    // wp_dequeue_style("wp-block-library-theme");
    // wp_dequeue_style("wc-blocks-style"); // Remove WooCommerce block CSS
}
add_action("wp_enqueue_scripts", "smartwp_remove_wp_block_library_css", 100);
