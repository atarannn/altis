function initSliderCursor(cursor) {
    const container = document.querySelectorAll('.project-card');
    const showCursor = (el) => {
        el.style.transform = 'translate(-50%, -50%)scale(1)';
    };
    const hideCursor = (el) => {
        el.style.transform = 'translate(-50%, -50%)scale(0)';
    };
    container.forEach(el => {
        el.addEventListener('mousemove', (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });
    })
    container.forEach(el => {
        el.addEventListener('mouseenter', () => {
            showCursor(cursor);
        });
    })
    container.forEach(el => {
        el.addEventListener('mouseleave', () => {
            hideCursor(cursor);
        });
    })
}

const cursorHtml = `<div class="icon--cursor js-cursor">детальніше</div>`;

document.body.insertAdjacentHTML('beforeend', cursorHtml);
const cursor = document.querySelector('.js-cursor');


if (document.documentElement.clientWidth > 1024) {
    initSliderCursor(cursor);
}
