<?php
/**
 * The template for displaying Archive page.
 *
 * @package ThemeGrill
 * @subpackage Spacious
 * @since Spacious 1.0
 */
get_header('mine'); ?>

	<?php do_action( 'spacious_before_body_content' ); ?>

	<div id="primary">
		<div id="content" class="clearfix">
		
		Essai
		
		<?php //start by fetching the terms for the region taxonomy
		$terms = get_terms( 'mine_mots_clefs', array(
	    'orderby'    => 'count',
	    'hide_empty' => 0
		) );
		?>

		<?php
		// now run a query for each 
		foreach( $terms as $term ) {
 
	    // Define the query
	    $args = array(
	        'post_type' => 'mine',
	        'mine_mots_clefs' => $term->slug
	    );
	    $query = new WP_Query( $args );
	             
	    // output the term name in a heading tag                
	    echo'<h2>' . $term->name . '</h2>';
	     
	    // output the post titles in a list
	    echo '<ul>';
	     
	        // Start the Loop
	        while ( $query->have_posts() ) : $query->the_post(); ?>
	 
	        <li class="producteurs-listing" id="post-<?php the_ID(); ?>">
	            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	        </li>
	         
	        <?php endwhile;
	     
	    echo '</ul>';
	     
	    // use reset postdata to restore orginal query
	    wp_reset_postdata();
	 
		} ?>
		
		Essai		
					
			<?php if ( have_posts() ) : ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<?php get_template_part( 'content', get_post_format() ); ?>

				<?php endwhile; ?>

				<?php get_template_part( 'navigation', 'archive' ); ?>

			<?php else : ?>

				<?php get_template_part( 'no-results', 'archive' ); ?>

			<?php endif; ?>

		</div><!-- #content -->
	</div><!-- #primary -->

	<?php // spacious_sidebar_select(); 
	?>

	<?php do_action( 'spacious_after_body_content' ); ?>

<?php get_footer('mine'); ?>
