;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        footer();
        mobileOpen();
        selfOffice();
        hideselfOffice();
        filterOpen();
        sortOpen();
        // скрпит для переключения контента чекбоксов
        $(function() {
            $('#self').on('change', function(){
                if ($(this).prop('checked')) {
                    $('.ordering-form__checkout').css('display','flex');
                    $('.ordering-form__post').hide();
                }
            });
            $('#post').on('change', function () {
                if ($(this).prop('checked')) {
                    $('.ordering-form__post').show();
                    $('.ordering-form__checkout').hide();
                }
            });
        });
        //плавная прокрутка страницы по якорю
        $('#layout').on('click', '.buy-form__name', function (e) {
            e.preventDefault();
            var id = $(this).attr('href'),
                top = $(id).offset().top - 48;

            $('body,html').animate({
                scrollTop: top
            }, 1000);
        });
    // Скрипты для меню аккордеон
        $(document).on('click', '.catalog .catalog__item:first-child', function (e) {
            e.preventDefault();
            $(this).find('#matrix').attr('data-name', 'matrix');
            $('.catalog--mobile').find('#matrix').removeAttr('data-name', 'matrix');
            $(this).nextAll().slideToggle(500);
        });
        if (window.innerWidth < 1024) {
            $(document).on('click', '.catalog--mobile .catalog__item', function (e) {
                e.preventDefault();
                let subList = $(this).find('ul');
                subList.slideToggle(500);
            });
        } else {
            $(document).on('mousemove', '.catalog .catalog__item', function (e) {
                e.preventDefault();
                $(this).find('ul').show();
            }).on('mouseleave', '.catalog .catalog__item', function (e) {
                e.preventDefault();
                $(this).find('ul').hide();
            });
            //скрыть блок catalog при клике вне его области
            $(document).mouseover(function (e) {
                let block = $(".catalog__item:first-child");
                let menu = $('.catalog');
                if (!block.is(e.target) &&
                    menu.has(e.target).length === 0) { // проверка условия если клик не по его дочерним элементам
                    block.nextAll().slideUp(); // если условия выполняются - скрываем наш элемент
                    block.find('#matrix').removeAttr('data-name', 'matrix');
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
        //скрипт убирает тень с поля input
        $(".shadow").focus(function () {
            $(this).removeClass('shadow');
        }).blur(function () {
            $(this).addClass('shadow');
        });

        //Скрипт для выпадающего меню сортировки на странице catalog.html
        $(document).on('click','.catalog-content__sort li:first-child', function(e){
            e.preventDefault();
            if (window.innerWidth >= 1024) {
                $(this).nextAll().slideToggle();
                $(this).closest('.catalog-content__sort').toggleClass('arrow-rotate');
            }
        });
        //скрыть меню сортировки при клике на любом месте
        $(function () {
            $(document).mouseup(function (e) {
                if (window.innerWidth >= 1024) {
                    var block = $(".catalog-content__sort");
                    var firstElem = $('.catalog-content__sort li:first-child');
                    if (!block.is(e.target) && block.has(e.target).length === 0) {
                        firstElem.nextAll().hide();
                        block.removeClass('arrow-rotate');
                    }
                }
            });
        });
        //Accordeon script
        $('#layout').on('click', '.filters-menu__link', function () {
            var foo = $(this).closest('.filters-menu__wrap').length ? $(this).closest('.filters-menu__wrap').next('.filters-menu__subsublist') : $(this).next('.filters-menu__block');
            if ($(this).hasClass('arrow-rotate')) {
                $(this).removeClass('arrow-rotate')
            } else {
                $(this).addClass('arrow-rotate')
            }
            if (foo.hasClass('active')) {
                foo.slideDown(250);
                foo.removeClass('active');
            } else {
                foo.slideUp(250);
                foo.addClass('active');
            }
        });
        //Скрипт для закрытия блока - Продукт успішно доданий у кошик
        $(document).on('click', '.inbasket__close', function(){
            $('.inbasket').hide();
        });
        //Задержка исчезновения блока - Продукт успішно доданий у кошик
        setTimeout(function() {
            $('.inbasket').hide();
        },3000)
        // Скрипт добавляет класс .active тегам блока .top-tags
        $(document).on('click', '.top-tags__wrapper a', function() {
            $(this).toggleClass('active');
        });

        // инициализация magnific popup
        $('.popup-gallery').each(function () {
            $(this).magnificPopup({
                delegate: '.slick-slide:not(.slick-cloned) a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                removalDelay: 300,
                mainClass: 'mfp-fade'
            });
        });
    });
    // fixed positions(Фиксирует топ меню)
    $(window).scroll(function (event) {
        let scroll = $(window).scrollTop(),
            el = $('.header'),
            ly = $('#layout'),
            headerHeight = el.height();

        if (scroll > headerHeight) {
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
    });
    // скрипт для анимации блоков Advanteges на мобайл
    if ($(window).width() < 1024) {
        $(window).scroll(function () {
            $('.advantages__image').each(function () {
                var imagePos = $(this).offset().top;
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 200) {
                    $(this).addClass('animate');
                } else if (imagePos > topOfWindow + 200) {
                    $(this).removeClass('animate');
                }
            });
        });
    }

    $(window).on('load', function () {
        footer();
        //hideMenu();
    });

    $(window).on('resize', function () {
        footer();
        hideMobileDrop();
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

    // Mobile Menu open
    function mobileOpen() {
        $('.mobile-menu__button').on('click', function (e) {
            if (window.innerWidth < 1200) {
                var $drop = $(this).next('.mobile-menu__drop');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({
                        'left': '0'
                    });

                    $('html').css('overflow', 'hidden');
                    $('body').addClass('fixed').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5); cursor:pointer;"></div>');

                    var firstClick = true;

                    $(document).bind('click.MenuDrop', function (e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({
                                'left': ''
                            });

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

        $('.mobile-menu__close').on('click', function () {
            $('body').removeClass('fixed');
            $('.mobile-menu__drop').css({
                'left': ''
            });
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');

            firstClick = false;
        });
    }

    // Mobile Menu drop
    function hideMobileDrop() {
        if (window.innerWidth >= 1200) {
            if (parseInt($('.mobile-menu__drop').css('left'), 10) == 0) {
                $('.mobile-menu__drop').css({
                    'left': ''
                });
            }
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');

            firstClick = false;
        }
    }


    // Особистий кабінет
    function selfOffice() {
        $('.personal-office__link, .callback__call, .basket').on('click', function (e) {
            // Проверка по какому элементу клик
            if ($(this).hasClass('basket')) {
                $('.enter-popup').hide();
                $('.basket-popup').show();

            } else if ($(this).hasClass('callback__call')) {
                $('.basket-popup,.enter-popup').hide();
                $('.callback-popup .enter-popup').show();

            } else if ($(this).hasClass('personal-office__link')) {
                $('.basket-popup,.enter-popup--callback').hide();
                $('.enter-popup--office').show();
            }

            // Закрывать мобайл меню при открытии Личного кабинета
            $('body').removeClass('fixed');
            $('.mobile-menu__drop').css({
                'left': ''
            });
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');
            // конец скрипта


            var $drop = $('.office-drop__block');

            if (parseInt($drop.css('right'), 10) != 0) {
                $drop.css({
                    'right': '0'
                });

                $('html').css('overflow', 'hidden');
                $('body').addClass('fixed').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(51, 86, 119,0.5);cursor:pointer;"></div>');

                var firstClick = true;

                $(document).bind('click.FilterDrop', function (e) {
                    if (!firstClick && $(e.target).closest($drop).length == 0) {
                        $drop.css({
                            'right': ''
                        });

                        $('html').css('overflow', '');
                        $('#MobileMask').remove();
                        $(document).unbind('click.FilterDrop');
                        $('body').removeClass('fixed');
                    }
                    firstClick = false;
                });
            }
            e.preventDefault();
        });

        $('.office-drop__block .office-drop__close').on('click', function () {
            $('body').removeClass('fixed');
            $('.office-drop__block').css({
                'right': ''
            });
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.FilterDrop');

            firstClick = false;
        });
    }
    // Mobile Menu drop
    function hideselfOffice() {

        if (parseInt($('.office-drop__block').css('right'), 10) == 0) {
            $('.office-drop__block').css({
                'right': ''
            });
        }
        $('html').css('overflow', '');
        $('#MobileMask').remove();
        $(document).unbind('click.FilterDrop');

        firstClick = false;

    }
    // Filter Menu open
    function filterOpen() {
        $('#filter_device_btn').on('click', function (e) {
            if (window.innerWidth < 1024) {
                var $drop = $('.catalog-content__filters');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({
                        'left': '0'
                    });

                    $('html').css('overflow', 'hidden');
                    $('body').addClass('fixed').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(51, 86, 119,0.5);cursor:pointer;"></div>');

                    var firstClick = true;

                    $(document).bind('click.FilterDrop', function (e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({
                                'left': ''
                            });

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.FilterDrop');
                            $('body').removeClass('fixed');
                        }
                        firstClick = false;
                    });
                }
                e.preventDefault();
            }
        });

        $('.catalog-content__filters .filters__close').on('click', function () {
            $('body').removeClass('fixed');
            $('.catalog-content__filters').css({
                'left': ''
            });
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.FilterDrop');

            firstClick = false;
        });
    }
    //Сортування
    function sortOpen() {
        $('#sort_device_btn').on('click', function (e) {
            if (window.innerWidth < 1024) {
                var $drop = $('#sort');

                if (parseInt($drop.css('right'), 10) != 0) {
                    $drop.css({
                        'right': '0'
                    });

                    $('html').css('overflow', 'hidden');
                    $('body').addClass('fixed').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(51, 86, 119,0.5);cursor:pointer;"></div>');

                    var firstClick = true;

                    $(document).bind('click.SortDrop', function (e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({
                                'right': ''
                            });

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.SortDrop');
                            $('body').removeClass('fixed');
                        }
                        firstClick = false;
                    });
                }
                e.preventDefault();
            }
        });

        $('#sort .filters__close').on('click', function () {
            $('body').removeClass('fixed');
            $('#sort').css({
                'right': ''
            });
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.SortDrop');

            firstClick = false;
        });
    }
}($, window, document));
