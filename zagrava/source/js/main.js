;(function ($, window, document, undefined) {
    'use strict';

    var layout = $('#layout'),
        $document = $(document),
        playArray = ['rotateIn'],
        screenMdMin = 1080;

    $(document).ready(function() {
        stretchFullScreen();

        $document.on('click', '.call-aside', function(e) {
            e.preventDefault();

            $('body').addClass('open-' + $(this).data('trigger'));
            $('html').css('overflow', 'hidden');
            $('#shadow').addClass('active');
        });

        $document.on('click', '#shadow, .close-aside', function(e) {
            e.preventDefault();

            $('body').removeClass(function(index, css) {
                return (css.match(/\bopen-\S+/g) || []).join(' ');
            });

            $('html').css('overflow', '');
            $('#shadow').removeClass('active');
        });

        function addAnimateClass(img) {
            let currentClass = img.attr('class'),
                index = Math.floor(Math.random() * playArray.length);

            if (currentClass !== playArray[index]) {
                img.removeClass();
                img.addClass(playArray[index]);
            } else {
                addAnimateClass(img);
            }
        }

        $('.play__image').on('click', '.rotate', function() {
            $(this).addClass('rotateIn');

            setTimeout(function(){
                console.log($(this));
                $('.rotate').removeClass('rotateIn');
            },2000);
        });

        layout.on('click', '.tab-box__inner-link', function(e) {
            e.preventDefault();
            let self = $(this),
                parent = self.closest('.tab-box__inner-link'),
                target = parent.closest('.tab-box__inner-item');

            target.toggleClass('active');
            parent.next('.tab-box__inner-drop').slideToggle();
        });
    });

    $(window).on('resize', function() {
        stretchFullScreen();
        //-errorText();
    });

    function stretchFullScreen() {
        let winWidth = $(window).width(),
            container = 1440,
            stretchBox = $('.stretch'),
            gap = winWidth - container;

        stretchBox.each(function() {
            if(winWidth > container) {
                $(this).css({'width':winWidth, 'left': (gap - 30) / -2 + 'px', 'padding-left' : gap / 2 + 'px', 'padding-right' : gap / 2 + 'px'});
            } else {
                $(this).removeAttr('style');
            }
        });
    };

    function errorText() {

        let formGroupWidth = $('.has-error');

        formGroupWidth.each(function () {
            let self = $(this),

                hasErrorWidth = self.width(),
                label = self.find('label'),
                errorText = self.find('span'),
                diff = hasErrorWidth - label.width();

            errorText.css({
                'width': diff + 'px',
                'left': label.width() + 'px'
            });

        });
    };
}($, window, document));


// tabs
(function ($) {
    'use strict';

    var tab = (function () {

        Tab.prototype.defaults = {
			itemClass: 'tab-item',
			itemActive: 'active',
			change: function (e, tab, url) {}
		};

        function Tab($el, options) {
			this.options = $.extend({}, this.defaults, options);
			this.$el = $el;

            this.initTab();
			this.flatScroll(window.location.hash, true);

            this.$el.on('click.' + this.options.itemClass, 'a', (function (_this) {
                return function (e) {
					var hUrl = $(this).attr('href');

					if ($(hUrl).length > 0) {
						e.preventDefault();
						_this.flatScroll(hUrl, false);
					}
	            };
            })(this));

			this.$el.on('tab:change', this.options.change);
        }

		Tab.prototype.flatScroll = function(target, initScroll){

			var isTab = $(target);

			if (isTab.length > 0) {

				if (initScroll) { $('html').stop(); }
				var item = $("a[href='" + target + "']");

				item.parent().addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);
				isTab.addClass(this.options.itemActive).siblings().removeClass(this.options.itemActive);

				if (initScroll) {
					$('html').animate({
						scrollTop: item.offset().top - 20
					}, 1000, 'swing', function () {});
				} else {
					history.replaceState({}, '', item.attr('href'));
				}
			}
		}

        Tab.prototype.initTab = function(){

            var item = this.$el.find('.' + this.options.itemClass + ':first-child').addClass(this.options.itemActive);
            var hash = item.find('a').attr('href');

            if ($(hash).length > 0) {
                $(hash).addClass(this.options.itemActive);
            }
        }

        return Tab;
    })();

    return $.fn.tab = function () {

		var option = arguments[0] || [];

        return this.each(function () {
            $(this).data('tab', (new tab($(this), option)));
        });
    };
})(jQuery);
