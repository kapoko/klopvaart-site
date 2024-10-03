<?php
/** @var array $attributes */

$current_year = date("Y");

if (! empty($attributes['startingYear']) && ! empty($attributes['showStartingYear'])) {
    $display_date = $attributes['startingYear'] . ' – ' . $current_year;
} else {
    $display_date = $current_year;
}
?>

<p <?php echo get_block_wrapper_attributes(["class" => "text-6xl text-orange-400"]); ?>>
    © <?php echo esc_html($display_date); ?>
</p>
