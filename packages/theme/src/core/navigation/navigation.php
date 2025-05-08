<?php

if (!defined('ABSPATH')) {
    exit;
}

add_filter(
    'render_block_core/navigation',
    function ($block_content, $block) {
        $p = new WP_HTML_Tag_Processor($block_content);

        while ($p->next_tag()) {
            switch ($p->get_tag()) {
                case "NAV":
                    $p->add_class("gap-0 lg:gap-10");
                    break;
                case "LI":
                    $p->add_class("w-full lg:w-auto");
                    break;
                case "A":
                    $p->add_class("w-full lg:w-auto py-4! lg:py-0!");
                    break;
            }
        }

        return $p->get_updated_html();
    },
    10,
    2
);
