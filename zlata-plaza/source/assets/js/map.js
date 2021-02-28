;(function ($, window, document, undefined) {
    $(document).ready(function() {
        mapPaginationPosition();
    });

    $(window).on('scroll', function() {
        mapPaginationPosition();
    });

    $(window).on('resize', function() {
        mapPaginationPosition();

        if (window.innerWidth >= 1024 && $('.map-category').hasClass('map-category--active')) {
            var html = $('html'),
                drop = $('.map-category');

            drop.removeClass('map-category--active');
            html.css('overflow', '');
        }
    });

    var urlParam = new URL(window.location.href),
        area = urlParam.searchParams.get("area");

    if (typeof area !== 'undefined' && area !== null && area !== '') {
        var globalMapfloor = area.split('_', 1);

        if ($('#' + area).length) {
            window.location.hash = globalMapfloor;

            $('#' + area).addClass('shop_hover_group--active');
        }
    }

    var mapActive = typeof window.location.hash !== 'undefined' && window.location.hash !== null && window.location.hash !== '' ? window.location.hash : '#floor1',
        firstVisit = true;

    $(window).scroll(function() {
        if (firstVisit) {
            window.scrollTo(0, 0);
            firstVisit = false;
        }
    });

    for (var i = 0; i < $('.map__floor').length; i++) {
        var map = $('.map__floor').eq(i),
            mapID = typeof map.attr('id') !== 'undefined' && map.attr('id') !== null ? '#' + map.attr('id') : void(0);

        if (mapActive == mapID) {
            panzoomInit(mapID, true)
        } else {
            panzoomInit(mapID, false)
        }
    }

    function panzoomInit(mapID, active) {
        var map = $(mapID),
            mapPanzoom = map.children('.panzoom'),
            mapSvg = mapPanzoom.children('svg'),
            mapPanzoomControls = map.children('.map__controls'),
            mapPanzoomIn = mapPanzoomControls.children('.zoom-in'),
            mapPanzoomOut = mapPanzoomControls.children('.zoom-out'),
            mapPosition,
            panzoom;

        panzoom = mapPanzoom.panzoom({
            contain: 'invert',
            minScale: 1,
            $zoomIn: mapPanzoomIn,
            $zoomOut: mapPanzoomOut
        });

        if (active) {
            var mapPaginationLink = 'map__pagination-link',
                mapPaginationLinkActive = mapPaginationLink + '--active',
                mapFloor = typeof map.data('floor') !== 'undefined' && map.data('floor') !== null ? map.data('floor') : void(0)

            map.css('display', 'block');

            mapPosition = (map.outerHeight() - mapPanzoom.outerHeight()) / 2;

            panzoom.panzoom('setMatrix', [1, 0, 0, 1, 0, mapPosition]);

            map.css({
                'visibility': 'visible',
                'opacity': '1',
                'transition': 'visibility 0s step-end, opacity .4s linear'
            });

            mapPanzoomControls.css({
                'opacity': '1',
                'transition': 'all .4s linear .4s'
            });

            $('.' + mapPaginationLink + '[data-floor="' + mapFloor + '"]').addClass(mapPaginationLinkActive);
            window.location.hash = mapID;
        }

        mapSvg.on('mousewheel.focal', function(e) {
            e.preventDefault();

            var delta = e.delta || e.originalEvent.wheelDelta,
                zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;

            panzoom.panzoom('zoom', zoomOut, {
                animate: false,
                focal: e
            });
        });

        panzoom.on('panzoomend', function(e, panzoom, matrix, changed) {
            if (!changed) {
                var mapTarget = e.target,
                    mapGroup = $('.shop_hover_group'),
                    mapGroupClassActive = 'shop_hover_group--active',
                    mapTargetID;

                $('.map-category__floor-list-link').removeClass('map-category__floor-list-link--active');
                mapGroup.removeClass(mapGroupClassActive);

                if (mapTarget.parentElement.classList[0] == 'shop_hover_group') {
                    mapTargetID = mapTarget.parentElement.id;
                } else if (mapTarget.classList.value == 'text2') {
                    mapTargetID = mapTarget.dataset.elem;
                } else if (mapTarget.tagName == 'tspan') {
                    mapTargetID = mapTarget.parentElement.dataset.elem;
                }

                $('#' + mapTargetID).addClass(mapGroupClassActive);
                $('.map-category__floor-list-link[data-area="' + mapTargetID + '"]').addClass('map-category__floor-list-link--active');

                showInstituionPopup($('#' + mapTargetID));
            }
        });
    }

    $('svg')
        .on('mouseenter', '.text2', function(e) {
            var elem = $(this),
                elemData = typeof elem.data('elem') !== 'undefined' && elem.data('elem') !== null ? elem.data('elem') : void(0);

            $('#' + elemData).css('opacity', '1');
        })
        .on('mouseleave', '.text2', function(e) {
            var elem = $(this),
                elemData = typeof elem.data('elem') !== 'undefined' && elem.data('elem') !== null ? elem.data('elem') : void(0);

            $('#' + elemData).css('opacity', '');
        })
        .on('mouseover', '.shop_hover_group', function(e) {
            if (!$('.text').find('*[data-elem=' + $(this).attr('id') + ']').length) {
                $('body').append('\
                    <div class="map__note">' + $(this).data('name') + '</div>\
                ');
            }
        })
        .on('mouseout', '.shop_hover_group', function(e) {
            var note = $('.map__note');

            if (note.length) {
                note.remove();
            }
        })
        .on('mousemove', function(e) {
            var note = $('.map__note');

            if (note.length) {
                var pageX = e.pageX - (note.outerWidth() / 2),
                    pageY = e.pageY - note.outerHeight() - 15;

                note.css({
                    top: pageY,
                    left: pageX
                });
            }
        });

    $('.map__pagination').on('click', '.map__pagination-link', function(e) {
        e.preventDefault();

        var mapLink = $(this),
            mapID = typeof mapLink.attr('href') !== 'undefined' && mapLink.attr('href') !== null ? mapLink.attr('href') : void(0),
            mapPaginationLink = 'map__pagination-link',
            mapPaginationLinkActive = mapPaginationLink + '--active',
            mapCurrentItem = $('.' + mapPaginationLinkActive),
            mapCurrentFloor = typeof mapCurrentItem.data('floor') !== 'undefined' && mapCurrentItem.data('floor') !== null ? mapCurrentItem.data('floor') : void(0),
            mapCurrent = $('#floor' + mapCurrentFloor),
            mapNextFloor = typeof mapLink.data('floor') !== 'undefined' && mapLink.data('floor') !== null ? mapLink.data('floor') : void(0),
            mapPosition;

        $('.' + mapPaginationLink).removeClass(mapPaginationLinkActive);
        mapLink.addClass(mapPaginationLinkActive);
        window.location.hash = mapID;

        if (mapCurrentFloor > mapNextFloor) {
            mapCurrent.find('.map__controls').css({
                'opacity': '',
                'transition': ''
            });

            mapCurrent.css({
                'z-index': '1',
                top: '-100px',
                opacity: '0',
                transform: 'scale(1.3)',
                transition: ''
            });

            setTimeout(function () {
                mapCurrent.css({
                    'z-index': '',
                    display: '',
                    visibility: '',
                    opacity: '',
                    top: '',
                    transform: '',
                    transition: ''
                });
            }, 400);

            $(mapID).css({
                display: 'block',
            });

            topPosition = ($(mapID).outerHeight() - $(mapID).find('.panzoom').outerHeight()) / 2;
            $(mapID).find('.panzoom').panzoom("setMatrix", [1, 0, 0, 1, 0, topPosition]);

             $(mapID).css({
                top: '100px',
                display: 'block',
                transform: 'scale(.7)',
                transition: 'visibility 0s step-end, opacity 0s linear, top 0s linear, transform 0s linear'
            });

            setTimeout(function () {
                $(mapID).css({
                    top: '',
                    visibility: 'visible',
                    opacity: '1',
                    transform: 'scale(1)',
                    transition: 'visibility 0s step-end, opacity .4s linear, top .4s linear, transform .4s linear'
                });
            }, 100);

            $(mapID).find('.map__controls').css({
                'opacity': '1',
                'transition': 'all .4s linear .5s'
            });
        } else if (mapCurrentFloor < mapNextFloor) {
            mapCurrent.find('.map__controls').css({
                'opacity': '',
                'transition': ''
            });

            mapCurrent.css({
                top: '100px',
                opacity: '0',
                transform: 'scale(0.7)',
                transition: ''
            });


            setTimeout(function () {
                mapCurrent.css({
                    display: '',
                    visibility: '',
                    opacity: '',
                    top: '',
                    transform: '',
                    transition: ''
                });
            }, 400);

            $(mapID).css({
                display: 'block'
            });

            topPosition = ($(mapID).outerHeight() - $(mapID).find('.panzoom').outerHeight()) / 2;
            $(mapID).find('.panzoom').panzoom("setMatrix", [1, 0, 0, 1, 0, topPosition]);

            $(mapID).css({
                'z-index': '1',
                top: '-100px',
                transform: 'scale(1.3)',
                transition: 'visibility 0s step-end, opacity 0s linear, top 0s linear, transform 0s linear'
            });

            setTimeout(function () {
                $(mapID).css({
                    top: '',
                    visibility: 'visible',
                    opacity: '1',
                    transform: 'scale(1)',
                    transition: 'visibility 0s step-end, opacity .4s linear, top .4s linear, transform .4s linear'
                });
            }, 100);

            $(mapID).find('.map__controls').css({
                'opacity': '1',
                'transition': 'all .4s linear .5s'
            });
        }
    });

    $('.map-category')
        .on('click', '.map-category__menu-link', function(e) {
            e.preventDefault();

            var mapLink = $(this);

            if (mapLink.next('.map-category__list').length) {
                if (!mapLink.next('.map-category__list').is(':visible')) {
                    $('.map-category__list:visible').slideUp();
                    $('.map-category__box:visible').removeClass('map-category__box--open');
                    $('.map-category__box').children('.map-category__drop').slideUp(200);
                    mapLink.next('.map-category__list').slideDown();
                } else {
                    mapLink.next('.map-category__list').slideUp();
                }
            } else if (mapLink.next('.map-category__box').length) {
                if (!mapLink.next('.map-category__box').hasClass('map-category__box--open')) {
                    $('.map-category__box:visible').removeClass('map-category__box--open');
                    $('.map-category__box').children('.map-category__drop').slideUp(200);
                    $('.map-category__list:visible').slideUp();
                    mapLink.next('.map-category__box').addClass('map-category__box--open');
                    mapLink.next('.map-category__box').children('.map-category__drop').slideDown(200);
                } else {
                    mapLink.next('.map-category__box').removeClass('map-category__box--open');
                    mapLink.next('.map-category__box').children('.map-category__drop').slideUp(200);
                }
            }
        })
        .on('click', '.map-category__link', function(e) {
            e.preventDefault();

            var mapLink = $(this),
                mapItem = mapLink.parent().parent('.map-category__item'),
                mapItemClass = 'map-category__item',
                mapItemClassActive = mapItemClass + '--active',
                mapItemDrop = mapLink.next('.map-category__drop'),
                mapDrop = $('.map-category__drop');

            if(!mapItem.hasClass(mapItemClassActive)) {
                $('.' + mapItemClass).removeClass(mapItemClassActive);
                mapDrop.slideUp(200);
                mapItem.addClass(mapItemClassActive);
                mapItemDrop.slideDown(200);
            }
        })
        .on('click', '.map-category__box-close', function(e) {
            e.preventDefault();

            var mapLink = $(this),
                mapItem = mapLink.parent().parent('.map-category__item'),
                mapItemClass = 'map-category__item',
                mapItemClassActive = mapItemClass + '--active',
                mapDrop = mapLink.next().next('.map-category__drop');

            mapItem.removeClass(mapItemClassActive);
            mapDrop.slideUp(200);
        })
        .on('click', '.map-category__floor-link', function (e) {
            e.preventDefault();

            var mapLink = $(this),
                mapItem = mapLink.next().children('.map-category__floor-list-item'),
                mapID = typeof mapLink.data('floor') !== 'undefined' && mapLink.data('floor') !== null ? 'floor' + mapLink.data('floor') : void(0),
                mapGroup = $('.shop_hover_group'),
                mapGroupClassActive = 'shop_hover_group--active',
                mapPaginationLink = 'map__pagination-link';

            $('.map-category__floor-list-link').removeClass('map-category__floor-list-link--active');
            mapGroup.removeClass(mapGroupClassActive);
            $('.' + mapPaginationLink + '[href="#' + mapID + '"]').trigger('click');

            mapItem.each(function() {
                var mapItemLink = $(this).children('.map-category__floor-list-link'),
                    mapArea = typeof mapItemLink.data('area') !== 'undefined' && mapItemLink.data('area') !== null ? mapItemLink.data('area') : void(0);

                mapItemLink.addClass('map-category__floor-list-link--active');
                $('#' + mapArea).addClass(mapGroupClassActive);
            });

            if (window.innerWidth < 1024) {
                var html = $('html'),
                    drop = $('.map-category');

                drop.removeClass('map-category--active');
                html.css('overflow', '');
            }
        })
        .on('click', '.map-category__floor-list-link', function(e) {
            var mapLink = $(this),
                mapArea = typeof mapLink.data('area') !== 'undefined' && mapLink.data('area') !== null ? mapLink.data('area') : void(0),
                mapID = mapArea.split('_', 1),
                mapGroup = $('.shop_hover_group'),
                mapGroupClassActive = 'shop_hover_group--active',
                mapPaginationLink = 'map__pagination-link';

            $('.map-category__floor-list-link').removeClass('map-category__floor-list-link--active');
            mapGroup.removeClass(mapGroupClassActive);
            mapLink.addClass('map-category__floor-list-link--active');
            $('.' + mapPaginationLink + '[href="#' + mapID + '"]').trigger('click');
            $('#' + mapArea).addClass(mapGroupClassActive);

            if (window.innerWidth < 1024) {
                var html = $('html'),
                    drop = $('.map-category');

                drop.removeClass('map-category--active');
                html.css('overflow', '');
            }
        });

    $('.map').on('click', '.map__button', function (e) {
        e.preventDefault();

        var html = $('html'),
            drop = $('.map-category');

        html.css('overflow', 'hidden');
        drop.addClass('map-category--active');
    });

    $('.map-category').on('click', '.map-category__close', function(e) {
        e.preventDefault();

        var html = $('html'),
            drop = $('.map-category');

        drop.removeClass('map-category--active');
        html.css('overflow', '');
    });

    function mapPaginationPosition() {
        if ($('.map__pagination').outerHeight() <= $('.map__inner').outerHeight() && window.innerWidth >=1024) {
            var topPoistion = $('.map__inner').offset().top + (($('.map__inner').outerHeight() / 2) - ($('.map__pagination').outerHeight() / 2)) + ($('.map__inner').offset().top - $(window).scrollTop());

            $('.map__pagination').css('top', topPoistion);
        } else {
            $('.map__pagination').css('top', '');
        }
    }

}($, window, document));
