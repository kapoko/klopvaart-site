<?php

add_filter('render_block_core/heading', function ($block_content, $block) {
    if (! isset($block['attrs']['bigPageTitle'])) {
        return $block_content;
    }

    $p = new WP_HTML_Tag_Processor($block_content);
    if ($p->next_tag()) {
        $p->add_class('big-page-title');
    }

    $block_content = $p->get_updated_html();

    return $block_content;
}, 10, 2);
