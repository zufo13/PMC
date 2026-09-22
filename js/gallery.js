// gallery.js — portfolio filter
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-bar button');
    const items = document.querySelectorAll('[data-category]');
    if (!buttons.length) return;
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            buttons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            items.forEach((item) => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.style.display = match ? '' : 'none';
            });
        });
    });
});
