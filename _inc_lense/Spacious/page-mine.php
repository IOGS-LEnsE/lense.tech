<?php
/*
Template Name: Mine
*/

get_header(); ?>

 <?php $loop = new WP_Query( array( 'post_type' => 'mine', 'posts_per_page' => 10, 'paged' => $paged) ); ?>

 <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>

 <?php the_title( '<h2 class="entry-title"><a href="' . get_permalink() . '" title="' . the_title_attribute( 'echo=0' ) . '" rel="bookmark">', '</a></h2>' ); ?>
 
 <?php the_terms( $post->ID, 'mine_support', 'Type de Support : ' ); ?>
 
 <div class="entry-content">

 </div>

 <?php endwhile ; ?>
<?php get_footer(); ?>