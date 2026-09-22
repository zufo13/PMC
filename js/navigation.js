// navigation.js — mobile nav toggle + Services submenu
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    // Submenu is opened via CSS :hover for mouse users, but hover alone can get
    // stuck open on touchscreens/trackpads that never fire a clean mouseleave,
    // and it never closes on tap-outside. Manage an explicit 'open' class as
    // the source of truth so it can always be closed.
    const submenuParents = document.querySelectorAll('.has-submenu');

    function closeAllSubmenus(except) {
        submenuParents.forEach((li) => {
            if (li !== except) li.classList.remove('open');
        });
    }

    submenuParents.forEach((li) => {
        const link = li.querySelector(':scope > a');
        if (!link) return;
        link.addEventListener('click', (e) => {
            // First activation (touch or click) opens the submenu instead of
            // navigating away; a second activation while already open lets
            // the link behave normally.
            if (!li.classList.contains('open')) {
                e.preventDefault();
                closeAllSubmenus(li);
                li.classList.add('open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-submenu')) closeAllSubmenus();
    });
    document.addEventListener('touchstart', (e) => {
        if (!e.target.closest('.has-submenu')) closeAllSubmenus();
    }, {passive: true});
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllSubmenus();
    });
});
