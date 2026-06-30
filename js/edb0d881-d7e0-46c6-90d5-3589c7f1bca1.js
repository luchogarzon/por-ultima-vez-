/* =========================================================
   POR ÚLTIMA VEZ — interacciones
   ========================================================= */
(function () {
  "use strict";

  /* ---- WhatsApp ---- */
  var WA_NUMBER = "5493513294193";
  var WA_MSG = "Hola, quiero organizar una despedida con Por Última Vez. " +
               "Somos ___ personas, queremos viajar en fecha ___ y estamos " +
               "buscando una experiencia en Córdoba.";
  var WA_URL = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(WA_MSG);

  document.querySelectorAll(".js-wa").forEach(function (el) {
    el.setAttribute("href", WA_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  /* ---- Header scrolled ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    burger.classList.remove("open");
    menu.classList.remove("open");
    document.body.style.overflow = "";
  }
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq__item").forEach(function (item) {
    var q = item.querySelector(".faq__q");
    var a = item.querySelector(".faq__a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // close others
      document.querySelectorAll(".faq__item.open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("open");
          other.querySelector(".faq__a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        a.style.maxHeight = null;
      } else {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ---- Reveal on scroll ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Animated counters ---- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var dur = 1600, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(eased * target);
      el.textContent = val.toLocaleString("es-AR");
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("es-AR");
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll(".js-count");
  if (counters.length && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = (parseInt(el.getAttribute("data-target"), 10) || 0).toLocaleString("es-AR"); });
  }

  /* ---- Hero slider (auto + dots) ---- */
  (function () {
    var slider = document.getElementById("heroSlider");
    var dotsWrap = document.getElementById("heroDots");
    if (!slider || !dotsWrap) return;
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".hero-slide"));
    if (slides.length < 2) { if (dotsWrap) dotsWrap.style.display = "none"; return; }
    var idx = 0, timer = null, DELAY = 5000;

    slides.forEach(function (s, i) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Foto " + (i + 1));
      if (i === 0) b.classList.add("on");
      b.addEventListener("click", function () { go(i); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(n) {
      slides[idx].classList.remove("active");
      dots[idx].classList.remove("on");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("active");
      dots[idx].classList.add("on");
    }
    function next() { go(idx + 1); }
    function reset() { clearInterval(timer); timer = setInterval(next, DELAY); }
    reset();
  })();

  /* ---- Smooth anchor offset for fixed header ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
