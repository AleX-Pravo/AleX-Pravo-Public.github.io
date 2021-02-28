;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        screenMdMin = 1080;

    $(document).ready(function () {
        setCountdownDates();
        mobileOpen();
        cookies();
        rewind();
        elevationBlock();
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

        $(document).on('click', '#shadow, .close, .mod-container', function() {
            $('.mobile-sidebar').removeClass('move');
            $('.cart-open').removeClass('move');
            $('html').css('overflow', '');
            $('#shadow').fadeOut();
            $('.mod-container').css('z-index', '');
        });

        $(document).on('click', '#pharmacies', function(e) {
            e.preventDefault();
            $('.pharmacies__map').slideToggle();
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

        
        $(document).scroll(function () {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop,
                p = $('.understand__wrap p'),
                sumD = scrolled + $(window).height(),
                blocks = $('.understand').height() / 3;

                //console.log(scrolled, $(window).height(), $('.understand').offset().top, 'sumD = ' + sumD, 'blocks = ' + blocks, $('.understand').offset().top - blocks);
                //console.log(scrolled + $(window).height(), $('.understand').offset().top + blocks);

            if ((scrolled + $(window).height()) >= ($('.understand').offset().top + blocks)) {
                p.addClass('bounceInRight');
            } else {
                p.removeClass('bounceInRight');
            }

        });
    });

    $(window).on('load', function() {

    });

    $(window).on('resize', function() {
        elevationBlock();
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

    function rewind() {
        $('a[href^="#"]').on('click', function(event) {
            event.preventDefault();
          
            let sc = $(this).attr('href'),
                dn = $(sc).offset().top;
          
            $('html, body').animate({scrollTop: dn}, 1500);

            $('html').css('overflow', '');
            $('#shadow').fadeOut();
            $('.mobile-menu__drop').removeClass('move');
        });
    }

    function elevationBlock() {
        let company = $('.company'),
            headerHeight = $('.header').height(),
            newHeight = $(window).height() - headerHeight;

        if (company.length > 0) {
            company.css('height', newHeight+ 'px');
        }
    }
}($, window, document));
