;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        $document = $(document),
        screenMdMin = 1080;


    if (localStorage.getItem('catalog-list') !== null) {
        $('#catalog:visible').addClass('layout__box-catalog--list');
        $('.sort__box--list').addClass('active').siblings().removeClass('active');
    }


    $(document).ready(function () {
        mobileOpen();
        cookies();
        filterOpen();
        sortList();
        leanNavOnFooter();
        navigationClick();

        // Если разрешение экрана меньше/равно 1200 то меню навигации открывается не по наведению а по клику
        function navigationClick() {
            if ($(window).width() <= 1200) {
                $(document).on('click', '.navigation__list-link', function(e) {
                    if($(this).next('ul').length)
                        e.preventDefault();
                    $('.navigation__list-link').removeClass('active');
                    $(this).addClass('active');
                });

                $(document).mouseup(function(e) {
                    let link = $('.navigation__list-link');
                    if (!link.is(e.target) && link.has(e.target).length === 0) {
                        link.removeClass('active');
                    }
                });
            }
        }


        // Скрипт для выпадающего списка сортировки каталога на мобильном меню
        if(window.innerWidth < 768) {
            $(document).on('click', '.sort__block ul li:first-child', function() {

                $(this).nextAll().slideToggle(200);
                $(this).parent().toggleClass('open');
            });

            let elemSort = $('.sort__block ul'),
                listSort = $('.sort__block ul li:first-child').nextAll();

            $(document).on('click', function (e) {
                var target = $(e.target);

                if (!elemSort.has(target).length) {
                    listSort.slideUp(200);
                    elemSort.removeClass('open');
                }
            });
        }

        // Открывает меню фильтров по нажатии на кнопку #filter_device_btn

        function filterOpen() {
            layout.on('click', '.navigation__list-item--filter a', function (e) {
                e.preventDefault();

                let $drop = $('#filterDrop');

                $('html').css('overflow', 'hidden');
                $('#shadow').fadeIn();
                $('body').addClass('fixed');
                $drop.addClass('move');
            });
        }

        function leanNavOnFooter() {
            if ($('.navigation').offset().top + $('.navigation').height() > $('.footer').offset().top) {
                $('body').addClass('fix-nav--lean');
            }
        }

        //- filtres

        layout.on('click', '.filter__section-arrow',  function() {
            $(this).toggleClass('arrow-rotate');
            $(this).closest('.filter__section').find('.filter__section-block').slideToggle();
        });

        layout.on('click', '#shadow, .close',  function() {
            $('.aside__drop').removeClass('move');
            $('#filterDrop').removeClass('move');
            $('html').css('overflow', '');
            $('#shadow').fadeOut();
            $('body').removeClass('fixed');
            $('body').removeClass('aside-grow');
            $('#aside').removeClass('aside--open');
        });

        //- set list view for catalog items

        function sortList(){
            layout.on('click', '.sort__box:not(.active)', function(e) {

                let list = $('.layout__box-catalog:visible'),
                    self = $(this);

                e.preventDefault();
                self.addClass('active').siblings().removeClass('active');

                if (self.hasClass('active') && list.hasClass('layout__box-catalog--list')) {
                    list.removeClass('layout__box-catalog--list');
                    localStorage.removeItem('catalog-list');
                } else {
                    list.addClass('layout__box-catalog--list');
                    localStorage.setItem('catalog-list', 'y');
                }
            });
        }

        //- aside menu with window width >1080

        $document.on('click', '.aside__button', function(e) {
            e.preventDefault();

            $('body').addClass('aside-grow');
            $('#aside').addClass('aside--open');
            $('#shadow').fadeIn();

            if ($(this).hasClass('search__link')) {
                $('.search__input').focus();
            }

        });

        $document.on('click', '.aside__close',  function(e) {
            e.preventDefault();

            $('body').removeClass('aside-grow');
            $('#aside').removeClass('aside--open');
            $('#shadow').fadeOut();
        });


        //-let topPos = 0;

        $document.scroll(function () {
            if ($(window).width() >= 1080) {
                let scrolled = window.pageYOffset || $document.scrollTop();

                if (scrolled > 100) {
                    $('body').addClass('fix-nav');

                } else {
                    $('body').removeClass('fix-nav');
                }
            }
        });

        // quantity set input value properties

        function setInputValue(el, value) {
            let input = $(el),
                block = input.closest('.quantity');

            input.val(value);


            block.find('.quantity__button--minus').attr('disabled', (input.attr('min') || 1) >= value);
            block.find('.quantity__button--plus').attr('disabled', input.attr('max') <= value);

            $document.trigger("product:count", [block, value, block.data()]);
        }

        layout.on('keyup', '.quantity input', function() {
            let el = $(this),
                val = parseInt(el.val(), 10) || 1,
                max = parseInt(el.attr('max'), 10),
                value = isNaN(max) ? val : Math.min(max, val);

            setInputValue(el, value);
        });

        layout.on('click', '.quantity__button', function() {

            let block = $(this).closest('.quantity'),
                input = block.find('input'),
                value = parseInt(input.val(), 10);

                if ($(this).hasClass('quantity__button--minus')) {
                    value--;
                } else {
                    value++
                }

            setInputValue(input, value);
        });

        // end quantity set input value properties

        $('.call-modal').magnificPopup({
            type: 'inline',
            preloader: false
        });

        $('.aside__wrapper').perfectScrollbar();
    });

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

    function mobileOpen() {
        if ($(window).width() < 1080) {
            layout.on('click', '.aside__button', function(e) {
                e.preventDefault();

                let $drop = $(this).closest('.aside__drop');

                $('html').css('overflow', 'hidden');
                $('#shadow').fadeIn();
                $('body').addClass('fixed');
                $drop.addClass('move');
            });

            let xDown = null,
            yDown = null;

            $('.aside__button').on('touchstart', function(e) {
                const firstTouch = e.touches[0] || e.originalEvent.touches[0];

                xDown = firstTouch.clientX;
                yDown = firstTouch.clientY;
            });

            $('.aside__button').on('touchmove', function(e) {
                if (!xDown || !yDown) return false;

                let xUp = e.touches[0].clientX,
                    yUp = e.touches[0].clientY,
                    xDiff = xDown - xUp,
                    yDiff = yDown - yUp,

                    $drop = $(this).closest('.aside__drop');

                if (Math.abs(xDiff) > Math.abs(yDiff)) {
                    if (xDiff < 0) {

                        $('body').addClass('fixed');
                        $('html').css('overflow', 'hidden');
                        $('#shadow').fadeIn();
                        $drop.addClass('move');
                    }
                }
                xDown = null;
                yDown = null;
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
