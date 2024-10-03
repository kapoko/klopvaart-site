<?php

if (!defined('ABSPATH')) {
    exit;
}

add_filter(
    'render_block_core/navigation',
    function ($block_content, $block) {
        $p = new WP_HTML_Tag_Processor($block_content);

        if ($p->next_tag('nav')) {
            $p->add_class("gap-10");
        }

        return $p->get_updated_html();
    },
    10,
    2
);
