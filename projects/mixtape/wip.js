/* Hardt.wip — minimal interactions. No scroll listeners; observers only. */
(function () {
	'use strict';

	/* solid header past the hero top: sentinel + IntersectionObserver */
	var header = document.getElementById('header');
	var sentinel = document.querySelector('.header-sentinel');
	if (header && sentinel && 'IntersectionObserver' in window) {
		new IntersectionObserver(function (entries) {
			header.classList.toggle('is-solid', !entries[0].isIntersecting);
		}).observe(sentinel);
	}
})();
