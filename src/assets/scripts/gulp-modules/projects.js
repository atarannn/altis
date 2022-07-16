const currentCategories = new Set();
document.querySelectorAll("[data-filter]").forEach((filterItem) => {
    const key = filterItem.dataset.filter;
    filterItem.addEventListener("change", () => {
        filterItem.checked
            ? currentCategories.add(key)
            : currentCategories.delete(key);
        filterByCategories();
    });
});

function filterByCategories() {
    document.querySelectorAll(".project-card-wrap").forEach((el) => {
        const key = el.dataset.city;
        const key2 = el.dataset.year;
        el.style.display =
            (currentCategories.has(key) && currentCategories.has(key2)) ? "flex" : "none";
    });
}

function filterOpen(filter) {
    filter.classList.add('active');
    const tl = gsap.timeline({ paused: true });
    tl.set(filter, { autoAlpha: 0 });
    tl.fromTo(filter,
        {autoAlpha: 0},
        {autoAlpha: 1, duration: 0.4}, '<');
    tl.play();
    document.querySelector('body').style.overflow = 'hidden';
}
function filterClose(filter) {
    filter.classList.remove('active');
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(filter,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 0.4, clearProps: 'all' }, '<');
    tl.set(filter, { autoAlpha: 0 });
    tl.play();
    document.querySelector('body').style.overflow = 'auto';
}
function filterInit() {
    const filter = document.querySelector('[data-filter-menu]');
    document.querySelector('[data-open-filter-menu]').addEventListener('click', () => filterOpen(filter));
    document.querySelectorAll('[data-close-filter-menu]').forEach(btn => {
        btn.addEventListener('click', () => filterClose(filter));
    })
}

filterInit();
