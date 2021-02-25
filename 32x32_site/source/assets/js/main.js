;(function ($, window, document, undefined) {
    // Main events
    $(document).ready(function () {
        footer();
        blockHeight();
        //scrollPage();
        swiperInit();
        setLanguageSwitcher();
        requestAnimFrame();
        mouseTrack();
        mouseTrackInits();
        //canvasText1();
        //canvasText2();
        //canvasText3();
        //canvasText4();
        //canvasText5();
    });

    $(window).on('load', function () {
        footer();
        $("body").removeClass("preload");
        //canvasText1();
        //canvasText2();
        //canvasText3();
        //canvasText4();
        //canvasText5();
    });

    $(window).on('resize', function () {
        footer();
        swiperInit();
        setLanguageSwitcher();
        blockHeight();
        mouseTrack();
        mouseTrackInits();
        //canvasText1();
        //canvasText2();
        //canvasText3();
        //canvasText4();
        //canvasText5();
        if ($('canvas#c').length > 0){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            abstract();
        }
    });

    function setLanguageSwitcher() {
        var currentLanguageWidth = $('.language-item > a').outerWidth();
        $('.language .language-wrap').css('left', currentLanguageWidth);
        $('.language-item > a').click(function() {
            $('.menu--content_inner').removeClass('open--submenu');
            return false;
        });
    }

    // function scrollPage(){
    //     if ($('.projects-inner__content').length > 0){
    //         $('html, body').animate({
    //             scrollTop: $('.projects-inner__content').offset().top
    //         }, 1000);
    //     }
    // }

    function blockHeight(){
        if (window.innerWidth > 720) {
            var trackHeight = $('.header').outerHeight();
            var h = $(window).height();
            var reznic = h - trackHeight;
            var rezult = reznic * 100 / h;
            $('html, body').find('.projects-inner__top').css('height', rezult + 'vh');
            $('html, body').find('.projects-inner__wrap').css('height', rezult + 'vh');
            //$('html, body').find('.projects-tabs').css('height', rezult + 'vh');
        }
    }

    function requestAnimFrame(){
        var headerHeight = $('.header').outerHeight();
        $('.requestAnimFrame').css('top', -headerHeight);
    }

    function mouseTrack() {
        var width = $(window).width();
        var height = $(window).height();
        var widthHalf = width / 2;
        var heightHalf = height / 2;
        var heightHalf = height / 2;
        var tabsActive = $('.tabs__infoNews p').outerHeight();
        var keyTexth = $('.tabs__infoNews-inner:nth-child(2) p').outerHeight();
        var keyTextw = $('.tabs__infoNews-inner:nth-child(2) p').outerWidth();
        if (width > 1024) {
            $(document).mousemove(function (e) {
                var pageXresult = e.pageX - widthHalf;
                var pageYresult = e.pageY - heightHalf;
                $('.keyText').css('transform', 'translate3d(' + pageXresult / 200 + 'px, ' + pageYresult / 200 + 'px, 0)');
                $('.underText').css('transform', 'translate3d(' + pageXresult / 80 + 'px, ' + pageYresult / 100 + 'px, 0)');
                $('li.tabs__infoNews-inner:nth-child(2) .underText').css({
                                    //'transform': 'translate3d(' + pageXresult / 380 + 'px, ' + pageYresult / 120 + 'px, 0)',
                                    //'height': keyTexth,
                                    'width': keyTextw - 12
                                    });
            });
        }

        $('.tabs__infoNews-inner').css('height', tabsActive);
    }

    function mouseTrackInits() {
        var widthInits = $(window).width();
        var heightInits = $(window).height();
        var widthHalfInits = widthInits / 2;
        var heightHalfInits = heightInits / 2;
        var heightHalfInits = heightInits / 2;
        var keyTextwInits = $('.topBlockName, .topBlock-404').outerWidth();
        var keyTexthInits = $('.topBlockName, .topBlock-404').outerHeight();

        if (widthInits > 1024) {
            $('.topBlock__title-shadow, .topBlock-404__title-shadow').css({
                'width': keyTextwInits
            });
        }

        if (widthInits > 1024) {

            $(document).mousemove(function (e) {
                var pageXresultInits = e.pageX - widthHalfInits;
                var pageYresultInits = e.pageY - heightHalfInits;
                $('.topBlock__title, .topBlock-404__title').css('transform', 'translate3d(' + pageXresultInits / 100 + 'px, ' + pageYresultInits / 100 + 'px, 0)');
                $('.topBlock__title-shadow, .topBlock__img, .topBlock-404__title-shadow').css('transform', 'translate3d(' + pageXresultInits / 40 + 'px, ' + pageYresultInits / 40 + 'px, 0)');
            });
        }
    }

    //https://scriptstock.wordpress.com/2012/06/12/html5-canvas-text-underline-workaround/
    function canvasText1() {
        if ($('.topBlock__img').length > 0){
            var dataText1 = $('#canvasText-1').attr('data-text');
            var canvas1 = document.getElementById('canvasText-1');
            var ctx1 = canvas1.getContext('2d');

            ctx1.setLineDash([4, 4]);
            ctx1.strokeheight = '#7800FF';
            ctx1.font = '900 200px Axiforma';
            ctx1.strokeText(dataText1, 40, 184);
        }
    }

    function canvasText2() {
        if ($('.topBlock__img').length > 0){
            var dataText2 = $('#canvasText-2').attr('data-text');
            var canvas2 = document.getElementById('canvasText-2');
            var ctx2 = canvas2.getContext('2d');
            var textWidthcan = ctx2.measureText(dataText2).width;

            canvas2.width = $(window).width();
            canvas2.height = 150;
            ctx2.setLineDash([4, 4]);
            ctx2.strokeStyle = '#7800FF';
            ctx2.fillStyle = '#7800FF';
            //ctx2.textAlign = "center";
            ctx2.font = '900 100px Axiforma';

            ctx2.strokeText(dataText2, ((canvas2.width/2) - 17) - (textWidthcan / 2), 107);
            //ctx2.fillText(dataText2, (canvas2.width/2) - (textWidthcan / 2), 100);
        }
    }

    function canvasText3() {
        if ($('.bigName').length > 0){
            var dataText3 = $('#canvasText-3').attr('data-text');
            var canvas3 = document.getElementById('canvasText-3');
            var ctx3 = canvas3.getContext('2d');
            var textWidthcan3 = ctx3.measureText(dataText3).width;

            canvas3.width = $(window).width();
            canvas3.height = 100;
            ctx3.setLineDash([4, 4]);
            ctx3.strokeStyle = '#7800FF';
            ctx3.fillStyle = '#7800FF';
            //ctx2.textAlign = "center";
            ctx3.font = '900 96px Axiforma';

            ctx3.strokeText(dataText3, 0, 74);
            //ctx2.fillText(dataText2, (canvas2.width/2) - (textWidthcan / 2), 100);
        }
    }

    function canvasText4() {
        if ($('.bigName').length > 0){
            var dataText4 = $('#canvasText-4').attr('data-text');
            var canvas4 = document.getElementById('canvasText-4');
            var ctx4 = canvas4.getContext('2d');
            var textWidthcan4 = ctx4.measureText(dataText4).width;

            canvas4.width = $(window).width();
            canvas4.height = 90;
            ctx4.setLineDash([4, 4]);
            ctx4.strokeStyle = '#7800FF';
            ctx4.fillStyle = '#7800FF';
            //ctx2.textAlign = "center";
            ctx4.font = '900 84px Axiforma';

            ctx4.strokeText(dataText4, 0, 65);
            //ctx2.fillText(dataText2, (canvas2.width/2) - (textWidthcan / 2), 100);
        }
    }

    function canvasText5() {
        if ($('.bigName').length > 0){
            var dataText5 = $('#canvasText-5').attr('data-text');
            var canvas5 = document.getElementById('canvasText-5');
            var ctx5 = canvas5.getContext('2d');
            var textWidthcan5 = ctx5.measureText(dataText5).width;

            canvas5.width = $(window).width();
            canvas5.height = 60;
            ctx5.setLineDash([4, 4]);
            ctx5.strokeStyle = '#7800FF';
            ctx5.fillStyle = '#7800FF';
            //ctx2.textAlign = "center";
            ctx5.font = '900 58px Axiforma';

            ctx5.strokeText(dataText5, 0, 43);
            //ctx2.fillText(dataText2, (canvas2.width/2) - (textWidthcan / 2), 100);
        }
    }

    //menu

        // Functions
        function openMenu() {
            $('.header-device').addClass('open');
            $('.js-menu-container').addClass('is-open');
            $('.primaryMenu').addClass('primaryMenu-novisible');
            $('body').css({'overflow':'hidden'});
            $('.header').css({'z-index':'3'});
        }

        function closeMenu() {
             $('.header-device').removeClass('open');
             $('.js-menu-container').removeClass('is-open');
             $('.primaryMenu').removeClass('primaryMenu-novisible');
             $('body').css({'overflow':''});
             $('.header').css({'z-index':'0'});
        }

        // Document Ready
        $('.header-button').click(function(){
            if ($('.header-device').hasClass('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        // Keyboard Accessibility 'Esc' key
        $(document).keyup(function(e) { // Listen for keyboard presses

            if (e.keyCode === 27) { // 'Esc' key

                if ($('.js-menu-container').hasClass('is-open')) { // If the menu is open close it
                    closeMenu(); // Run the closeMenu function
                }

            }

        });


    //
    $('.fullscreen-menu__nav li').hover(
        function() {
            $( this ).addClass( "active" );
            $('.fullscreen-menu__nav li').not('.active').each(function(index, el) {
                $( this ).find('a').css({'opacity':'0.2'});

            });

        }, function() {
            $( this ).removeClass( "active" );
            $('.fullscreen-menu__nav li').each(function(index, el) {
                $( this ).find('a').css({'opacity':''});
            });

        }
    );

    //anim text
    $.fn.animate_Text = function() {
        let string = this.text(),
            duration = 3800;
        return this.each(function(){
            let $this = $(this);
            $this.html(string.replace(/./g, '<span class="new">$&</span>'));
            $this.find('span.new').each(function(i, el){
                setTimeout(function(){ $(el).addClass('div_opacity'); }, duration);
                duration += 200;
            });
        });
    };
    $('#example').show();
    $('#example').animate_Text();

    //tabs
    if ($(window).width() < 1024) {
        $('ul.tabs__infoNews').on('click', '.tabs__infoNews-inner:not(.active)', function() {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
    }

    //tabs
    (function($) {
        $(function() {

            $('ul.services-tabs__infoNews').on('mouseover', 'li.services-tabs__infoNews-inner:not(.active)', function() {
                $(this)
                    .addClass('active').siblings().removeClass('active')
                    .closest('div.services-tabs').find('div.services-tabs__content').removeClass('active').eq($(this).index()).addClass('active');
            });

        });
    })(jQuery);

    //переключатель табов
    $('ul.projects-tabs__infoNews').on('click', 'li.projects-tabs__infoNews-inner', function (e) {
        e.preventDefault();

        $(this).addClass('active').siblings().removeClass('active')
               .closest('div.projects-tabs').find('div.projects-tabs__content').hide().eq($(this).index()).fadeIn(200);

        swiperInit();
    });

    function swiperInit() {
        $('.slider-projects:visible').each(function () {

            var sliderSelector = new Swiper('.swiper-container', {
                mousewheel: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            })
        });
    }

    // Footer positions
    function footer() {
        var footer = $('#footer');
        if (footer.length) {
            var footerHeight = footer.outerHeight();

            $('#layout').css('padding-bottom', footerHeight);
            footer.css('margin-top', -footerHeight);
        }
    }

}($, window, document));
