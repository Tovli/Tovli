'use strict';
document.documentElement.classList.add('js');
const isHebrew = document.documentElement.lang === 'he';
const siteLanguageLink = document.querySelector('.site-language');
if (location.hash) siteLanguageLink.hash = location.hash;
window.addEventListener('hashchange', () => { siteLanguageLink.hash = location.hash; });
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
const map = document.querySelector('.possibility-map');
const tabs = [...document.querySelectorAll('[role="tab"]')];
const panel = document.querySelector('#map-panel');
const mapCopy = isHebrew
  ? { business: ['משאיפה לעשייה', 'טכנולוגיה שמקדמת את העסק שלכם.'], people: ['מכוונה לצמיחה', 'צעדים מעשיים בדרך לצמיחה האישית שלכם.'] }
  : { business: ['FROM AMBITION TO ACTION', 'Technology that moves your business forward.'], people: ['FROM INTENTION TO GROWTH', 'Practical steps toward the person you want to become.'] };
function setFocus(tab) { const focus = tab.dataset.focus; map.dataset.focus = focus; tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; }); panel.setAttribute('aria-labelledby', tab.id); document.querySelector('#map-label').textContent = mapCopy[focus][0]; document.querySelector('#map-text').textContent = mapCopy[focus][1]; }
tabs.forEach((tab, index) => { tab.addEventListener('click', () => setFocus(tab)); tab.addEventListener('keydown', event => { let next; if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length]; if (event.key === 'ArrowLeft') next = tabs[(index + tabs.length - 1) % tabs.length]; if (event.key === 'Home') next = tabs[0]; if (event.key === 'End') next = tabs[tabs.length - 1]; if (next) { event.preventDefault(); setFocus(next); next.focus(); } }); });
const motion = document.querySelector('.motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
function updateMotion() { map.classList.toggle('motion-paused', paused); motion.setAttribute('aria-pressed', String(paused)); motion.textContent = isHebrew ? (paused ? '▷ הפעלת הנפשה' : 'Ⅱ עצירת הנפשה') : (paused ? '▷ Resume motion' : 'Ⅱ Pause motion'); }
motion.hidden = false; updateMotion();
motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
reducedMotion.addEventListener('change', event => { paused = event.matches; updateMotion(); });
const interestButtons = [...document.querySelectorAll('button[data-interest]')];
const context = document.querySelector('#contact-context');
function setInterest(interest) { interestButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.interest === interest))); context.textContent = isHebrew ? (interest === 'business' ? 'אפשר להתחיל ממטרה עסקית, מחסום בדרך או שאלה על מה שטכנולוגיה יכולה לאפשר.' : 'אפשר להתחיל ממטרה שחשובה לכם, שינוי שאתם שוקלים או תחום שבו תרצו לצמוח.') : (interest === 'business' ? 'Bring a goal, a bottleneck, or a question about what technology could make possible.' : 'Bring a goal you care about, a change you’re considering, or a place where you’d like to grow.'); }
document.querySelectorAll('[data-interest]').forEach(element => element.addEventListener('click', () => setInterest(element.dataset.interest)));
document.querySelector('#year').textContent = String(new Date().getFullYear());
const formLanguages = document.querySelector('.form-languages');
const formButtons = [...document.querySelectorAll('[data-form-language]')];
const formFrame = document.querySelector('#contact-form-frame');
const formLink = document.querySelector('#contact-form-link');
const formNote = document.querySelector('#form-language-note');
const forms = {
  en: { id: '1FAIpQLSelafissGG_PimgBPVqTZzpDGrvW9NWblED7DvGXOFo6FEEeQ', title: 'Contact Tovli Technologies — English Google Form', note: 'Complete the form in English.', link: 'Open the English form in a new tab ↗' },
  he: { id: '1FAIpQLSfA05u3cSnJeFxTdZQNOxtaiK7KMRCmOfobjhgGfxHt-QGkGg', title: 'יצירת קשר עם טובלי טכנולוגיות — טופס בעברית', note: 'מלאו את הטופס בעברית.', link: 'פתיחת הטופס בעברית בחלון חדש ↗' }
};
let formLanguage = isHebrew ? 'he' : 'en';
function setFormLanguage(language) {
  if (language === formLanguage) return;
  formLanguage = language;
  const form = forms[language];
  const url = `https://docs.google.com/forms/d/e/${form.id}/viewform`;
  formButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.formLanguage === language)));
  formFrame.src = `${url}?embedded=true&hl=${language}`;
  formFrame.title = form.title;
  formFrame.lang = language;
  formFrame.dir = language === 'he' ? 'rtl' : 'ltr';
  formLink.href = `${url}?hl=${language}`;
  formLink.textContent = form.link;
  formLink.lang = language;
  formLink.dir = formFrame.dir;
  formNote.textContent = form.note;
  formNote.lang = language;
  formNote.dir = formFrame.dir;
}
formLanguages.hidden = false;
formButtons.forEach(button => button.addEventListener('click', () => setFormLanguage(button.dataset.formLanguage)));
