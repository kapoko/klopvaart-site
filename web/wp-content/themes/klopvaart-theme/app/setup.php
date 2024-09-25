<?php

namespace App;

use App\Vite;
use App\ViteAssetVersionStrategy;
use Symfony\Component\Asset\Package;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * Theme setup
 */
add_action("after_setup_theme", function () {
    $container = new ContainerBuilder();

    //$container
    //    ->register("asset", Package::class)
    //    ->addArgument(new ViteAssetVersionStrategy(dirname(__DIR__) . "/dist/.vite/manifest.json"));

    //add_filter("getAssetUrl", function ($assetName) use ($container) {
    //    $uriBase = get_template_directory_uri() . "/dist/";
    //    return $uriBase . $container->get("asset")->getUrl($assetName);
    //});
});

/**
 * Register Knock Knock assets
 */
add_action("enqueue_block_assets", function () {
    //Vite::enqueueScript("assets/js/main.js");

    if (!Vite::isRunning()) {
        //wp_enqueue_style("klopvaart/main", Vite::asset("assets/js/main.css"), [], null);
    }
});

/**
 * Register Knock Knock assets
 */
add_action("enqueue_block_editor_assets", function () {
    //Vite::enqueueScript("assets/js/editor-main.js");

    if (!Vite::isRunning()) {
        //wp_enqueue_style("klopvaart/editor-main", Vite::asset("assets/js/editor-main.css"), [], null);
    }
});

// /**
//  * Register Knock Knock assets
//  */
// add_action("admin_enqueue_scripts", function () {
//     Vite::enqueueScript("assets/js/editor-main.js");

//     if (!Vite::isRunning()) {
//         wp_enqueue_style("klopvaart/main", Vite::asset("assets/js/editor-main.css"), [], null);
//     }
// });

/**
 * Add type module to script tag and nomodule for the legacy bundles
 */
//add_filter( "script_loader_tag",
//    function ($tag, $handle, $src) {
//        if (strpos($handle, "klopvaart") === false) {
//            return $tag;
//        }
//
//        $defaults = ["src" => $src, "id" => $handle . "-js"];
//
//        if (preg_match("(legacy|polyfill)", $handle) > 0) {
//            return wp_get_script_tag(
//                array_merge($defaults, [
//                    "nomodule" => true,
//                    "type" => "text/javascript",
//                ])
//            );
//        }
//
//        return wp_get_script_tag(
//            array_merge($defaults, [
//                "type" => "module",
//                "src" => $src,
//            ])
//        );
//    },
//    10,
//    3
//);
