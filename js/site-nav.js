var siteNavUtils = (function () {
	
	//Footer nav Drawers
	function footerNavDrawers(){
		$(document).on('click touchstart', '.site__footer--ul-title', function(e){
			if(!$('html, body').hasClass('suspend-toggles')){
				$drawer = $(this).parent().next();
				$drawer.toggle('fast').css('visibility','visible');
			}else{
				return false;
			}
			e.preventDefault();
		});
	}
	
	
	//Show the mobile nav
	function mobileNavShow(action){
			
			if(action === 'show'){
				$('html, body').addClass('lock');
				$('.site__navigation--mobile-responsive').css('left',-400).removeClass('hidden').stop().animate({
					'left':0
				},150);
				$('.body-lock').animate({
					'marginLeft': '75%'
				},150, function(){
					$(this).addClass('active');
				});
			}else{
				$('.site__navigation--mobile-responsive').animate({
					'left':-400
				},150, function(){
					$(this).addClass('hidden');
				});
				$('.body-lock').animate({
					'marginLeft': '0'
				},150, function(){
					$(this).removeClass('active');
					$('html, body').removeClass('lock');
				});
			}
	}
	
	function navCategoryHoverstate(){
		var navTarget = $('.category__breadcrumb-container ul').attr('data-menu-tree');
		$('.category__breadcrumb-container ul li a').each(function(){
			$(this).attr('data-target',navTarget);
		});
		
		$(document).on('mouseenter', '.category__breadcrumb-container ul li a', function(){
			$('.site__navigation--primary-navigation li a[data-menu-tree="'+navTarget+'"]').parent().addClass('hover');
		});
		
		$(document).on('mouseleave', '.site__navigation--primary-navigation li', function(){
			$('.site__navigation--primary-navigation li.hover').removeClass('hover');
		});
	}
	
	//Mobile Nave triggers, assignments
	function mobileNavTriggers(){

		$(document).on('touchstart click', '.site__navigation--primary-navigation li a', function(e){
			if(monitorBreakpoints(960) !== 'larger'){
				var touchMenu = $(this).attr('data-menu-tree');
				mobileNavShow(action='show');
			}
			e.preventDefault();
		});
		
		$(document).on('touchstart click', '.js-mobile-close', function(e){
			mobileNavShow(action='hide');
			e.preventDefault();
		});
		
		$(document).on('touchstart click', '.body-lock.active', function(e){
			mobileNavShow(action='hide');
			e.preventDefault();
		});
		
		$(document).on('click', '.site__search button', function(e){
			if(monitorBreakpoints(960) !== 'larger'){
				e.stopPropagation();
				e.preventDefault();
				$('.site__search').toggleClass('active-search');
				$(this).prev().focus();
			}
		});
		
		$(window).on('resize', function(){
			if($(window).width() >= 910){
				if(!$('.site__navigation--mobile-responsive').hasClass('hidden')){
					mobileNavShow(action='hide');	
				}
				if($('.site__search').hasClass('active-search')){
					$('.site__search').toggleClass('active-search');
				}
			}
		});
	}
	
	
	//Mobile nav drawers
	function mobileNavDrawers(){
		$(document).on('click', '.js-mobile-drawer', function(e){
			$(this).next().toggleClass('hidden active-drawer');
			$(this).toggleClass('active active-drawer');
			e.preventDefault();			
		});
	}
	
	
	//Fancy nav category pager for five fingers
	function navCategoryPager(){
		var i = 0,
			x = 0;
		$('.js-nav-categories li:first-child a').addClass('active');
		$('.js-nav-categories li a').each(function(){
			i++;
			$(this).attr('data-category', 'index-'+i);
		});
		
		$('.js-nav-category-bank').each(function(){
			x++;
			$(this).addClass('index-'+x);
			if($(this).hasClass('index-1')){
				$(this).removeClass('hidden').addClass('active-category first-index');
			}
		});
		
		function swapCategory(category){
			$('.js-nav-category-bank.active-category').animate({
				opacity	:	0
			},200,function(){
				$(this).addClass('hidden').removeClass('active-category');
			});
			$('.js-nav-category-bank.'+category).css('opacity',0).removeClass('hidden').css({
				'position'		:	'absolute',
				'top'			:	15,
				'left'			: 	0,
				'right'			:	0,
				'marginLeft'	:	'auto',
				'marginRight'	:	'auto'
			}).animate({
				'opacity'	:	1
			},200,function(){
				$(this).removeAttr('style').addClass('active-category');
				$('.js-meganav').removeAttr('style');
			});
		}
		
		$(document).on('click', '.js-nav-categories li a',function(e){
			if(!$(this).hasClass('active') && !$(this).hasClass('null')){
				var category = $(this).attr('data-category'),
					menuHeight = $('.js-meganav').outerHeight();
				$('.js-meganav').css('height',menuHeight);
				$('.js-nav-categories li a.active').removeClass('active');
				$(this).addClass('active');
				swapCategory(category);
			} else if($(this).hasClass('null')){
				return true;
			}else{
				return false;
			}
			e.preventDefault();
		});
	}
	
	
	//Clears all submenus
	function clearSubMenus(){
		$('.site__navigation--soles-expanded li').each(function(){
			$(this).find('ul').hide();
		});
	}
	
	//Mega Nav drop-down draws
	function megaNavExpanding(){
		$(document).on('click', '.site__navigation--soles-expanded li', function(e){
			clearSubMenus();
			$(this).find('ul').css({
				'visibility'	:	'visible',
				'display'		:	'block'
			});
			e.preventDefault();
		});
		
		$(document).on('mouseleave', '.site__navigation--primary-navigation',function(){
			clearSubMenus();
		});
	}
	
	//Helper function to check a specific breakpoint
	function monitorBreakpoints(size){
		if($(window).width() >= size){
			return 'larger';
		}else if($(window).width() <= size){
			return 'smaller';
		}
	}
	
	//Helper function to enable/disable particular DOM elements on resize
	function monitorScreenWidth(){
		
		function checkWidthClass(){
			var screenW = (function(){ return $(window).width()})();
			if(screenW >= 399){
				if(!$('html, body').hasClass('suspend-toggles')){
					$('html, body').toggleClass('suspend-toggles');
					$('.js-footer-toggle').each(function(){$(this).removeAttr('style')});
				}
			}
			
			if(398 >= screenW){
				if($('html, body').hasClass('suspend-toggles')){
					$('html, body').toggleClass('suspend-toggles');
				}
			}
		}
		
		$(window).on('resize',function(){
			setTimeout(function(){
				checkWidthClass();
			}, 200);
		});
		
		checkWidthClass();
	}
	
	function init(){
		megaNavExpanding();
		navCategoryHoverstate();
		navCategoryPager();
		footerNavDrawers();
		mobileNavDrawers();
		monitorScreenWidth();
		mobileNavTriggers();
	}

	return {
		init	:	init
	};

})();