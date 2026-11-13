// MossyWare — language switch, sticky header state, scroll reveals.
(function () {
  var STRINGS = {
    en: {
      title: 'MossyWare | Apps and websites',
      skip: 'Skip to content',
      'nav.work': 'Work',
      'nav.studio': 'Services',
      'nav.contact': 'Contact',
      'hero.eyebrow': 'Independent software studio',
      'hero.l1': 'We make our own apps,',
      'hero.l2': 'and build yours.',
      'hero.lede': 'MossyWare is a small studio. Our day planner Orbit is in beta on iOS and Android, our first game Svalbard Rhapsody is in development, and we build websites and apps for businesses.',
      'hero.cue': 'See projects',
      'work.title': 'Projects',
      'work.sub': 'Apps and games we build and run ourselves.',
      'orbit.kind': 'Day planner for iOS and Android',
      'orbit.tagline': 'Plan less. Focus more.',
      'orbit.desc': 'Orbit lays out your day as time blocks on a timeline, runs a focus timer with built-in lo‑fi and singing-bowl sounds, and shows an almanac page for each day. Your data is stored on your phone.',
      'orbit.f1t': 'Day',
      'orbit.f1': 'Drag blocks onto the timeline, then move or resize them.',
      'orbit.f2t': 'Focus',
      'orbit.f2': 'A countdown ring with optional background sound, generated on the phone.',
      'orbit.f3t': 'Almanac',
      'orbit.f3': 'Moon phase and tarot in English; 宜忌, solar terms and a daily 签 in Chinese.',
      'orbit.f4t': 'Private',
      'orbit.f4': 'Works without an account. No server, no tracking.',
      'sv.tagline': 'Our first game.',
      'sv.desc': 'Named after the Arctic islands of Svalbard. More details soon.',
      'sv.status': 'In development',
      'studio.title': 'Websites and software for your business',
      'studio.sub': 'We design, build and maintain websites and apps. You deal directly with the people doing the work.',
      'svc.1t': 'Websites',
      'svc.1': 'Company sites, online shops and landing pages, in English, Chinese or both.',
      'svc.2t': 'Web and mobile apps',
      'svc.2': 'Booking, ordering and internal tools for the web, iOS and Android.',
      'svc.3t': 'Design',
      'svc.3': 'Logos, page layouts and app interfaces.',
      'svc.4t': 'Hosting and upkeep',
      'svc.4': 'We register the domain, host the site, and make changes when you need them.',
      'cases.title': 'Client work',
      'cases.tea': 'Online shop for a Melbourne tea brand that sources directly from Fujian. We built the brand site, catalogue, checkout and brewing guide.',
      'cases.joy': 'Company site for an outdoor clothing manufacturer (OEM / ODM) with factories in China, Myanmar and Bangladesh.',
      'contact.l1': 'Got a project?',
      'contact.l2': 'Send us an email.',
      'contact.sub': 'Tell us what you need, and your timeline and budget if you have them. We reply within two working days.',
      foot: 'Source on GitHub'
    },
    zh: {
      title: 'MossyWare | 应用与网站开发',
      skip: '跳到正文',
      'nav.work': '项目',
      'nav.studio': '服务',
      'nav.contact': '联系',
      'hero.eyebrow': '独立软件工作室',
      'hero.l1': '做自己的应用，',
      'hero.l2': '也帮你做。',
      'hero.lede': 'MossyWare 是一个小型工作室。日程应用 Orbit 正在 iOS 和 Android 上测试，第一款游戏《斯瓦尔巴狂想曲》在开发中。我们也承接企业网站和应用开发。',
      'hero.cue': '看看项目',
      'work.title': '项目',
      'work.sub': '我们自己开发、自己运营的应用和游戏。',
      'orbit.kind': 'iOS 与 Android 日程规划',
      'orbit.tagline': '少计划，多专注。',
      'orbit.desc': 'Orbit 把一天排成时间线上的时间块，带专注计时器（内置 lo‑fi 和颂钵音效），每天还有一页黄历。数据都存在手机本地。',
      'orbit.f1t': '日程',
      'orbit.f1': '把时间块拖进时间线，可以移动，也可以拉长缩短。',
      'orbit.f2t': '专注',
      'orbit.f2': '圆环倒计时，可选背景音，声音由手机实时合成。',
      'orbit.f3t': '黄历',
      'orbit.f3': '宜忌、时辰、节气和每日一签；英文版是月相和塔罗。',
      'orbit.f4t': '隐私',
      'orbit.f4': '不注册也能用。没有服务器，不收集数据。',
      'sv.tagline': '我们的第一款游戏。',
      'sv.desc': '名字来自北冰洋上的斯瓦尔巴群岛。更多内容稍后公布。',
      'sv.status': '开发中',
      'studio.title': '为企业做网站和软件',
      'studio.sub': '设计、开发、上线后的维护都由我们来做，你直接和做事的人沟通。',
      'svc.1t': '网站',
      'svc.1': '企业官网、网店和落地页，中文、英文或双语都可以。',
      'svc.2t': 'Web 与移动应用',
      'svc.2': '预约、下单、内部管理等工具，覆盖网页、iOS 和 Android。',
      'svc.3t': '设计',
      'svc.3': 'Logo、页面排版和应用界面。',
      'svc.4t': '托管与维护',
      'svc.4': '注册域名、托管网站，之后要改什么随时找我们。',
      'cases.title': '客户案例',
      'cases.tea': '墨尔本茶叶品牌的网店，茶叶直接从福建采购。我们做了品牌官网、商品目录、结账流程和冲泡指南。',
      'cases.joy': '户外服装 OEM / ODM 制造商的企业官网，工厂分布在中国、缅甸和孟加拉国。',
      'contact.l1': '有项目想聊？',
      'contact.l2': '发邮件聊聊。',
      'contact.sub': '说说你需要什么，有时间和预算的话也一起告诉我们。我们会在两个工作日内回复。',
      foot: 'GitHub 上的本站源码'
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
