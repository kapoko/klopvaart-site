<?php

namespace App;

use Exception;

class Vite
{
    private static bool $running;

    /**
     * If on local environment, it checks if the vite server is running
     */
    public static function isRunning(string $testAsset = "assets/js/main.js"): bool
    {
        if (isset(self::$running)) {
            return self::$running;
        }

        // Never run tests in prod
        if ($_ENV["APP_ENV"] !== "dev") {
            return self::$running = false;
        }

        // Quick test to see if vite server is up
        $ch = curl_init($_ENV["VITE_HOST_INTERNAL"] . "/" . $testAsset);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if ($code === 200) {
            self::loadReactRefreshRuntime();
            return self::$running = true;
        }

        return self::$running = false;
    }

    /**
     * Finds the asset url from vite server (if it is running), or the manifest file
     */
    public static function asset(string $entry): string
    {
        if (self::isRunning($entry)) {
            return $_ENV["VITE_HOST_PUBLIC"] . "/" . $entry;
        }

        try {
            return asset($entry);
        } catch (Exception $e) {
            wp_die(
                "Asset <code>$entry</code> not found. Did you run <code>npm start</code> or <code>npm run build</code>?"
            );
        }
    }

    /**
     * Enqueues a script and when vite is not running the accompanied legacy bundle
     */
    public static function enqueueScript(string $entry): void
    {
        ["filename" => $handle, "extension" => $extension] = pathinfo($entry);

        wp_enqueue_script("klopvaart/$handle", Vite::asset($entry), [], null);

        if (!self::$running) {
            wp_enqueue_script(
                "klopvaart/$handle/legacy",
                Vite::asset("assets/js/$handle-legacy.$extension"),
                ["klopvaart/polyfill"],
                null
            );
        }
    }

    /**
     * Loads the vite react refresh runtime so HMR is also enabled for react
     */
    private static function loadReactRefreshRuntime(): void
    {
        add_action(
            "wp_head",
            function () {
                $script = <<<EOT
<script type="module">
    import RefreshRuntime from "%s/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.\$RefreshReg\$ = () => {}
    window.\$RefreshSig\$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
</script>
EOT;
                printf($script, $_ENV["VITE_HOST_PUBLIC"]);
            },
            8
        );
    }
}
