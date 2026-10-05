document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* Close mobile menu after clicking a link */
  var navLinks = document.querySelectorAll('#navMenu .nav-link, #navMenu .btn-cta');
  var collapseEl = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Typing effect ---------- */
  var roles = [
    'Front-End Developer',
    'Travel Website Specialist',
    'Bootstrap & JavaScript Developer',
    'Landing Page & Lead-Gen Specialist'
  ];
  var typedEl = document.getElementById('typedRole');
  if (typedEl) {
    var roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      var current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Animated skill bars ---------- */
  var skillFills = document.querySelectorAll('.skill-bar__fill');
  if ('IntersectionObserver' in window) {
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.style.width = target.getAttribute('data-width') + '%';
          skillObserver.unobserve(target);
        }
      });
    }, { threshold: 0.4 });

    skillFills.forEach(function (el) { skillObserver.observe(el); });
  } else {
    skillFills.forEach(function (el) {
      el.style.width = el.getAttribute('data-width') + '%';
    });
  }

  /* ---------- Animated stat counters ---------- */
  var statEls = document.querySelectorAll('.stat-num');
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1200;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  /* ---------- Flight path scroll tracker ---------- */
  var plane = document.getElementById('flightPlane');
  function updatePlanePosition() {
    if (!plane) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    var trackHeight = window.innerHeight - 24;
    plane.style.top = (progress * trackHeight) + 'px';
  }
  updatePlanePosition();
  window.addEventListener('scroll', updatePlanePosition, { passive: true });
  window.addEventListener('resize', updatePlanePosition);

  /* ---------- Contact form (front-end only demo) ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var subject = document.getElementById('cf-subject').value.trim() || 'Portfolio Contact';
      var message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in your name, email, and message.';
        formNote.style.color = '#FF6B35';
        return;
      }

      // Opens the user's email client with the form details pre-filled.
      var mailto = 'mailto:sjamwal610@gmail.com' +
        '?subject=' + encodeURIComponent(subject + ' — from ' + name) +
        '&body=' + encodeURIComponent(message + '\n\n' + name + '\n' + email);
      window.location.href = mailto;

      formNote.textContent = 'Opening your email app to send this message...';
      formNote.style.color = '#00BFA6';
      form.reset();
    });
  }

});
