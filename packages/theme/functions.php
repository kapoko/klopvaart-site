<?php

/**
 * Loads Knock Knock template files located in the app/ folder
 */

array_map(
    function ($file) {
        $file = "./app/{$file}.php";
        if (!locate_template($file, true, true)) {
            wp_die(sprintf(__("Error locating <code>%s</code>.", "klopvaart"), $file));
        }
    },
    ["setup"]
);

add_filter('body_class', function ($classes) {
    return array_merge($classes, ["transition-colors", "duration-500"]);
});

/**
 * Allowed blocks
 */
//add_filter("allowed_block_types_all", function ($allowed_blocks) {
//    return ["core/paragraph", "core/heading", "klopvaart/*"];
//});

add_action(
    "block_categories_all",
    function ($categories) {
        return array_merge(
            $categories,
            [[
               "slug" => "klopvaart",
               "title" => "Klopvaart Blocks",
            ]]
        );
    },
    10,
    2
);

add_action('init', function () {
    register_block_pattern_category(
        'klopvaart',
        ['label' => __('Klopvaart', 'klopvaart')]
    );
});

add_action(
    'enqueue_block_editor_assets',
    function () {
        $asset = include get_stylesheet_directory() . '/build/core.asset.php';

        wp_enqueue_script(
            'core',
            get_stylesheet_directory_uri() . '/build/core.js',
            $asset['dependencies'],
            $asset['version']
        );

        wp_enqueue_style(
            'core',
            get_stylesheet_directory_uri() . '/build/core.css',
            [],
            $asset['version']
        );
    }
);

add_action(
    'enqueue_block_assets',
    function () {
        $asset = include get_stylesheet_directory() . '/build/global.asset.php';

        wp_enqueue_style(
            'global',
            get_stylesheet_directory_uri() . '/build/global.css',
            $asset['dependencies'],
            $asset['version']
        );

        wp_enqueue_style(
            'style-core',
            get_stylesheet_directory_uri() . '/build/style-core.css',
            [],
            $asset['version']
        );
    }
);

/**
 * Load core block extensions
 */
array_map(
    function ($blockName) {
        $file = "./src/core/{$blockName}/{$blockName}.php";
        if (!locate_template($file, true, true)) {
            wp_die(sprintf(__("Error locating <code>%s</code>.", "klopvaart"), $file));
        }
    },
    ["columns", "column", "navigation", "button"]
);

add_action(
    "init",
    function () {
        foreach (['custom-example', 'navigation', 'core/button'] as $block) {
            register_block_type(__DIR__ . "/build/" . $block);
        }
    }
);

/**
 * Global functions
 */
if (!function_exists("asset")) {
    function asset($assetName)
    {
        return apply_filters("getAssetUrl", $assetName);
    }
}
