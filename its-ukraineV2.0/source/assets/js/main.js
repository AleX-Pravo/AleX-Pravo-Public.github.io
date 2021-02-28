;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        screenMdMin = 1080;

    $(document).ready(function () {
        mobileOpen();
        cookies();
        mainSearch();
        setBackgroundOnMainPage();
        filterOpen();
        mainInner();
        mainHeader();
        mainFooter();
        mainReadmore();
        liftingOnScroll();
        //sortList();

        //positionDropMenu();
        //indexScrollMagic();

        // nested recursive menu's action

        layout.on('click', '.nested-menu__button', function(e) {
            e.preventDefault();

            let self = $(this);

            if (self.hasClass('go-forward')) {
                self.closest('ul').addClass('move-out');
                self.closest('a').next('.is-hidden').removeClass('is-hidden');
            } else if (self.hasClass('go-back')) {
                self.closest('ul').addClass('is-hidden').closest('.has-children').closest('ul').removeClass('move-out');
            }
        });


        //анимируем линию .line при скроле
        $(function () {

            var currentScroll = 0;
            // прикрепляем .bigboard__blur вверх
            $(window).scroll(function (e) {
                if ($(window).width() >= 1024) {
                    let scroll = $(window).scrollTop(),
                        el = $('.bigboard__blur--fixed'),
                        headerHeight = $('.header--light').height(),
                        bigBoard = $('.bigboard').outerHeight(),
                        bigBoardBlur = $('.bigboard__blur').outerHeight(),

                        ly = $('#layout');

                    if (scroll > headerHeight + bigBoard - bigBoardBlur) {

                        if (!el.hasClass('fixed')) {
                            el.addClass('fixed');
                            ly.addClass('l-active');
                        }
                    } else {
                        if (el.hasClass('fixed')) {
                            el.removeClass('fixed');
                            ly.removeClass('l-active');
                        }
                    }
                }
                // Строка загрузки
                let part = $(window).scrollTop() / ($(document).height() - $(window).height());
                $(".progress-bar").css({
                    "width": (100 * part | 0) + "%"
                });
                $('progress').attr('value', part);
            });
        });

        //- up button moves

        $(document).scroll(function () {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop,
                up = $('.up');

            if (scrolled > 100 && $('.up:hidden')) {
                up.fadeIn();
            } else {
                up.fadeOut();
            }
        });

        $(document).on('click','.up', function (e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 800);
        });

        layout.on('click', '#shadow, .close',  function() {
            $('.mobile-sidebar').removeClass('move');
            $('html').css('overflow', '');
            $('#shadow').fadeOut();
        });

        layout.on('click', '.filter__section-arrow',  function() {
            $(this).closest('.filter__section').find('.filter__section-block').slideToggle();
        });

        //При клике на "Додати коментар" текущий блок убираем а "Відгук про маршрут" показываем
        $(document).on('click', '.add-comment a', function(){
            $(this).parent().removeClass('active');
            $(this).closest('.add-comment').next('.response').addClass('active');
        });

        // Закрыть окно .response
        $(document).on('click', '.response .close', function(){
            $(this).closest('.response').removeClass('active');
            $(this).closest('.response').prev('.add-comment').addClass('active');
        });

        //Показать окно - добавить комент при клике на кнопку answer__button
        $(document).on('click', '.answer__button', function(){
            $(this).closest('.answer').next('.tab-content--response').find('.response').addClass('active');
        });

        // Сортировка меню Usera
        function sortList(){
            layout.on('click', '.bigboard-user__menu-box:not(.active)', function(e) {
                e.preventDefault();
                $(this).addClass('active').siblings().removeClass('active');

                let list = $('.catalog');
                if ($(this).hasClass('active') && list.hasClass('active')) {
                    list.removeClass('');
                } else {
                    list.addClass('active');
                }
            });
        }

        // Скрипт счетчика на корзине
        $(document).on('click', '.quantity__button--minus', function (e) {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $(document).on('click', '.quantity__button--plus', function (e) {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
        // конец скрипта счетчика на корзине


        function setBackgroundOnMainPage(){
            if(('.layout--scrollmagic').length) {
                let carousel = $('.carousel');

                carousel.each(function(i, el){
                    let image = $(el).find('.__bg').data('src');

                    $(el).closest('.panel-box').css('background-image', 'url('+ image +')');
                });
            }
        }
    // Прячем и показываем хедер при скроле + липкий bigboard__blur
        $(document).ready(function () {
            //прячем и показываем хедер при скроле
            let mainHeader = $('.__scroll'),
                bigBoardHeight = $('.bigboard').outerHeight(),
                boardImg = ($('.bigboard img').length > 0) ? $('.bigboard img').outerHeight() : $('.header').outerHeight(),
                bigBoard = $('.bigboard__blur'),
                bigBoardContainer = $('.bigboard'),
                workingHeight = 0,
                lastScrollTop = 0;

            $(document).scroll(function (e) {
                let headerHeight = mainHeader.height(),

                    bigBoardBlurH = (bigBoard.length) ? bigBoard.outerHeight() : 0,
                    st = $(document).scrollTop();

                if ($(window).width() >= 1024) {

                    workingHeight = (bigBoardHeight != undefined ) ? headerHeight + bigBoardHeight - bigBoardBlurH : headerHeight

                    if (st > lastScrollTop && st >= workingHeight) {
                        //прокрутка вниз
                        mainHeader.addClass('hide');
                        bigBoard.css('top', 0);

                    } else if (st < workingHeight || st == 0) {
                        mainHeader.removeClass('hide');
                        mainHeader.removeClass('animation');
                        bigBoard.css('top', 'auto');


                    } else {
                        //прокрутка вверх
                        mainHeader.addClass('animation');
                        bigBoard.css('top', headerHeight + 'px');
                        mainHeader.removeClass('hide');
                    }
                }

                // скрипт позволяет крепить блок blur к верху в слайдере
                if (st > bigBoardHeight) {
                    $('.bigboard.swiper-container-android .swiper-slide, .swiper-wrapper').css('transform', 'none');
                } else {
                    $('.bigboard.swiper-container-android .swiper-slide, .swiper-wrapper').css('transform', 'initial');
                }
                // конец скрипта

                if ($(window).width() < 1024) {
                    if (st > boardImg - headerHeight) {
                        mainHeader.addClass('sticky');
                        bigBoardContainer.addClass('sticky');
                    } else {
                        mainHeader.removeClass('sticky');
                        bigBoardContainer.removeClass('sticky');
                    }
                }
                lastScrollTop = st;
            });
        });

        $("#parallax").mousemove(function(e) {
            parallaxIt(e, ".parallax__forward", 10);
            parallaxIt(e, ".parallax__back", -10);
        });

        function parallaxIt(e, target, movement) {
            var self = $("#parallax");
            var relX = e.pageX - self.offset().left;
            var relY = e.pageY - self.offset().top;

            TweenMax.to(target, 1, {
                x: (relX - self.width() / 2) / self.width() * movement,
                y: (relY - self.height() / 2) / self.height() * movement
            });
        }

        $('.drop-item .submenu').perfectScrollbar();
    });

    $(window).on('load', function () {
        reviewReadmore();
    });

    $(window).on('resize', function () {
        mainInner();
        mainHeader();
        mainFooter();
        liftingOnScroll();
        if (window.innerWidth >= 1024) {
            $('.header-device .button').css({
                'opacity': '',
                'transition': ''
            });
            $('.header-device .drop').css('transform', '');
            $('.header-device').removeClass('open');
            setTimeout(function() {
                $('#deviceMenu').remove();
                $('html').css('overflow', '');
            }, 200);
            $(document).unbind('click.deviceMenu');

            $('.sidebar').css('transform', '');
            $('#deviceContols').remove();
            $('html').css('overflow', '');
            $(document).unbind('click.deviceContols');
        }
    });

    function mobileOpen() {
        layout.on('click', '.mobile-menu__button', function(e) {
            e.preventDefault();

            let $drop = $(this).next('.mobile-menu__drop');

            $('html').css('overflow', 'hidden');
            $('#shadow').fadeIn();
            $drop.addClass('move');
        });
    }

    // cookies

    function cookies() {
        let cookies = $('.cookies');

        if (localStorage.getItem('cookies-accept') === null) {
            cookies.removeClass('hide');
        }

        cookies.on('click', '.submit, .cookies__close', function (e) {
            e.preventDefault();
            cookies.addClass('hide');
            localStorage.setItem('cookies-accept', 'y');
        });
    }

    // mainSearch
    function mainSearch() {
        var searchClass = 'open',
        textInputClass = '.input-text',
        container = $('#search');

        $('.header').on('click', '.searchButton', function(e) {

            if (!container.hasClass(searchClass)) {
                e.preventDefault();
                container.addClass(searchClass);
                $('.header').addClass('header--search');
                $('.header-device').css('display' , 'none');
                $('.header__searchButton').css('display' , 'none');
                var firstClick = true;

                $(document).bind('click.searchProcessing', function(e) {
                    if (!firstClick && !$(e.target).closest(container).length) {
                        container.removeClass(searchClass);
                        container.find('.drop').hide();
                        $('.header').removeClass('header--search');
                        $('.header-device').css('display' , '');
                        $('.header__searchButton').css('display' , '');
                        $(document).unbind('click.searchProcessing');
                    }

                    firstClick = false;
                });
            } else {
                container.removeClass(searchClass);
                $('.header').removeClass('header--search');
                $('.header-device').css('display' , '');
                $('.header__searchButton').css('display' , '');
                $(document).unbind('click.searchProcessing');
            }
        })
        .on('click keyup', textInputClass, function(e) {
            if (e.keyCode === 13) {
                $('form', '#search').submit();
            }
        })
        .on('submit', 'form', function(e) {
            var inputText = $(textInputClass, this);
            if (!inputText.length || !inputText.val().length) {
                e.preventDefault();
                return false;
            }
        });

        $('.header').on('click', '.searchButton__close', function(e) {
            container.removeClass(searchClass);
            $('.header').removeClass('header--search');
            $('.header-device').css('display' , '');
            $('.header__searchButton').css('display' , '');
            $(document).unbind('click.searchProcessing');

        });
    }

    $('.contacts-list a.mask').on('click', function (e) {
        return e.preventDefault(),
        $('.contacts-list a.mask').fadeOut('slow').promise().done(function () {
            return $('.contacts-list.js').hide(),
            $('.contacts-list.no-js').show()
        })
    });

    // Position navigation drop menu
    $('.primary-menu').on('mouseenter', '.parent', function() {
        var viewportWidth = $('.header').outerWidth(),
            prevall = $(this).prevAll(),
            drop = $(this).children('.drop'),
            prevallWidth = 0;

        prevall.each(function(index) {
            var rect = this.getBoundingClientRect();
            prevallWidth += "width" in rect ? rect.width : rect.right - rect.left;

            if (index === prevall.length - 1) {
                prevallWidth += rect.left;
            }
        });

        var allWidth = prevallWidth + drop.outerWidth() - 121 + 15;

        if(allWidth > viewportWidth) {
            drop.css('left', viewportWidth - allWidth - 121);
        }
    });

    // Open/Close device menu
    $('#layout').on('click', '.header-device .header-button, .header-device .button-close', function(e) {
        e.preventDefault();

        var html = 'html',
            parrent = 'header-device',
            button = 'header-device .button-close',
            drop = 'header-device .drop',
            name = 'deviceMenu';

        if ($('.' + drop).css('transform').split(',')[4] != 0) {
            var firstClick = true;

            $(html).css('overflow', 'hidden');
            $('.' + parrent).addClass('open');
            $('.' + drop).css('transform', 'translateX(0)');
            $('body').addClass('fixed');

            setTimeout(function() {
                $('.' + button).css({
                    'opacity': '1',
                    'transition': 'all .2s linear'
                });
            }, 200);

            $('body').append('<div id="' + name + '" style="position: fixed; z-index: 102; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest($('.' + drop)).length == 0) {
                    $('.' + button).css({
                        'opacity': '',
                        'transition': ''
                    });
                    $('.' + drop).css('transform', '');
                    $('.' + parrent).removeClass('open');
                    $('body').removeClass('fixed');

                    setTimeout(function() {
                        $('#' + name).remove();
                        $(html).css('overflow', '');
                    }, 200);

                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });

    $('#layout').on('click', '.filter-all__button', function(e) {
        var $drop = $('.filter-all__button + .drop');

        if (!$drop.hasClass('open')) {
            $('.filter-all__button a').css({'color': '#fff','background':'#5FB46E','border':'1px solid #5FB46E','border-left':'1px solid #E5E5E5'});
            $('.filter-all__button').css('z-index', '105');
            $('.drop').css('z-index', '105').addClass('open');
            $('body').append('<div id="deviceFilter" style="position: fixed; z-index: 102; top: 0; right: 0; bottom: 0; left: 0; background: rgba(18, 18, 18, 0.75);"></div>');
        } else {
            $('.filter-all__button a').css({'color': '','background':'','border':'','border-left':''});
            $('.filter-all__button').css('z-index', '');
            $('.drop').css('z-index', '').removeClass('open');

            document.querySelector('#deviceFilter').remove();
        }
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.filter-all'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $('.filter-all__button a').css({'color': '','background':'','border':'','border-left':''});
            $('.filter-all__button').css('z-index', '');
            div.children('.drop').css('z-index', '').removeClass('open');

            var deviceFilter = document.querySelector('#deviceFilter');

            if (deviceFilter) {
                document.querySelector('#deviceFilter').remove();
            }
        }
    });

    if (window.innerWidth <= 768) {
        let $width = $('.dwellings__img').width();
        $('.dwellings__info-top').outerWidth($width);
        $('.dwellings__info-bottom').outerWidth($width);
    }

    //- up button moves
    $(document).scroll(function () {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop,
            up = $('.up');

        if (scrolled > 100 && $('.up:hidden')) {
            up.fadeIn();
        } else {
            up.fadeOut();
        }

        if ((scrolled + $(window).height() - up.height()) >= $('.footer').offset().top) {
            up.addClass('absolute');
        } else {
            up.removeClass('absolute');
        }
    });

    function filterOpen() {
        $(document).on('click', '.toggle-filters-mobile-slide', function(e) {
            e.preventDefault();

            let $drop = $('.dwelling-filter__filter'),
                $header = $('.header').height();
            $('html').css('overflow', 'hidden');
            $drop.css('top', $header);
        });
    }

    $(document).on('click', '.dwelling-filter__close',  function() {

        let $drop = $('.dwelling-filter__filter');

        $('html').css('overflow', '');
        $drop.css('top', '');
    });


    function mainInner(){
        let $header = $('.header').height();

        if ($('.header--store').length > 0 && window.innerWidth >= 768){
            $('.main--inner').css('margin-top', $header);

        } else {
            $('.main--inner').css('margin-top', $header + 20);
        }
    }

    function mainHeader(){
        let $header = $('.header').height();

        if ($('.header--light').length > 0 && window.innerWidth >= 1024){
            $('.main--header').css('margin-top', $header);

        } else {
            $('.main--header').css('margin-top', '');
        }
    }

    function mainFooter(){
        let $footer = $('.footer').height();

        if (window.innerWidth < 1024){
            $('.main').css('margin-bottom', $footer);

        } else {
            $('.main').css('margin-bottom', '');
        }
    }

    function mainReadmore(){

        $('.review__readmore').click(function(){
            let self = $(this),
                text = self.prev('.review__text'),
                textHeight = self.prev('.review__text').height(),
                inner = text.find('.review__text-inner').height(),
                innerText = (text.hasClass('open')) ? self.data('open') : self.data('hide');

            self.text(innerText);

            if (!text.hasClass('open')) {
                text.addClass('open').css('height', inner);
            } else {
                text.removeClass('open').css('height', '');
            }

        });
    }

    function reviewReadmore(){
        let text = $('.review__text');

        if (text.length > 0) {

            text.each(function (){

            let textHeight = $(this).height(),
                inner = $(this).find('.review__text-inner').height(),
                button = $(this).next('.review__readmore');


                if (textHeight < inner) {
                    button.css('display', '');
                } else {
                    button.css('display', 'none');
                }
            });
        }
    }

    function liftingOnScroll() {
        let $navG = $('.description-aside__navigator');

        if($navG.length && $(window).width() >= 1080) {           
            let $navGOffsetTop = $navG.offset().top,
                $navGheight = $navG.height();

            $(window).scroll(function() {
                let winScroll = $(window).scrollTop(),
                    $headerF= $('.header.animation:not(.hide)'),
                    OffsetTop = $navGOffsetTop;
  
                if (winScroll >= OffsetTop + $navGheight) {
                    //прокрутка вниз

                    let $bigboardFheight= $('.bigboard__blur--fixed.fixed').height(),
                        $headerFheight= $('.header').height(),
                        $workingbigboarHeight = ($bigboardFheight != undefined) ? $bigboardFheight : 0,
                        $workingheaderHeight = ($headerF.length === 1) ? $headerFheight : 0;

                    $navG.addClass('fixed').css('top', $workingbigboarHeight + 10 + $workingheaderHeight);

                } else {
                    //прокрутка вниз щт верха до точки
                    $navG.removeClass('fixed').css('top', '');
                }
            });
        }
    }

}($, window, document));


// rating

(function ($) {
    'use strict';

    var rating = (function () {

        Rating.prototype.defaults = {
            rating: void 0,
            max: 5,
            readOnly: false,
            change: function (e, value) {}
        };

        function Rating($el, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            this.input = ($($el).find('input').length > 0) ? $($el).find('input') : false;

            this.$el.append("<ul class='rating-list'/>")
            for (var i = 0; i < this.options.max; i++) {
                this.$el.find('ul').append("<li class='rating-item'/>");
            }

            this.initRating();

            if (this.options.readOnly) {
                return;
            }

            this.$el.on('mouseover.rating-list', 'li', (function (_this) {
                return function (e) {
                    return _this.initRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('mouseout.rating-list', (function (_this) {
                return function () {
                    return _this.initRating();
                };
            })(this));

            this.$el.on('click.rating-list', 'li', (function (_this) {
                return function (e) {
                    e.preventDefault();
                    return _this.setRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('rating:change', this.options.change);
        }

        Rating.prototype.setRating = function (rating) {

            if (this.options.rating === rating) {
                rating = void 0;
            }

            this.$el.attr('data-value', (rating || 0));

            if (this.input) {
                this.input.val(rating || 0);
            }

            this.options.rating = rating;
            this.initRating();
            return this.$el.trigger('rating:change', rating || 0);
        };

        Rating.prototype.initRating = function (rating) {

            var i, j, ref;

            var inp = (this.input) ? parseInt(this.input.val(), 10) : 0;
            var value = (rating) ? rating : Math.max((this.$el.attr('data-value') || 0), inp, (this.options.rating || 0));

            for (i = j = 1, ref = this.options.max; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                this.$el.find('li').eq(i - 1).removeClass(value >= i ? '' : 'rating-full').addClass(value >= i ? 'rating-full' : '');
            }
        };

        return Rating;
    })();

    return $.fn.rating = function () {

        var option = arguments[0] || [];

        return this.each(function () {
            if (!$(this).data('rating')) {
                $(this).data('rating', (new rating($(this), option)));
            }
        });
    };
})(jQuery);

// tabs

(function ($) {
    'use strict';

    var tab = (function () {

        Tab.prototype.defaults = {
			itemClass: 'tab-item',
			itemActive: 'active',
			change: function (e, tab, url) {}
		};

        function Tab($el, options) {
			this.options = $.extend({}, this.defaults, options);
			this.$el = $el;

            this.initTab();
			this.flatScroll(window.location.hash, true);

            this.$el.on('click.' + this.options.itemClass, 'a', (function (_this) {
                return function (e) {
					var hUrl = $(this).attr('href');

					if ($(hUrl).length > 0) {
						e.preventDefault();
						_this.flatScroll(hUrl, false);
					}
	            };
            })(this));

			this.$el.on('tab:change', this.options.change);
        }

		Tab.prototype.flatScroll = function(target, initScroll){

			var isTab = $(target);

			if (isTab.length > 0) {

				if (initScroll) { $('html').stop(); }
				var item = $("a[href='" + target + "']");

				item.parent().addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);
				isTab.addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);

				if (initScroll) {
					$('html').animate({
						scrollTop: item.offset().top - 20
					}, 1000, 'swing', function () {});
				} else {
					history.replaceState({}, '', item.attr('href'));
				}
			}
		}

        Tab.prototype.initTab = function(){

            var item = this.$el.find('.' + this.options.itemClass + ':first-child').addClass(this.options.itemActive);
            var hash = item.find('a').attr('href');

            if ($(hash).length > 0) {
                $(hash).addClass(this.options.itemActive);
            }
        }

        return Tab;
    })();

    return $.fn.tab = function () {

		var option = arguments[0] || [];

        return this.each(function () {
            $(this).data('tab', (new tab($(this), option)));
        });
    };
})(jQuery);
