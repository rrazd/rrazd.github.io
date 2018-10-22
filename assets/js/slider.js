(function () {
  function initSliders() {
    $('.slider').each(initSlider);
  }

  function transitionToIndex(index, $slider) {
    // transition text
    $slider.find('.slider-content-text-item.active').removeClass('active');
    $slider.find('.slider-content-text-item').eq(index).addClass('active');

    // transition image
    $slider.find('.slider-content-image-container.active').removeClass('active');
    $slider.find('.slider-content-image-container').eq(index).addClass('active');

    // transition nav
    $slider.find('.slider-nav-item.active').removeClass('active');
    $slider.find('.slider-nav-item').eq(index).addClass('active');
  }

  function transitionNext($target, forward, $slider) {
    var index = $target.index();
    var numChildren = $target.parent().children().length;

    if (forward) {
      if (++index >= numChildren) {
        index = 0;
      }
    } else {
      if (--index < 0) {
        index = numChildren - 1;
      }
    }

    transitionToIndex(index, $slider);
  }

  function initSlider(index, slider) {
    var $slider = $(slider);
    $slider.find('.slider-nav-item').click(function (event) {
      var index = $(event.currentTarget).index();
      transitionToIndex(index, $slider);
    });

    // transition back on text click
    $slider.find('.slider-content-text-item').click(function (event) {
      transitionNext($(event.currentTarget), false, $slider);
    });

    // transition forward on image click
    $slider.find('.slider-content-image-container').click(function (event) {
      transitionNext($(event.currentTarget), true, $slider);
    });
  }

  $(document).ready(function() {
    initSliders();
  });
})();