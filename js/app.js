/**
 * Samuel Engelhardt — Portfolio
 * Vanilla JS: nav, scroll reveal, lightbox, back-to-top. No dependencies.
 */
(function () {
	'use strict';

	var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------------- nav toggle ---------------- */
	var navToggle = document.querySelector('.nav-toggle');
	var navLinks = document.querySelector('.nav-links');

	if (navToggle && navLinks) {
		navToggle.addEventListener('click', function () {
			var open = navLinks.classList.toggle('is-open');
			navToggle.classList.toggle('is-open', open);
			navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
		navLinks.querySelectorAll('a').forEach(function (a) {
			a.addEventListener('click', function () {
				navLinks.classList.remove('is-open');
				navToggle.classList.remove('is-open');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	/* ---------------- active nav link (homepage sections) ---------------- */
	var sections = document.querySelectorAll('main section[id]');
	var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
	if (sections.length && navAnchors.length && 'IntersectionObserver' in window) {
		var sectionObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					navAnchors.forEach(function (a) {
						a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
					});
				});
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		sections.forEach(function (s) { sectionObserver.observe(s); });
	}

	/* ---------------- scroll reveal ---------------- */
	var revealEls = document.querySelectorAll('[data-reveal]');
	if (revealEls.length) {
		if (reducedMotion || !('IntersectionObserver' in window)) {
			revealEls.forEach(function (el) { el.classList.add('is-visible'); });
		} else {
			var revealObserver = new IntersectionObserver(
				function (entries, obs) {
					entries.forEach(function (entry, i) {
						if (entry.isIntersecting) {
							var el = entry.target;
							var delay = Number(el.getAttribute('data-reveal-delay') || 0);
							setTimeout(function () { el.classList.add('is-visible'); }, delay);
							obs.unobserve(el);
						}
					});
				},
				{ threshold: 0.12 }
			);
			revealEls.forEach(function (el) { revealObserver.observe(el); });
		}
	}

	/* ---------------- back to top (stays visible; lifts above the footer instead of hiding, so it never overlaps the footer social icons) ---------------- */
	var backToTop = document.querySelector('.back-to-top');
	var siteFooter = document.querySelector('.site-footer');
	if (backToTop) {
		var updateBackToTop = function () {
			backToTop.classList.toggle('is-visible', window.scrollY > 500);
		};
		window.addEventListener('scroll', updateBackToTop, { passive: true });
		if (siteFooter && 'IntersectionObserver' in window) {
			var footerObserver = new IntersectionObserver(function (entries) {
				var entry = entries[0];
				backToTop.style.bottom = entry.isIntersecting
					? (entry.boundingClientRect.height + 24) + 'px'
					: '';
			}, { threshold: 0 });
			footerObserver.observe(siteFooter);
		}
	}

	/* ---------------- lightbox ---------------- */
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

		function openAt(index) {
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
		}

		function close() {
			lightbox.classList.remove('is-open');
			lbImg.src = '';
			document.body.style.overflow = '';
			if (lastFocused) lastFocused.focus();
		}

		triggers.forEach(function (el, i) {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				openAt(i);
			});
		});

		if (lbClose) lbClose.addEventListener('click', close);
		lightbox.addEventListener('click', function (e) {
			if (e.target === lightbox) close();
		});
		if (lbPrev) lbPrev.addEventListener('click', function () { openAt((currentIndex - 1 + triggers.length) % triggers.length); });
		if (lbNext) lbNext.addEventListener('click', function () { openAt((currentIndex + 1) % triggers.length); });

		document.addEventListener('keydown', function (e) {
			if (!lightbox.classList.contains('is-open')) return;
			if (e.key === 'Escape') close();
			if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
			if (e.key === 'ArrowRight' && lbNext) lbNext.click();
		});
	}
})();
