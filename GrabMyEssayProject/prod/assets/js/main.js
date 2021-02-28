(function ($) {
    // form settings
    $('input, select:not([name=country])').styler({withNano: true});

    $('input, select[name=country]').styler({
        selectSearch: true,
        withNano: true,
        selectSearchPlaceholder: 'Enter your country'
    });
    $('.f_group.pages input').spinedit();

    // faq handler
    $('.faq__item', '.faq').on('click', function (e) {
        $(this).toggleClass('faq__item--active');
        $(this).find('.faq__value').slideToggle();
        e.preventDefault();
    });

    // faqs handler
    $('.faqs__item', '.faqs').on('click', function (e) {
        $(this).toggleClass('faqs__item--active');
        $(this).find('.faqs__value').slideToggle();
        e.preventDefault();
    });

    // mobile menu
    $('.header__button', '.header').on('click', function (e) {
        $('.header__nav').slideToggle('header__nav--close');
        $('.header__button').toggleClass('header__button--close');
        e.preventDefault();
    });

    // hide bottom line
    $('.promo__close', '.promo').on('click', function () {
        $('.promo').hide();
        e.preventDefault();
    });

    // main page testimonials slider
    $('.testimonials__list').slick({
        dots: true,
        centerMode: true,
        centerPadding: '250px',
        slidesToShow: 1,
        slidesToScroll: 1,
        //arrows: false,
        prevArrow: '.testimonials__arrow--prev',
        nextArrow: '.testimonials__arrow--next'
    });

    // notice slider
    $('.notice__list').slick({
        dots: true,
        //centerMode: true,
        //centerPadding: '250px',
        slidesToShow: 1,
        slidesToScroll: 1,
        //arrows: false,
        prevArrow: '.notice__arrow--prev',
        nextArrow: '.notice__arrow--next'
    });
})(jQuery);