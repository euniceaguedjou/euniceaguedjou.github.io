const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');
const dialog = document.querySelector('[data-dialog]');
const dialogImage = document.querySelector('[data-dialog-image]');
const dialogCaption = document.querySelector('[data-dialog-caption]');
const toast = document.querySelector('[data-toast]');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = image?.alt || '';
    dialogCaption.textContent = button.dataset.caption || '';
    dialog.showModal();
  });
});

document.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('euniceaguedjou@gmail.com');
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1800);
  } catch {
    window.location.href = 'mailto:euniceaguedjou@gmail.com';
  }
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
