<?php

defined('ABSPATH') || exit;

add_filter('render_block_core/button', function ($block_content, $block) {
    $p = new WP_HTML_Tag_Processor($block_content);

    if ($p->next_tag('a')) {
        $p->add_class('klopvaart-button');
    }

    return $p->get_updated_html();
}, 10, 2);
