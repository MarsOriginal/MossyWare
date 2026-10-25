// MossyWare — language switch, sticky header state, scroll reveals.
(function () {
  var STRINGS = {
    en: {
      title: 'MossyWare — Small software, grown slowly',
      skip: 'Skip to content',
      'nav.work': 'Work',
      'nav.studio': 'Build with us',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'An independent software studio',
      'hero.l1': 'Small software,',
      'hero.l2': 'grown slowly.',
      'hero.lede': 'We make calm, carefully crafted apps of our own — and build websites and software for people who care about the details.',
      'hero.cue': 'See the work',
      'work.title': 'Our projects',
      'work.sub': 'Things we make for ourselves, and for you.',
      'orbit.kind': 'Day planner · iOS & Android',
      'orbit.tagline': 'Plan less. Focus more.',
      'orbit.desc': 'A calm day planner built around three quiet rooms: a timeline for your time blocks, a focus timer with lo‑fi and singing bowls synthesised right on the device, and a daily almanac leaf to start the morning.',
      'orbit.f1t': 'Day',
      'orbit.f1': 'Drag blocks onto a gentle timeline.',
      'orbit.f2t': 'Focus',
      'orbit.f2': 'An orbit-ring countdown with generative sound.',
      'orbit.f3t': 'Almanac',
      'orbit.f3': 'Moon, tarot, or the Chinese almanac — every day.',
      'orbit.f4t': 'Private',
      'orbit.f4': 'No server, no analytics. Your plans stay on your phone.',
      'sv.tagline': 'A rhapsody from the top of the world.',
      'sv.desc': 'Polar night, midnight sun, and the quiet in between. Our next project takes its name from the Arctic archipelago where the light keeps its own schedule.',
      'sv.status': 'In development — coming soon',
      'studio.title': 'Websites & software, built for you',
      'studio.sub': 'The same care we put into our own apps, applied to your business — from first sketch to launch and beyond.',
      'svc.1t': 'Websites',
      'svc.1': 'Brand sites, shops and landing pages that are fast, bilingual if you need it, and easy to keep up to date.',
      'svc.2t': 'Web & mobile apps',
      'svc.2': 'Booking, ordering, internal tools — on the web, iPhone and Android from a single codebase.',
      'svc.3t': 'Design',
      'svc.3': 'Identity, interface and content design that feels like you, not like a template.',
      'svc.4t': 'Care & hosting',
      'svc.4': 'Domains, hosting, updates and small changes, handled — so you can get on with your work.',
      'cases.title': 'Selected client work',
      'cases.tea': 'A shop for Chinese teas sourced direct from Fujian, run from Melbourne — brand site, catalogue, checkout and a brewing guide.',
      'cases.joy': 'The company site of an outdoor-wear OEM / ODM manufacturer with factories in China, Myanmar and Bangladesh.',
      'contact.l1': 'Have something',
      'contact.l2': 'you’d like to grow?',
      'contact.sub': 'Tell us a little about your project. We usually reply within two working days.',
      foot: 'Made slowly, with care.'
    },
    zh: {
      title: 'MossyWare — 慢慢生长的小软件',
      skip: '跳到正文',
      'nav.work': '作品',
      'nav.studio': '建站与开发',
      'nav.contact': '联系',
      'hero.eyebrow': '一间独立软件工作室',
      'hero.l1': '小而美的软件，',
      'hero.l2': '慢慢生长。',
      'hero.lede': '我们打磨属于自己的、安静而用心的应用，也为在意细节的你搭建网站与软件。',
      'hero.cue': '看看作品',
      'work.title': '我们的项目',
      'work.sub': '为自己而做，也为你而做。',
      'orbit.kind': '日程规划 · iOS 与 Android',
      'orbit.tagline': '少一点计划，多一点专注。',
      'orbit.desc': '一款安静的日程规划应用，由三个房间组成：安放时间块的时间线、在设备上实时合成 lo‑fi 与颂钵声的专注计时器，以及每天清晨翻开的一页黄历。',
      'orbit.f1t': '日程',
      'orbit.f1': '把时间块轻轻拖到时间线上。',
      'orbit.f2t': '专注',
      'orbit.f2': '星轨倒计时，配上生成式的声音。',
      'orbit.f3t': '黄历',
      'orbit.f3': '宜忌、节气、月相与每日一签。',
      'orbit.f4t': '隐私',
      'orbit.f4': '没有服务器，没有统计。计划只留在你的手机里。',
      'sv.tagline': '来自世界尽头的一首狂想曲。',
      'sv.desc': '极夜、午夜太阳，以及两者之间的寂静。我们的下一个项目，取名自那座光线自有作息的北极群岛。',
      'sv.status': '开发中 — 敬请期待',
      'studio.title': '为你搭建网站与软件',
      'studio.sub': '把打磨自家应用的那份用心，带到你的生意里 —— 从第一张草图到上线，以及上线之后。',
      'svc.1t': '网站',
      'svc.1': '品牌官网、网店与落地页：加载快、可中英双语、日常更新也轻松。',
      'svc.2t': 'Web 与移动应用',
      'svc.2': '预约、点单、内部工具 —— 一套代码，覆盖网页、iPhone 与 Android。',
      'svc.3t': '设计',
      'svc.3': '品牌识别、界面与内容设计，像你自己，而不像模板。',
      'svc.4t': '维护与托管',
      'svc.4': '域名、托管、更新与日常小改动都交给我们，你专心做你的事。',
      'cases.title': '客户案例',
      'cases.tea': '墨尔本的中国茶品牌，茶叶直接产自福建 —— 品牌官网、商品目录、在线下单与冲泡指南。',
      'cases.joy': '户外服装 OEM / ODM 制造商的企业官网，工厂遍布中国、缅甸和孟加拉国。',
      'contact.l1': '有什么想法，',
      'contact.l2': '想让它生长起来？',
      'contact.sub': '简单聊聊你的项目，我们通常会在两个工作日内回复。',
      foot: '慢慢做，用心做。'
    }
  };

  var root = document.documentElement;
  root.classList.add('js');

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  function apply(lang) {
    var dict = STRINGS[lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var s = dict[el.getAttribute('data-i18n')];
      if (s != null) el.textContent = s;
    });
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    document.title = dict.title;
  }

  var current = store('lang') || ((navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en');
  apply(current);

  document.querySelector('.lang').addEventListener('click', function () {
    current = current === 'en' ? 'zh' : 'en';
    store('lang', current);
    document.body.classList.add('swapping');
    setTimeout(function () {
      apply(current);
      document.body.classList.remove('swapping');
    }, 220);
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
