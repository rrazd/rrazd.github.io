(function () {
	$(".hpe .animated-link").click(function() {
		$(".hpe .learn-more-text").addClass("project-text-container-visible");
		$(".hpe .preview-text").addClass("project-text-container-hide");
		$(".hpe.project-content").addClass("expand");
	});
	$(".hpe .animated-link.goBack").click(function() {
		$(".hpe .learn-more-text").toggleClass("project-text-container-visible");
		$(".hpe .preview-text").toggleClass("project-text-container-hide");
		$(".hpe.project-content").toggleClass("expand");
	});
	$(".riverbed .animated-link").click(function() {
		$(".riverbed .learn-more-text").addClass("project-text-container-visible");
		$(".riverbed .preview-text").addClass("project-text-container-hide");
		$(".riverbed.project-content").addClass("expand");
	});
	$(".riverbed .animated-link.goBack").click(function() {
		$(".riverbed .learn-more-text").toggleClass("project-text-container-visible");
		$(".riverbed .preview-text").toggleClass("project-text-container-hide");
		$(".riverbed.project-content").toggleClass("expand");
	});
	$(".mcafee .animated-link").click(function() {
		$(".mcafee .learn-more-text").addClass("project-text-container-visible");
		$(".mcafee .preview-text").addClass("project-text-container-hide");
		$(".mcafee.project-content").addClass("expand");
	});
	$(".mcafee .animated-link.goBack").click(function() {
		$(".mcafee .learn-more-text").toggleClass("project-text-container-visible");
		$(".mcafee .preview-text").toggleClass("project-text-container-hide");
		$(".mcafee.project-content").toggleClass("expand");
	});
})();