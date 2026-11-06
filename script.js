(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Mobile navigation
  const navToggle = $('#navToggle');
  const mainNav = $('#mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('#mainNav a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menú');
    }));
  }

  // Modal system with focus restoration and Escape support
  const modals = $$('.modal');
  let lastFocused = null;
  const openModal = (modal) => {
    if (!modal) return;
    lastFocused = document.activeElement;
    modals.forEach(item => {
      item.classList.remove('is-open');
      item.setAttribute('aria-hidden', 'true');
    });
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const first = $('input:not([type="hidden"]), select, textarea, button', modal);
    if (first) window.setTimeout(() => first.focus(), 60);
  };
  const closeModals = () => {
    modals.forEach(modal => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.classList.remove('modal-open');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  $$('[data-open-subscribe]').forEach(button => button.addEventListener('click', () => {
    const interest = button.getAttribute('data-interest');
    const select = $('#modalInterest');
    if (interest && select) {
      const option = [...select.options].find(item => item.textContent.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(item.textContent.toLowerCase()));
      if (option) select.value = option.value || option.textContent;
    }
    openModal($('#subscribeModal'));
  }));
  $('#openApplication')?.addEventListener('click', () => openModal($('#applicationModal')));
  $$('[data-close-modal]').forEach(button => button.addEventListener('click', closeModals));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && $('.modal.is-open')) closeModals();
  });
  modals.forEach(modal => modal.addEventListener('click', event => {
    if (event.target === modal) closeModals();
  }));

  // CV size/type guard (FormSubmit accepts file uploads; keep this form under 10 MB).
  const cvForm = $('#cvForm');
  const cvFile = $('#cvFile');
  cvForm?.addEventListener('submit', event => {
    if (!cvFile?.files?.length) return;
    const file = cvFile.files[0];
    const allowed = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!allowed) {
      event.preventDefault();
      showToast('El CV debe estar en formato PDF, DOC o DOCX.');
      cvFile.focus();
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      event.preventDefault();
      showToast('El archivo supera los 10 MB permitidos.');
      cvFile.focus();
    }
  });

  // Populate the official footer year.
  const year = $('#currentYear');
  if (year) year.textContent = new Date().getFullYear();

  // Subtle reveal on scroll.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Mark the current section in the desktop navigation.
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          $$('#mainNav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // User-supplied MP3; browsers block unrequested audible autoplay.
  const audio = $('#siteMusic');
  const audioControl = $('#audioControl');
  if (audio && audioControl) {
    audio.volume = 0.5;
    audioControl.addEventListener('click', async () => {
      if (audio.paused) {
        try {
          await audio.play();
          audioControl.classList.add('is-playing');
          audioControl.setAttribute('aria-pressed', 'true');
          audioControl.setAttribute('aria-label', 'Pausar música');
          $('.audio-control-text', audioControl).textContent = 'MÚSICA ACTIVADA';
        } catch (error) {
          showToast('El navegador no pudo reproducir el audio. Probá nuevamente.');
        }
      } else {
        audio.pause();
        audioControl.classList.remove('is-playing');
        audioControl.setAttribute('aria-pressed', 'false');
        audioControl.setAttribute('aria-label', 'Activar música');
        $('.audio-control-text', audioControl).textContent = 'ACTIVAR MÚSICA';
      }
    });
    audio.addEventListener('ended', () => {
      audioControl.classList.remove('is-playing');
      audioControl.setAttribute('aria-pressed', 'false');
      $('.audio-control-text', audioControl).textContent = 'ACTIVAR MÚSICA';
    });
  }

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3800);
  }
})();
