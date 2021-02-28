(function ($) {
    'use strict';

    let rating = (function () {

        Rating.prototype.defaults = {
            rating: void 0,
            max: 5,
            createNode: true,
            readOnly: false,
            listClass: 'rating__list',
            itemClass: 'rating__item',
            fullClass: 'rating__full',
            change: function (e, value) {
            }
        };

        function Rating($el, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$el = $el;
            this.input = ($($el).find('input').length > 0) ? $($el).find('input') : false;

            if (this.options.createNode) {
                this.$el.append("<ul class='" + this.options.listClass + "'/>")
                for (var i = 0; i < this.options.max; i++) {
                    this.$el.find('ul').append("<li class='" + this.options.itemClass + "'/>");
                }
            }

            this.initRating();

            if (this.options.readOnly) {
                return;
            }

            this.$el.on('mouseover.' + this.options.listClass, 'li', (function (_this) {
                return function (e) {
                    return _this.initRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('mouseout.' + this.options.listClass, (function (_this) {
                return function () {
                    return _this.initRating();
                };
            })(this));

            this.$el.on('click.' + this.options.listClass, 'li', (function (_this) {
                return function (e) {
                    e.preventDefault();
                    return _this.setRating(_this.$el.find('li').index(e.currentTarget) + 1);
                };
            })(this));

            this.$el.on('rating:change', this.options.change);
        }

        Rating.prototype.setRating = function (rating) {

            if (this.options.rating === rating) {
                rating = void 0;
            }

            this.$el.attr('data-value', (rating || 0));

            if (this.input) {
                this.input.val(rating || 0);
            }

            this.options.rating = rating;
            this.initRating();
            return this.$el.trigger('rating:change', rating || 0);
        };

        Rating.prototype.initRating = function (rating) {
            let i, j, ref;

            let inp = (this.input) ? parseInt(this.input.val(), 10) : 0;
            let value = (rating) ? rating : Math.max((this.$el.attr('data-value') || 0), inp, (this.options.rating || 0));

            for (i = j = 1, ref = this.options.max; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                this.$el.find('li').eq(i - 1).removeClass(value >= i ? '' : this.options.fullClass).addClass(value >= i ? this.options.fullClass : '');
            }
        };

        return Rating;
    })();

    return $.fn.rating = function () {

        let option = arguments[0] || [];

        return this.each(function () {
            if (!$(this).data('rating')) {
                $(this).data('rating', (new rating($(this), option)));
            }
        });
    };
})(jQuery);
