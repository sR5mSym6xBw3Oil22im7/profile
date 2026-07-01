const root = document.documentElement;
root.classList.add('js-enabled');

const menuButton = document.querySelector('.menu-button');
const globalNav = document.querySelector('.global-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const skillTags = document.querySelectorAll('.skill-tag');
const accordionCards = document.querySelectorAll('.accordion-card');
const backToTopButton = document.querySelector('.back-to-top');
const revealElements = document.querySelectorAll('.reveal');

const closeMenu = () => {
  if (!menuButton || !globalNav) return;

  globalNav.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
};

if (menuButton && globalNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = globalNav.classList.toggle('open');
    menuButton.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  globalNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    skillTags.forEach((tag) => {
      const isVisible = filter === 'all' || tag.dataset.category === filter;
      tag.classList.toggle('hidden', !isVisible);
    });
  });
});

accordionCards.forEach((card) => {
  const trigger = card.querySelector('.accordion-trigger');
  const plus = card.querySelector('.plus');

  if (!trigger || !plus) return;

  trigger.addEventListener('click', () => {
    const isOpen = card.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    plus.textContent = isOpen ? '−' : '+';
  });
});

const handleBackToTop = () => {
  if (!backToTopButton) return;

  backToTopButton.classList.toggle('show', window.scrollY > 500);
};

window.addEventListener('scroll', handleBackToTop, { passive: true });
handleBackToTop();

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
