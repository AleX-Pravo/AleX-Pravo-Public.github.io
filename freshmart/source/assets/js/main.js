;(function ($, window, document, undefined) {

    // Main events
    $(document).ready(function () {
        footer();
        mobileOpen();
        primaryMenu();
        droppingSortMenu();

        filterOpen();
        cartOpen();
        dropOrderListAccount();
        dropOrderProfile();
        globalGoTo();

        seotext({
            element: '.seotext',
            link: '.seotext__more',
            content: '.seotext__content',
            dataLink: 'data-seotext-link',
            dataHide: 'data-seotext-hidetext',
            activeClass: 'seotext__content--full'
        });

        seotext({
            element: '#product_description',
            link: '.textbox__more',
            content: '.textbox__content',
            dataLink: 'data-seotext-link',
            dataHide: 'data-seotext-hidetext',
            activeClass: 'textbox__content--full'
        });

        tooltip('.calendar--tooltip', 'open');

    });

    $(window).on('load', function () {
        footer();
    });

    $(window).on('resize', function () {
        footer();
        hideMobileDrop();
        hideFilterDrop();
        hideCartDrop();
    });

    // Primary menu
    function primaryMenu() {
        $('#nav .primary-menu').on('mouseenter', '.primary-menu__item', function() {
            var widthMenu = $('#nav .primary-menu').outerWidth();
            var prevall = $(this).prevAll();

            var prevall_width = 0;

            prevall.each(function(){
                rect = this.getBoundingClientRect();
                prevall_width += "width" in rect ? rect.width : rect.right - rect.left;
            });

            var all_width = prevall_width + $(this).children('.primary-menu__drop').outerWidth();

            if(all_width > widthMenu) {
                $(this).children('.primary-menu__drop').css('left', widthMenu - all_width);
            }
        });
    }

    // Footer positions
    function footer() {
        var footer = $('#footer');

        if (footer.length) {
            var $footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', $footerHeight);
            footer.css('margin-top', -$footerHeight);
        }
    }

    // Mobile Menu open
    function mobileOpen() {
        $('.mobile-menu__button').on('click', function(e) {
            if (window.innerWidth < 1024) {
                var $drop = $(this).next('.mobile-menu__drop');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({'left': '0'});

                    $('html, body').css({'overflow':'hidden'});
                    $('#header').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0;' +
                        ' bottom: 0; left: 0; background: rgba(0, 0, 0, .5); cursor: pointer;"></div>');
                    var firstClick = true;
                    $('body').addClass('fixed');

                    $(document).bind('click.MenuDrop', function(e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({'left': ''});

                            $('html, body').css('overflow', '');
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
            $('html, body').css('overflow', '');
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
            $('html, body').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');
            $('body').removeClass('fixed');

            firstClick = false;
        }
    }

    // Sort menu toggle
    function droppingSortMenu() {
        var element = $('#sort'),
            field = element.find('.sort__field');

        field.on('click', function () {
            //e.preventDefault();
            element.toggleClass('sort--open');
            $(this).find('.sort__drop').slideToggle(400);
        });

        $(document).on('click', function(e) {
            if(!element.find(e.target).length) {
                element.removeClass('sort--open');
                element.find('.sort__drop').slideUp(400);
            }
        });
    }



     // Cart Menu open
    function cartOpen() {
        $('#cart_mobile_btn').on('click', function(e) {
            if (window.innerWidth < 1024) {
                $('#cart_mobile').css({'z-index': '56'});
                var $drop = $('#cart_mobile .cart__drop');

                if (parseInt($drop.css('right'), 10) != 0) {
                    $drop.css({'right': '0'});

                    $('html').css('overflow', 'hidden');
                    $('body').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0;' +
                        ' bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

                    var firstClick = true;

                    $(document).bind('click.CartDrop', function(e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({'right': ''});

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.CartDrop');
                        }
                        firstClick = false;
                    });
                }
                e.preventDefault();
            }
        });

        $('#cart_mobile .cart__drop-close').on('click', function() {
            $('#cart_mobile .cart__drop').css({'right': ''});
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.CartDrop');

            firstClick = false;
        });
    }

    // Mobile Menu drop
    function hideCartDrop() {
        if(window.innerWidth >= 1024) {
            if (parseInt($('#cart_mobile .cart__drop').css('right'), 10) == 0) {
                $('#cart_mobile .cart__drop').css({'right': ''});
            }
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.CartDrop');

            firstClick = false;
        }
    }

    // Filter Menu open
    function filterOpen() {
        $('#filter_device_btn').on('click', function(e) {
            if (window.innerWidth < 1024) {
                var $drop = $('.layout-box__menu-drop');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({'left': '0'});

                    $('html').css('overflow', 'hidden');
                    $('body').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

                    var firstClick = true;

                    $(document).bind('click.FilterDrop', function(e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({'left': ''});

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.FilterDrop');
                        }
                        firstClick = false;
                    });
                }
                e.preventDefault();
            }
        });

        $('.layout-box__menu-close').on('click', function() {
            $('.layout-box__menu-drop').css({'left': ''});
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.FilterDrop');

            firstClick = false;
        });
    }

    // Mobile Menu drop
    function hideFilterDrop() {
        if(window.innerWidth >= 1024) {
            if (parseInt($('.layout-box__menu-drop').css('left'), 10) == 0) {
                $('.layout-box__menu-drop').css({'left': ''});
            }
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.FilterDrop');

            firstClick = false;
        }
    }


    // Cart
    $('#cart_mobile .cart__edit').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('cart__edit--active');
        //$(this).parent().parent().toggleClass('cart__section--edit');
        $(this).parent().parent().find('.cart__product-edit').slideToggle(200);

    });

    // Account Order list - dropdown toggle
    function dropOrderListAccount() {
        $('#account_order .account-order__header').on('click', function (e) {
            $(this).toggleClass('account-order__header--open');
            $(this).find('+ .account-order__content').slideToggle();
        });
    }

    // Profile Order list - dropdown toggle
    function dropOrderProfile() {
        $('#profile .profile-header').on('click', function (e) {
            $(this).toggleClass('profile-header--open');
            $(this).find('+ .profile-content').slideToggle();
        });
    }

    function seotext(settings) {
        if (!settings) return;

        var element = $(settings.element);
        if (!element.length) return;

        element.find(settings.link).on('click', function (e) {
            if (!$(this).attr(settings.dataLink)) {
                $(this).attr(settings.dataLink, $(this).text())
            }

            if ($(this).text() == $(this).attr(settings.dataHide)) {
                $(this).text($(this).attr(settings.dataLink));
            } else {
                $(this).text($(this).attr(settings.dataHide));
            }

            $(this).parent().find(settings.content).toggleClass(settings.activeClass);

            e.preventDefault();
        })
    }

    // tooltip calendar
    function tooltip(tooltip, active) {
        $(tooltip).hover(tooltipHandler, tooltipHandler);

        function tooltipHandler () {
            $(this).toggleClass(active);
        }
    }

    //up
    $(document).scroll(function () {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 100 && $('.up:hidden')) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }

        if ((scrolled + $(window).height() - 46) >= $('.footer').offset().top) {
            $('.up').addClass('absolute');
        } else {
            $('.up').removeClass('absolute');
        }
    });
    //lift up button
    function globalGoTo() {
        $('.up').on('click', function(e) {
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
}($, window, document));
