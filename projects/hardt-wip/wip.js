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

	/* back to top */
	var backToTop = document.querySelector('.back-to-top');
	var wipFooter = document.querySelector('.wip-footer');
	if (backToTop) {
		var updateBackToTop = function () {
			backToTop.classList.toggle('is-visible', window.scrollY > 500);
		};
		window.addEventListener('scroll', updateBackToTop, { passive: true });
		if (wipFooter && 'IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				var entry = entries[0];
				backToTop.style.bottom = entry.isIntersecting
					? (entry.boundingClientRect.height + 24) + 'px'
					: '';
			}, { threshold: 0 }).observe(wipFooter);
		}
	}

	/* tilt & glare demo cards (skip for reduced-motion users) */
	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!reducedMotion && typeof VanillaTilt !== 'undefined') {
		VanillaTilt.init(document.querySelectorAll('.tilt-card'));
	}

	/* lightbox (gallery pages) */
	var lightbox = document.querySelector('.lightbox');
	if (lightbox) {
		var lbImg = lightbox.querySelector('img');
		var lbTitle = lightbox.querySelector('.lightbox-title');
		var lbType = lightbox.querySelector('.lightbox-type');
		var lbPrev = lightbox.querySelector('.lightbox-prev');
		var lbNext = lightbox.querySelector('.lightbox-next');
		var lbClose = lightbox.querySelector('.lightbox-close');
		var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-src]'));
		var currentIndex = -1;
		var lastFocused = null;

		var openAt = function (index) {
			if (index < 0 || index >= triggers.length) return;
			currentIndex = index;
			var el = triggers[index];
			lbImg.src = el.getAttribute('data-lightbox-src');
			lbImg.alt = el.getAttribute('data-lightbox-alt') || '';
			if (lbTitle) lbTitle.textContent = el.getAttribute('data-lightbox-title') || '';
			if (lbType) lbType.textContent = el.getAttribute('data-lightbox-type') || '';
			lastFocused = document.activeElement;
			lightbox.classList.add('is-open');
			lbClose.focus();
			document.body.style.overflow = 'hidden';
		};

		var closeLightbox = function () {
			lightbox.classList.remove('is-open');
			lbImg.src = '';
			document.body.style.overflow = '';
			if (lastFocused) lastFocused.focus();
		};

		triggers.forEach(function (el, i) {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				openAt(i);
			});
		});

		if (lbClose) lbClose.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', function (e) {
			if (e.target === lightbox) closeLightbox();
		});
		if (lbPrev) lbPrev.addEventListener('click', function () { openAt((currentIndex - 1 + triggers.length) % triggers.length); });
		if (lbNext) lbNext.addEventListener('click', function () { openAt((currentIndex + 1) % triggers.length); });

		document.addEventListener('keydown', function (e) {
			if (!lightbox.classList.contains('is-open')) return;
			if (e.key === 'Escape') closeLightbox();
			if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
			if (e.key === 'ArrowRight' && lbNext) lbNext.click();
		});
	}
})();
