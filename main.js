// MossyWare: language preference, sticky header state, scroll reveals.
// Page copy lives in src/strings.mjs; scripts/build.mjs renders / (English) and /zh/ (中文).
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  // First visit to the English page from a Chinese-language browser: go to /zh/.
  // Once someone picks a language with the switch, that choice wins.
  var langLink = document.querySelector('.lang');
  var isEnglish = root.lang === 'en';
  if (isEnglish && !store('lang') && (navigator.language || '').toLowerCase().indexOf('zh') === 0) {
    location.replace(langLink.getAttribute('href') + location.hash);
    return;
  }
  langLink.addEventListener('click', function (e) {
    store('lang', langLink.getAttribute('data-lang-to'));
    if (location.hash) {
      e.preventDefault();
      location.href = langLink.getAttribute('href') + location.hash;
    }
  });

  var top = document.querySelector('.top');
  function onScroll() { top.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
