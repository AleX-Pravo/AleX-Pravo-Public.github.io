;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        footer();
        globalGoTo();
        fixed();

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
    });

    $(window).on('load', function () {
        footer();
        windowSize();
    });

    $(window).on('resize', function () {
        footer();
        windowSize();

        if (window.innerWidth >= 1080) {
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

    $(window).on('scroll', function () {
        windowSize();

        var scroll = $(window).scrollTop(),
            pageUp = $('.pageUp'),
            main = $('#main');

        if (scroll >= main.offset().top) {
            pageUp.slideDown();
        } else {
            pageUp.slideUp();
        }
    });

    $('.headerPhone__button').click(function() {
        $(this).toggleClass('rotate');
        $(this).next('.headerPhone__drop').toggleClass('headerPhone__drop--show');
        $(this).prev('.headerPhone__data').toggleClass('headerPhone__data--show');

        $(window).scroll(function(){
            if ( $(this).scrollTop() > $('.headerPhone__drop').offset().top ){
                $('.headerPhone__button').removeClass('rotate');
                $('.headerPhone__drop').removeClass('headerPhone__drop--show');
                $('.headerPhone__data').removeClass('headerPhone__data--show');
            } else if($(this).scrollTop() < $('.headerPhone__button').offset().top) {
                $('.headerPhone__button').removeClass('rotate');
                $('.headerPhone__drop').removeClass('headerPhone__drop--show');
                $('.headerPhone__data').removeClass('headerPhone__data--show');
            }
        });//scroll
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.headerPhone__button'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.removeClass('rotate');
            div.next('.headerPhone__drop').removeClass('headerPhone__drop--show');
            div.prev('.headerPhone__data').removeClass('headerPhone__data--show'); // скрываем его
        }
    });

    // Open/Close device menu
    $('#layout').on('click', '.header-device .header-button, .header-device .button', function(e) {
        e.preventDefault();

        var html = 'html',
            parrent = 'header-device',
            button = 'header-device .button',
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

    function globalGoTo() {
        $('.anchor[href^="#"]').on('click', function(e) {
            var link = $(this),
                elem = link.attr('href'),
                rizer = 0,
                distance;

            if (typeof link.data('rizer') !== 'undefined' && link.data('rizer') !== null) {
                rizer = link.data('rizer');
            }

            if ($(elem).length != 0) {
                distance = $(elem).offset().top - rizer - $('#header').outerHeight();

                $('html, body').animate({
                    scrollTop: distance
                }, 1100);
            }

            return false;
        });
    }

    // fixed positions(Фиксирует топ меню)
    function fixed() {
        if ($('.innerPage').length == 1) {
            var $menu = $(".header"),
                headerHeight = $menu.height(),
                menuOffsetTop = $('.innerPage .header__nav').offset().top;

            $menu.addClass('default');

            $(window).scroll(function () {
                if ($(this).scrollTop() > menuOffsetTop && $menu.hasClass("default")) {
                    //$('#main').css({ paddingTop: headerHeight});
                    $menu.removeClass("default")
                        .addClass("fixed");
                } else if ($(this).scrollTop() <= menuOffsetTop && $menu.hasClass("fixed")) {
                    //$('#main').css({ paddingTop: '0'});
                    $menu.removeClass("fixed")
                        .addClass("default");
                }
            }); //scroll
        }
    };

    // Accordion menu
    $(".accordion-menu i.dropdownlink").click(function() {
        var link = $(this);
        var closest_ul = link.closest("ul");
        var parallel_active_links = closest_ul.find(".active")
        var closest_li = link.closest("li");
        var link_status = closest_li.hasClass("active");
        var count = 0;

        closest_ul.find("ul").slideUp(function() {
                if (++count == closest_ul.find("ul").length)
                        parallel_active_links.removeClass("active");
        });

        if (!link_status) {
                closest_li.children("ul").slideDown();
                closest_li.addClass("active");
        }
    })

    // Footer positions
    function footer() {
        var footer = $('#footer');
        if (footer.length) {
            var footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

    (function($) {
        $(function() {

            $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
                $(this)
                    .addClass('active').siblings().removeClass('active')
                    .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
            });

        });
    })(jQuery);

    function windowSize(){

        if ($('#layout').find('.shipment').length == 1) {


            var offsetTop = $('.shipment').offset().top + $('.shipment').outerHeight();

            //alert(offsetTop);
            //alert($(window).scrollTop());
            //alert($(window).width());

            if ($(window).width() >= '720' && $(window).width() <= '1024' && $(window).scrollTop() >= offsetTop){
                $('.shipment-filter').addClass('active');
            }
            else {
                $('.shipment-filter').removeClass('active');
            }
        }
    }

    // filter
    $('.shipment-filter').on('click', '.toggle-filters-mobile-slide', function() {
        var button = $(this),
            flyout = $('.shipment-filter__filter'),
            name = 'shoesFlyout',
            html = 'html';

        if (flyout.css('transform').split(',')[4] != 0) {
            var firstClick = true;

            button.children('.toggleFilter').fadeOut(200);
            button.children('.toggleClose').fadeIn(200);
            button.css('left', '260px');
            flyout.css('transform', 'translateX(0)');
            $(html).css('overflow', 'hidden');
            $('body').append('<div id="' + name + '" style="position: fixed; z-index: 900; top: 0; right: 0; bottom: 0; left: 0; cursor: pointer; background: rgba(0, 0, 0, .5);"></div>');

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(flyout).length == 0) {
                    button.children('.toggleFilter').fadeIn(200);
                    button.children('.toggleClose').fadeOut(200);
                    button.css('left', '0');
                    flyout.css('transform', '');
                    $(html).css('overflow', '');
                    $('#' + name).remove();
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
        }).on('click', '.toggle-filters-mobile-slide', function() {
            var button = $(this),
                flyout = $('.shipment-filter__filter'),
                name = 'shoesFlyout',
                html = 'html';

            if (flyout.css('transform').split(',')[4] == 0) {
                button.children('.toggleFilter').fadeIn(200);
                button.children('.toggleClose').fadeOut(200);
                button.css('left', '0');
                flyout.css('transform', '');
                $(html).css('overflow', '');
                $('#' + name).remove();
                $(document).unbind('click.' + name);
            }
    });

}($, window, document));

