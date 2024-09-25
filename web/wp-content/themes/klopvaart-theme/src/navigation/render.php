<?php
/**
 * @var array $content
 */
?>

<div <?php echo get_block_wrapper_attributes() ?>
    data-wp-interactive="navigation"
    data-wp-watch="callbacks.log">
    <button class="hamburger hamburger--chop" data-wp-on--click="actions.menuToggle" data-wp-class--active="state.menuOpen" type="button">
        <div class="inner">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </button>
    <?php echo $content; ?>
</div>
