document.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const header = document.querySelector('.header');

  if(document.documentElement.clientWidth < 575) {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      document.querySelector('.header').classList.add('not-on-top');
    } else {
      document.querySelector('.header').classList.remove('not-on-top');
    }
  } else {
    if (header.classList.contains('headroom--unpinned')) {
      gsap.to(header, { yPercent : -200, transition: .1 });
    } else {
      gsap.to(header, { yPercent : 0 });
    }
  }
}

// форма обратной связи
function formOpen() {
  formOpenAnim();
  document.querySelector('body').style.overflow = 'hidden';
}

function formClose() {
  formCloseAnim();
  document.querySelector('body').style.overflow = 'auto';
}

function formOpenAnim(evt, reverseArg) {
  const form = document.querySelector('[data-call-popup]');
  const formClose = document.querySelector('[data-close-call-popup]');
  if  (form === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.add(() => {
    form.classList.add('active');
  });
  tl.fromTo(form, {autoAlpha: 0},
      {autoAlpha: 1,  ease: 'power4.easeInOut', duration: 0.4, clearProps: 'all' }, '<');
  tl.fromTo(formClose, {y: -500},
      { y: 0,  ease: 'power4.easeInOut', duration: 0.8,  clearProps: 'all' }, '<');
  tl.play();
}

function formCloseAnim(evt, reverseArg) {
  const form = document.querySelector('[data-call-popup]');
  if  (form === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(form, {autoAlpha: 1},
      {autoAlpha: 0, duration: 0.4 }, '<');
  tl.add(() => {
    form.classList.remove('active');
  });
  tl.play();
}

function formInit() {
  const form = document.querySelector('[data-call-popup]');
  document.querySelectorAll('[data-open-call-popup]').forEach(btn => {
    btn.addEventListener('click', () => formOpen(form));
  });
  document.querySelectorAll('[data-close-call-popup]').forEach(btn => {
    btn.addEventListener('click', () => {
      formClose(form);
      document.querySelector('[data-home-contact]').classList.remove('no-active-form');
      document.querySelector('[data-call-thanks-popup]').classList.remove('form-thanks-active');
    })
  })
}

// попап для обратной связи на мобилке
function formMobOpenAnim(evt, reverseArg) {
  const form = document.querySelector('.sideform');
  const formBtn = document.querySelector('.sideform ul');
  if  (form === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(form, {autoAlpha: 0},
      { autoAlpha: 1, ease: 'power4.easeInOut', duration: 0.5, clearProps: 'all' }, '<');
  tl.fromTo(formBtn, {autoAlpha: 0, y: 2000},
      { autoAlpha: 1, y: 0, ease: 'power4.easeInOut', duration: 0.7, clearProps: 'all' }, '<');
  tl.play();
}

function formMobCloseAnim(evt, reverseArg) {
  const form = document.querySelectorAll('.sideform');
  const formBtn = document.querySelector('.sideform ul');
  if  (form === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(formBtn, {autoAlpha: 1, y: 0},
      { autoAlpha: 0, y: 2000, ease: 'power4.easeInOut', duration: 1.3, clearProps: 'all' }, '<');
  tl.fromTo(form, { autoAlpha: 1},
      { ease: 'power4.easeInOut', duration: 0.5, autoAlpha: 0, delay: 0.1 }, '<');
  tl.add(() => {
    form.forEach(el => {
      el.classList.remove('sideform-active');
    })
  });
  tl.play();
}

const btnCallMobile = document.querySelectorAll('.js-mobile-call');
const btnCloseMobile = document.querySelector('.js-mobile-close');
const formMobile = document.querySelector('.sideform');
const formCallMobile = document.querySelector('.js-mobile-form');
const form = document.querySelector('[data-call-popup]');

formCallMobile.addEventListener('click', () => {
  document.querySelector('body').style.overflow = 'hidden';
  formOpenAnim();
  formMobCloseAnim();
});

btnCallMobile.forEach(btn => {
  btn.addEventListener('click', () => {
    formMobile.classList.add('sideform-active');
    formMobOpenAnim();
    document.querySelector('body').style.overflow = 'hidden';
  });
})

btnCloseMobile.addEventListener('click', () => {
  formMobCloseAnim();
  document.querySelector('body').style.overflow = 'auto';
});

function menuOpen(menu) {
  menu.classList.add('active');
  const tl = gsap.timeline({ paused: true });
  tl.set(menu, { autoAlpha: 0 });
  tl.fromTo(menu,
      {autoAlpha: 0},
      {autoAlpha: 1, duration: 0.4}, '<');
  tl.play();
  document.querySelector('body').style.overflow = 'hidden';
}
function menuClose(menu) {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(menu,
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 0.4, clearProps: 'all' }, '<');
  tl.set(menu, { autoAlpha: 0 });
  tl.play();
  menu.classList.remove('active');
  document.querySelector('body').style.overflow = 'auto';
}

function menuInit() {
  const menu = document.querySelector('.menu');
  document.querySelectorAll('[data-open-menu]').forEach(btn => {
    btn.addEventListener('click', () => menuOpen(menu));
  });
  document.querySelectorAll('[data-close-menu]').forEach(btn => {
    btn.addEventListener('click', () => menuClose(menu));
  });
  document.querySelector('.js-menu-main').addEventListener('click', ({ target }) => {
    if (target.tagName === 'a') {
      return;
    }
    document.querySelector('[data-close-menu]').click();
  });

}

function init() {
  formInit();
  menuInit();
}

window.addEventListener('DOMContentLoaded', init);

