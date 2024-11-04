<?php

add_filter('render_block_core/column', function ($block_content, $block) {
    if (!isset($block['attrs']['makeSticky'])) {
        return $block_content;
    }

    ob_start();

    include locate_template('src/core/column/block-wrapper.php', false, false);

    return ob_get_clean();
}, 10, 2);
