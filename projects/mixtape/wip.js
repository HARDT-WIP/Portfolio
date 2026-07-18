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

	/* custom cursor (fine pointers only, e.g. mouse/trackpad) */
	if (window.matchMedia('(pointer: fine)').matches) {
		var cursorRing = document.createElement('div');
		cursorRing.className = 'cursor-ring';
		document.body.appendChild(cursorRing);
		document.documentElement.classList.add('has-custom-cursor');

		window.addEventListener('mousemove', function (e) {
			cursorRing.style.left = e.clientX + 'px';
			cursorRing.style.top = e.clientY + 'px';
		}, { passive: true });

		document.addEventListener('mouseleave', function () {
			cursorRing.style.opacity = '0';
		});
		document.addEventListener('mouseenter', function () {
			cursorRing.style.opacity = '';
		});

		var cursorHoverSelector = 'a, button, [role="button"]';
		document.addEventListener('mouseover', function (e) {
			if (e.target.closest(cursorHoverSelector)) cursorRing.classList.add('is-active');
		});
		document.addEventListener('mouseout', function (e) {
			if (e.target.closest(cursorHoverSelector) && !(e.relatedTarget && e.relatedTarget.closest(cursorHoverSelector))) {
				cursorRing.classList.remove('is-active');
			}
		});
	}

	/* tilt & glare demo cards (skip for reduced-motion users) */
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!reducedMotion && typeof VanillaTilt !== 'undefined') {
		VanillaTilt.init(document.querySelectorAll('.tilt-card'));
	}
})();
