(function () {
	function rand(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	function moveElement(arrayA, arrayB) {
		var randomIndex = rand(0, arrayA.length),
			removedElements = arrayA.splice(randomIndex, 1);

		arrayB.push(removedElements[0]);
	}

	function setLogoUrl(logos, index) {
		document.querySelector('#logo-container' + (index + 1) + ' img').src = 'assets/images/logos/' + logos[index] + '.svg';
	}

	function initLogoRotation() {
		var logos = [
			'cisco',
			'couchbase',
			'hoover',
			'hpe',
			'iteris',
			'mcafee',
			'riverbed',
			'weka',
			'cawit',
			'we'
		],
			current = [],
			logoCount = 3;

		for (var i = 0; i < logoCount; i++) {
			moveElement(logos, current);
			setLogoUrl(current, i);
		}

		setInterval(function () {
			var indexFromCurrent = rand(0, logoCount),
				indexFromLogos = rand(0, logos.length),
				temp = current[indexFromCurrent];

			var imageToSwap = document.querySelector('#logo-container' + (indexFromCurrent + 1) + ' img');
			imageToSwap.style.opacity = "0";
			imageToSwap.style.transform = "translateY(5px)";

			setTimeout(function () {
				current[indexFromCurrent] = logos[indexFromLogos];
				logos[indexFromLogos] = temp;

				setLogoUrl(current, indexFromCurrent);
				imageToSwap.style.opacity = "1";
				imageToSwap.style.transform = "translateY(0px)";
			}, 1000);

		}, 3000);
	}

	$(document).ready(function() {
		/* fullpage */
		$('#fullpage').fullpage({
			anchors: ["welcome", "caseStudy0", "caseStudy1", "caseStudy2", "caseStudy3", "allProjects", "about", "contact"],
			menu: '#page-menu, #top-menu',
			css3: true,
			scrollingSpeed: 700,
			responsiveHeight: 560,
			normalScrollElements: '#mobile-menu',
			afterRender: function() {
				setTimeout( function () {
					$(".section-welcome").addClass("appear");
				});
			},
			onLeave: function(index, nextIndex) {
				if (nextIndex === 1) {
					setTimeout(function () {
						$(".section-welcome").addClass("appear");
					});
				} else {
					setTimeout( function () {
						$(".section-welcome").removeClass("appear");
					});
				}
	        }
		});
		/* end of fullpage */

		/* Three.js */
		initThree();
		/* End of Three.js */

		/* mobile menu */
		var $menu = $('#mobile-menu'),
			$body = $('body'),
			fnOpen = false;

		var fnToggleFunc = function() {
			fnOpen = !fnOpen;
			$body.toggleClass('noscroll');
			$menu.stop().fadeToggle(500);
			$menu.toggleClass("active");
			$('.toggle-menu').toggleClass('on');
			$('.logo').toggleClass('on');
			return true;
		};

		$('#mobile-menu .menu-item a').on('click', fnToggleFunc);

		$('.toggle-menu').on('click', function () {
			fnToggleFunc();
			return false;
		});

		$('.logo').on('click', function () {
			if (fnOpen) {
				fnToggleFunc();
			}
		});
		/* end of mobile menu */

		/* move down to next section */
		 $(document).on("click", ".go-down", function() {
        $.fn.fullpage.moveSectionDown();
	    });
	});

	window.addEventListener('load', function () {
		$('.loader').addClass("transparent");
		setTimeout(function () {
			$('.loader').addClass('hidden');
		}, 500);

		initLogoRotation();
	});

})();