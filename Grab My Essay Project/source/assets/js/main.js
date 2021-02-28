(function ($) {
  'use strict';

  $(document).ready(function() {
    cookies();
  });

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

// sample slider
  $('.sample__list').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    // arrows: true,
    responsive: [
      // {
      //   breakpoint: 1920,
      //   // settings: "unslick"
      //   settings: {
      //     slidesToShow: 3,
      //   }
      // },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          // slidesToScroll: 1
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  // main page testimonials slider
  $('.testimonials__list').slick({
    dots: true,
    centerMode: true,
    centerPadding: '557px',
    slidesToShow: 1,
    slidesToScroll: 1,
    //arrows: false,
    prevArrow: '.testimonials__arrow--prev',
    nextArrow: '.testimonials__arrow--next',
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          centerMode: true,
          centerPadding: '300px'
        }
      },
      {
        breakpoint: 1500,
        settings: {
          centerMode: true,
          centerPadding: '200px'
        }
      },
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: '100px'
        }
      },
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: '50px'
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerMode: false,
          centerPadding: '0px'
        }
      }
    ]
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
  });  // notice slider

  // cookies
  function cookies() {
    let cookies = $('.cookies');

    if (localStorage.getItem('cookies-accept') === null) {
      cookies.removeClass('hide');
    }

    cookies.on('click', '.cookies__button', function(e) {
      e.preventDefault();
      cookies.addClass('hide');
      localStorage.setItem('cookies-accept', 'y');
    });
  }

  //- up button moves
  $(document).scroll(function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop,
      progressPart = $(window).scrollTop() / ($(document).height() - $(window).height()),
      progressBar = $('progress'),
      up = $('.up');

    if (scrolled > 100 && $('.up:hidden')) {
      up.fadeIn();
    } else {
      up.fadeOut();
    }

    if (progressBar.length > 0) {
      progressBar.attr('value', progressPart);
    }
  });

  $(document).on('click','.up', function (e) {
    e.preventDefault();
    $('body,html').animate({scrollTop: 0}, 800);
  });

})(jQuery);
