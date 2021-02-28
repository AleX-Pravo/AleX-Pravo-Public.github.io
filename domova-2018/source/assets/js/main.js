;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        footer();
        mobileOpen();
        fixed();
        mainSearch();
    });

    $(window).on('load', function () {
        footer();
    });

    $(window).on('resize', function () {
        footer();
        hideMobileDrop();
        mobileOpen();
    });

     // Mobile Menu open
    function mobileOpen() {
        $('.mobile-menu__button').on('click', function(e) {
            //if (window.innerWidth < 2000) {
            //var $drop = $(this).next('.mobile-menu__drop');
            //var $drop = '.mobile-menu .mobile-menu__drop';
            var $drop = $('#layout').find('.mobile-menu__drop');

            if (parseInt($drop.css('right'), 10) != 0) {
                $drop.css({'right': '0'});

                $('html').css('overflow', 'hidden');
                $('body').append('<div id="MobileMask" style="position: fixed; z-index: 100; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

                var firstClick = true;

                $(document).bind('click.MenuDrop', function(e) {
                    if (!firstClick && $(e.target).closest($drop).length == 0) {
                        $drop.css({'right': ''});

                        $('html').css('overflow', '');
                        $('#MobileMask').remove();
                        $(document).unbind('click.MenuDrop');
                    }
                    firstClick = false;
                });
            }
            e.preventDefault();
            //}
        });

        $('.mobile-menu__close').on('click', function() {
            $('.mobile-menu__drop').css({'right': ''});
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');

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

    // Footer positions
    function footer() {
        var footer = $('#footer');
        if (footer.length) {
            var footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

    // fixed positions
    function fixed() {
        var $menu = $("header"),
        menuOffsetTop = $('header').offset().top + $('header').outerHeight();

        $menu.addClass('default');

            $(window).scroll(function(){
                if ( $(this).scrollTop() > menuOffsetTop && $menu.hasClass("default") ){
                    $menu.removeClass("default")
                    .addClass("fixed transbg");
                } else if($(this).scrollTop() <= menuOffsetTop && $menu.hasClass("fixed")) {
                    $menu.removeClass("fixed transbg")
                    .addClass("default");
                }
            });//scroll

        $menu.hover(
            function(){
                if( $(this).hasClass('fixed') ){
                    $(this).removeClass('transbg');
                }
            },
            function(){
                if( $(this).hasClass('fixed') ){
                    $(this).addClass('transbg');
                }
            }
        );//hover
    };

     // mainSearch
    function mainSearch() {
        var searchClass = 'open',
        textInputClass = '.input-text';

        $('#searchfix').on('click', '#searchButton', function(e) {
            var container = $('#searchfix');

            if (!container.hasClass(searchClass)) {
                e.preventDefault();
                container.addClass(searchClass);
                if($('.search__drop--result').children('div').length > 1)
                    $('.search__drop--result').css('display', 'block');

                var firstClick = true;

                $(document).bind('click.searchProcessing', function(e) {
                    if (!firstClick && !$(e.target).closest(container).length) {
                        container.removeClass(searchClass);
                        $('.search__drop--result').css('display', 'none');
                        container.find('.drop').hide();

                    $(document).unbind('click.searchProcessing');
                }

                firstClick = false;
            });
            } else {
                container.removeClass(searchClass);
                $('.search__drop--result').css('display', 'none');
            }
        })
        .on('click keyup', textInputClass, function(e) {
            if (e.keyCode === 13) {
                //$('form', '#searchfix').submit();
            }
        })
        .on('submit', 'form', function(e) {
            var inputText = $(textInputClass, this);
            if (!inputText.length || !inputText.val().length) {
                e.preventDefault();
                return false;
            }
        });
    };

    // Mobile Menu drop
    function hideMobileDrop() {
        if(window.innerWidth >= 1024) {

            $('.work__header').hover(
                function () {
                    $(this)
                        .toggleClass('phone-hunter-static')
                        .toggleClass('phone-hunter-hover')
                        .toggleClass('phone-hunter-active');
                },
                function () {
                    $(this)
                        .toggleClass('phone-hunter-static')
                        .toggleClass('phone-hunter-hover')
                        .toggleClass('phone-hunter-active');
                }
            );
        }
    }

    // .Call-Map
    $('.call-btn').on('click', '.call_btn-inner', function(e) {
        $(this).next('.communications').toggleClass('open');
    });

    //при прокрутке вниз пропадает блок
    $('.call-btn').click(function() {
        $(this).next('.communications').toggleClass('open');

        $(window).scroll(function(){
            if ( $(this).scrollTop() > $('.call-btn').offset().top ){
                $('.communications').removeClass('open');
            } else if($(this).scrollTop() < $('.call-btn').offset().top) {
                $('.communications').removeClass('open');
            }
        });//scroll
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.call-btn'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.children('.communications').removeClass('open'); // скрываем его
        }
    });

    // .Call-Map
    $('.Call-Map').on('click', '.Call-Map__buttonCall', function(e) {
        $(this).children('.communications').toggleClass('open');
    });

    $('.topBlock__close').on('click', function() {
        $('.topBlock').remove();
    });

    $('.topBlock-citi__close').on('click', function() {
        $('.topBlock-citi').remove();
    });
/*
    $(function(){
        $('.show-number').on('click', function(){
            $('.header__info-drop').slideToggle();
        });
    });*/

    $('.show-number').click(function() {
        $('.show-number').children('.header__info-drop').toggleClass('header__info-drop--show');

        $(window).scroll(function(){
            if ( $(this).scrollTop() > $('.show-number').offset().top ){
                $('.header__info-drop').removeClass('header__info-drop--show');
            } else if($(this).scrollTop() < $('.show-number').offset().top) {
                $('.header__info-drop').removeClass('header__info-drop--show');
            }
        });//scroll
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.show-number'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.children('.header__info-drop').removeClass('header__info-drop--show'); // скрываем его
        }
    });

    $('.header__info-item--phoneNew').click(function() {
        $('.header__info-item--phoneNew').children('.header__info-item--phoneNew-drop').toggleClass('header__info-item--phoneNew-drop--show');

        $(window).scroll(function(){
            if ( $(this).scrollTop() > $('.header__info-item--phoneNew').offset().top ){
                $('.header__info-item--phoneNew-drop').removeClass('header__info-item--phoneNew-drop--show');
            } else if($(this).scrollTop() < $('.header__info-item--phoneNew').offset().top) {
                $('.header__info-item--phoneNew-drop').removeClass('header__info-item--phoneNew-drop--show');
            }
        });//scroll
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.header__info-item--phoneNew'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.children('.header__info-item--phoneNew-drop').removeClass('header__info-item--phoneNew-drop--show'); // скрываем его
        }
    });

    $('#layout').on('click', '.citylistHeader__Button', function(e) {
        $(this).next('.citylistHeader__city').toggleClass('citylistHeader__city--show');
    });

    $(document).click(function (e){ // событие клика по веб-документу
        var div = $('.citylistHeader'); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            div.children('.citylistHeader__city').removeClass('citylistHeader__city--show'); // скрываем его
        }
    });
}($, window, document));
