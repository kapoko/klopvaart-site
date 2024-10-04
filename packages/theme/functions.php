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
/**
 * Allowed blocks
 */
// add_filter("allowed_block_types_all", function ($allowed_blocks) {
//     return ["core/paragraph", "core/heading", "gutenberg-examples/*"];
// });

add_action(
    "block_categories_all",
    function ($categories) {
        return array_merge(
            $categories,
            [
            [
                "slug" => "klopvaart",
                "title" => "Klopvaart Blocks",
            ],
            ]
        );
    },
    10,
    2
);

add_action(
    'enqueue_block_editor_assets',
    function () {
        $asset_file  = include plugin_dir_path(__FILE__) . 'build/core.asset.php';

        wp_enqueue_script(
            'core',
            get_stylesheet_directory_uri() . '/build/core.js',
            $asset_file['dependencies'],
            $asset_file['version']
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
    ["navigation"]
);

add_action(
    "init",
    function () {
        register_block_type(__DIR__ . "/build/custom-example");
        register_block_type(__DIR__ . "/build/variation");
        register_block_type(__DIR__ . "/build/navigation");
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
