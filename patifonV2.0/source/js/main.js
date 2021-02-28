(function ($, window, document, undefined) {
    'use strict';

    $(document).ready(function () {
        mobileOpen();
        changeCatalogView();
        tabBlocksInMotion();
        setPromotionDates();
        addClassTile();

        // if($('.catalog__itemColorList--perfectScroll').length) {
        //     setTimeout(() => {
        //         $('.catalog__itemColorList--perfectScroll').perfectScrollbar();
        //     }, 0);
        // }

        $('.mobile-menu').on('click', '.mobile-menu__checkbox', function () {
            var categoryName = $(this).prev().children('a.mobile-menu__list-link').text();
            $(this).next().find('.mobile-menu__toggle').text(categoryName);
        });

        $('.settingsPackages').on('click', '.settingsPackages__listLink', function () {
            $(this).next().toggleClass('settingsPackages__listDrop--show');
            $(this).children().toggleClass('settingsPackages__listArrow--active');
        });

        //this script slideToggle .slide-menu (product.html)
        $(document).on('click', '.product__optionsItemContainer', function() {
            let arrow = $(this).find('.arrow');
            if(arrow.hasClass('arrow-rotate')) {
                arrow.removeClass('arrow-rotate');
            } else {
                arrow.addClass('arrow-rotate');
            }
            $(this).next('.slide-menu').slideToggle();
        });
        //end slideToggle

        $(document).scroll(function () {
            let scrolled = window.pageYOffset || document.documentElement.scrollTop;
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

            if($('.layout--promo').length > 0) {

                let promo = $('.promo'),
                    promoInner = $('.layout__promo');

                if (promo.offset().top <= $(document).scrollTop()) {
                    promoInner.addClass('fixed');
                } else {
                    promoInner.removeClass('fixed');
                }
            }
        });

        $(document).on('click','.up', function (e) {
            e.preventDefault();

            $('body,html').animate({scrollTop: 0}, 800);
        });

        $('body').on('click','.view__list-link:not(.active)' , function() {
            let item = $(this).closest('.view__list-item'),
                $attr = $(this).attr('data-class');

            item
                .addClass('active').siblings().removeClass('active')
                .closest('body').find('.catalog').removeClass('list tile').addClass($attr);

            $.magnificPopup.close();

            if($('.catalog__itemColorList--perfectScroll').length) {
                $('.catalog__itemColorList--perfectScroll').perfectScrollbar('update');
            }
        });

        // gsap for promo
        if($('.promo').length) {
            if ($(window).width() >= 1080) {
                let controller = new ScrollMagic.Controller({
                    globalSceneOptions: {
                        triggerHook: 'onLeave'
                    }
                });

                let presentation = new TimelineMax(),
                    screen = new TimelineMax(),
                    protect = new TimelineMax(),
                    hardware = new TimelineMax();

                presentation.to('.promo__presentation', 4, {autoAlpha: 1})
                    .to('.reverse', 3, {y:'-150%'}, '-=2')
                    .to('.forward', 3, {y:'150%'}, '-=3')
                    .to('.promo__presentation p', 2, {left:'50%'}, '-=1.2')
                    .to('.promo__presentation', 2, {autoAlpha: 0})

                screen.to('.promo__text--screen h4', 1, {left: '50%'})
                    .to('.promo__text--screen p', 1.5, {left: '0'}, '-=1.5')
                    .to('.smooth', 1, {autoAlpha: 0})
                    .to('.skew', 1, {autoAlpha: 1}, '-=.5')

                protect.to('#protect', .1, {autoAlpha: 1})

                hardware.to('#hardware', .1, {autoAlpha: 1})

                $('.promo__box').each(function() {
                    new ScrollMagic.Scene({ triggerElement: this })
                        .setPin(this)
                        .addTo(controller);
                });

                new ScrollMagic.Scene({ triggerElement: '.promo__trigger-main', duration: '100%' })
                    .setTween(presentation)
                    .addTo(controller);

                new ScrollMagic.Scene({ triggerElement: '.promo__trigger-screen'})
                    .setTween(screen)
                    .addTo(controller);

                new ScrollMagic.Scene({ triggerElement: '#protect'})
                    .setTween(protect)
                    .addTo(controller);

                new ScrollMagic.Scene({ triggerElement: '#hardware'})
                    .setTween(hardware)
                    .addTo(controller);
            }
        }
    });


    $(window).on('load', function () {
        setPrimaryMenuSubdropWidth();
        setNewsPreviewHeight();
        comparisonHeight();
        comparisonLoad();

        if ($('#header').length) {
            setPhoneDropPosition();
        }

        if (window.innerWidth >= 1080) {
            if ($('#header').length) {
                setSearchDropPosition();
            }
        } else {
            if ($('#header').length) {
                $('.search__drop--list').prop('style', '');
                $('.search__drop--result').prop('style', '');
            }
        }
    });
    

    $(window).on('resize', function () {
        setPrimaryMenuSubdropWidth();
        setNewsPreviewHeight();
        comparisonHeight();
        hideMobileDrop();
        addClassTile();


        if ($('#header').length) {
            setPhoneDropPosition();
        }

        //setFooterPosition();

        if (window.innerWidth >= 1080) {
            if ($('#header').length) {
                setSearchDropPosition();

                $('.search__content').prop('style', '');
                $('.search__deviceButton').removeClass('search__deviceButton--active');

                if ($('#openSearchContent').length) {
                    $('#openSearchContent').remove();
                }

                $(document).unbind('click.openSearchContent');
            }
        } else {
            if ($('#header').length) {
                $('.search__drop--list').prop('style', '');
                $('.search__drop--result').prop('style', '');
            }
        }
    });

    function setPromotionDates() {
        let counter = $('.promotion__counter'),
            startDate = Math.round(new Date(counter.data('start')).getTime()/1000.0),
            endDate = Math.round(new Date(counter.data('end')).getTime()/1000.0),
            now = Math.round($.now()/1000.0);

        let countdown = counter.find('.countdown');

        $(countdown).data('start', startDate).data('end', endDate).data('now', now);
    }

    function tabBlocksInMotion() {
        let topPos = 0;

        if ($(window).width() >= 1080 && $('.tab--product').length >= 1) {

            $(window).scroll(function () {
                
                let tabBox = $('.tab--product').find('.tab-box.active');

                if (tabBox.attr('id') != 'all') {

                    let details = tabBox.find('.details'),
                        inMotion = tabBox.find('.details__container--right'),
            
                        containerInner = inMotion.next('.details__container').find('.details__containerInner'),
                        rightPosition = containerInner.offset().left + containerInner.outerWidth() + 15,

                        top = $(document).scrollTop(),
                        pip = details.offset().top + details.outerHeight() - 10,
                        height = inMotion.outerHeight();

                    topPos = (topPos > 0) ? topPos : inMotion.offset().top - 10;
        
                    if (top > topPos && top < pip - height) {
                        inMotion.removeAttr("style").css({'position': 'fixed', 'top': '10px', 'left': rightPosition});
                    } else if (top >= pip - height) {
                        inMotion.css({'position': 'absolute', 'top': 'auto', 'left': 'auto', 'bottom': '0', 'right': '-15px'});
                    } else {
                        inMotion.removeAttr('style');
                    }
                }                    
            });
        }
    };

    function comparisonLoad() {
        $('.comparison--block').addClass('loaded');
    }

    function changeCatalogView() {
        var grid = $('.catalog--grid');
        
        if ($(window).width() > 1079) {
            grid.removeClass('list tile');
        } 
        else {
            grid.addClass('list');
        }
    }

    function comparisonHeight() {
        $('.comparison__item').css('height', '');

        var item = $('.comparison__list--main .comparison__item');

        item.each(function () {
            var el = $(this);
            var type = $('.' + el.attr('class'));
            var height = 0;

            type.each(function () {
                if ($(this).outerHeight() > height) {
                    height = $(this).outerHeight();
                }
            });

            type.css('height', height);
        });
    }

    $('.account__comments-rollup').on('click', function() {
        $(this).closest('.account__comments-item').toggleClass('hidden');
    });

    $('.phone').on('click', 'a.phone__button, .phone__deviceButton', function() {
        var module = $('.phone'),
            moduleDrop = $('.phone__drop'),
            name = 'openPhoneDrop';

        if (moduleDrop.css('display') != 'block') {
            var firstClick = true;

            module.addClass('phone--active');
            moduleDrop.fadeIn(200);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    moduleDrop.fadeOut(200);
                    module.removeClass('phone--active');
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });

    $('.filter--top').on('click', '.filter__more', function() {
        let filter = $(this).closest('.filter--top');
        filter.toggleClass('hiden');
    });


    $('.reviews').on('click', '.reviews__reply', function() {
        let self = $(this),
            writeBox = self.closest('.reviews').find('.reviews__write'),
            reviews = self.closest('.reviews');

        reviews.find('.reviews__reply').removeAttr('style');

        let topPos = self.offset().top - reviews.offset().top + self.height(),
            leftPos = self.offset().left - reviews.offset().left,
            writeBoxWidth = reviews.width() - (self.offset().left - reviews.offset().left);
            

        writeBox.css({'top': topPos + 'px', 'left': leftPos + 'px', 'width': writeBoxWidth + 'px'});
        self.css('margin-bottom', writeBox.height() + 'px');
    });


    $('.search').on('click', '.search__deviceButton', function() {
        var module = $('.search'),
            moduleDrop = $('.search__content'),
            self = $(this),
            name = 'openSearchContent';

        if (moduleDrop.css('display') != 'block') {
            var firstClick = true;

            if (window.innerWidth < 1080) {
                $('.search').append('<div id="' + name + '" style="position:absolute;z-index:9;top:0;right:0;bottom:0;left:0;display:none;cursor:pointer;background:rgba(255,255,255,1);"></div>');
            }

            setTimeout(function () {
                self.hide();

                $('#' + name).fadeIn(100);
                moduleDrop.fadeIn(200);

                self.addClass('search__deviceButton--active');

                self.fadeIn(200);

                setSearchDropPosition($('.search__contentInner'));

                $(window).on('resize.' + name, function() {
                    setSearchDropPosition($('.search__contentInner'));;
                });
            }, 100);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    self.removeClass('search__deviceButton--active');

                    moduleDrop.fadeOut(200);

                    if ($('#' + name).length) {
                        $('#' + name).fadeOut(200);

                        setTimeout(function () {
                            $('#' + name).remove();
                        }, 200);
                    }

                    moduleDrop.removeClass('search__content--active');
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    }).on('click', '.search__sections', function() {
        var module = $('.search'),
            moduleDrop = $('.search__drop--list'),
            name = 'openSearchDrop';

        if (moduleDrop.css('display') != 'block') {
            var firstClick = true;

            module.addClass('search--active');
            moduleDrop.fadeIn(200);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    moduleDrop.fadeOut(200);
                    module.removeClass('search--active');
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });


    var name = 'openPrimaryMenuDrop';
    $('.primaryMenu').mouseenter(function() {

        var sublist = $(this).find('.primaryMenu__sublist'),
            thirdlist = $(this).find('.primaryMenu__thirddropContainer'),
            heightDropList = $(this).find('.primaryMenu__drop').height();
            
        $('body').append('<div id="' + name + '" style="position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;display:none;cursor:pointer;background:rgba(0,0,0,.5);"></div>');

        $('#' + name).fadeIn(300, function() {
            $(this).css('display', 'block');
        });

        if (sublist.outerHeight() <= heightDropList) {
            sublist.css('min-height', heightDropList);
        }

        if (thirdlist.outerHeight() <= heightDropList) {
            thirdlist.css('min-height', heightDropList);
        }        
    });

    $('.primaryMenu').mouseleave(function() {
        $('#' + name).fadeOut(200, function() {
            $('#' + name).remove();
        });
    });



    $('.breadcrumbs').on('click', 'li.active a', function() {
        if (window.innerWidth < 840) {
            return false;
        }

        var moduleDrop = $(this).parent().next('.breadcrumbs__drop'),
            name = 'openBreadcrumbsDrop';

        if (moduleDrop.css('display') != 'block') {
            var firstClick = true;

            moduleDrop.fadeIn(200);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    moduleDrop.fadeOut(200);
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });


    $('.sort').on('click', '.sort__button', function () {
        var moduleDrop = $(this).next('.sort__drop'),
            sort = $(this).closest('.sort'),
            name = 'openSortDrop';
        
        sort.addClass('active');

        if (moduleDrop.css('display') != 'block') {
            var firstClick = true;

            moduleDrop.fadeIn(200);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    moduleDrop.fadeOut(200);
                    sort.removeClass('active');
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });


    $('.filter').on('click', '.filter__title', function() {
        var parent = $(this).parent(),
            content = $(this).next(),
            popup = $(this).closest('.filter');

        if (!popup.hasClass('filter--popup')) {
            if (!parent.hasClass('filter__item--open')) {
                content.slideDown(200);
                parent.addClass('filter__item--open');
            } else {
                content.slideUp(200);
                parent.removeClass('filter__item--open');
            }
        }
    });


    $('.product__options').on('click', '.product__optionsMore', function() {
        var moduleDrop = $('.product__optionsHide'),
            moduleLinkText = $(this).children().text(),
            moduleLinkDateText = $(this).children().data('text');

        if (moduleDrop.css('display') != 'block') {
            moduleDrop.slideDown(200);
            $(this).addClass('product__optionsMore--active');
        } else {
            moduleDrop.slideUp(200);
            $(this).removeClass('product__optionsMore--active');
        }

        $(this).children().text(moduleLinkDateText);
        $(this).children().data('text', moduleLinkText);
    });


    $('.deviceBottom').on('click', 'span.deviceBottom__link', function() {
        var html = $('html'),
            moduleDrop = $('#' + $(this).data('target')),
            name = 'deviceBottom';

        if (moduleDrop.css('transform').split(',')[4] != 0) {
            var firstClick = true;

            $('body').addClass('fixed').append('<div id="' + name + '" style="position:absolute;z-index:100;top:0;right:0;bottom:0;left:0;display:none;cursor:pointer;background:rgba(0,0,0,.5);"></div>');

            setTimeout(function () {
                html.css('overflow', 'hidden');
                moduleDrop.css('transform', 'translateX(0)');
                $('#' + name).fadeIn(200);
            }, 100);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(moduleDrop).length == 0) {
                    moduleDrop.css('transform', '');

                    $('#' + name).fadeOut(200);

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

    $('#sidebar').on('click', '.section__deviceClose', function() {
        var html = $('html'),
            moduleDrop = $('#sidebar'),
            name = 'deviceBottom';

        $('body').removeClass('fixed');
        moduleDrop.css('transform', '');

        $('#' + name).fadeOut(200);

        setTimeout(function() {
            $('#' + name).remove();
            $(html).css('overflow', '');
        }, 200);

        $(document).unbind('click.' + name);
    });

    $('#sort').on('click', '.section__deviceClose', function() {
        var html = $('html'),
            moduleDrop = $('#sort'),
            name = 'deviceBottom';

        moduleDrop.css('transform', '');

        $('#' + name).fadeOut(200);

        setTimeout(function() {
            $('#' + name).remove();
            $(html).css('overflow', '');
        }, 200);

        $(document).unbind('click.' + name);
    });

    function setPhoneDropPosition() {
        var module = $('.phone'),
            moduleDrop = $('.phone__drop'),
            moduleDropWidth = 0;

        if (window.innerWidth >= 1080) {
            moduleDropWidth = Math.floor(module.outerWidth() + 30);
        } else {
            moduleDropWidth = Math.floor(module.outerWidth() + module.children('.phone__content').outerWidth());
        }

        moduleDrop.css({
            'top': module.offset().top - $('#header').offset().top - 13,
            'left': Math.round(module.offset().left) - 15,
            'min-width': moduleDropWidth,
            'padding-top': module.outerHeight() + 26
        });
    }


    function setSearchDropPosition(moduleContent) {
        var module = moduleContent || $('.search'),
            moduleDropList = $('.search__drop--list'),
            moduleDropResult = $('.search__drop--result');

        moduleDropList.css({
            'top': module.offset().top - $('#header').offset().top + module.outerHeight() / 4,
            'left': Math.round(module.offset().left),
            'padding-top': module.outerHeight()
        });

        moduleDropResult.css({
            'top': module.offset().top - $('#header').offset().top + module.outerHeight() / 4,
            'left': Math.round(module.offset().left),
            'width': Math.floor(module.outerWidth()),
            'padding-top': module.outerHeight() - 16
        });
    }

    function setPrimaryMenuSubdropWidth() {
        var module = $('.primaryMenu__subdrop'),
            parent = $('.nav--page').length ? $('.nav--page') : $('.primaryMenu__flyout'),
            MODULE_WIDTH = 1022,
            MODULE_MAX_WIDTH = MODULE_WIDTH + parent.outerWidth() - 4,
            moduleWidth = 0;

        if (MODULE_MAX_WIDTH > $(window).outerWidth() - 30) {
            moduleWidth = $(window).outerWidth() - parent.outerWidth() - 26;
        }

        module.css({
            width: (moduleWidth != 0) ? moduleWidth + 'px' : MODULE_WIDTH + 'px'
        });
    }


    function setNewsPreviewHeight() {
        if ($('.news--grid').length) {
            var moduleItem = $('.news__item'),
                moduleItemContent = $('.news__itemContent'),
                moduleContentHeigt = 0;

            moduleItemContent.css('height', '');

            moduleItem.each(function() {
                var moduleContent = $(this).find('.news__itemContent');

                if (moduleContent.outerHeight() > moduleContentHeigt) {
                    moduleContentHeigt = moduleContent.outerHeight();
                }
            });

            moduleItemContent.css('height', moduleContentHeigt);
        }
    }

    function mobileOpen() {
        $('.nav__button, .button--catalog').on('click', function(e) {
            if (window.innerWidth < 1024) {
                var $drop = $('.mobile-menu__drop');

                if (parseInt($drop.css('left'), 10) != 0) {
                    $drop.css({'left': '0'});

                    $('html').css('overflow', 'hidden');
                    $('body').append('<div id="MobileMask" style="position: fixed; z-index: 55; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

                    var firstClick = true;

                    $(document).bind('click.MenuDrop', function(e) {
                        if (!firstClick && $(e.target).closest($drop).length == 0) {
                            $drop.css({'left': ''});

                            $('html').css('overflow', '');
                            $('#MobileMask').remove();
                            $(document).unbind('click.MenuDrop');
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

            var firstClick = false;
        });
    }

    function hideMobileDrop() {
        if(window.innerWidth >= 1024) {
            if (parseInt($('.mobile-menu__drop').css('left'), 10) == 0) {
                $('.mobile-menu__drop').css({'left': ''});
            }
            $('html').css('overflow', '');
            $('#MobileMask').remove();
            $(document).unbind('click.MenuDrop');

            var firstClick = false;
        }
    }

    function addClassTile() {
        let block = $('.catalog--main');

        if(window.innerWidth < 1024) {
            block.addClass('tile');
        } else {
            block.removeClass('tile');
        }
    }

}($, window, document));
