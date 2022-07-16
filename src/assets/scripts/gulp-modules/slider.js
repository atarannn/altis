const mainSlider = new Swiper('.main-swiper', {
    loop: false,
    speed: 1000,
    slidesPerView: 'auto',
    simulateTouch: false,
    spaceBetween: 20,
    navigation: {
        nextEl: document.querySelector('[data-next]'),
        prevEl: document.querySelector('[data-prev]'),
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    breakpoints: {
        1600: {
            spaceBetween: 60,
        },
        1024: {
            spaceBetween: 40,
        },
        575: {
            spaceBetween: 30,
        },
        320: {
            spaceBetween: 20,
        },
    }
});

const mainSlider2 = new Swiper('.main-swiper2', {
    loop: false,
    speed: 1000,
    slidesPerView: 'auto',
    simulateTouch: false,
    spaceBetween: 20,
    navigation: {
        nextEl: document.querySelector('[data-next-2]'),
        prevEl: document.querySelector('[data-prev-2]')
    },
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    breakpoints: {
        1600: {
            spaceBetween: 60,
        },
        1024: {
            spaceBetween: 40,
        },
        575: {
            spaceBetween: 30,
        },
        320: {
            spaceBetween: 20,
        },
    }
});
