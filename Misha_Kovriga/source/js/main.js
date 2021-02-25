;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        screenMdMin = 1080;

    $(document).ready(function () {
        footer();
        setCountdownDates();
        cookies();

        // nested recursive menu's action

        $(document).on('click', '.nested-menu__button', function(e) {
            e.preventDefault();

            let self = $(this);

            if (self.hasClass('go-forward')) {
                self.closest('ul').addClass('move-out');
                self.closest('a').next('.is-hidden').removeClass('is-hidden');
            } else if (self.hasClass('go-back')) {
                self.closest('ul').addClass('is-hidden').closest('.has-children').closest('ul').removeClass('move-out');
            }
        });

        $(document).on('click', '.call-aside', function(e) {
            e.preventDefault();

            $('body').addClass('open-' + $(this).data('trigger'));
            $('html').css('overflow', 'hidden');
            $('#shadow').addClass('active');
        });

        $(document).on('click', '#shadow, .close-aside', function(e) {
            e.preventDefault();

            $('body').removeClass(function(index, css) {
                return (css.match(/\bopen-\S+/g) || []).join(' ');
            });

            $('html').css('overflow', '');
            $('#shadow').removeClass('active');
        });

        //- up button moves

        $(document).scroll(function () {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop,
                progressPart = $(window).scrollTop() / ($(document).height() - $(window).height()),
                progressBar = $('progress'),
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

            if (progressBar.length > 0) {
                progressBar.attr('value', progressPart);
            }
        });

        $(document).on('click','.up', function (e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 800);
        });

        layout.on('click', '.filter__section-arrow',  function() {
            $(this).closest('.filter__section').find('.filter__section-block').slideToggle();
        });
    });

    $(window).on('load', function() {
        footer();
    });

    $(window).on('resize', function() {
        footer();
    });

    // Footer positions
    function footer() {
        var footer = $('#footer');
        if (footer.length) {
            var footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

    // cookies

    function cookies() {
        let cookies = $('.cookies');

        if (localStorage.getItem('cookies-accept') === null) {
            cookies.removeClass('hide');
        }

        cookies.on('click', '.submit', function (e) {
            e.preventDefault();
            cookies.addClass('hide');
            localStorage.setItem('cookies-accept', 'y');
        });
    }

    function setCountdownDates() {
        let countdown = $('.countdown'),
            setStartDate = Math.round(new Date(countdown.data('set-start')).getTime()/1000.0),
            setEndDate = Math.round(new Date(countdown.data('set-end')).getTime()/1000.0),
            now = Math.round($.now()/1000.0);


        countdown.attr('data-start', setStartDate).attr('data-end', setEndDate).attr('data-now', now);
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
