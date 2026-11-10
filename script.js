const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Открыть меню' : 'Закрыть меню');
  navigation?.classList.toggle('open', !open);
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Открыть меню');
  navigation?.classList.remove('open');
}));
const siteButtons = [...document.querySelectorAll('.site-choice')];
let siteType = document.querySelector('.site-choice.selected')?.dataset.site || 'Лендинг';
const toolInputs = [...document.querySelectorAll('.tool-group input')];
const routeOutput = document.querySelector('.route-output');
function updateRoute() {
  if (!routeOutput) return;
  const items = [siteType, ...toolInputs.filter((input) => input.checked).map((input) => input.value), 'Заявка'];
  routeOutput.replaceChildren();
  items.forEach((label, index) => {
    if (index) {
      const arrow = document.createElement('span');
      arrow.className = 'route-arrow';
      arrow.textContent = '→';
      routeOutput.append(arrow);
    }
    const item = document.createElement('span');
    item.className = 'route-item';
    item.textContent = label;
    routeOutput.append(item);
  });
}
siteButtons.forEach((button) => button.addEventListener('click', () => {
  siteButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('selected', active);
    item.setAttribute('aria-pressed', String(active));
  });
  siteType = button.dataset.site;
  updateRoute();
}));
toolInputs.forEach((input) => input.addEventListener('change', updateRoute));
updateRoute();
document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  const note = form.querySelector('.form-note, .contact-note');
  if (note) note.textContent = 'Спасибо! Это предпросмотр: отправка заявок ещё не подключена.';
}));
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
