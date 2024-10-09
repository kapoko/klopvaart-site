<?php

add_action(
    'after_setup_theme',
    function () {
    //    wp_enqueue_block_style(
    //        'core/columns',
    //        [
    //            'handle' => 'klopvaart/core-colums/styles',
    //            'src'    => get_stylesheet_directory_uri() . '/build/style-core.css',
    //            'ver'    => wp_get_theme()->get('Version'),
    //            'path'   => get_stylesheet_directory() . '/build/style-core.css',
    //        ]
    //    );
    }
);

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
