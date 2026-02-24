    // ============ DARK MODE ============
    const darkToggle = document.getElementById('darkToggle');
    const darkIcon = document.getElementById('darkIcon');
    const html = document.documentElement;

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
      darkIcon.className = 'fas fa-sun';
    }

    darkToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const isDark = html.classList.contains('dark');
      darkIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ============ MOBILE MENU ============
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileIcon = document.getElementById('mobileIcon');

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      mobileIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileIcon.className = 'fas fa-bars';
      });
    });

    // ============ HERO CAROUSEL ============
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    let autoplay;

    const heroTexts = [
      { title: 'Bienvenido al <span class="text-gold-400">ITSCO</span>', sub: 'Formando profesionistas de excelencia comprometidos con el desarrollo de México.' },
      { title: 'Excelencia <span class="text-gold-400">Académica</span>', sub: 'Educación de calidad con los mejores estándares del TecNM.' },
      { title: 'Innovación y <span class="text-gold-400">Tecnología</span>', sub: 'Laboratorios equipados con tecnología de punta para tu formación.' },
      { title: 'Investigación y <span class="text-gold-400">Desarrollo</span>', sub: 'Impulsando el conocimiento científico y tecnológico de la región.' },
    ];

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dotsContainer.children[currentSlide].classList.add('active');
      document.getElementById('heroTitle').innerHTML = heroTexts[currentSlide].title;
      document.getElementById('heroSubtitle').textContent = heroTexts[currentSlide].sub;
    }

    document.getElementById('prevSlide').addEventListener('click', () => { clearInterval(autoplay); goToSlide(currentSlide - 1); startAutoplay(); });
    document.getElementById('nextSlide').addEventListener('click', () => { clearInterval(autoplay); goToSlide(currentSlide + 1); startAutoplay(); });

    function startAutoplay() { autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000); }
    startAutoplay();

    // ============ TABS ============
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.classList.add('text-gray-600', 'dark:text-gray-300'); });
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        this.classList.remove('text-gray-600', 'dark:text-gray-300');
        document.getElementById(this.dataset.tab).classList.add('active');
      });
    });

    // ============ SMOOTH SCROLL ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target === '#') return;
        const el = document.querySelector(target);
        if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      });
    });

    // ============ SCROLL TO TOP ============
    const scrollTopBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100');
      }
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // ============ COUNTER ANIMATION ============
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let count = 0;
          const inc = Math.ceil(target / 60);
          const timer = setInterval(() => {
            count = Math.min(count + inc, target);
            el.textContent = count.toLocaleString() + '+';
            if (count >= target) clearInterval(timer);
          }, 25);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ============ NAVBAR COMPACT ON SCROLL ============
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('py-1');
        navbar.classList.remove('py-2');
      } else {
        navbar.classList.remove('py-1');
        navbar.classList.add('py-2');
      }
    });
