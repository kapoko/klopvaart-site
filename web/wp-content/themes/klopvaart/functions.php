<?php

/**
 * Loads Knock Knock template files located in the app/ folder
 */
array_map(
    function ($file) {
        $file = "./app/{$file}.php";
        if (!locate_template($file, true, true)) {
            wp_die(sprintf(__("Error locating <code>%s</code>.", "knock-knock"), $file));
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

// function gutenberg_examples_block_categories

add_action(
    "block_categories_all",
    function ($categories) {
        return array_merge($categories, [
            [
                "slug" => "klopvaart-blocks",
                "title" => "Klopvaart Blocks",
            ],
        ]);
    },
    10,
    2
);

function create_block_gutenpride_block_init()
{
    register_block_type(__DIR__ . "/build/custom-example");
}
add_action("init", "create_block_gutenpride_block_init");

/**
 * Plugin Name: Gutenberg examples 01
 */
// function gutenberg_examples_01_register_block()
// {
//     register_block_type(__DIR__);
// }
// add_action("init", "gutenberg_examples_01_register_block");
/**
 * Global functions
 */
if (!function_exists("asset")) {
    function asset($assetName)
    {
        return apply_filters("getAssetUrl", $assetName);
    }
}
