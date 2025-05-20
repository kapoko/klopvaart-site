<?php

add_filter('render_block_core/image', function ($block_content, $block) {
    $p = new WP_HTML_Tag_Processor($block_content);
    if ($p->next_tag()) {
        $p->add_class('!mb-[1rem] lg:!mb-[2rem] xl:!mb-[3rem]');
    }

    $block_content = $p->get_updated_html();

    return $block_content;
}, 10, 2);
