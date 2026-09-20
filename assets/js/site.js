/* =========================================================
   PALETTE PALS — site behaviour
   Progressive enhancement: everything here is optional.
   If it fails to load, the pages still read and work.
   ========================================================= */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var REVEALS = '.rv, .wipe, .split-w, .step';
  var showAll = function () { $$(REVEALS).forEach(function (el) { el.classList.add('in'); }); };
  // Failsafe: reveal only what is already on screen, so the scroll effect survives below the fold.
  var showOnScreen = function () {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (!vh) { showAll(); return; }   // degenerate viewport: reveal everything rather than nothing
    $$(REVEALS).forEach(function (el) {
      if (el.getBoundingClientRect().top < vh) el.classList.add('in');
    });
  };

  // Everything below is an enhancement. The one thing that is NOT optional is un-hiding the
  // reveal elements: .rv starts at opacity 0, so if this script dies the page looks empty.
  // Only drop .no-js once we know we can reveal, and keep a belt-and-braces timer for the
  // case where the observer never fires.
  if (!('IntersectionObserver' in window) || reduce) showAll();
  root.classList.remove('no-js');
  setTimeout(showOnScreen, 2500);

  /* ---------------- Smooth scroll ---------------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.9 });
    var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
    }
  }
  function scrollTo(target) {
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = $(id);
      if (!t) return;
      e.preventDefault();
      document.body.classList.remove('menu');
      scrollTo(t);
    });
  });

  /* ---------------- Header ---------------- */
  var hdr = $('.hdr');
  if (hdr) {
    var last = 0;
    var onScroll = function () {
      var y = window.scrollY;
      hdr.classList.toggle('stuck', y > 40);
      hdr.classList.toggle('hide', y > 420 && y > last && !document.body.classList.contains('menu'));
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var burger = $('.burger');
  if (burger) {
    burger.addEventListener('click', function () {
      document.body.classList.toggle('menu');
      burger.setAttribute('aria-expanded', document.body.classList.contains('menu'));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.body.classList.remove('menu');
  });

  /* ---------------- Reveal on scroll ---------------- */
  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.12 });
    $$(REVEALS).forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Word-by-word headlines ---------------- */
  $$('.split-w').forEach(function (el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    var html = el.innerHTML;
    // Split on spaces but keep <em>/<br> markup intact by working per text node
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement('span'); w.className = 'w';
            var i = document.createElement('i'); i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          walk(n);
        }
      });
    };
    try { walk(el); } catch (err) { el.innerHTML = html; }
    // stagger
    $$('.w i', el).forEach(function (i, k) { i.style.transitionDelay = (k * 0.045) + 's'; });
  });

  /* ---------------- Hero parallax ---------------- */
  var heroArt = $('.hero-art');
  if (heroArt && fine && !reduce) {
    var figs = $$('figure', heroArt);
    var tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.055; cy += (ty - cy) * 0.055;
      figs.forEach(function (f, i) {
        var d = (i + 1) * 7;
        f.style.transform = 'translate3d(' + (cx * d) + 'px,' + (cy * d) + 'px,0)';
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- Magnetic buttons ---------------- */
  if (fine && !reduce) {
    $$('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22) + 'px,' +
                            ((e.clientY - r.top - r.height / 2) * 0.32) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  if (fine && !reduce) {
    var dot = document.createElement('div'); dot.className = 'cur';
    var ring = document.createElement('div'); ring.className = 'cur-d';
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
    }, { passive: true });
    (function ring_loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(ring_loop);
    })();
    var bind = function (els, label) {
      els.forEach(function (el) {
        el.addEventListener('mouseenter', function () { document.body.classList.add('cur-lg'); ring.textContent = label; });
        el.addEventListener('mouseleave', function () { document.body.classList.remove('cur-lg'); ring.textContent = ''; });
      });
    };
    bind($$('.gitem, .reel-item, .svc-card'), 'View');
    document.addEventListener('mouseleave', function () { dot.style.opacity = ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { dot.style.opacity = ring.style.opacity = '1'; });
  }

  /* ---------------- Counters ---------------- */
  $$('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    if (!io) { el.textContent = end + suffix; return; }
    var o = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        o.unobserve(el);
        if (reduce) { el.textContent = end + suffix; return; }
        var t0 = performance.now(), dur = 1500;
        (function tick(t) {
          var p = Math.min((t - t0) / dur, 1);
          var e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * e) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.5 });
    o.observe(el);
  });

  /* ---------------- Horizontal reel ---------------- */
  var reel = $('.reel');
  if (reel && window.gsap && window.ScrollTrigger && !reduce && window.innerWidth > 860) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    var vp = reel.closest('.reel-vp');
    window.gsap.to(reel, {
      x: function () { return -(reel.scrollWidth - window.innerWidth + 40); },
      ease: 'none',
      scrollTrigger: {
        trigger: vp,
        start: 'top top',
        end: function () { return '+=' + (reel.scrollWidth - window.innerWidth + 40); },
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
  } else if (reel) {
    document.body.classList.add('no-gsap');
  }

  /* =========================================================
     Gallery + lightbox
     ========================================================= */
  var CATS = [
    { id: 'all', label: 'Everything' },
    { id: 'mural', label: 'Murals' },
    { id: 'relief', label: '3D & Relief' },
    { id: 'wedding', label: 'Live Wedding' },
    { id: 'doodle', label: 'Doodle' },
    { id: 'workshop', label: 'Workshops' }
  ];

  var grid = $('#grid');
  if (grid && window.PROJECTS) {
    var filterBar = $('#filters');
    if (filterBar) {
      CATS.forEach(function (c) {
        var n = c.id === 'all'
          ? PROJECTS.length
          : PROJECTS.filter(function (p) { return p.cat.indexOf(c.id) > -1; }).length;
        if (!n) return;
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = c.label + '  (' + n + ')';
        b.dataset.cat = c.id;
        b.setAttribute('aria-pressed', c.id === 'all');
        filterBar.appendChild(b);
      });
      filterBar.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        $$('button', filterBar).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        var cat = b.dataset.cat;
        $$('.gitem', grid).forEach(function (t) {
          t.classList.toggle('hide', cat !== 'all' && t.dataset.cat.split(',').indexOf(cat) < 0);
        });
      });
    }

    PROJECTS.forEach(function (p, idx) {
      var im = p.imgs[0];
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'gitem rv';
      b.dataset.cat = p.cat.join(',');
      b.dataset.i = idx;
      b.innerHTML =
        '<figure>' +
          '<img src="assets/img/thumb/' + im.s + '.webp" alt="' + p.title + ' — ' + p.place + '"' +
             ' width="' + im.w + '" height="' + im.h + '" loading="lazy" decoding="async">' +
          (p.imgs.length > 1 ? '<span class="count">' + p.imgs.length + '</span>' : '') +
          '<figcaption><b>' + p.title + '</b><small>' + p.place +
            (p.date ? ' &nbsp;·&nbsp; ' + p.date : '') + '</small></figcaption>' +
        '</figure>';
      grid.appendChild(b);
      if (io) io.observe(b); else b.classList.add('in');
    });
  }

  /* ---- Lightbox (works for gallery tiles and reel items) ---- */
  var lb = $('#lb');
  if (lb && window.PROJECTS) {
    var lbImg = $('.lb-stage img', lb);
    var lbTitle = $('.lb-top h3', lb);
    var lbPlace = $('.lb-top small', lb);
    var lbText = $('.lb-foot p', lb);
    var lbDots = $('.lb-dots', lb);
    var pi = 0, ii = 0, lastFocus = null;

    function paint() {
      var p = PROJECTS[pi], im = p.imgs[ii];
      lbImg.src = 'assets/img/full/' + im.s + '.webp';
      lbImg.alt = p.title + ' — image ' + (ii + 1) + ' of ' + p.imgs.length;
      lbTitle.textContent = p.title;
      lbPlace.textContent = p.date ? p.place + '  ·  ' + p.date : p.place;
      lbText.textContent = p.blurb;
      lbDots.innerHTML = p.imgs.map(function (_, k) {
        return '<i class="' + (k === ii ? 'on' : '') + '"></i>';
      }).join('');
      $$('.lb-nav', lb).forEach(function (n) { n.style.display = p.imgs.length > 1 ? '' : 'none'; });
      // preload neighbour
      if (p.imgs[ii + 1]) { var n = new Image(); n.src = 'assets/img/full/' + p.imgs[ii + 1].s + '.webp'; }
    }
    function open(i) {
      pi = i; ii = 0; lastFocus = document.activeElement;
      paint();
      lb.classList.add('open');
      document.body.classList.add('lb-open');
      lb.setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
      $('.lb-x', lb).focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.classList.remove('lb-open');
      lb.setAttribute('aria-hidden', 'true');
      if (lenis) lenis.start();
      if (lastFocus) lastFocus.focus();
    }
    function step(d) {
      var n = PROJECTS[pi].imgs.length;
      ii = (ii + d + n) % n;
      paint();
    }

    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-i]');
      if (t && !lb.contains(t)) { open(parseInt(t.dataset.i, 10)); }
    });
    $('.lb-x', lb).addEventListener('click', close);
    $('.lb-nav.prev', lb).addEventListener('click', function () { step(-1); });
    $('.lb-nav.next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lb-stage')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
    // swipe
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 55) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------------- Contact form ---------------- */
  var form = $('#enquiry');
  if (form) {
    var msg = $('#form-msg');
    form.addEventListener('submit', function (e) {
      // Netlify handles the POST once deployed. Locally, just show a helpful note.
      if (location.protocol === 'file:') {
        e.preventDefault();
        msg.className = 'form-msg on bad';
        msg.textContent = 'The form only sends once the site is deployed to Netlify. Until then, email hitanshiwatwani2000@gmail.com directly.';
        return;
      }
      msg.className = 'form-msg on';
      msg.textContent = 'Sending…';
    });
  }

  /* ---------------- Year ---------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
