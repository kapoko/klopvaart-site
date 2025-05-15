<?php

/**
 * Loads Knock Knock template files located in the app/ folder
 */

array_map(
    function ($file) {
        $file = "./app/{$file}.php";
        if (!locate_template($file, true, true)) {
            wp_die(sprintf("Error locating <code>%s</code>.", $file));
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

        wp_set_script_translations("core", "klopvaart", get_stylesheet_directory_uri() . '/languages');
    }
);

add_action(
    'enqueue_block_assets',
    function () {
        $asset = include get_stylesheet_directory() . '/build/global.asset.php';

        wp_enqueue_script(
            'global',
            get_stylesheet_directory_uri() . '/build/global.js',
            $asset['dependencies'],
            $asset['version']
        );

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
        $file = "./src/core/{$blockName}/index.php";
        if (!locate_template($file, true, true)) {
            wp_die(sprintf("Error locating <code>%s</code>.", $file));
        }
    },
    ["columns", "navigation", "button", "spacer", "heading"]
);

/**
 * Register custom blocks
 */
add_action(
    "init",
    function () {
        wp_register_block_types_from_metadata_collection(
            __DIR__ . '/build',
            __DIR__ . '/build/blocks-manifest.php'
        );
    }
);

add_action(
    "after_setup_theme",
    function () {
        load_theme_textdomain("klopvaart", get_template_directory() . '/languages');
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

add_action('wp_head', function () {
    $title = get_bloginfo("name");
    $description = get_bloginfo("description");
    $language = get_bloginfo("language");
    $url = get_bloginfo("url");
    $image = get_stylesheet_directory_uri() . "/assets/images/opengraph.jpg";

    $meta = <<<HTML
        <meta name="description" content="{$description}">
        <meta name="keywords" content="Klopvaart, Centraal Wonen, Woongroep">
        <meta property="og:title" content="{$title}">
        <meta property="og:description" content="{$description}">
        <meta property="og:site_name" content="{$title}">
        <meta property="og:locale" content="{$language}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{$url}">
        <meta property="og:image" content="{$image}">
    HTML;

    echo $meta . "\n";
});
