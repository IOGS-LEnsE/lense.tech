<?php
/**
 * Theme Footer Section for our theme.
 *
 * Displays all of the footer section and closing of the #main div.
 *
 * @package    ThemeGrill
 * @subpackage Spacious
 * @since      Spacious 1.0
 */
?>

</div><!-- .inner-wrap -->
</div><!-- #main -->
<?php do_action( 'spacious_before_footer' ); ?>

<footer id="colophon" class="clearfix" style="background-color:#ff960a;color:white;">
	<?php //get_sidebar( 'footer' ); ?>
	<div class="footer-socket-wrapper clearfix" style="background-color:#ff960a;color:white;">
		<div class="inner-wrap" style="background-color:#ff960a;color:white;">
			<div class="footer-socket-area" style="background-color:#ff960a;color:white;">
				<?php do_action( 'spacious_footer_copyright' ); ?>
				<nav class="small-menu clearfix" style="background-color:#ff960a;color:white;">
					<?php
					if ( has_nav_menu( 'footer' ) ) {
						wp_nav_menu( array(
							'theme_location' => 'footer',
							'depth'          => -1,
						) );
					}
					?>
				</nav>
			</div>
		</div>
	</div>
</footer>
<a href="#masthead" id="scroll-up"></a>
</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>
