<?php

add_filter('render_block_core/columns', function ($block_content, $block) {
    if (! isset($block['attrs']['restrictedFirstColumn'])) {
        return $block_content;
    }

    $restrictedFirstColumn = $block['attrs']['restrictedFirstColumn'];

    $p = new WP_HTML_Tag_Processor($block_content);
    if ($p->next_tag()) {
        $p->add_class('has-restricted-first-column');
    }

    $block_content = $p->get_updated_html();

    return $block_content;
}, 10, 2);


add_filter('render_block_core/columns', function ($block_content, $block) {
    $p = new WP_HTML_Tag_Processor($block_content);
    if ($p->next_tag()) {
        $p->add_class('!mb-4 !gap-x-[1rem] lg:!gap-x-[2rem] xl:!gap-x-[3rem]');
    }

    $block_content = $p->get_updated_html();

    return $block_content;
}, 10, 2);
