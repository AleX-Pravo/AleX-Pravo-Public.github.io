/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _this = this;
	__webpack_require__(1);
	$('.button-add-feedback, .button-sign-up').affix({
	    offset: {
	        bottom: function () {
	            return (_this.bottom = $('.main-footer').outerHeight(true) + 20);
	        }
	    }
	});
	// File input replacement
	$(document).on('change', '.file :file', function (event) {
	    var input = $(event.target);
	    var numFiles = input.get(0).files ? input.get(0).files.length : 1;
	    var fileName = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	    input.trigger('fileselect', [numFiles, fileName]);
	});
	$(document).on('fileselect', '.file :file', function (event, numFiles, fileName) {
	    var fileLabel = $(event.target).siblings('[data-file-label]');
	    if (numFiles === 1) {
	        fileLabel.text(fileLabel.data('message-single') + " " + fileName);
	    }
	    else {
	        fileLabel.html(fileLabel.data('message-original'));
	    }
	});
	$(document).on('reset', 'form', function (event) {
	    $(_this)
	        .find('.file :file')
	        .trigger('fileselect', [0, null]);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	/* ========================================================================
	 * Bootstrap: affix.js v3.3.7
	 * http://getbootstrap.com/javascript/#affix
	 * ========================================================================
	 * Copyright 2011-2016 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * ======================================================================== */


	+function ($) {
	  'use strict';

	  // AFFIX CLASS DEFINITION
	  // ======================

	  var Affix = function (element, options) {
	    this.options = $.extend({}, Affix.DEFAULTS, options)

	    this.$target = $(this.options.target)
	      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
	      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

	    this.$element     = $(element)
	    this.affixed      = null
	    this.unpin        = null
	    this.pinnedOffset = null

	    this.checkPosition()
	  }

	  Affix.VERSION  = '3.3.7'

	  Affix.RESET    = 'affix affix-top affix-bottom'

	  Affix.DEFAULTS = {
	    offset: 0,
	    target: window
	  }

	  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
	    var scrollTop    = this.$target.scrollTop()
	    var position     = this.$element.offset()
	    var targetHeight = this.$target.height()

	    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

	    if (this.affixed == 'bottom') {
	      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
	      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
	    }

	    var initializing   = this.affixed == null
	    var colliderTop    = initializing ? scrollTop : position.top
	    var colliderHeight = initializing ? targetHeight : height

	    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
	    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

	    return false
	  }

	  Affix.prototype.getPinnedOffset = function () {
	    if (this.pinnedOffset) return this.pinnedOffset
	    this.$element.removeClass(Affix.RESET).addClass('affix')
	    var scrollTop = this.$target.scrollTop()
	    var position  = this.$element.offset()
	    return (this.pinnedOffset = position.top - scrollTop)
	  }

	  Affix.prototype.checkPositionWithEventLoop = function () {
	    setTimeout($.proxy(this.checkPosition, this), 1)
	  }

	  Affix.prototype.checkPosition = function () {
	    if (!this.$element.is(':visible')) return

	    var height       = this.$element.height()
	    var offset       = this.options.offset
	    var offsetTop    = offset.top
	    var offsetBottom = offset.bottom
	    var scrollHeight = Math.max($(document).height(), $(document.body).height())

	    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
	    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
	    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

	    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

	    if (this.affixed != affix) {
	      if (this.unpin != null) this.$element.css('top', '')

	      var affixType = 'affix' + (affix ? '-' + affix : '')
	      var e         = $.Event(affixType + '.bs.affix')

	      this.$element.trigger(e)

	      if (e.isDefaultPrevented()) return

	      this.affixed = affix
	      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

	      this.$element
	        .removeClass(Affix.RESET)
	        .addClass(affixType)
	        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
	    }

	    if (affix == 'bottom') {
	      this.$element.offset({
	        top: scrollHeight - height - offsetBottom
	      })
	    }
	  }


	  // AFFIX PLUGIN DEFINITION
	  // =======================

	  function Plugin(option) {
	    return this.each(function () {
	      var $this   = $(this)
	      var data    = $this.data('bs.affix')
	      var options = typeof option == 'object' && option

	      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
	      if (typeof option == 'string') data[option]()
	    })
	  }

	  var old = $.fn.affix

	  $.fn.affix             = Plugin
	  $.fn.affix.Constructor = Affix


	  // AFFIX NO CONFLICT
	  // =================

	  $.fn.affix.noConflict = function () {
	    $.fn.affix = old
	    return this
	  }


	  // AFFIX DATA-API
	  // ==============

	  $(window).on('load', function () {
	    $('[data-spy="affix"]').each(function () {
	      var $spy = $(this)
	      var data = $spy.data()

	      data.offset = data.offset || {}

	      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
	      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

	      Plugin.call($spy, data)
	    })
	  })

	}(jQuery);


/***/ }
/******/ ]);

