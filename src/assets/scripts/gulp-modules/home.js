@@include('../libs/gsap/TweenMax.js')
@@include('../libs/imgloaded/imgloaded.js')
@@include('../libs/headroom/headroom.js')
{
    const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    class HoverImgFx6 {
    constructor(el) {
        this.DOM = {el: el};

        this.DOM.reveal = document.createElement('div');
        this.DOM.reveal.className = 'hover-reveal';
        this.DOM.reveal.style.overflow = 'hidden';
        this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
        this.DOM.el.appendChild(this.DOM.reveal);
        this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
        this.DOM.revealInner.style.overflow = 'hidden';
        this.DOM.revealDeco = this.DOM.reveal.querySelector('.hover-reveal__deco');
        this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

        this.initEvents();
    }
    initEvents() {
        this.positionElement = (ev) => {
            const mousePos = getMousePos(ev);
            const docScrolls = {
                left : document.body.scrollLeft + document.documentElement.scrollLeft,
                top : document.body.scrollTop + document.documentElement.scrollTop
            };
            this.DOM.reveal.style.top = `${mousePos.y+20-docScrolls.top}px`;
            this.DOM.reveal.style.left = `${mousePos.x+20-docScrolls.left}px`;
        };
        this.mouseenterFn = (ev) => {
            this.positionElement(ev);
            this.showImage();
        };
        this.mousemoveFn = ev => requestAnimationFrame(() => {
            this.positionElement(ev);
        });
        this.mouseleaveFn = () => {
            this.hideImage();
        };

        this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
        this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
        this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
    }
    showImage() {
        TweenMax.killTweensOf(this.DOM.reveal);
        TweenMax.killTweensOf(this.DOM.revealInner);
        TweenMax.killTweensOf(this.DOM.revealImg);
        TweenMax.killTweensOf(this.DOM.revealDeco);

        this.tl = new TimelineMax({
            onStart: () => {
                this.DOM.reveal.style.opacity = 1;
                TweenMax.set(this.DOM.el, {zIndex: 1000});
            }
        })
            .add('begin')
            .set(this.DOM.revealInner, {x: '100%'})
            .set(this.DOM.revealDeco, {transformOrigin: '100% 50%'})
            .add(new TweenMax(this.DOM.revealDeco, 0.3, {
                ease: Sine.easeInOut,
                startAt: {scaleX: 0},
                scaleX: 1
            }), 'begin')
            .set(this.DOM.revealDeco, {transformOrigin: '0% 50%'})
            .add(new TweenMax(this.DOM.revealDeco, 0.6, {
                ease: Expo.easeOut,
                scaleX: 0
            }), 'begin+=0.3')
            .add(new TweenMax(this.DOM.revealInner, 0.6, {
                ease: Expo.easeOut,
                startAt: {x: '100%'},
                x: '0%'
            }), 'begin+=0.45')
            .add(new TweenMax(this.DOM.revealImg, 0.6, {
                ease: Expo.easeOut,
                startAt: {x: '-100%'},
                x: '0%'
            }), 'begin+=0.45')
            .add(new TweenMax(this.DOM.revealImg, 1.6, {
                ease: Expo.easeOut,
                startAt: {scale: 1.3},
                scale: 1
            }), 'begin+=0.45')
            .add(new TweenMax(this.DOM.reveal, 0.8, {
                ease: Quint.easeOut,
                startAt: {x: '20%', rotation: 10},
                x: '0%',
                rotation: 0
            }), 'begin');
    }
    hideImage() {
        TweenMax.killTweensOf(this.DOM.reveal);
        TweenMax.killTweensOf(this.DOM.revealInner);
        TweenMax.killTweensOf(this.DOM.revealImg);
        TweenMax.killTweensOf(this.DOM.revealDeco);

        this.tl = new TimelineMax({
            onStart: () => {
                TweenMax.set(this.DOM.el, {zIndex: 999});
            },
            onComplete: () => {
                TweenMax.set(this.DOM.el, {zIndex: ''});
                TweenMax.set(this.DOM.reveal, {opacity: 0});
            }
        })
            .add('begin')
            .add(new TweenMax(this.DOM.revealInner, 0.1, {
                ease: Sine.easeOut,
                x: '-100%'
            }), 'begin')
            .add(new TweenMax(this.DOM.revealImg, 0.1, {
                ease: Sine.easeOut,
                x: '100%'
            }), 'begin')
    }
}

[...document.querySelectorAll('[data-fx="6"] > a, a[data-fx="6"]')].forEach(link => new HoverImgFx6(link));

// Demo purspose only: Preload all the images in the page..
const contentel = document.querySelector('.section-3');
[...document.querySelectorAll('.objects-block__title')].forEach((el) => {
    const imgsArr = el.dataset.img.split(',');
    for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
        const imgel = document.createElement('img');
        imgel.style.visibility = 'hidden';
        imgel.style.width = 0;
        imgel.src = imgsArr[i];
        imgel.className = 'preload';
        contentel.appendChild(imgel);
    }
});
imagesLoaded(document.querySelectorAll('.preload'), () => document.body.classList.remove('loading'));
}

function partnersSlider() {
    const slider = new Swiper('.swiper-partners-container', {
        loop: true,
        preloadImages: false,
        lazy: true,
        speed: 2000,
        slidesPerView: 5,
        freeMode: false,
        spaceBetween: 200,
        autoplay: {
            delay: 1,
        },
        watchSlidesVisibility: true,

        breakpoints: {
            1600: {
                spaceBetween: 200
            },
            1024: {
                spaceBetween: 150
            },
        }
    });
}

document.addEventListener('DOMContentLoaded', partnersSlider);

$(document).ready(function() {
    $.Tween.propHooks.number = {
        get(tween) {
            const num = tween.elem.innerHTML.replace(/^[^\d-]+/, ' ');
            return parseFloat(num) || 0;
        },

        set(tween) {
            const opts = tween.options;
            let changedData = tween.now
                .toFixed(0)
                .toString()
                .split('');
            changedData.splice(0, 0, ' ');
            changedData = changedData.join('');
            tween.elem.innerHTML =
                // (opts.prefix || '') + tween.now.toFixed(opts.fixed || 0) + (opts.postfix || '');
                changedData;
        },
    };
    addIntersectionOnceWithCallback($('#num-1')[0], () => {
        $('#num-1')
            .delay(1000)
            .animate(
                { number: 15 },
                {duration: 2000},
            );
    });
    addIntersectionOnceWithCallback($('#num-2')[0], () => {
        $('#num-2')
            .delay(1000)
            .animate(
                { number: 182 },
                {duration: 2000},
            );
    });
    addIntersectionOnceWithCallback($('#num-3')[0], () => {
        $('#num-3')
            .delay(1000)
            .animate(
                {number: 30018 },
                {duration: 2000,},
            );
    })
});

function addIntersectionOnceWithCallback(el, cb = () => {}) {
    const num = el;
    const target = num;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                cb();
                observer.unobserve(target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1,
    });
    observer.observe(target);
}

// $(document).ready(function(){
//     $(".section1-text").on("click","a", function (event) {
//         event.preventDefault();
//         var id  = $(this).attr('href'),
//             top = $(id).offset().top;
//         $('body,html').animate({scrollTop: top}, 1500);
//     });
// });

var headroom  = new Headroom(document.querySelector('.header'));
// initialise
headroom.init();



