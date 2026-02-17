const calmingQuotes = [
    "Take a deep breath. You're allowed to rest before you rise again.",
    "Your feelings are valid. It's okay to not be okay sometimes.",
    "You are stronger than you think, braver than you believe.",
    "Progress, not perfection. Every small step counts.",
    "Be gentle with yourself. You're doing the best you can.",
    "This too shall pass. You've survived 100% of your worst days.",
    "You are worthy of peace, love, and happiness.",
    "It's okay to take things one day at a time.",
    "Your mental health matters. Take care of yourself first.",
    "Healing is not linear. Some days will be harder.",
    "You are enough, exactly as you are right now.",
    "Remember to breathe. You're going to be okay."
];

// GRATITUDE
function addGratitude() {
    const input = document.getElementById('gratitudeInput');
    if (!input) return;
    const text = input.value.trim();

    if (!text) {
        showToast('Please write something', 'error');
        return;
    }

    const gratitudes = JSON.parse(localStorage.getItem('gratitudes') || '[]');
    gratitudes.unshift({
        id: Date.now(),
        text: text,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem('gratitudes', JSON.stringify(gratitudes));
    input.value = '';
    loadGratitudes();
    showToast('Gratitude added!', 'success');
}

function loadGratitudes() {
    const gratitudes = JSON.parse(localStorage.getItem('gratitudes') || '[]');
    const list = document.getElementById('gratitudeList');
    if (!list) return;

    if (gratitudes.length === 0) {
        list.innerHTML = '<p style="text-align: center; opacity: 0.6; margin-top: 1rem;">Start adding things you\'re grateful for</p>';
        return;
    }

    // Only show the latest 1 on the main page
    list.innerHTML = gratitudes.slice(0, 1).map(item => `
        <div class="gratitude-item">
            <strong>${escapeHtml(item.text)}</strong>
            <div style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.3rem;">${item.date}</div>
        </div>
    `).join('');
}

function showAllGratitudes() {
    const gratitudes = JSON.parse(localStorage.getItem('gratitudes') || '[]');
    const modal = document.getElementById('gratitudeModal');
    const list = document.getElementById('fullGratitudeList');

    if (!modal || !list) return;

    if (gratitudes.length === 0) {
        list.innerHTML = '<p style="text-align: center; padding: 2rem; opacity: 0.6;">No gratitudes yet.</p>';
    } else {
        list.innerHTML = gratitudes.map(item => `
            <div class="gratitude-item" style="margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.8rem;">
                <strong>${escapeHtml(item.text)}</strong>
                <div style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.3rem;">${item.date}</div>
            </div>
        `).join('');
    }

    modal.classList.add('show');
}

function closeGratitudeModal() {
    const modal = document.getElementById('gratitudeModal');
    if (modal) modal.classList.remove('show');
}

// CALM
function getNewQuote() {
    const quote = calmingQuotes[Math.floor(Math.random() * calmingQuotes.length)];
    const el = document.getElementById('calmQuote');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
        el.textContent = `"${quote}"`;
        el.style.opacity = '1';
    }, 300);
}

window.addGratitude = addGratitude;
window.loadGratitudes = loadGratitudes;
window.showAllGratitudes = showAllGratitudes;
window.closeGratitudeModal = closeGratitudeModal;
window.getNewQuote = getNewQuote;