/*const inputs = document.getElementsByTagName('input');
inputs.forEach(input => {
	input.addEventListener('focus', (e) => {
		e.preventDefault();
	})
})*/

const dots = document.querySelectorAll('[data-el="dot"]');
const section = document.querySelectorAll('[data-el="section"]');
const videos = document.querySelectorAll('[data-el="video"]');
const infoBlock = document.querySelectorAll('[data-el="content"]');

function isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);

    return (vertInView);
}

if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/index-ru.html' || location.pathname === '/program.html' || location.pathname === '/program-ru.html') {
	infoBlock[0].classList.add('active');
}

if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/index-ru.html') {
    dots[0].classList.add('active');
    videos[0].play();
}

//scroll, dots etc

document.addEventListener('DOMContentLoaded', function(){

    if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/index-ru.html') {
        const listItem = Array.prototype.slice.call(document.querySelectorAll('[data-el="list.item"]'));

        listItem.forEach(item => {
            item.classList.add('active')
        });

        document.querySelector('[data-el="logo"]').classList.add('active');
    }
}, false);

window.onscroll = function() {
    section.forEach(item => {
        if (item.classList.contains('visible')) {

            if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/index-ru.html') {

                let dot = document.querySelector(`[data-value^='#${item.getAttribute('id')}']`);
                dot.classList.add('active');

                for (let i = 0; i < dots.length; i++) {
                    if (dots[i] !== dot) {
                        dots[i].classList.remove('active');
                    }
                }

                for (let i = 0; i < section.length; i++) {
                    if (item !== section[section.length - 1]) {
                        let video = item.querySelector('[data-el="video"]');
                        video.play();

                        for (let i = 0; i < videos.length; i++) {
                            if (videos[i] !== video) {
                                videos[i].pause();
                            }
                        }
                    }
                }
            }

            if (location.pathname === '/program.html' || location.pathname === '/program-ru.html') {
                let block = item.querySelector('[data-el="content"]');
                block.classList.add('active');
            }
        }
    });

    if (location.pathname === '/' || location.pathname === '/index.html' || location.pathname === '/index-ru.html') {
        infoBlock.forEach(item => {
            if (isAnyPartOfElementInViewport(item)) {
                item.classList.add('active');
            }
        });
    }

	let scrollTop = $(window).scrollTop(),
		windowHeight = $(window).height(),
		windowWidth = $(window).width();

	const contentsAvailable = $('[data-el="content"]');

	contentsAvailable.each(function() {
		let actualBlock = $(this),
			offset = scrollTop - actualBlock.offset().top,
			halhOfHeihtBlock = actualBlock.height() / -2;

		if ( offset >= halhOfHeihtBlock && offset < windowHeight ) {
			actualBlock.addClass('active')
		}
	});
};


//toggle
const toggle = document.querySelectorAll('[data-el="toggle"]');
const link = document.querySelectorAll('[data-el="menu.link"]');

toggle.forEach(item => {
	item.addEventListener('click', () => {
		let getName = item.dataset.target,
			targetBlock = document.getElementById(getName);

		item.classList.toggle('active');
		targetBlock.classList.toggle('active');

		for (let i = 0; i < toggle.length; i++) {
			let getName = toggle[i].dataset.target,
				targetBlock = document.getElementById(getName);

			if (toggle[i] !== item) {
				toggle[i].classList.remove('active');
				targetBlock.classList.remove('active');
			}
		}
	});
});

link.forEach(item => {
	item.addEventListener('click', () => {
		for (let i = 0; i < toggle.length; i++) {
			let getName = toggle[i].dataset.target,
				targetBlock = document.getElementById(getName);

			toggle[i].classList.remove('active');
			targetBlock.classList.remove('active');
		}
	})
});

// index
if (location.pathname === '/' || location.pathname.includes('index') || location.pathname.includes('sign-up')) {
	const formElement = document.querySelector('[data-el="form.request"]');
	const submit = formElement.querySelector('button[name="submit"]');

	function validateGrp(e, form) {
		const formMessage = form.querySelector('[data-el="form.message"]');
		let things = form.querySelectorAll('input[type="checkbox"]');
		let checked = 0;

		for (let thing of things) {
			thing.checked && checked++;
		}

		if (checked) {
			formMessage.style.display = 'none';
			things[0].setCustomValidity('');
			form.submit();
		} else {
			formMessage.style.display = 'block';
			things[0].setCustomValidity('You must check at least one checkbox');
			things[0].reportValidity();
		}
	}

	submit.addEventListener('click', e => {
		validateGrp(e, formElement);
	});
}

