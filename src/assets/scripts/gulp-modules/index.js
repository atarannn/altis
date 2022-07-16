// window.onload = function () {
//   document.body.classList.add('loaded_hiding');
//   // document.querySelector('body').style.overflow = 'hidden';
//   window.setTimeout(() => {
//     document.body.classList.add('loaded');
//     document.body.classList.remove('loaded_hiding');
//     // document.querySelector('body').style.overflow = 'auto';
//   }, 500);
// };

@@include('../libs/gsap/TweenMax.js')
@@include('../libs/imgloaded/imgloaded.js')
@@include('../libs/headroom/headroom.js')

var headroom  = new Headroom(document.querySelector('.header'));
// initialise
headroom.init();
