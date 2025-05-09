<?php
/** @var $content */
?>

<div <?php echo get_block_wrapper_attributes(["class" => "py-40"]); ?>>
    <p>hi</p>
    <?php echo do_blocks($content);?>
</div>
