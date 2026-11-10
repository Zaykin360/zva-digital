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
  const note = form.querySelector('.form-note, .contact-note, .service-modal-note');
  if (note) note.textContent = 'Спасибо! Это предпросмотр: заявка не отправлена. Подключим канал связи отдельно.';
}));
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const serviceModal = document.querySelector('#service-modal');
const modalForm = document.querySelector('#service-modal-form');
let lastServiceTrigger = null;
function closeServiceModal() { if(!serviceModal)return; serviceModal.hidden=true; document.body.classList.remove('modal-open'); lastServiceTrigger?.focus(); }
document.querySelectorAll('.service-action').forEach(button=>button.addEventListener('click',()=>{if(!serviceModal)return;lastServiceTrigger=button;const service=button.dataset.service||'Услуга';if(modalForm?.elements.service)modalForm.elements.service.value=service;const title=document.querySelector('#service-modal-title');if(title)title.textContent='Обсудим: '+service;serviceModal.hidden=false;document.body.classList.add('modal-open');modalForm?.elements.name?.focus();}));
serviceModal?.querySelectorAll('[data-modal-close]').forEach(button=>button.addEventListener('click',closeServiceModal));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&serviceModal&&!serviceModal.hidden)closeServiceModal();});
const caseSlides=[...document.querySelectorAll('.case-slide')],caseDots=[...document.querySelectorAll('.case-dots [data-slide]')];let caseIndex=0;
function showCase(index){if(!caseSlides.length)return;caseIndex=(index+caseSlides.length)%caseSlides.length;caseSlides.forEach((slide,i)=>{slide.hidden=i!==caseIndex;slide.classList.toggle('is-active',i===caseIndex);});caseDots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===caseIndex);dot.setAttribute('aria-current',String(i===caseIndex));});const counter=document.querySelector('.case-counter');if(counter)counter.innerHTML=String(caseIndex+1).padStart(2,'0')+' <i>/</i> '+String(caseSlides.length).padStart(2,'0');}
document.querySelector('.case-prev')?.addEventListener('click',()=>showCase(caseIndex-1));document.querySelector('.case-next')?.addEventListener('click',()=>showCase(caseIndex+1));caseDots.forEach(dot=>dot.addEventListener('click',()=>showCase(Number(dot.dataset.slide))));
