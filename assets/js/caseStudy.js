(function () {
  function setContextProps(context, fontSize) {
    context.globalCompositeOperation = 'xor';
    context.font = fontSize + "px Proxima_nova_bold";
    context.textAlign = "center";
    context.textBaseline="middle";
  }
  function drawTagLines() {
    $('.canvas-text').each(function (index, canvas) {
      var context=canvas.getContext("2d"),
        parentStyle = getComputedStyle(canvas.parentElement),
        fontSize = parseInt(parentStyle.fontSize.slice(0, 2));

      setContextProps(context, fontSize);

      // figure out height and width
      var text = canvas.getAttribute('data-text'),
        width = context.measureText(text).width + 25,
        height = fontSize * 1.618;


      if (canvas.width === width && canvas.height === height) {
        return;
      }

      canvas.width = width;
      canvas.height = height;

      canvas.style.width = (width / 2) + 'px';

      // set context props again as they context gets reset on changing height/width
      setContextProps(context, fontSize);

      // fill background
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      // fill text
      context.fillStyle = "black";
      context.fillText(text, width / 2, height / 2);
    });
  }

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 30) {
        $(".case-header").addClass("shade");
      } else {
        $(".case-header").removeClass("shade");
      }
  });

  $(document).ready(function() {
    $('img.lazy').lazyload({
        threshold : 200,
        effect: "fadeIn",
        placeholder: ""
    });
  });

  window.addEventListener('resize', function () {
    drawTagLines();
  });

  window.addEventListener('load', function () {
    $('.loader').addClass("transparent");
    setTimeout(function () {
      $('.loader').addClass('hidden');
    }, 500);
    drawTagLines();
  });

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight() + 130;

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('header').removeClass('nav-down').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('header').removeClass('nav-up').addClass('nav-down');
          }
      }

      lastScrollTop = st;
  }

})();
