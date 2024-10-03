<?php
/**
 * @var array $content
 */

wp_interactivity_state(
    'navigation',
    ['menuOpen' => false]
);


?>

<div <?php echo get_block_wrapper_attributes(["class" => "max-w-full lg:container mx-auto px-4 py-2 lg:py-10 justify-end lg:justify-start flex items-center"]) ?>
    data-wp-interactive="navigation">

    <div class="lg:block" data-wp-class--hidden="!state.menuOpen">
        <?php echo $content; ?>
    </div>

    <button class="hamburger hamburger--chop lg:hidden" data-wp-on--click="actions.menuToggle" data-wp-class--active="state.menuOpen" type="button">
        <div class="inner">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </button>
</div>
