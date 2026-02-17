// INIT
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();

    // Page-specific setup
    if (document.getElementById('musicList')) loadMusicList();
    if (document.getElementById('calmQuote')) getNewQuote();
    if (document.getElementById('audioPlayer')) initializeAudioPlayer();
    if (document.getElementById('gratitudeList')) loadGratitudes();
    if (document.getElementById('profileGreeting')) loadProfileData();

    // Companion exists only on some pages (e.g., Home)
    if (document.getElementById('companion')) {
        setTimeout(() => showCompanionWalkIn(), 1000);
    }
});

function initializeApp() {
    // Detect page
    appState.currentPage =
        document.getElementById('authPage') ? 'auth' :
            document.getElementById('diaryPage') ? 'diary' :
                document.getElementById('calmPage') ? 'calm' :
                    document.getElementById('contactPage') ? 'contact' :
                        document.getElementById('profilePage') ? 'profile' :
                            'home';

    const userData = api.getCurrentUser();

    if (userData) {
        appState.currentUser = userData;
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }

    if (typeof updateJournalDate === 'function') {
        updateJournalDate();
    }

    console.log(`Page: ${appState.currentPage}, User:`, appState.currentUser);
}


function setupEventListeners() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const signupForm = document.getElementById('signupForm');
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    const profileForm = document.getElementById('profileForm');
    if (profileForm) profileForm.addEventListener('submit', handleProfileUpdate);

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.toggle('active');
                const expanded = navMenu.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            }
        });
    }

    const editor = document.getElementById('diaryEditor');
    if (editor) {
        editor.addEventListener('input', () => {
            clearTimeout(appState.typingTimer);
            appState.typingTimer = setTimeout(() => nodCompanion(), 500);
        });
    }
}

function updateUIForLoggedInUser() {
    const container = document.getElementById('navAuthContainer');
    if (!container || !appState.currentUser) return;
    const initial = (appState.currentUser.name || 'U').charAt(0).toUpperCase();

    const avatar = appState.currentUser.profilePic
        ? `<img src="${appState.currentUser.profilePic}" alt="Profile">`
        : initial;

    container.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="profile-avatar" onclick="location.href='profile.html'">
                ${avatar}
            </div>
            <button class="btn logout-btn" onclick="logout()" style="padding: 6px 12px; font-size: 0.85rem; background: var(--mauve); color: white; border: none; border-radius: 8px; cursor: pointer;">Logout</button>
        </div>
    `;
}

function logout() {
    if (typeof api !== 'undefined' && api.logout) {
        api.logout();
    }
    appState.currentUser = null;

    // Thoroughly clear local storage and session data
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    if (typeof showToast === 'function') {
        showToast('Logged out successfully', 'success');
    }

    // Force a full reload to clear any cached states
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

function updateUIForLoggedOutUser() {
    const container = document.getElementById('navAuthContainer');
    if (!container) return;
    container.innerHTML = `<a href="auth.html" class="btn">Login/Sign Up</a>`;
}

// Redirect helpers
function closeLoginPrompt() {
    document.getElementById('loginPromptModal').classList.remove('show');
}

function goToAuth() {
    closeLoginPrompt();
    window.location.href = 'auth.html';
}

window.logout = logout;
window.initializeApp = initializeApp;
window.updateUIForLoggedInUser = updateUIForLoggedInUser;
window.updateUIForLoggedOutUser = updateUIForLoggedOutUser;
window.closeLoginPrompt = closeLoginPrompt;
window.goToAuth = goToAuth;
