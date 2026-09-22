// main.js — shared site behaviors
document.addEventListener('DOMContentLoaded', () => {
    const chat = document.querySelector('.live-chat');
    if (chat) {
        const toggle = chat.querySelector('.live-chat-toggle');
        toggle?.addEventListener('click', () => {
            const opener = chat.dataset.opener || 'Need restoration help?';
            alert(opener);
        });
    }
});
