<?php

add_filter('render_block_core/spacer', function ($block_content, $block) {
    if (! isset($block['attrs']['hideOnMobile'])) {
        return $block_content;
    }

    $restrictedFirstColumn = $block['attrs']['hideOnMobile'];

    $p = new WP_HTML_Tag_Processor($block_content);
    if ($p->next_tag()) {
        $p->add_class('hidden md:block');
    }

    $block_content = $p->get_updated_html();

    return $block_content;
}, 10, 2);
