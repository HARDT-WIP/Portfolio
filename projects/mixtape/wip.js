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
		var cursorDot = document.createElement('div');
		cursorDot.className = 'cursor-dot';
		var cursorRing = document.createElement('div');
		cursorRing.className = 'cursor-ring';
		document.body.appendChild(cursorRing);
		document.body.appendChild(cursorDot);
		document.documentElement.classList.add('has-custom-cursor');

		window.addEventListener('mousemove', function (e) {
			cursorDot.style.left = e.clientX + 'px';
			cursorDot.style.top = e.clientY + 'px';
			cursorRing.style.left = e.clientX + 'px';
			cursorRing.style.top = e.clientY + 'px';
		}, { passive: true });

		document.addEventListener('mouseleave', function () {
			cursorDot.style.opacity = '0';
			cursorRing.style.opacity = '0';
		});
		document.addEventListener('mouseenter', function () {
			cursorDot.style.opacity = '';
			cursorRing.style.opacity = '';
		});

		var cursorHoverSelector = 'a, button, [role="button"]';
		document.addEventListener('mouseover', function (e) {
			if (e.target.closest(cursorHoverSelector)) {
				cursorRing.classList.add('is-active');
				cursorDot.classList.add('is-active');
			}
		});
		document.addEventListener('mouseout', function (e) {
			if (e.target.closest(cursorHoverSelector) && !(e.relatedTarget && e.relatedTarget.closest(cursorHoverSelector))) {
				cursorRing.classList.remove('is-active');
				cursorDot.classList.remove('is-active');
			}
		});
	}
})();
