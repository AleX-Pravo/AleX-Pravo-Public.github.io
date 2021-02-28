;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        footer();
        mobileOpen();
        if($(".header").length > 0) {
            fixed();
            $('.popup-modal').magnificPopup({
                type: 'inline',
                preloader: false
            });
        }
        let layout = $('#layout');



        swiperInit();




        // quantity set input value properties

        function setInputValue(el, value) {
            let input = $(el),
                block = input.closest('.menology__quantity'),
                defValue = Number(input.val()) || 0,
                curValue = value || defValue;

            input.val(curValue);


            block.find('.button--minus').attr('disabled', (input.attr('min') || 0) >= curValue);
            block.find('.button--plus').attr('disabled', input.attr('max') <= curValue);

            $(document).trigger("product:count", [block, curValue, block.data()]);
        }

        layout.on('keyup', '.menology__quantity input', function() {
            let el = $(this),
                val = parseInt(el.val(), 10) || 0,
                max = parseInt(el.attr('max'), 10),
                value = isNaN(max) ? val : Math.min(max, val);

            setInputValue(el, value);
        });

        layout.on('click', '.button', function() {

            let block = $(this).closest('.menology__quantity'),
                input = block.find('input'),
                value = parseInt(input.val(), 10);

            if ($(this).hasClass('button--minus')) {
                value--;
            } else {
                value++;
            }

            setInputValue(input, value);
        });

        $('.menology__quantity input').each(function () {
            setInputValue($(this));
        });

        // end quantity set input value propertiesssss
        $('.gallery-top').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                removalDelay: 300,
                mainClass: 'mfp-fade',
                callbacks: {
                    resize: changeImgSize,
                    imageLoadComplete: changeImgSize,
                    change: changeImgSize
                }
            });
            function changeImgSize() {
                var img = this.content.find('img');
                img.css('max-height', '100%');
                img.css('width', 'auto');
                img.css('max-width', 'auto');
            }
        });

        //- up button moves

        $(document).scroll(function () {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop,
                up = $('#toTop');

            if (scrolled > 100 && $('#toTop:hidden')) {
                up.fadeIn();
            } else {
                up.fadeOut();
            }

            if($('.footer').length > 0) {
                if ((scrolled + $(window).height() - up.height()) >= $('.footer').offset().top) {
                    up.addClass('absolute');
                } else {
                    up.removeClass('absolute');
                }
            }
        });

        $(document).on('click', '#toTop', function (e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });

        $(document).on('click','input.calendar', function() {

            let calendarArrow = $('input.calendar').next('.arrow');

            calendarArrow.removeClass('arrow-rotate');

            $(this).next('.arrow').toggleClass('arrow-rotate');
        });


        $(document).click( function(event){
            if( $(event.target).closest("input.calendar").length ){
                return;
            }
            $("input.calendar").next('.arrow').removeClass('arrow-rotate');
            event.stopPropagation();
        });

    });

    $(window).on('load', function () {
        footer();
    });

    $(window).on('resize', function () {
        footer();
        hideMobileDrop();
        swiperInit();
    });

    function swiperInit() {
        $('.slider:visible').each(function () {
            let btnNext = '.swiper-button-next',
                btnPrev = '.swiper-button-prev';

            if ($('.gallery-thumbs .swiper-slide', this).length <= 1) {
                $(btnNext, this).remove();
                $(btnPrev, this).remove();
                return;
            }

            var galleryThumbs = new Swiper($('.gallery-thumbs', this), {
                spaceBetween: 24,
                slidesPerView: 5,
                // centeredSlides: true,
                // slideToClickedSlide: true,
                loop: false,
                freeMode: true,
                loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpointsInverse: true,
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 24
                    },
                }
            });

            let galleryTop = new Swiper($('.gallery-top', this), {
                spaceBetween: 0,
                loop: true,
                loopedSlides: 5, //looped slides should be the same
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                thumbs: {
                    swiper: galleryThumbs,
                },
            });

            // galleryTop.controller.control = galleryThumbs;
            // galleryThumbs.controller.control = galleryTop;
        });
    }

    // Footer positions
    function footer() {
        var footer = $('#footer');
        if (footer.length) {
            var footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

    // Mobile Menu open
    function mobileOpen() {
        $('.mobile-menu__button').on('click', function(e) {
            if (window.innerWidth < 1024) {
                var $drop = $(this).next('.mobile-menu__drop');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({'left': '0'});

                    $('html').css('overflow', 'hidden');
                    $('body').addClass('fixed').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5); cursor: pointer;"></div>');

                    var firstClick = true;

                    $(document).bind('click.MenuDrop', function(e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({'left': ''});

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.MenuDrop');
                            $('body').removeClass('fixed');
                        }
                        firstClick = false;
                    });
                }
                e.preventDefault();
            }
        });

        $('.mobile-menu__close').on('click', function() {
            $('.mobile-menu__drop').css({'left': ''});
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');
            $('body').removeClass('fixed');

            firstClick = false;
        });
    }

    // Mobile Menu drop
    function hideMobileDrop() {
        if(window.innerWidth >= 1024) {
            if (parseInt($('.mobile-menu__drop').css('left'), 10) == 0) {
                $('.mobile-menu__drop').css({'left': ''});
            }
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');

            firstClick = false;
        }
    }
    //Ссилка - залишити відгук і перехід на форму
    $(document).on('click', '.reviews-content__link', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var id = $(this).data('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);
        $('input[type="text"]:first').focus();
    });

    // Раскрытие пунктов popup окна - reserve
    $(document).on('click', '.reserve__number, .reserve__wrapper', function () {
        $(this).next().slideToggle(300);
    });

    //переворачиваем стрелку по клике на Номер - reserve
    $(document).on('click', '.arrow', function () {
        $(this).toggleClass('arrow-rotate');
    });
    // Закрыть блок reserve-success
    $(document).on('click','.reserve-success__close', function () {
        $('.reserve-success').hide();
    });

    // fixed positions(Фиксирует топ меню)
    function fixed() {
        var $menu = $(".header"),
            headerHeight = $menu.height(),
            menuOffsetTop = $('#header > .navigation').offset().top;


            $menu.addClass('default');

            $(window).scroll(function () {
                if ($(this).scrollTop() > menuOffsetTop && $menu.hasClass("default")) {
                    $('#main').css({ paddingTop: headerHeight});
                    $menu.removeClass("default")
                        .addClass("fixed transbg");
                } else if ($(this).scrollTop() <= menuOffsetTop && $menu.hasClass("fixed")) {
                    $('#main').css({ paddingTop: '0'});
                    $menu.removeClass("fixed transbg")
                        .addClass("default");
                }
            }); //scroll

    };


    //Показывает блок телефонов при лике на иконке в хедере
    $(document).on('click', '.header__callback', function(){
        if(window.innerWidth <= 1024) {
           let callback = $(this).find('.callback');
           callback.addClass('show');
        }
    });
    //этот скрипт скрывает блок .header-callback при нажатии на любом месте
    $(document).mouseup(function (e) {
        let block = $(".callback", ".header__callback");
        if (!block.is(e.target) && block.has(e.target).length === 0) {
            block.removeClass('show');
        }
    });
}($, window, document));

(($) => {
    const $list = $('.smile__list');

    $list.on('click', 'a', (event) => {
        const { target } = event;
        const $element = $(target);
        const $parent = $element.parent().parent();

        $('a', $parent).removeClass('active');
        $element.addClass('active');

        $parent.parent().parent().next().val($element.data('target'));
    });
})(jQuery);
