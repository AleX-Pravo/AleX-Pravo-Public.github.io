// carousel
function carousel(elem, callback) {
    var elem = $(elem),
        max = 5;

    if (!elem) return;

    elem.find('.jcarousel').on('jcarousel:create jcarousel:reload', function() {
        var element = $(this),
            width = element.innerWidth(),
            result = callback(width, max);

            width = result.width;
            max = result.max;

        element.jcarousel('items').css('width', width + 'px');
    }).jcarousel({
        list: '.jcarousel__list',
        item: '.jcarousel__item',
        wrap: 'circular',
        scroll: 1
    });

    if (elem.find('.jcarousel__item').length < max) {
        elem.find('.jcarousel__btn').hide();
    }

    elem.find('.jcarousel__btn--prev').jcarouselControl({target: '-=1'});
    elem.find('.jcarousel__btn--next').jcarouselControl({target: '+=1'});
}
