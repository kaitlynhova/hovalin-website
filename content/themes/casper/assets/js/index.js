/**
 * Main JS file for Casper behaviours
 */

$( document ).ready(function() {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  d = new Date();
  x = d.getDay();
  $("#today").text(days[x]);
});

 $( document ).ready(function() {
  var currentQuote = 0;
  setInterval(function(){
    $("#subheadline").text(home_page_quotes[currentQuote++]);
  }, 10000);
});

//ghetto fix for push menu on safari not behaving

var count = 0;
$('.toggle-menu').click(function(){
  if (count % 2) {
    $('#mobile-nav').css('left','0px');
    count ++;
  }
  else{
    $('#mobile-nav').css('left','-240px');
    count ++;
  }
});



var home_page_quotes = [
  "that your mom told you about",
  "programmed to remember your birthday",
  "that can cat-sit while you're on vacation",
  "that can do your taxes",
  "that knows how to parallel park",
  "that can travel to Mars",
  "that can give your kids, 'the talk'"
];


$( document ).ready(function() {
  var currentQuote = 0;
  setInterval(function(){
    $("#docs-subheadline").text(print_page_quotes[currentQuote]);
    currentQuote = (currentQuote + 1) % print_page_quotes.length;
  }, 5000);
});

var print_page_quotes = [
  "with science",
  "together",
  "with math"
];

 // handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function(e) {
  // target element id
  var id = $(this).attr('href');

  // target element
  var $id = $(id);
  if ($id.length === 0) {
    return;
  }

  // prevent standard hash navigation (avoid blinking in IE)
  e.preventDefault();

  // top position relative to the document
  var pos = $(id).offset().top;

  // animated top scrolling
  $('body, html').animate({scrollTop: pos});
});


$('.menu-button').click(function(){
  $('.menu-button').addClass('go-away');
});

$('.nav-close').click(function(){
  $('.menu-button').removeClass('go-away');
});


$(window).scroll(function() {
  var height = $(window).scrollTop();
  if(height  < 50) {
    $('#custom-navigation').css('background-color', 'rgba(68, 68, 68, 0.7)');
    $('.support-button').css('background-color', 'rgba(243, 181, 74, 0.7)');
  }
  if(height  > 50) {
    $('#custom-navigation').css('background-color', 'rgba(68, 68, 68, 0.9)');
    $('.support-button').css('background-color', 'rgba(243, 181, 74, 0.9)');
  }
});

/* globals jQuery, document */
(function ($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function () {

    var $postContent = $(".post-content");
    $postContent.fitVids();

    $(".scroll-down").arctic_scroll();

    $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
      e.preventDefault();
      $("body").toggleClass("nav-opened nav-closed");
    });

  });

  // Arctic Scroll by Paul Adam Davis
  // https://github.com/PaulAdamDavis/Arctic-Scroll
  $.fn.arctic_scroll = function (options) {

    var defaults = {
      elem: $(this),
      speed: 500
    },

    allOptions = $.extend(defaults, options);

    allOptions.elem.click(function (event) {
      event.preventDefault();
      var $this = $(this),
      $htmlBody = $('html, body'),
      offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
      position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
      toMove;

      if (offset) {
        toMove = parseInt(offset);
        $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
      } else if (position) {
        toMove = parseInt(position);
        $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
      } else {
        $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
      }
    });
  };
})(jQuery);
