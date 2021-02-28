'use strict';

;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        $document = $(document),
        screenMdMin = 1080;

    $(document).ready(function () {
        liftingOnScroll();

        $document.on('click', '.call-aside', function (e) {
            e.preventDefault();

            $('body').addClass('open-' + $(this).data('trigger'));
            $('html').css('overflow', 'hidden');
            $('#shadow').addClass('active');
        });

        $document.on('click', '#up', function (e) {
            e.preventDefault();
            $('body,html').animate({ scrollTop: 0 }, 800);
        });

        //modaal-inline
        $('.modaal-inline').modaal({
            custom_class: 'modaal-inline--modifier',
            fullscreen: true
        });

        $document.scroll(function () {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop,
                up = $('#up');

            if (scrolled > 100 && $('#up:hidden')) {
                up.fadeIn();
            } else {
                up.fadeOut();
            }

            if (scrolled + $(window).height() - up.height() >= $('.footer').offset().top) {
                up.addClass('absolute');
            } else {
                up.removeClass('absolute');
            }
        });

        $document.on('click', '#shadow, .close-aside', function (e) {
            e.preventDefault();

            $('body').removeClass(function (index, css) {
                return (css.match(/\bopen-\S+/g) || []).join(' ');
            });

            $('html').css('overflow', '');
            $('#shadow').removeClass('active');
        });

        layout.on('click', '.filter__section-arrow', function () {
            var section = $(this).closest('.filter__section');
            section.find('.filter__section-block').slideToggle();
            section.find('.filter__section-arrow').toggleClass('rotate');
        });

        if ($(window).width() < 1080 && !layout.hasClass('layout--minimal')) {
            var $window = $(window);
            var pos = $window.scrollTop();
            $window.scroll(function () {
                if ($window.scrollTop() > pos) $('header').addClass('transform');else $('header').removeClass('transform');
                pos = $window.scrollTop();
            });
        }
    });

    $(window).on('load', function () {});

    $(window).on('resize', function () {
        liftingOnScroll();
    });

    function liftingOnScroll() {
        var $lift = $('.__lift'),
            $rightLift = $('.__right'),
            $base = $('.__base');

        if ($lift.length && $(window).width() >= 1080) {
            var liftOffsetTop = $lift.offset().top - 94,
                $parent = $lift.parent(),
                liftPosOnRight = $(window).width() - ($parent.offset().left + $parent.width()),
                liftHeight = $lift.height(),
                baseHeight = $base.height(),
                bottomAlign = baseHeight - liftHeight + liftOffsetTop;

            if (baseHeight > liftHeight) {
                $(window).scroll(function () {
                    var winScroll = $(window).scrollTop();

                    if (winScroll >= liftOffsetTop && winScroll < bottomAlign) {
                        $lift.addClass('fixed').removeClass('bottom');
                        if ($rightLift.length) $rightLift.css('right', liftPosOnRight);
                    } else if (winScroll >= bottomAlign) {
                        $lift.removeClass('fixed').addClass('bottom');
                        removeAttrStyle($rightLift);
                    } else {
                        $lift.removeClass('fixed bottom');
                        removeAttrStyle($rightLift);
                    }
                });
            } else {
                $lift.parent().height(liftHeight);
            }
        }
    }

    function removeAttrStyle(obj) {
        if (obj.length) obj.removeAttr('style');
    }
})($, window, document);

// rating
(function ($) {
    'use strict';

    var rating = function () {

        Rating.prototype.defaults = {
            rating: void 0,
            max: 5,
            readOnly: false,
            change: function change(e, value) {}
        };

        function Rating($el, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            this.input = $($el).find('input').length > 0 ? $($el).find('input') : false;

            this.$el.append("<ul class='rating-list'/>");
            for (var i = 0; i < this.options.max; i++) {
                this.$el.find('ul').append("<li class='rating-item'/>");
            }

            this.initRating();

            if (this.options.readOnly) {
                return;
            }

            this.$el.on('mouseover.rating-list', 'li', function (_this) {
                return function (e) {
                    return _this.initRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            }(this));

            this.$el.on('mouseout.rating-list', function (_this) {
                return function () {
                    return _this.initRating();
                };
            }(this));

            this.$el.on('click.rating-list', 'li', function (_this) {
                return function (e) {
                    e.preventDefault();
                    return _this.setRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            }(this));

            this.$el.on('rating:change', this.options.change);
        }

        Rating.prototype.setRating = function (rating) {

            if (this.options.rating === rating) {
                rating = void 0;
            }

            this.$el.attr('data-value', rating || 0);

            if (this.input) {
                this.input.val(rating || 0);
            }

            this.options.rating = rating;
            this.initRating();
            return this.$el.trigger('rating:change', rating || 0);
        };

        Rating.prototype.initRating = function (rating) {

            var i, j, ref;

            var inp = this.input ? parseInt(this.input.val(), 10) : 0;
            var value = rating ? rating : Math.max(this.$el.attr('data-value') || 0, inp, this.options.rating || 0);

            for (i = j = 1, ref = this.options.max; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                this.$el.find('li').eq(i - 1).removeClass(value >= i ? '' : 'rating-full').addClass(value >= i ? 'rating-full' : '');
            }
        };

        return Rating;
    }();

    return $.fn.rating = function () {

        var option = arguments[0] || [];

        return this.each(function () {
            if (!$(this).data('rating')) {
                $(this).data('rating', new rating($(this), option));
            }
        });
    };
})(jQuery);