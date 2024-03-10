<?php
/**
 * Theme Single Post Section for our theme.
 *
 * @package ThemeGrill
 * @subpackage Spacious
 * @since Spacious 1.0
 */
get_header('exercices'); ?>

	<?php do_action( 'spacious_before_posts_content' ); ?>

	<div id="primary" style="width:100%;">
		<div id="content" class="clearfix">
			<?php while ( have_posts() ) : the_post(); ?>
				
				<div class="menu_exercices">
					<?php if(get_the_term_list( $post->ID, 'exercices_theme', '', '', '' ) != ''){ ?>
					Type | <?php echo get_the_term_list( $post->ID, 'exercices_theme', '<span class="type_item">', ' | ', '</span>' ) ?> |
					<?php } ?>
				</div>
				<div class="menu_exercices" style="margin-bottom:20px;padding-left:25px;">
					<?php if(get_the_term_list( $post->ID, 'mine_mots_clefs', '', '', '' ) != ''){ ?>
					Mots-Clefs | <?php echo get_the_term_list( $post->ID, 'mine_mots_clefs', '<span class="type_item">', ' | ', '</span>' ) ?> |
					<?php } ?>
				</div>
				
				<?php get_template_part( 'content', 'single' );  // MAIN CONTENT 
				?>

				<?php get_template_part( 'navigation', 'archive' ); 
				?>

				<?php if ( get_theme_mod( 'spacious_related_posts_activate', 0 ) == 1 ) {
				get_template_part( 'inc/related-posts' );
				}
				?>

				<?php
				if ( get_theme_mod( 'spacious_author_bio', 0 ) == 1 ) :
					if ( get_the_author_meta( 'description' ) ) : ?>
						<div class="author-box clearfix">
							<div class="author-img"><?php echo get_avatar( get_the_author_meta( 'user_email' ), '100' ); ?></div>
							<div class="author-description-wrapper">
								<h4 class="author-name"><?php the_author_meta( 'display_name' ); ?></h4>
								<p class="author-description"><?php the_author_meta( 'description' ); ?></p>
							</div>
						</div>
					<?php endif;
				endif;
				?>

				<?php
					do_action( 'spacious_before_comments_template' );
					// If comments are open or we have at least one comment, load up the comment template
					if ( comments_open() || '0' != get_comments_number() )
						comments_template();
	      		do_action ( 'spacious_after_comments_template' );
				?>

			<?php endwhile; ?>
		</div><!-- #content -->
	</div><!-- #primary -->

	<?php do_action( 'spacious_after_body_content' ); ?>

<?php get_footer('exercices'); ?>





