(function($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        screenMdMin = 1024;

    $(document).ready(function() {
        setCountdownDates();
        mobileOpen();
        cookies();
        slogan();
        liftingOnScroll();
        liftingOnScrollIndex();
        blockFixing();
        TabOnScroll();
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

        if ($('.tab').length > 0) {
            $(document).on('click', '.tab-item', function() {
                liftingOnScroll();
            });
        }

        //- up button moves
        if ($(window).width() >= 768 && $(window).height() >= 870) {
            $(document).scroll(function() {
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

            $(document).on('click', '.up', function(e) {
                e.preventDefault();
                $('body,html').animate({scrollTop: 0}, 800);
            });
        }

        $(document).on('click', '#shadow, .close, .mod-container', function() {
            $('.mobile-sidebar').removeClass('move');
            $('.cart-open').removeClass('move');
            $('html').css('overflow', '');
            $('#shadow').fadeOut();
            $('.mod-container').css('z-index', '');
        });

        layout.on('click', '.filter__section-arrow', function() {
            $(this).closest('.filter__section').find('.filter__section-block').slideToggle();
        });

        layout.on('click', '.catalogue__phone-inner', function() {
            $(this).find('.catalogue__phone-callus').slideToggle();
            $(this).find('.catalogue__phone-number').slideToggle();
        });

        // Прячем и показываем хедер при скроле + липкий bigboard__blur
        $(document).ready(function() {
            //прячем и показываем хедер при скроле
            let mainHeader = $('.header'),
                headerHeight = mainHeader.height(),
                nameBlock = $('.name-block__button'),
                nameBlockHeight = nameBlock.outerHeight(),
                tabMenu = $('.tab-menu'),
                tabMenuHeight = tabMenu.outerHeight(),
                mainBlock = $('.main'),
                workingHeight = 0,
                lastScrollTop = 0;

            if ($(window).width() <= 768) {
                mainBlock.css('margin-top', headerHeight);
            }

            $(document).scroll(function(e) {
                let headerHeight = mainHeader.height(),
                    st = $(document).scrollTop();

                if ($(window).width() <= 768) {

                    workingHeight = (nameBlockHeight != undefined ) ? headerHeight + nameBlockHeight : headerHeight;

                    workingHeight = (tabMenuHeight != undefined ) ? headerHeight + tabMenuHeight : headerHeight;
                    if (st > lastScrollTop && st >= workingHeight) {
                        //прокрутка вниз
                        mainHeader.addClass('hides');
                        nameBlock.css('top', 0);
                        tabMenu.css('top', 0);

                    } else if (st < workingHeight || st == 0) {
                        mainHeader.removeClass('hides');
                        nameBlock.css('top', 'auto');
                        tabMenu.css('top', 'auto');

                    } else {
                        //прокрутка вверх
                        nameBlock.css('top', headerHeight + 'px');
                        tabMenu.css('top', headerHeight + 'px');
                        mainHeader.removeClass('hides');
                    }
                }

                // конец скрипта

                lastScrollTop = st;
            });
        });
    });

    $(window).on('load', function() {

    });

    $(window).on('resize', function() {
        slogan();
        liftingOnScroll();
        liftingOnScrollIndex();
        blockFixing();
        TabOnScroll();
    });

    function mobileOpen() {
        $(document).on('click', '.mobile-menu__button', function(e) {
            e.preventDefault();

            let $drop = $('.mobile-menu__drop');

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

        cookies.on('click', '.submit', function(e) {
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

    function slogan() {
        let text = $('.swiper-slider__slogan span');
        let textH1 = $('.swiper-slider__slogan h1');
        let textBlock = $('.swiper-slider__slogan').width();
        let textWidth = text.width();

        if (text.length > 0 && textBlock < textWidth) {
            textH1.addClass('marquee');
        } else {
            textH1.removeClass('marquee');
        }
    }


    function blockFixing() {
        let $navG = $('.name-block__button');

        if($navG.length) {
            let $navGOffsetTop = $navG.offset().top;

            $(window).scroll(function() {
                let winScroll = $(window).scrollTop();

                if (winScroll >= $navGOffsetTop) {
                    //прокрутка вниз
                    $navG.addClass('fixed');

                } else {
                    //прокрутка вниз щт верха до точки
                    $navG.removeClass('fixed');
                }
            });
        }
    }

    function TabOnScroll() {
        let $tabMenu = $('.tab-menu');

        if($tabMenu.length) {
            let $tabMenuOffsetTop = $tabMenu.offset().top;

            $(window).scroll(function() {
                let winScroll = $(window).scrollTop();

                if (winScroll >= $tabMenuOffsetTop) {
                    //прокрутка вниз
                    $tabMenu.addClass('fixed');

                } else {
                    //прокрутка вниз щт верха до точки
                    $tabMenu.removeClass('fixed');
                }
            });
        }
    }

    // if (window.innerWidth <= 768 && $('.index-services').length > 0) {
    //
    //     const $elements = $('.index-services__wrap');
    //     const windowHeight = window.innerHeight;
    //
    //     $(document).on('scroll', () => {
    //         const windowScrollPosition = window.pageYOffset;
    //         const startPosition = windowScrollPosition + (window.innerHeight * 0.6);
    //
    //         $elements.removeClass('empty');
    //
    //         $elements.each((index, element) => {
    //             const elementPosition = element.getBoundingClientRect();
    //             const top = windowScrollPosition + elementPosition.top;
    //             const height = element.offsetHeight + 4;
    //
    //             const $element = $(element);
    //
    //             if (top <= startPosition && (top + height) >= startPosition) {
    //                 $element.addClass('empty');
    //             }
    //         });
    //     });
    // }

    function liftingOnScroll() {
        var $right = $('.__right'),
            $base = $('.__base'),
            $header = $('.header--inner');

        if ($right.length && $(window).width() >= 1024) {
            $(window).scroll(function() {
                var rightHeight = $right.height(),
                    baseHeight = $base.height();

                if (baseHeight < rightHeight) {
                    return;
                }

                var headerHeight = $header.height() - 19, //116-85-40
                    bottomAlign = $('#footer').offset().top - rightHeight - 72,
                    winScroll = $(window).scrollTop();

                $right.removeClass('fixed bottom');

                if (winScroll >= headerHeight && winScroll < bottomAlign) {
                    $right.addClass('fixed');
                }

                if (winScroll >= bottomAlign) {
                    $right.addClass('bottom');
                }
            });

        }
    }

    function liftingOnScrollIndex() {
        var $right = $('.__right-index'),
            $base = $('.__base'),
            $header = $('.header--main');

        if ($right.length && $(window).width() >= 1024) {
            var rightOffsetTop = $right.offset().top - 50,
                rightHeight = $right.height(),
                baseHeight = $base.height(),
                headerHeight = $header.height() - 35, //85-50 top: 35px;
                bottomAlign = baseHeight - rightHeight + rightOffsetTop;


            if (baseHeight > rightHeight) {
                $(window).scroll(function() {
                    var winScroll = $(window).scrollTop();
                    if (winScroll >= headerHeight && winScroll < bottomAlign) {
                        $right.addClass('fixed').removeClass('bottom');
                    } else if (winScroll >= bottomAlign) {
                        $right.removeClass('fixed').addClass('bottom');
                    } else {
                        $right.removeClass('fixed bottom');
                    }
                });
            } else {
                $right.parent().height(rightHeight);
            }
        }
    }


}($, window, document));

//#course-of-construction
(($) => {
    'use strict';

    const options = {
        selector: 'custom-gallery',
        maskSelector: 'custom-popup-mask',
        closeSelector: 'custom-popup-close',
    };

    const events = {
        opened: 'openedCustomGallery',
        closed: 'closedCustomGallery',
    };

    const $elements = $(`[data-el=${options.selector}]`);

    const actions = ($element, $popup) => {
        const openedEvent = $.Event(events.opened, {
            $popup
        });
        const closedEvent = $.Event(events.closed, {
            $popup
        });

        if ($element.attr('data-active') !== 'true') {
            $element.attr('data-active', 'true');
            $popup.attr('data-active', 'true');

            $popup.trigger(openedEvent);
        } else {
            $element.attr('data-active', 'false');
            $popup.attr('data-active', 'false');

            $popup.trigger(closedEvent);
        }
    };

    $elements.each((index, element) => {
        const $element = $(element);
        const $popup = $(`#${$element.data('target')}`);
        const $mask = $popup.find(`.${options.maskSelector}`);
        const $close = $popup.find(`.${options.closeSelector}`);

        if (!$popup.length) {
            console.warn(`Not found popup element of ${$element[0].attr('class')}`);

            return false;
        }

        $element.on('click', () => actions($element, $popup));
        $mask.on('click', () => actions($element, $popup));
        $close.on('click', () => actions($element, $popup));
    });
})($);

// rating

(function($) {
    'use strict';

    var rating = (function() {

        Rating.prototype.defaults = {
            rating: void 0,
            max: 5,
            readOnly: false,
            change: function(e, value) {}
        };

        function Rating($el, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            this.input = ($($el).find('input').length > 0) ? $($el).find('input') : false;

            this.$el.append("<ul class='rating-list'/>");
            for (var i = 0; i < this.options.max; i++) {
                this.$el.find('ul').append("<li class='rating-item'/>");
            }

            this.initRating();

            if (this.options.readOnly) {
                return;
            }

            this.$el.on('mouseover.rating-list', 'li', (function(_this) {
                return function(e) {
                    return _this.initRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('mouseout.rating-list', (function(_this) {
                return function() {
                    return _this.initRating();
                };
            })(this));

            this.$el.on('click.rating-list', 'li', (function(_this) {
                return function(e) {
                    e.preventDefault();
                    return _this.setRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('rating:change', this.options.change);
        }

        Rating.prototype.setRating = function(rating) {

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

        Rating.prototype.initRating = function(rating) {

            var i, j, ref;

            var inp = (this.input) ? parseInt(this.input.val(), 10) : 0;
            var value = (rating) ? rating : Math.max((this.$el.attr('data-value') || 0), inp, (this.options.rating || 0));

            for (i = j = 1, ref = this.options.max; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                this.$el.find('li').eq(i - 1).removeClass(value >= i ? '' : 'rating-full').addClass(value >= i ? 'rating-full' : '');
            }
        };

        return Rating;
    })();

    return $.fn.rating = function() {

        var option = arguments[0] || [];

        return this.each(function() {
            if (!$(this).data('rating')) {
                $(this).data('rating', (new rating($(this), option)));
            }
        });
    };
})(jQuery);

// tabs

(function($) {
    'use strict';

    var tab = (function() {

        Tab.prototype.defaults = {
            itemClass: 'tab-item',
            itemActive: 'active',
            change: function(e, tab, url) {}
        };

        function Tab($el, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;

            this.initTab();
            this.flatScroll(window.location.hash, true);

            this.$el.on('click.' + this.options.itemClass, 'a', (function(_this) {
                return function(e) {
                    var hUrl = $(this).attr('href');

                    if ($(hUrl).length > 0) {
                        e.preventDefault();
                        _this.flatScroll(hUrl, false);
                    }
	            };
            })(this));

            this.$el.on('tab:change', this.options.change);
        }

        Tab.prototype.flatScroll = function(target, initScroll) {

            var isTab = $(target);

            if (isTab.length > 0) {

                if (initScroll) { $('html').stop(); }
                var item = $("a[href='" + target + "']");

                item.parent().addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);
                isTab.addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);

                if (initScroll) {
                    $('html').animate({
                        scrollTop: item.offset().top - 20
                    }, 1000, 'swing', function() {});
                } else {
                    history.replaceState({}, '', item.attr('href'));
                }
            }
        };

        Tab.prototype.initTab = function() {

            var item = this.$el.find('.' + this.options.itemClass + ':first-child').addClass(this.options.itemActive);
            var hash = item.find('a').attr('href');

            if ($(hash).length > 0) {
                $(hash).addClass(this.options.itemActive);
            }
        };

        return Tab;
    })();

    return $.fn.tab = function() {

        var option = arguments[0] || [];

        return this.each(function() {
            $(this).data('tab', (new tab($(this), option)));
        });
    };
})(jQuery);
