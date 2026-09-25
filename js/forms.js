// forms.js — client-side validation; the form itself posts to /api/contact
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach((field) => {
            if (!field.value.trim()) valid = false;
        });
        if (!valid) {
            e.preventDefault();
            alert('Please fill in all required fields before submitting.');
        }
    });
});
