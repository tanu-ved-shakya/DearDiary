const companionMessages = {
    home: ["Hello! I'm here to support you.", "Welcome to your safe space."],
    auth: ["Creating your safe space...", "You're taking an important step."],
    diary: ["How was your day?", "Let it all out, I'm listening.", "You're doing great!"],
    calm: ["Let's find peace together.", "Take a deep breath with me."],
    contact: ["Want to reach out? I'm here!"],
    profile: ["Update your info anytime!", "Your profile, your way."]
};

// COMPANION
function showCompanionWalkIn() {
    if (appState.companionShown) return;
    const companion = document.getElementById('companion');
    if (!companion) return;
    companion.classList.add('walking-in');
    setTimeout(() => {
        companion.classList.remove('walking-in');
        appState.companionShown = true;
        setTimeout(() => showCompanionMessage(appState.currentPage), 500);
    }, 2000);
}

function showCompanionMessage(page) {
    const messages = companionMessages[page] || companionMessages.home;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    const messageEl = document.getElementById('companionMessage');
    const bubbleEl = document.getElementById('speechBubble');
    if (!messageEl || !bubbleEl) return;
    messageEl.textContent = msg;
    bubbleEl.classList.add('show');
    setTimeout(() => closeSpeechBubble(), 5000);
}

function toggleSpeechBubble() {
    const bubble = document.getElementById('speechBubble');
    if (!bubble) return;
    bubble.classList.contains('show') ? closeSpeechBubble() : showCompanionMessage(appState.currentPage);
}

function closeSpeechBubble() {
    const bubble = document.getElementById('speechBubble');
    if (!bubble) return;
    bubble.classList.remove('show');
}

function nodCompanion() {
    const companion = document.getElementById('companion');
    if (!companion) return;
    companion.classList.add('nodding');
    setTimeout(() => companion.classList.remove('nodding'), 500);
}

window.showCompanionWalkIn = showCompanionWalkIn;
window.showCompanionMessage = showCompanionMessage;
window.toggleSpeechBubble = toggleSpeechBubble;
window.closeSpeechBubble = closeSpeechBubble;
window.nodCompanion = nodCompanion;
