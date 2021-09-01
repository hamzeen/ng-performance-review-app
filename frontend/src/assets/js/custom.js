
(function($) {
    'use strict';

    // Main Navigation
    $( '.hamburger-menu' ).on( 'click', function() {
        $(this).toggleClass('open');
        $('.site-navigation').toggleClass('show');
    });

  $('.form-group').each((i,e) => {
    console.log('come here!');
    $('.form-control', e)
      .focus( function () {
        e.classList.add('not-empty');
      })
      .blur( function () {
        this.value === '' ? e.classList.remove('not-empty') : null;
      })
    ;
  });



})(jQuery);
