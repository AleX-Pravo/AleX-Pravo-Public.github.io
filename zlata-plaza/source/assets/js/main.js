;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        if (window.innerWidth >= 1024) {
            if ($('#nav .primary-menu').length) {
                primaryMenuPosition();
            } else {
                $('.secondary-menu__item').css({
                    'transform': 'translateX(0)',
                    'opacity': '1'
                });
            }
        }

        footer();
        deviceMenuScroll();
        globalGoTo();
        catalogItemHeight();
        upload();
        searchDropPosition();
    });

    $(window).on('load', function () {
        footer();
    });

    $(window).on('resize', function () {
        footer();
        catalogItemHeight();
        searchDropPosition();
    });

    $(window).on('scroll', function () {
        deviceMenuScroll();
    });

    function catalogItemHeight() {
        if ($('.catalog').length) {
            var elem = $('.catalog__inner'),
                elemHeight = 0,
                elemFeatureHeight = 0,
                elemFeatureHeightDiff = 0;

            elem.css('height', '');

            elem.each(function() {
                if ($(this).outerHeight() > elemHeight) {
                    elemHeight = $(this).outerHeight();
                }
            });

            elem.css('height', elemHeight);
            $('.catalog__feature').css('padding-top', '');

            elem.each(function () {
                var elemFeature = $(this).children('.catalog__feature');

                if (elemFeature.outerHeight() > elemFeatureHeight) {
                    elemFeatureHeight = elemFeature.outerHeight();
                }
            });

            elem.each(function () {
                var elemFeature = $(this).children('.catalog__feature');

                if (elemFeature.outerHeight() < elemFeatureHeight) {
                    elemFeatureHeightDiff = elemFeatureHeight - elemFeature.outerHeight();
                    elemFeature.css('padding-top', elemFeatureHeightDiff);
                }
            });
        }
    }

    function deviceMenuScroll() {
        var start = $('.greeting').length ? $('.greeting').outerHeight() : 0;

        if ($(window).scrollTop() >= start) {
            $('.device-menu').show(400);
        } else if ($(window).scrollTop() <= start) {
            $('.device-menu').hide(400);
        } else if (start) {
            $('.device-menu').show(400);
        }
    }

    // Scroll to content
    function globalGoTo() {
        $('.anchor[href^="#"], .anchor[href^="."]').click(function() {
            if ($('.anchor').length <= 0) {
                return false;
            }

            var el = $(this).attr('href'),
                rizer = 0;

            if (typeof $(this).data('rizer') !== 'undefined' && $(this).data('rizer') !== null) {
                rizer = $(this).data('rizer');

                if (window.innerWidth < 600) {
                    rizer = rizer - 22;
                }
            }

            if ($(el).length != 0) {
                distance = $(el).offset().top - rizer;

                $('html, body').animate({
                    scrollTop: distance
                }, 1100);
            }

            if (window.innerWidth < 1024) {
                if ($('.nav__drop').length && $('.nav__drop:visible').length) {
                    $('.nav__drop').slideUp();
                    $('.nav').removeClass('nav--open');
                    $(document).unbind('click.deviceMenu');
                    firstClick = false;
                }
            }

            return false;
        });
    }

    // Open/Close device menu
    $('#header').on('click', '.header__device-menu-button', function(e) {
        e.preventDefault();

        var html = 'html',
            parrent = 'header__device-menu',
            drop = 'header__device-menu-drop',
            name = 'deviceMenu';

        if ($('.' + drop).css('transform').split(',')[4] != 0) {
            var firstClick = true;

            $(html).css('overflow', 'hidden');
            $('.' + parrent).addClass(parrent + '--open');
            $('.' + drop).css('transform', 'translateX(0)');

            $('body').append('<div id="' + name + '" style="position: fixed; z-index: 100; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest($('.' + drop)).length == 0) {
                    $(html).css('overflow', '');
                    $('.' + drop).css('transform', '');
                    $('.' + parrent).removeClass(parrent + '--open');
                    $('#' + name).remove();

                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });

    // Primary menu
    $('.primary-menu').on('mouseenter', '.primary-menu__box', function (e) {
        if (window.innerWidth >= 1024) {
            e.preventDefault();

            var elem = $(this),
                parent = elem.parent();

            elem.css('top', parent.outerHeight() - elem.outerHeight());
        }
    }).on('mouseleave', '.primary-menu__box', function (e) {
        if (window.innerWidth >= 1024) {
            e.preventDefault();

            var elem = $(this);

            elem.css('top', '');
        }
    });

    var deviceMenuInterval;
    var deviceMenuCount = $('.device-menu__item').length - 1;

    $('.device-menu').on('click', '.device-menu__button', function(e) {
        e.preventDefault();

        var button = $(this),
            drop = button.next(),
            item = $('.device-menu__item'),
            name = 'device-mask';

        clearInterval(deviceMenuInterval);

        if (drop.css('display') !== 'block') {

            $('body').append('<div id="' + name + '" style="position: fixed; z-index: 100; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0, 0, 0, .5);"></div>');

            drop.css('display', 'block');

            deviceMenuInterval = setInterval(function() {
                if (deviceMenuCount !== -1) {
                    item.eq(deviceMenuCount).addClass('device-menu__item--active');
                    deviceMenuCount--;
                } else {
                    deviceMenuCount = deviceMenuCount + 1;
                    clearInterval(deviceMenuInterval);
                }
            }, 100);
        } else {
            deviceMenuInterval = setInterval(function() {
                if (deviceMenuCount !== 4) {
                    item.eq(deviceMenuCount).removeClass('device-menu__item--active');
                    deviceMenuCount++;
                } else {
                    drop.css('display', 'none');
                    $('#' + name).remove();
                    deviceMenuCount = deviceMenuCount - 1;
                    clearInterval(deviceMenuInterval);
                }
            }, 100);
        }
    });

    $('body').on('click', '#device-mask', function() {
        var button = $('.device-menu__button'),
            drop = button.next(),
            item = $('.device-menu__item'),
            name = 'device-mask';

        var deviceMenuInterval = setInterval(function() {
            if (deviceMenuCount !== 4) {
                item.eq(deviceMenuCount).removeClass('device-menu__item--active');
                deviceMenuCount++;
            } else {
                drop.css('display', 'none');
                $('#' + name).remove();
                deviceMenuCount = deviceMenuCount - 1;
                clearInterval(deviceMenuInterval);
            }
        }, 100);
    });

    function primaryMenuPosition() {
        var scrollPosition = $(window).scrollTop(),
            start = $('.greeting').outerHeight() - 300,
            primaryMenuItem = $('#nav .primary-menu__item'),
            secondaryMenuItem = $('.secondary-menu__item'),
            primaryMenuItemLength = primaryMenuItem.length,
            count = 0,
            lastScrollTop = 0,
            flag = false,
            interval;

        $(window).on('scroll', function() {
            scrollPosition = $(window).scrollTop();
            if (scrollPosition > lastScrollTop) {
                if (scrollPosition >= start) {
                    flag = true
                }
            } else {
                if (scrollPosition < start) {
                    flag = true
                }
            }

            lastScrollTop = scrollPosition;

            if (!interval && flag) {
                interval = setInterval(function() {
                    if (scrollPosition >= start && count < primaryMenuItemLength) {
                        primaryMenuItem.eq(count).css({
                            'transform': 'translateX(-1000px)',
                            'opacity': '0'
                        });
                        secondaryMenuItem.eq(count).css({
                            'transform': 'translateX(0)',
                            'opacity': '1'
                        });
                        count++;

                        if (count == primaryMenuItemLength) {
                            count = primaryMenuItemLength - 1;
                            clearInterval(interval);
                            interval = null;
                        }
                    } else if (scrollPosition < start && count >= 0) {
                        primaryMenuItem.eq(count).css({
                            'transform': '',
                            'opacity': ''
                        });
                        secondaryMenuItem.eq(count).css({
                            'transform': '',
                            'opacity': ''
                        });
                        count--;

                        if (count == -1) {
                            count = 0;
                            clearInterval(interval);
                            interval = null;
                        }
                    }
                }, 300);
            }
        });
    }

    var timeout;

    $('.secondary-menu').on('mouseenter', '.secondary-menu__item', function() {
        var box = $(this).children('.secondary-menu__box');

        box.addClass('secondary-menu__box--active');

        timeout = setTimeout(function() {
            box.children('.secondary-menu__sublist').slideDown(300);
        }, 400);
    }).on('mouseleave', '.secondary-menu__item', function() {
        var box = $(this).children('.secondary-menu__box');

        clearTimeout(timeout);
        box.children('.secondary-menu__sublist').slideUp(200);
        box.removeClass('secondary-menu__box--active');
    });

    // Open/Close category
    $('.category').on('click', '.category__button', function(e) {
        e.preventDefault();

        var button = $(this),
            parrent = button.parent(),
            parrentOpenClass = 'category--open'
            drop = button.next(),
            name = 'categoryMenu';

        if (!parrent.hasClass(parrentOpenClass)) {
            var firstClick = true;

            parrent.addClass(parrentOpenClass);

            $(document).bind('click.' + name, function(e) {
                if (!firstClick && $(e.target).closest(drop).length == 0) {
                    $(parrent).removeClass(parrentOpenClass);
                    $(document).unbind('click.' + name);
                }

                firstClick = false;
            });
        }
    });

    // Footer positions
    function footer() {
        var layout = $('#layout'),
            footer = $('#footer');

        if (footer.length) {
            var footerHeight = footer.outerHeight();

            layout.css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

    var tabVersion;

    $(document).ready(function () {
        if ($('.tab__menu').hasClass('hide-md-min')) {
            if (window.innerWidth >= 1024 && tabVersion == 'device' || typeof tabVersion == 'undefined' && window.innerWidth >= 1024) {
                $('.tab__content').css('display', '');
                tabVersion = 'pc';
            } else if (window.innerWidth < 1024 && tabVersion == 'pc' || typeof tabVersion == 'undefined' && window.innerWidth < 1024) {
                tab();
                tabVersion = 'device';
            }
        } else {
            tab();
        }
    });

    $(window).on('resize', function () {
        if ($('.tab__menu').hasClass('hide-md-min')) {
            if (window.innerWidth >= 1024 && tabVersion == 'device' || typeof tabVersion == 'undefined' && window.innerWidth >= 1024) {
                $('.tab__content').css('display', '');
                tabVersion = 'pc';
            } else if (window.innerWidth < 1024 && tabVersion == 'pc' || typeof tabVersion == 'undefined' && window.innerWidth < 1024) {
                tab();
                tabVersion = 'device';
            }
        }
    });

    function tab() {
        var link = 'tab__menu-link',
            linkObj = $('.' + link);
            linkActive = 'tab__menu-link--active',
            id = void(0),
            content = 'tab__content',
            contentObj = $('.' + content);

        $('.' + link).each(function () {
            if ($(this).hasClass(linkActive)) {
                if (typeof $(this).attr('href') !== 'undefined' && $(this).attr('href') !== null) {
                    id = $(this).attr('href');
                }
            }
        });

        if (typeof id == 'undefined' && id == null) {
            if (typeof linkObj.eq(0).attr('href') !== 'undefined' && linkObj.eq(0).attr('href') !== null) {
                id = linkObj.eq(0).attr('href');
            }
        }

        $('.' + link).eq(0).addClass(linkActive);
        $(id).show();

        $('.tab')
            .on('click', '.' + link, function() {
                var firstVisit = true;

                if (typeof $(this).attr('href') !== 'undefined' && $(this).attr('href') !== null) {
                    id = $(this).attr('href');

                    if (id.search('#') == -1) {
                        return false;
                    }
                }

                $(window).scroll(function() {
                    if (firstVisit) {
                        window.scrollTo(0, 0);
                        firstVisit = false;
                    }
                });

                if (!$(id).is(':visible')) {
                    linkObj.removeClass(linkActive);
                    contentObj.hide();
                    $('.' + link + '[href="' + id + '"]').addClass(linkActive);
                    $(id).fadeIn(300);
                }
            });
    }

    function upload() {
        var input = $('.main-form__upload-input'),
            text = $('.main-form__upload-text');

        var fileApi = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;

        input.change(function () {
            var fileName;

            if (fileApi && input[0].files[0]) {
                fileName = input[0].files[0].name;
            } else {
                fileName = input.val().replace('C:\\fakepath\\', '');
            }

            if(!fileName.length) {
                return;
            }

            text.text(fileName);
        }).change();
    }

    $('#header').on('click', '.search__button-drop', function () {
        var drop = $('.search--drop'),
            dropActive = 'search--active',
            close = $('.search__button-close'),
            closeActive = 'search__button-close--active',
            nav = $('.header__device-menu');

        if (!drop.hasClass(dropActive)) {
            drop.addClass(dropActive);
            nav.hide();
            close.show();

            setTimeout(function () {
                close.addClass(closeActive);
            }, 100);
        }
    }).on('click', '.search__button-close', function () {
        var drop = $('.search--drop'),
            dropActive = 'search--active',
            close = $('.search__button-close'),
            closeActive = 'search__button-close--active',
            nav = $('.header__device-menu');

        if (drop.hasClass(dropActive)) {
            drop.removeClass(dropActive);
            close.removeClass(closeActive);

            setTimeout(function () {
                close.hide();
                nav.show();
            }, 200);
        }
    });

    $('.shop__menu').on('click', '.shop__menu-button', function () {
        var button = $(this),
            parent = button.parent(),
            parentActive = 'shop__menu--open',
            content = button.prev(),
            contentInner = content.children();

        if (!parent.hasClass(parentActive)) {
            content.css('width', contentInner.outerWidth());
            parent.addClass(parentActive);
        } else {
            parent.removeClass(parentActive);
            content.css('width', '');
        }
    });

    // Search drop position
    function searchDropPosition () {
        var search = $('.search:visible .search__inner'),
            drop = $('.search__drop');

        drop.css({
            'top': search.offset().top + search.outerHeight(),
            'left': Math.round(search.offset().left),
            'width': search.outerWidth()
        });
    }

}($, window, document));

var initPhotoSwipeFromDOM = function(gallerySelector) {

  // parse slide data (url, title, size ...) from DOM elements
  // (children of gallerySelector)
  var parseThumbnailElements = function(el) {
    var thumbElements = $(el).find('.photoswipe-item:not(.isotope-hidden)').get(),
      numNodes = thumbElements.length,
      items = [],
      figureEl,
      linkEl,
      size,
      item;

    for (var i = 0; i < numNodes; i++) {

      figureEl = thumbElements[i]; // <figure> element

      // include only element nodes
      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0]; // <a> element

      size = linkEl.getAttribute('data-size').split('x');

      // create slide object
      if ($(linkEl).data('type') == 'video') {
        item = {
          html: $(linkEl).data('video')
        };
      } else {
        item = {
          src: linkEl.getAttribute('href'),
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
      }

      if (figureEl.children.length > 1) {
        // <figcaption> content
        item.title = $(figureEl).find('.caption').html();
      }

      if (linkEl.children.length > 0) {
        // <img> thumbnail element, retrieving thumbnail url
        item.msrc = linkEl.children[0].getAttribute('src');
      }

      item.el = figureEl; // save link to element for getThumbBoundsFn
      items.push(item);
    }

    return items;
  };

  // find nearest parent element
  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  // triggers when user clicks on thumbnail
  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
      return (hasClass(el, 'photoswipe-item'));
    });

    if (!clickedListItem) {
      return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.closest('.photoswipe-wrapper'),
      childNodes = $(clickedListItem.closest('.photoswipe-wrapper')).find('.photoswipe-item:not(.isotope-hidden)').get(),
      numChildNodes = childNodes.length,
      nodeIndex = 0,
      index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      // open PhotoSwipe if valid index found
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  // parse picture index and gallery index from URL (#&pid=1&gid=2)
  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
      params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split('=');
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
      gallery,
      options,
      items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

      closeOnScroll: false,

      // define gallery index (for URL)
      galleryUID: galleryElement.getAttribute('data-pswp-uid'),

      getThumbBoundsFn: function(index) {
        // See Options -> getThumbBoundsFn section of documentation for more info
        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
          pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
          rect = thumbnail.getBoundingClientRect();

        return {
          x: rect.left,
          y: rect.top + pageYScroll,
          w: rect.width
        };
      }

    };

    // PhotoSwipe opened from URL
    if (fromURL) {
      if (options.galleryPIDs) {
        // parse real index when custom PIDs are used
        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        // in URL indexes start from 1
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    // exit if index not found
    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

    gallery.listen('beforeChange', function() {
      var currItem = $(gallery.currItem.container);
      $('.pswp__video').removeClass('active');
      var currItemIframe = currItem.find('.pswp__video').addClass('active');
      $('.pswp__video').each(function() {
        if (!$(this).hasClass('active')) {
          $(this).attr('src', $(this).attr('src'));
        }
      });
    });

    gallery.listen('close', function() {
      $('.pswp__video').each(function() {
        $(this).attr('src', $(this).attr('src'));
      });
    });

  };

  // loop through all gallery elements and bind events
  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  // Parse URL and open gallery if it contains #&pid=3&gid=1
  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }

};
