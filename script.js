const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
  navigation?.classList.toggle('is-open', !open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Открыть меню');
    navigation?.classList.remove('is-open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());