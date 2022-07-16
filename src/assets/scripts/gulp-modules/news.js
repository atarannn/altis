const arrowAction = document.querySelectorAll('.action svg');
const arrowNews = document.querySelectorAll('.news svg');

const filterAction = document.querySelector('[data-view="action"]');
const filterNews = document.querySelector('[data-view="news"]');

arrowAction.forEach(el => {
    el.addEventListener('mouseenter', () => {
        filterAction.classList.add('hover-btn');
        el.classList.add('hover-svg');
    })
})

arrowAction.forEach(el => {
    el.addEventListener('mouseleave', () => {
        filterAction.classList.remove('hover-btn');
        el.classList.remove('hover-svg');
    })
})

arrowNews.forEach(el => {
    el.addEventListener('mouseenter', () => {
        filterNews.classList.add('hover-btn');
        el.classList.add('hover-svg');
    })
})

arrowNews.forEach(el => {
    el.addEventListener('mouseleave', () => {
        filterNews.classList.remove('hover-btn');
        el.classList.remove('hover-svg');
    })
})

const list = document.querySelectorAll('.card-wrapper');
const btnNews = document.querySelectorAll('[data-view]');
btnNews.forEach(el => el.addEventListener('click', (event) => {
    if (event.target.tagName != 'BUTTON') return false;
    const target = event.target.dataset.view;
    console.log(target);
    btnNews.forEach(button => {
        console.log(button);
        button.classList.remove('active');
    });
    el.classList.add('active');

    list.forEach((elem) => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(target) && target != 'all') {
            elem.classList.add('hide');
            // el.classList.remove('active');
        }
    });
}));
