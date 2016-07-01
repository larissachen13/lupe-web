$(document).ready(function(){


	//smooth scrolling
	$(function() {
  		$('a[href*=#]:not([href=#])').click(function() {
    		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      			var target = $(this.hash);
     			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      		if (target.length) {
	       			$('html,body').animate({
	          		scrollTop: target.offset().top
	        		}, 1000);
        			return false;
      			}
    		}
  		});
	});

	$(".default").addClass('active-menu');

	function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('ul.menu li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        	$('ul.menu li').removeClass("active-menu");
            currLink.parent().addClass("active-menu");
        }
        else{
            currLink.parent().removeClass("active");
        }
    });
}

	$(window).scroll(function(){
		onScroll();
		if($(window).scrollTop()>0) 
			$('header').addClass('header-fixed');
		else{ 
			$('header').removeClass('header-fixed');
			$('header').addClass('header-relative');
		}
	});



	// $(function(){
	// 	var profileTop=$('.profile-area').offset().top;
	// 	$('.profile-area').addClass('profile-absolute');  

	// 	$(window).scroll(function(){
	// 		var windowTop=$(window).scrollTop();
	// 		// var absoluteTop = $('.profile-absolute').css('top'); 
	// 		if((profileTop+150-7)<windowTop){
	// 			$('.profile-area').removeClass('profile-absolute'); 
	// 			$('.profile-area').addClass('profile-fixed');
	// 		}
	// 		else{
	// 			$('.profile-area').addClass('profile-absolute'); 
	// 		}
	// 	});
	// });	
		
	//carousel 			
	$("#carousel-gallery").owlCarousel({
		items: 3, 
		lazyLoad: true, 
		slideSpeed: 1400, 
		rewindSpeed: 1400, 
		navigation: true, 
		navigationText: [
		"<i class='fa fa-angle-left fa-5x'></i>", 
		"<i class='fa fa-angle-right fa-5x'></i>"
		]
	});

	$('a[data-rel^=lightcase]').lightcase();

	//When hover display service-description 
	// $(".service-description span").hide();
	// $(".service-description").hover(function(){
	// 	$(this).prev(".service-photo").addClass('opaque');
	// 	$(this).find("span").show();
	// }, function(){
	// 	$(this).prev(".service-photo").removeClass('opaque');
	// 	$(this).find("span").hide();
	// });

});//Document ready 


$(window).load(function () {
	var heightImage= ($(".service-photo").height()+15);
	$(".serviceDescription").height(heightImage); 
});

$(window).load(function () {
	var heightImage= ($(".service-photo").css('height'));
	$(".service-description").height(heightImage); 
});
