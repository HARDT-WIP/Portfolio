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

	/* archive reveal */
	var reveals = document.querySelectorAll('.reveal');
	if ('IntersectionObserver' in window) {
		var ro = new IntersectionObserver(function (entries) {
			entries.forEach(function (e) {
				if (e.isIntersecting) {
					e.target.classList.add('is-in');
					ro.unobserve(e.target);
				}
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.15 });
		reveals.forEach(function (el) { ro.observe(el); });
	} else {
		reveals.forEach(function (el) { el.classList.add('is-in'); });
	}

	/* lightbox */
	var box = document.getElementById('lightbox');
	var boxImg = document.getElementById('lightbox-img');
	if (box && boxImg && typeof box.showModal === 'function') {
		document.querySelectorAll('.piece-frame').forEach(function (btn) {
			btn.addEventListener('click', function () {
				var img = btn.querySelector('img');
				boxImg.src = btn.getAttribute('data-full');
				boxImg.alt = img ? img.alt : '';
				box.showModal();
			});
		});
		box.querySelector('.lightbox-close').addEventListener('click', function () {
			box.close();
		});
		box.addEventListener('click', function (e) {
			if (e.target === box) box.close();
		});
		box.addEventListener('close', function () {
			boxImg.src = '';
		});
	}
})();