if (location.pathname.includes('about-us')) {
	const galleryContent = document.querySelector('[data-el="gallery.content"]'),
		swiperSlideContainer = document.querySelector('.gallery-top'),
		galleryElement = document.querySelector('[data-el="gallery"]');

	document.addEventListener('DOMContentLoaded', () => {
		//creatingGalleryContent();
		getAllImages();
	});

	document.querySelector('[data-el="text-rotator"]').style.display = 'block';
	$('[data-el="text-rotator"]').animatedHeadline({
		animationType: 'clip',
		animationDelay: 2000,
		revealDuration: 700,
	});

	const galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 8,
		freeMode: true,
		loopedSlides: 5, //looped slides should be the same
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			320: {
				slidesPerView: 6,
			},
			768: {
				slidesPerView: 8,
			},
		}
	});

	new Swiper('.gallery-top', {
		spaceBetween: 10,
		loop: true,
		loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs,
		},
	});

	function getAllImages() {
		const allImages = document.getElementsByTagName('img');

		let gallery = [];

		Object.entries(allImages).forEach(([key, image]) => {
			if (image.dataset.gallery === 'item') {
				gallery.push({
					src: image.src,
					w: 0,
					h: 0,
					position: parseInt(key),
				});

				image.addEventListener('click', () => {
					openMedia(gallery, key);
				});
			}
		});
	}

	function openMedia(images, key) {
		let getKey = images.findIndex(image => image.position === parseInt(key));

		const options = {
				index: getKey,
				closeOnScroll: false,
			},
			gallery = new PhotoSwipe(galleryElement, PhotoSwipeUI_Default, images, options);

		gallery.listen('imageLoadComplete', (index, item) => {
			if (item.h < 1 || item.w < 1) {
				let img = new Image();

				img.onload = () => {
					item.w = img.width;
					item.h = img.height;
					gallery.invalidateCurrItems();
					gallery.updateSize(true);
				};

				img.src = item.src;
			}
		});

		gallery.init();
	}

	function creatingGalleryContent() {
		const count = parseInt(galleryContent.dataset.count);
		const countOfRows = count / 3;

		for (let i = 1; i <= countOfRows; i++) {
			const galleryRow = document.createElement('div');
			galleryRow.classList.add('gallery-row');

			galleryContent.appendChild(galleryRow);

			for (let j = 1; j <= count + 1; j++) {
				const galleryItem = document.createElement('div'),
					galleryColumnItems = document.createElement('div'),
					galleryPicture = document.createElement('picture'),
					galleryImage = document.createElement('img');

				galleryItem.classList.add('gallery-item');
				galleryColumnItems.classList.add('gallery-column-items');
				galleryPicture.classList.add('gallery-picture');
				galleryImage.classList.add('gallery-image');
				galleryImage.setAttribute('src', `images/gallery/${j}.jpeg`);
				galleryImage.setAttribute('data-gallery', 'item');

				galleryPicture.appendChild(galleryImage);
				galleryItem.appendChild(galleryPicture);

				const getTwoLastItems = galleryRow.childNodes;

				if (getTwoLastItems.length === 3) {
					let firstElement = getTwoLastItems[1],
						secondElement = getTwoLastItems[2];

					galleryColumnItems.append(firstElement, secondElement);
					galleryRow.appendChild(galleryColumnItems);
				}

				if (i === 1 && j <= 3) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 2 && j > 3 && j <= 6) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 3 && j > 6 && j <= 9) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 4 && j > 9 && j <= 12) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 5 && j > 12 && j <= 15) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 6 && j > 15 && j <= 18) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 7 && j > 18 && j <= 21) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 8 && j > 21 && j <= 24) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 9 && j > 24 && j <= 27) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 10 && j > 27 && j <= 30) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 11 && j > 30 && j <= 33) {
					galleryRow.appendChild(galleryItem);
				}

				if (i === 12 && j > 33 && j <= 36) {
					galleryRow.appendChild(galleryItem);
				}
			}

			if (i === countOfRows - 1) {
				setTimeout(getAllImages, 1000);
			}
		}
	}

	const logosContent = document.querySelector('[data-el="logos.content"]'),
		logosSlider = document.querySelector('[data-el="logos.line"]'),
		logosBlock = document.querySelector('[data-el="logos.block"]'),
		endOfContent = logosContent.getBoundingClientRect().height;

	const bodyRect = document.body.getBoundingClientRect(),
		elemRect = logosContent.getBoundingClientRect(),
		defaultOffset   = elemRect.top - bodyRect.top;

	moving(endOfContent / 2);

	interact(logosSlider)
		.draggable({
			listeners: {
				move (event) {
					if (event.pageY >= defaultOffset && event.pageY <= (defaultOffset + endOfContent)) {
						const actualValue = -(defaultOffset - event.pageY);
						moving(actualValue);
					}
				}
			},
		})

	function moving(value) {
		let slider = document.querySelector('[data-el="logos.line"]'),
			block1 = document.querySelector('[data-el="logos.block"]');

		slider.style.top = `${value}px`;
		block1.style.height = `${value - 1}px`;
	}
}
