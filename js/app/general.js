define(["jquery","allsite"],function($,gen){

	$(document).ready(function(){
		/* Browser feature detection and fixes
		-----------------------------------------------------------------*/
		if(Modernizr.svg===false) {//target browsers that don't support SVG
			//update all instances of SVG in img tag
			var $svgImage = $('img[src*="svg"]');
			$svgImage.each(function(){
				$(this).attr('src', function() {
					var tempSrc = $(this).attr('src');
					var newSrc = tempSrc.replace('.svg', '.png');
					$(this).attr('src',newSrc);
				});
			});
			//fix mobile header
			var mobileHeaderObj = $('#header-mobile');
			mobileHeaderObj.removeClass("default-header");
			mobileHeaderObj.addClass("no-svg");
		}
		if(!Modernizr.input.placeholder){//target browsers that doesn't support placeholder attribute
			$('[placeholder]').focus(function() {
			var input = $(this);
				if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
					}
				})
			});
		}
		Modernizr.load({
			test : Modernizr.touch//target browsers that support touch events
			//if old browser load the shiv
			,yep : '/js/lib/fastclick.min.js'
			,complete: function(){
				$(function() {
					if(typeof FastClick !=='undefined'){
						FastClick.attach(document.body);
					}
				});
			}
		});
		/* layout hacks
		-----------------------------------------------------------------*/
		var bodyClass = $('body').attr("class");

		function resetCols(){
			$('#main,#leftcol').css({
				'height':'auto'
				,'min-height':'0'}
			);
		}

		function equalizeVerticalCol(){
			//start off by resetting the columns
			resetCols();

			if($(window).width() >= 768){
				console.log('window should be greater than 768 px');
				var mainColHeight = $('#main').height();
				var verticalNavColHeight = $('#leftcol').height();
				console.log('vertical nav height is ' + verticalNavColHeight);
				if(verticalNavColHeight > mainColHeight){
					$('#main').css('min-height',verticalNavColHeight);
				}
				else{
					$('#main').css({
						'height':'auto'
						,'min-height':'0'}
					);
				}
			}else{
				console.log('window width is ' + $(window).width());
				$('#main').css({
					'height':'auto'
					,'min-height':'0'}
				);
			}
		}
		var verticalBodyClassPattern = /vertical-nav(.)*/i;
		if(verticalBodyClassPattern.test(bodyClass)){
			equalizeVerticalCol();
			$(window).resize(function(){
				equalizeVerticalCol();
			});
		}
		/* anything else that needs to appear on all pages
		-----------------------------------------------------------------*/
	})
});