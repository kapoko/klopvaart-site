<?php

/**
 * Title: Footer Wrap
 * Slug: klopvaart/footer
 * Categories: footer
 */

?>

<!-- wp:group {"tagName":"footer","lock":{"move":true,"remove":true}, "className":"site-footer","layout":{"type":"constrained"}} -->
<footer class="wp-block-group">
    <!-- wp:paragraph -->
    <p>&copy; <?php echo date('Y'); ?> My Site. All rights reserved.</p>
    <!-- /wp:paragraph -->

    <!-- wp:social-links {"iconColor":"white","openInNewTab":true} -->
        <!-- wp:social-link {"url":"https://twitter.com/myprofile","service":"twitter"} /-->
        <!-- wp:social-link {"url":"https://github.com/myprofile","service":"github"} /-->
    <!-- /wp:social-links -->
</footer>
<!-- /wp:group -->
