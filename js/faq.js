// faq.js — accordion behavior
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const expanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', String(!expanded));
            const panel = document.getElementById(trigger.getAttribute('aria-controls'));
            panel?.classList.toggle('open', !expanded);
        });
    });
});
