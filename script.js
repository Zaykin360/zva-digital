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
const modalService = modalForm?.elements.service;
const modalTitle = document.querySelector('#service-modal-title');
const modalIntro = document.querySelector('.service-modal-intro');
const modalNote = document.querySelector('.service-modal-note');
const modalStory = document.querySelector('.modal-story');
const modalVisual = document.querySelector('#modal-visual');
const modalStoryTitle = document.querySelector('#modal-story-title');
const modalStoryDescription = document.querySelector('#modal-story-description');
const modalStoryBottom = document.querySelector('#modal-story-bottom');
const modalStepEls = [...document.querySelectorAll('.modal-steps li')];
const modalSubmitLabel = document.querySelector('#service-modal-submit-label');
const modalArt = {
  sites: '<svg viewBox="0 0 440 190" role="img" aria-label="Макет сайта"><rect x="34" y="20" width="372" height="150" rx="12" fill="#f7f8f2"/><path d="M34 32a12 12 0 0 1 12-12h348a12 12 0 0 1 12 12v16H34z" fill="#dbe7d1"/><circle cx="54" cy="34" r="4" fill="#71915f"/><circle cx="68" cy="34" r="4" fill="#a4b99a"/><circle cx="82" cy="34" r="4" fill="#c0cfb8"/><rect x="56" y="68" width="150" height="12" rx="6" fill="#a0b58d"/><rect x="56" y="89" width="118" height="22" rx="4" fill="#142016"/><rect x="56" y="122" width="85" height="20" rx="5" fill="#c4ff32"/><rect x="250" y="67" width="128" height="75" rx="8" fill="#dce8d4"/><path d="M270 122l27-27 18 17 20-25 24 35z" fill="#6e9c4b"/><circle cx="348" cy="86" r="8" fill="#f4c85e"/></svg>',
  direct: '<svg viewBox="0 0 440 190" role="img" aria-label="Рекламная кампания"><rect x="35" y="22" width="370" height="148" rx="14" fill="#f5f7f0"/><rect x="55" y="42" width="126" height="13" rx="6" fill="#17215b"/><rect x="55" y="66" width="215" height="8" rx="4" fill="#cbd3df"/><path d="M65 143h310" stroke="#ccd3dc" stroke-width="2"/><path d="M65 128l65-22 57 12 64-43 52 9 63-43" fill="none" stroke="#263bb2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="366" cy="41" r="8" fill="#ffb431"/><rect x="65" y="147" width="28" height="12" rx="3" fill="#cbd3df"/><rect x="111" y="137" width="28" height="22" rx="3" fill="#a9b4d3"/><rect x="157" y="126" width="28" height="33" rx="3" fill="#7484bf"/><rect x="203" y="113" width="28" height="46" rx="3" fill="#5366b4"/><rect x="249" y="96" width="28" height="63" rx="3" fill="#3b50ac"/></svg>',
  seo: '<svg viewBox="0 0 440 190" role="img" aria-label="Поисковая структура"><circle cx="219" cy="96" r="62" fill="#efeafa"/><circle cx="219" cy="96" r="43" fill="#d9cdf4"/><circle cx="219" cy="96" r="24" fill="#452d82"/><circle cx="219" cy="96" r="9" fill="#dfff65"/><path d="M219 32V18M219 174v-16M155 96h-19M302 96h-19M174 51l-14-14M279 151l-14-14M264 51l14-14M174 141l-14 14" stroke="#7d64b4" stroke-width="3" stroke-linecap="round"/><rect x="35" y="36" width="108" height="28" rx="14" fill="#fff"/><rect x="300" y="40" width="106" height="28" rx="14" fill="#fff"/><rect x="45" y="128" width="104" height="28" rx="14" fill="#fff"/><rect x="290" y="126" width="116" height="28" rx="14" fill="#fff"/><path d="M143 50l35 22M300 54l-35 20M149 142l37-24M290 140l-37-23" stroke="#a18bcf" stroke-width="2" stroke-dasharray="4 5"/></svg>',
  crm: '<svg viewBox="0 0 440 190" role="img" aria-label="Воронка CRM"><rect x="31" y="24" width="112" height="140" rx="12" fill="#e7eee7"/><rect x="164" y="24" width="112" height="140" rx="12" fill="#e1ece4"/><rect x="297" y="24" width="112" height="140" rx="12" fill="#dcebe4"/><text x="48" y="46" font-size="10" font-family="Arial" font-weight="700" fill="#344838">НОВАЯ</text><text x="181" y="46" font-size="10" font-family="Arial" font-weight="700" fill="#344838">В РАБОТЕ</text><text x="314" y="46" font-size="10" font-family="Arial" font-weight="700" fill="#344838">СДЕЛКА</text><rect x="44" y="60" width="86" height="31" rx="6" fill="#fff"/><rect x="44" y="99" width="86" height="31" rx="6" fill="#fff"/><rect x="177" y="60" width="86" height="31" rx="6" fill="#fff"/><rect x="310" y="60" width="86" height="31" rx="6" fill="#fff"/><circle cx="55" cy="75" r="6" fill="#6ab37c"/><circle cx="55" cy="114" r="6" fill="#6ab37c"/><circle cx="188" cy="75" r="6" fill="#ffbd48"/><circle cx="321" cy="75" r="6" fill="#6ab37c"/><path d="M143 84h19M276 84h19" stroke="#58715b" stroke-width="3"/><path d="M155 78l7 6-7 6M288 78l7 6-7 6" fill="none" stroke="#58715b" stroke-width="3"/></svg>',
  conversion: '<svg viewBox="0 0 440 190" role="img" aria-label="Оптимизация конверсии"><path d="M49 36h342l-45 40H94z" fill="#f2c7b8"/><path d="M94 83h252l-38 36H132z" fill="#e99a7d"/><path d="M132 126h176l-32 32h-112z" fill="#bc503a"/><path d="M206 164h28v15h-28z" fill="#c4ff32"/><circle cx="97" cy="54" r="7" fill="#fff"/><circle cx="164" cy="54" r="7" fill="#fff"/><circle cx="232" cy="54" r="7" fill="#fff"/><circle cx="300" cy="54" r="7" fill="#fff"/><circle cx="145" cy="101" r="6" fill="#fff"/><circle cx="210" cy="101" r="6" fill="#fff"/><circle cx="274" cy="101" r="6" fill="#fff"/><path d="M350 54h45" stroke="#8c382b" stroke-width="3"/><path d="M386 47l9 7-9 7" fill="none" stroke="#8c382b" stroke-width="3"/><text x="338" y="34" font-size="10" font-family="Arial" font-weight="700" fill="#702b22">БАРЬЕР</text></svg>',
  system: '<svg viewBox="0 0 440 190" role="img" aria-label="Связанные каналы маркетинга"><path d="M220 96L100 49M220 96L340 49M220 96L95 144M220 96L345 144" stroke="#64745e" stroke-width="2"/><circle cx="220" cy="96" r="38" fill="#c4ff32"/><circle cx="100" cy="49" r="25" fill="#26352a"/><circle cx="340" cy="49" r="25" fill="#26352a"/><circle cx="95" cy="144" r="25" fill="#26352a"/><circle cx="345" cy="144" r="25" fill="#26352a"/><path d="M210 96h20M220 86v20" stroke="#10190f" stroke-width="5" stroke-linecap="round"/><text x="86" y="53" font-size="8" font-family="Arial" font-weight="700" fill="#dce3d8">САЙТ</text><text x="324" y="53" font-size="8" font-family="Arial" font-weight="700" fill="#dce3d8">ТРАФИК</text><text x="77" y="148" font-size="7" font-family="Arial" font-weight="700" fill="#dce3d8">АНАЛИТИКА</text><text x="329" y="148" font-size="7" font-family="Arial" font-weight="700" fill="#dce3d8">CRM</text></svg>'
};
function openServiceModal(trigger) {
  if (!serviceModal) return;
  lastServiceTrigger = trigger;
  const service = trigger?.dataset.service || trigger?.dataset.modalService || '';
  const config = modalCopy[service];
  if (modalService) modalService.value = service;
  if (modalTitle) modalTitle.textContent = config?.title || 'С чего начнём?';
  if (modalIntro) modalIntro.textContent = config?.intro || 'Выберите направление и оставьте контакт — уточним задачу и предложим подходящий следующий шаг.';
  if (modalStory) modalStory.dataset.visual = config?.visual || 'system';
  if (modalVisual) modalVisual.innerHTML = modalArt[config?.visual || 'system'];
  if (modalStoryTitle) modalStoryTitle.innerHTML = config?.heading || 'Маркетинг,<br><em>собранный в систему.</em>';
  if (modalStoryDescription) modalStoryDescription.textContent = config?.story || 'Свяжем сайт, привлечение трафика и обработку обращений в одну рабочую систему.';
  if (modalStoryBottom) modalStoryBottom.textContent = config?.bottom || 'ЗАДАЧА → ПРИОРИТЕТ → СИСТЕМА';
  modalStepEls.forEach((item, index) => {
    const step = config?.steps?.[index] || [['Контекст','Уточним цель и исходные данные.'],['Приоритет','Выберем главный рычаг роста.'],['План','Согласуем следующий шаг.']][index];
    item.querySelector('strong').textContent = step[0];
    item.querySelector('span').lastChild.textContent = step[1];
  });
  if (modalSubmitLabel) modalSubmitLabel.textContent = config?.cta || 'Оставить заявку';
  if (modalNote) modalNote.textContent = 'Форма пока демонстрационная: после согласования канала подключим отправку на почту или в Telegram.';
  serviceModal.hidden = false;
  document.body.classList.add('modal-open');
  (service ? modalForm?.elements.name : modalService)?.focus();
}
function closeServiceModal() {
  if (!serviceModal) return;
  serviceModal.hidden = true;
  document.body.classList.remove('modal-open');
  lastServiceTrigger?.focus();
}
document.querySelectorAll('.service-action, [data-open-modal]').forEach(button => button.addEventListener('click', event => {
  event.preventDefault();
  openServiceModal(button);
}));
serviceModal?.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', closeServiceModal));
document.addEventListener('keydown', event => {
  if (!serviceModal || serviceModal.hidden) return;
  if (event.key === 'Escape') closeServiceModal();
  if (event.key === 'Tab') {
    const focusable = [...serviceModal.querySelectorAll('button:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), a[href]')].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
const caseSlides=[...document.querySelectorAll('.case-slide')],caseDots=[...document.querySelectorAll('.case-dots [data-slide]')];let caseIndex=0;
function showCase(index){if(!caseSlides.length)return;caseIndex=(index+caseSlides.length)%caseSlides.length;caseSlides.forEach((slide,i)=>{slide.hidden=i!==caseIndex;slide.classList.toggle('is-active',i===caseIndex);});caseDots.forEach((dot,i)=>{dot.classList.toggle('is-active',i===caseIndex);dot.setAttribute('aria-current',String(i===caseIndex));});const counter=document.querySelector('.case-counter');if(counter)counter.innerHTML=String(caseIndex+1).padStart(2,'0')+' <i>/</i> '+String(caseSlides.length).padStart(2,'0');}
document.querySelector('.case-prev')?.addEventListener('click',()=>showCase(caseIndex-1));document.querySelector('.case-next')?.addEventListener('click',()=>showCase(caseIndex+1));caseDots.forEach(dot=>dot.addEventListener('click',()=>showCase(Number(dot.dataset.slide))));
