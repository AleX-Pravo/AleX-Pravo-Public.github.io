//OWNBOX region

var __ownbox_close_handler = void(0);

var __ownbox_mask = '<div id="ownbox-mask"></div>';

var __ownbox_sender = false;

$(document).on('click', '.ownbox-form', function(e){
 e.preventDefault();

 if (typeof window[$(this).data('before')] === 'function') window[$(this).data('before')]($(this));

 var link = $(this);
 var post_data = void(0);
 var autoclose = void(0);
 if (typeof link.data('post') !== 'undefined' && link.data('post') !== null) post_data = link.data('post');
 if (typeof link.data('autoclose') !== 'undefined' && link.data('autoclose') !== null && parseInt(link.data('autoclose'), 10) > 0) autoclose = parseInt(link.data('autoclose'), 10);

 own_box_show(link.attr('href'), post_data, autoclose);

 return false;
});

$(document).on('click', '.ownbox-close, #ownbox-mask', function(e){
 e.preventDefault();

 own_box_close();
});

function own_box_show(link, param, autoclose) {

 link = typeof link !== 'undefined' ? link : '';
 param = typeof param !== 'undefined' ? param : '';
 autoclose = typeof autoclose !== 'undefined' ? autoclose : false;

 if (!__ownbox_sender && link) {
  clearTimeout(__ownbox_close_handler);
  __ownbox_sender = true;

  $('#ownbox #box').html('<div class="ownbox-loader" style="position: absolute; top: 50%; left: 50%; width: 24px; height: 24px; margin: -22px 0 0 -22px; padding: 10px; background: rgba(0, 0, 0, .9); border-radius: 5px;"><img src="' + CI_ROOT + 'images/loader.gif" alt="loading"></div>');

  $.ajax({
   url: link,
   type: 'POST',
   data: param,
   success: function(data) {

    if (typeof data !== 'undefined' && data !== null && data.length) {

     own_box_close();
     $('#ownbox #box').html(__ownbox_mask + data);

     $('body').on({
      mousewheel: function(e) {

       if (!$(e.target).closest('#ownbox').length) {
        e.preventDefault();
        e.stopPropagation();
       }

      },
      keyup:  function(e) {

       if (e.keyCode == 27) {
        own_box_close();
       }

      }
     });

     $('html').addClass('ownbox-lock');
     $('#ownbox').css('display', 'block');

     own_box_update();

     if (autoclose) {
      __ownbox_close_handler = setTimeout(function(){
        own_box_close();
      }, autoclose);
     }

    }

    __ownbox_sender = false;

   },
   error: function() {
    __ownbox_sender = false;
   }
  }).done(function() {

  });

 }

}

function own_box_close() {

 $('body').off('mousewheel').off('keyup');

 $('#ownbox').hide();
 $('html').removeClass('ownbox-lock');
 $('#ownbox #box').empty();

 if (typeof __ownbox_close_handler !== 'undefined') clearTimeout(__ownbox_close_handler);

 return true;
}

function own_box_update() {
 if ($('#ownbox #box > .ownbox-content').length &&
     $('#ownbox').css('display') == 'block'
    ) {

  var __elem = $('#ownbox #box > .ownbox-content').first();
  var __height = __elem.outerHeight();
  var __top = ($('#ownbox #box').height() - $('#ownbox #box > .ownbox-content').outerHeight()) / 2;

  if ($('#ownbox #box').height() > __height) {

   __elem.css('top', __top);

  } else {

   __elem.css('top', '');

  }

 }
}

$(window).load(function(){
 own_box_update();
});

$(window).resize(function(){
 own_box_update();
});
