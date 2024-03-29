import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;

/* eslint-disable-next-line */
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smoothMobile: false,
//   inertia: 1.1,
// });
//
// global.locoScroll = locoScroll;

const forms = [
  '[data-home-contact]',
];
const formsWithRedirect = [
  // '[data-popup-form]',
];

formsWithRedirect.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          document.querySelector('[data-btn-submit]').addEventListener('click', () => {
                document.querySelector('[data-home-contact]').classList.add('no-active-form');
                document.querySelector('[data-call-thanks-popup]').classList.add('form-thanks-active');
              }
          )
          // window.location.href = 'message';
          },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).matches(/^[aA-zZ,аА-яЯ\s]+$/, i18next.t('onlyletters')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
      $form.querySelector('.js-mask-absolute').style.display = 'none';
    }, false);
  }
});

forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          function callThanksPopup(callSelector, contentToOpenSelector) {
            const submitBtn = document.querySelectorAll(callSelector);
            const callContent = document.querySelector('[data-home-contact]');
            const content = document.querySelector(contentToOpenSelector);

            submitBtn.forEach(elem => {
              content.classList.add('form-thanks-active');
              callContent.classList.add('.form-not-active');
            });
          }
          callThanksPopup('[data-btn-submit]','[data-call-thanks-popup]');
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).matches(/^[aA-zZ,аА-яЯ\s]+$/, i18next.t('onlyletters')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
      $form.querySelector('.js-mask-absolute').style.display = 'none';
    }, false);
  }
});

// function disableScroll() {
//   const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
//   containersScroll.forEach((block) => {
//     block.addEventListener('mouseenter', () => {
//       locoScroll.stop();
//     });
//     block.addEventListener('mouseleave', () => {
//       locoScroll.start();
//     });
//   });
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   // disableScroll();
//   window.locoScroll.update();
// });
// window.addEventListener('load', () => {
//   // disableScroll();
//   window.locoScroll.update();
// });
