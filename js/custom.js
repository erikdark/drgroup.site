$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname)
	{
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

$(document).ready(function() {
	var lastScrollTop = 0;
        $(window).scroll(function() {
			
            var winTop = $(window).scrollTop();
            var st = $(this).scrollTop();
			/*if (winTop >= 30) {
                $("body").addClass("sticky-header");

            } else {
                $("body").removeClass("sticky-header");

            }*/
			
		   if (st > lastScrollTop){
			   // downscroll code
			   $("body").removeClass("sticky-header");
		   } else {
			  // upscroll code
			   $("body").addClass("sticky-header");
			   if (winTop <= 30) {
				   $("body").removeClass("sticky-header");
			   }
			   
		   }
		   lastScrollTop = st;
        });
/******* Animation Start ******/
	var $animation_elements = $('.linedraw, .animation');
	var $window = $(window);
	function check_if_in_view() {
		var window_height = $window.height();
		var window_top_position = $window.scrollTop() - 120;
		var window_bottom_position = (window_top_position + window_height);

		$.each($animation_elements, function() {
			var $element = $(this);
			var element_height = $element.outerHeight();
			var element_top_position = $element.offset().top;
			var element_bottom_position = (element_top_position + element_height);
			if ((element_top_position <= window_bottom_position)) {
				$element.addClass('in-view');
			} else {
				$element.removeClass('in-view');
			}
		});
	}
	$window.on('scroll resize', check_if_in_view);
		
	
	$window.trigger('scroll');

/******* Animation End *******/
});