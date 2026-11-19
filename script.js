(function () {
  // Fall back to the original CDN URL if a local image hasn't been downloaded yet.
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('error', function once() {
      img.removeEventListener('error', once);
      img.src = img.dataset.fallback;
    });
  });

  // Simple line icons (replace Cargo's icon font).
  var icons = {
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    microphone: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    waves: '<path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8L20 19M8.5 16L20 5"/>',
    grid: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    eye: '<path d="M3 12c3 4 15 4 18 0M6 15l-2 3M12 16.5V20M18 15l2 3"/>',
    shuffle: '<path d="M3 7h4c4 0 6 10 10 10h4M3 17h4c1.5 0 2.7-1.5 3.8-3.2M13.2 10.2C14.3 8.5 15.5 7 17 7h4M18 4l3 3-3 3M18 14l3 3-3 3"/>',
    bolt: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>'
  };
  document.querySelectorAll('.icon[data-icon]').forEach(function (el) {
    el.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[el.dataset.icon] || '') + '</svg>';
  });

  // Video posters: fall back to the CDN poster if the local file is missing.
  document.querySelectorAll('video[data-poster-fallback]').forEach(function (v) {
    var probe = new Image();
    probe.onerror = function () { v.poster = v.dataset.posterFallback; };
    probe.src = v.getAttribute('poster');
  });

  // Slideshows (sidebar photos and project pages)
  document.querySelectorAll('.slideshow').forEach(function (show) {
    var slides = show.querySelectorAll('.slide');
    var i = 0;
    function go(n) {
      var v = slides[i].querySelector('video');
      if (v) v.pause();
      slides[i].classList.remove('active');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
    }
    show.querySelector('.prev').addEventListener('click', function () { go(i - 1); });
    show.querySelector('.next').addEventListener('click', function () { go(i + 1); });
    var x0 = null;
    show.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    show.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  });
})();
