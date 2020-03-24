import './styles.scss';

/*
 * 1. Generate menu from content
 * 2. Add icon to links
 * 3. Mobile Menu
 * 4. Tabs
 * 5. Light Box ( Need to be behind the Tabs )
 * 6. Go To Top
*/

( function( $ ) {
"use strict";
 
    $( function() {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		
		/* 
		 ---------------------------
		 1. Generate menu from content
		 ---------------------------
		 */ 	
		var menu = '';
		$( '.bs-docs-sections__wrapper section' ).each( function()  {
			
			var $section = $( this );
			
			//---- Sub menu
			var subMenu = '';
			if ( $section.find( 'h2' ).length > 0 ) {
				subMenu = '<ul class="nav">';
				$section.find( 'h2' ).each( function()  {

					var id  = 'subnav-' + Math.random() * 10000000000000000000,
						txt = $( this ).text(),
						hot = $( this ).hasClass( 'hot' ) ? 'hot' : '';

					$( this ).attr( 'id', id );

					subMenu += '<li><a class="'+hot+'" href="#'+id+'">'+txt+'</a></li>';


				});		
				subMenu += '</ul>';	
			}
			
			
			//---- Section title
			$section.find( 'h1.title' ).each( function()  {

				
				var id  = 'nav-' + Math.random() * 10000000000000000000,
					txt = $( this ).text(),
					hot = $( this ).hasClass( 'hot' ) ? 'hot' : '';
				
				$( this ).closest( 'section' ).hide();
				
				$( this ).attr( 'id', id );
				
				menu += '<li class="nav-header">'+txt+'</li>';
				

			});
			

			//---- Primary menu
			$section.find( 'h1:not(.title)' ).each( function()  {

				var id  = 'nav-' + Math.random() * 10000000000000000000,
					txt = $( this ).text(),
					hot = $( this ).hasClass( 'hot' ) ? 'hot' : '';
				
				$( this ).attr( 'id', id );
				
				menu += '<li><a class="'+hot+'" href="#'+id+'">'+txt+'</a>'+subMenu+'</li>';
				

			});
			

		});	
		
		menu += '<li><a id="top" class="to-top" href="#content"><span>Back To Top</span></a></li>';
		
		
		$( '.bs-docs-sidenav' ).html( menu ).promise().done( function(){
			
			//sub menu arrow
			$( '.bs-docs-sidenav > li' ).each( function() {
				if ( $( this ).find( 'ul' ).length > 0 ) {
					if ( $( this ).find( '.sidr-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="sidr-nav-arrow"><i class="fa fa-angle-down" aria-hidden="true"></i></em>' );
				}
			} );
			
			
		});
		

		
		
		/* 
		 ---------------------------
		 2. Add icon to links
		 ---------------------------
		 */ 	
		$( '.bs-docs-sections__wrapper a:not(.anchorjs-link)' ).each( function()  {
			$( this ).append( ' <i class="fa fa-link fa-spin" aria-hidden="true"></i>' );
		});	
		

		
		/* 
		 ---------------------------
		 3. Mobile Menu
		 ---------------------------
		 */ 		

		//-------- Mobile Menu
		var $toggle     = $( '.menu-mobile__toggle' ),
			$toggleBody = $( 'body' );


		$toggle.on( 'touchstart click', function( e ) {
			e.preventDefault();

			//Prevents further propagation of the current event in the capturing and bubbling phases.
			e.stopPropagation(); 

			$( this ).toggleClass( 'is-opened' );
			if ( $( this ).hasClass( 'is-opened' ) ) {

				//Toggle effect
				$toggleBody.addClass( 'js-menu-opened' );
			} else {
				$toggleBody.removeClass( 'js-menu-opened' );
			}

		});

		//Mobile menu mask event
		$( '.menu-mobile__mask, .bs-docs-sidenav li a' ).on( 'click', function() {
			
			
			if ( $( this ).attr( 'data-sub' ) != 1 ) {
				$toggle.removeClass( 'is-opened' );
				$toggleBody.removeClass( 'js-menu-opened' );	
			}
			

		});

		mobileMenuInit( windowWidth ); 

		// Close the menu on window change
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				$toggleBody.removeClass( 'js-menu-opened' );
				$toggle.removeClass( 'is-opened' );
				mobileMenuInit( windowWidth );


			}
		});



		/*
		 * Initialize mobile menu
		 *
		 * @param  {Number} w                  - Returns width of browser viewport.
		 * @return {Void}                      - The constructor.
		 */
		function mobileMenuInit( w ) {

			if ( w <= 768 ) {
				$( '.bs-docs-sidenav > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						$( this ).find( ' > a' ).attr( 'data-sub', 1 );
					}
				} );		
			}


		}
			
		
	
	

		/* 
		 ---------------------------
		 4. Tabs
		 ---------------------------
		 */ 
		$( '.tabs' ).accTabs();
	
		
		
		/* 
		 ---------------------------
		 5. Light Box ( Need to be behind the Tabs )
		 ---------------------------
		 */ 	
		var $hideEl = $( '.bs-docs-sidebar__wrapper, .brand, [role="tablist"]' );
		 
		$( 'img' ).each( function()  {
			$( '<div class="modal"><span class="close">&times;</span><div class="imgwrapper"><img src="'+$( this ).attr( 'src' )+'"></div></div>' ).insertAfter( $( this ) );
		});
		
		$( document ).on( 'click', 'img', function() {
			
			//display image
			var $imgbox = $( this ).next( '.modal' );
			$imgbox.show();

			//tabs
			var $tabs = $( this ).closest( '.tabs' );
			$( '.tabs' ).addClass( 'inactivated' );
			$tabs.removeClass( 'inactivated' );
			
			//
			$hideEl.addClass( 'inactivated' );
			
		});
		
		
		$( document ).on( 'click', '.modal .close', function() {
			
			//display image
			var $imgbox = $( this ).closest( '.modal' );
			$imgbox.hide();
			
			
			//tabs
			$( '.tabs' ).removeClass( 'inactivated' );
			
			//
			$hideEl.removeClass( 'inactivated' );
		});
		
		$( document ).on( 'click', '.modal', function() {
			
			//display image
			$( this ).hide();
			
			//tabs
			$( '.tabs' ).removeClass( 'inactivated' );
			
			//
			$hideEl.removeClass( 'inactivated' );
		});
		
		
		/* 
		 ---------------------------
		 6. Go To Top
		 ---------------------------
		 */ 
		$( document ).on( 'click', '.to-top', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 250);
		});
	
		$( window ).on( 'scroll', function() {
			if ($(this).scrollTop() > 300) {
				$('.to-top').addClass('visible');
			} else {
				$('.to-top').removeClass('visible');
			}
		});
			
	
			 

	} );
    
} ) ( jQuery );

