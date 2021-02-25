"use strict";

(function ($) {
    $.fn.scrollBox = function (options) {

        let defaults = {
            sectionSelector: '.scroll-section',
            sectionPagination: '.circle-pagination',
            useKeyboard: true,
            useLoop: false,
            showScroll: false,
            animationDuration: 1500
        };

        let elem = $(this);
        let isScrolling = false;
        let body = $("html, body");
        let settings = $.extend(defaults, options);
        let sectionLength = $(settings.sectionSelector).length;

        if (!settings.showScroll) {
            body.css({'overflow': 'hidden'});
        }

        $(settings.sectionSelector).eq(0).addClass("active");

        if (settings.sectionPagination) {

            for (let i = 0; i < sectionLength; i++) {
                $(settings.sectionPagination).append('<li />');
            }

            let list = $(settings.sectionPagination).find("li");
            list.eq(0).addClass("active");

            list.on("click", function () {
                let index = $(this).index();
                elem.moveTo(index)
            })
        }

        $.fn.moveTo = function (to, from) {

            if (settings.sectionPagination) {
                $(settings.sectionPagination + " li").removeClass("active").eq(to).addClass("active");
            }

            if (to !== from) {
                $(settings.sectionSelector).removeClass("active").eq(to).addClass("active");
                let scrollPos = to * $(window).height();
                body.stop().animate({scrollTop: scrollPos}, 500, 'swing');
            }
        };

        $.fn.moveDown = function () {
            let current = $(settings.sectionSelector + ".active");
            let prev = current.prev(settings.sectionSelector);

            if (!prev.length && settings.useLoop) {
                prev = $(settings.sectionSelector).last();
            }

            if (prev.length) {
                $.fn.moveTo(prev.index(), current.index());
            }
        };

        $.fn.moveUp = function () {
            let current = $(settings.sectionSelector + ".active");
            let next = current.next(settings.sectionSelector);

            if (!next.length && settings.useLoop) {
                next = $(settings.sectionSelector).first();
            }

            if (next.length) {
                $.fn.moveTo(next.index(), current.index());
            }
        };

        $(document).keydown(function (e) {
            if (settings.useKeyboard === true) {
                let tag = e.target.tagName.toLowerCase();
                if (tag !== 'input' && tag !== 'textarea') {
                    if (e.which === 33 || e.which === 37 || e.which === 38) {
                        // 33 page up; 37 left; 38 up
                        elem.moveDown();
                    } else if (e.which === 32 || e.which === 34 || e.which === 39 || e.which === 40) {
                        // 32 space; 34 page down; 39 right; 40 down
                        elem.moveUp();
                    } else if (e.which === 36) {
                        // Кнопка Home
                        elem.moveTo(0)
                    } else if (e.which === 35) {
                        // Кнопка End
                        elem.moveTo(sectionLength - 1);
                    }
                }
            }
        });

        $(document).on('wheel mousewheel DOMMouseScroll', function (e) {
            if (!isScrolling && !settings.showScroll) {
                isScrolling = true;
                let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail || -e.originalEvent.detailY;
                if (delta < 0) {
                    elem.moveUp();
                } else {
                    elem.moveDown();
                }
                setTimeout(function () {
                    isScrolling = false
                }, settings.animationDuration)
            }


        });

        $(window).scroll(function () {
            let scrollPos = $(document).scrollTop();
            let blockID = Math.round(scrollPos / $(window).height());
            elem.moveTo(blockID, blockID);
        });

    }

})(jQuery);
