<?php

/**
 * @var array $content
 */

wp_interactivity_state(
    'navigation',
    ['menuOpen' => false]
);
?>

<div <?= get_block_wrapper_attributes(["class" => "group fixed z-10 lg:relative w-[50%] ml-[50%] lg:w-full max-w-full lg:w-auto lg:container p-4 lg:px-auto lg:py-10 justify-end lg:justify-start flex items-center flex-col lg:flex-row text-white lg:text-(--wp--preset--color--contrast)"]) ?>
    data-wp-interactive="navigation"
    data-wp-class--menu-open="state.menuOpen"
>
    <button type="button" class="hamburger hamburger--chop lg:hidden! ms-auto" data-wp-on--click="actions.menuToggle" data-wp-class--active="state.menuOpen" aria-label="<?= __("Open the menu", "klopvaart") ?>">
        <div class="inner" aria-hidden="true">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </button>

    <div data-wp-watch="callbacks.menuChanged" class="lg:block -translate-x-full lg:translate-x-0 group-[.menu-open]:translate-x-0 transition-transform motion-reduce:transition-none lg:transition-none ease-in-out duration-500 w-[calc(100%-2rem-50px)] max-w-lg lg:max-w-none h-dvh text-2xl lg:w-full lg:h-auto bg-(--wp--preset--color--contrast) lg:bg-transparent fixed lg:static top-0 left-0 px-8 lg:p-0">

        <div class="py-6 lg:hidden">
            <?= do_blocks('<!-- wp:klopvaart/logo {"version":"withText", "size":"big", "color":"#ffffff", "linkEnabled":true} /-->'); ?>
        </div>

        <?= $content; ?>
    </div>
</div>
