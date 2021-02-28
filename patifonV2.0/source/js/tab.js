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
