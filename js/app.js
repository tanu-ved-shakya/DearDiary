
// Utility: Check localStorage usage
function checkStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }
    const usedMB = (total / 1024 / 1024).toFixed(2);
    console.log('LocalStorage used:', usedMB, 'MB');
    return usedMB;
}


// EMOJI DATA
const emojiData = {
    smileys: ['😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙','🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸','😎','🤓','🧐','😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','🥱'],
    nature: ['🌸','🌺','🌼','🌻','🌷','🌹','🥀','🌾','🌿','☘️','🍀','🍃','🍂','🍁','🌱','🌲','🌳','🌴','🌵','🌊','🌬️','🌀','🌈','⭐','🌟','✨','⚡','🔥','💧','☀️','🌤️','⛅','🌥️','☁️','🌦️','🌧️','⛈️','🌩️','🌨️','❄️','☃️','⛄','🌪️','🌫️','🦋','🐝','🐞','🦗','🕷️','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦀','🦞','🦐','🐠','🐟','🐡','🦈','🐳','🐋','🐬','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🐃','🐂','🐄','🐎','🐖','🐏','🐑','🦙','🐐','🦌','🐕','🐩','🦮','🐈','🐓','🦃','🦚','🦜','🦢','🦩','🕊️','🐇','🦝','🦨','🦡','🦦','🦥','🐁','🐀','🐿️','🦔'],
    objects: ['💝','🎁','🎀','🎊','🎉','🎈','🏆','🥇','🥈','🥉','⚽','🏀','🏈','⚾','🎾','🏐','🏉','🥏','🎱','🎯','🎮','🎲','🎭','🎨','🖼️','🎬','🎤','🎧','🎼','🎹','🎸','🎺','🎷','📚','📖','📝','✏️','✒️','🖊️','🖍️','📌','📍','✂️','📐','📏','🔒','🔓','🔐','🔑','🗝️','🔨','🪓','⛏️','⚒️','🛠️','🗡️','⚔️','💣','🔫','🏹','🛡️','🔧','🪛','🔩','⚙️','🗜️','⚖️','🦯','🔗','⛓️','🧰','🧲','🪜'],
    symbols: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐','⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','🆔','⚛️','☢️','☣️','📴','📳','🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️','㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️','🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️','✅','☑️','✔️','❎','➰','➿','〰️','〽️','✳️','✴️','❇️','©️','®️','™️']
};

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

const companionMessages = {
    home: ["Hello! I'm here to support you.", "Welcome to your safe space."],
    auth: ["Creating your safe space...", "You're taking an important step."],
    diary: ["How was your day?", "Let it all out, I'm listening.", "You're doing great!"],
    calm: ["Let's find peace together.", "Take a deep breath with me."],
    contact: ["Want to reach out? I'm here!"],
    profile: ["Update your info anytime!", "Your profile, your way."]
};

const relaxingMusic = [
    { title: "Peaceful Piano", duration: "10:00", url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c6e0e49dd7.mp3" },
    { title: "Ocean Waves", duration: "15:00", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" },
    { title: "Forest Ambience", duration: "12:00", url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_4a26cc0e12.mp3" },
    { title: "Gentle Rain", duration: "20:00", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_69ce8344dc.mp3" },
    { title: "Meditation Music", duration: "30:00", url: "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3" }
];



// INIT
window.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    // Calm page features (only run if the DOM exists on this page)
    if (document.getElementById('musicList')) loadMusicList();
    if (document.getElementById('calmQuote')) getNewQuote();
    if (document.getElementById('audioPlayer')) initializeAudioPlayer();
    // setupDrawingCanvas();
    if (document.getElementById('gratitudeList')) loadGratitudes();

    // Companion exists only on some pages (e.g., Home)
    if (document.getElementById('companion')) {
        setTimeout(() => showCompanionWalkIn(), 1000);
    }
});

function initializeApp() {
    // Detect page (multi-page app)
    appState.currentPage =
        document.getElementById('authPage') ? 'auth' :
        document.getElementById('diaryPage') ? 'diary' :
        document.getElementById('calmPage') ? 'calm' :
        document.getElementById('contactPage') ? 'contact' :
        document.getElementById('profilePage') ? 'profile' :
        'home';

    const userData = localStorage.getItem('currentUser');

    if (userData) {
        appState.currentUser = JSON.parse(userData);
        console.log('User loaded:', appState.currentUser);
        updateUIForLoggedInUser();
    } else {
        console.log('No user logged in');
        updateUIForLoggedOutUser();
    }

    updateJournalDate();

    // Debug check
    console.log('App initialized. Current user:', appState.currentUser);
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

    const imageInput = document.getElementById('imageInput');
    if (imageInput) imageInput.addEventListener('change', handleImageUpload);

    const profilePicInput = document.getElementById('profilePicInput');
    if (profilePicInput) profilePicInput.addEventListener('change', handleProfilePicUpload);

    const editor = document.getElementById('diaryEditor');
    if (editor) {
        editor.addEventListener('input', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => nodCompanion(), 500);
        });
    }
    document.addEventListener('keydown', (e) => {
        const reader = document.getElementById('diaryReader');
        if (reader && reader.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextPage();
            } else if (e.key === 'ArrowLeft') {
                previousPage();
            } else if (e.key === 'Escape') {
                closeDiaryReader();
            }
        }
    });
}

// COMPANION
function showCompanionWalkIn() {
    if (appState.companionShown) return;
    const companion = document.getElementById('companion');
    if (!companion) return;
    companion.classList.add('walking-in');
    setTimeout(() => {
        companion.classList.remove('walking-in');
        appState.companionShown = true;
        setTimeout(() => showCompanionMessage(currentPage), 500);
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
    bubble.classList.contains('show') ? closeSpeechBubble() : showCompanionMessage(currentPage);
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

// NAVIGATION
// function navigateTo(page) {
//     document.getElementById('navMenu').classList.remove('active');
//     document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
//     const pageMap = {
//         home: 'homePage',
//         auth: 'authPage',
//         diary: 'diaryPage',
//         calm: 'calmPage',
//         contact: 'contactPage',
//         profile: 'profilePage'
//     };
    
//     document.getElementById(pageMap[page]).classList.add('active');
//     currentPage = page;

//     if (page === 'diary') {
//         updateJournalDate();
//         if (currentUser) loadDiaryEntries();
//     }

//     if (page === 'profile' && currentUser) loadProfileData();

//     setTimeout(() => showCompanionMessage(page), 500);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// }

// function handleAuthNavigation() {
//     navigateTo(currentUser ? 'profile' : 'auth');
// }

// function beginDiary() {
//     navigateTo('diary');
// }

// AUTH
function toggleAuthForm() {
    appState.isLoginMode = !appState.isLoginMode;
    if (appState.isLoginMode) {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('authTitle').textContent = 'Welcome Back';
        document.getElementById('authToggleText').textContent = "Don't have an account? ";
        document.getElementById('authToggleLink').textContent = 'Sign Up';
    } else {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
        document.getElementById('authTitle').textContent = 'Create Account';
        document.getElementById('authToggleText').textContent = "Already have an account? ";
        document.getElementById('authToggleLink').textContent = 'Login';
    }
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('signupError').style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        appState.currentUser = { 
            name: user.name, 
            email: user.email,
            profilePic: user.profilePic || null,
            quote: user.quote || '',
            writingTime: user.writingTime || 'Evening',
            goal: user.goal || 'Daily reflection'
        };
        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
        updateUIForLoggedInUser();
        showToast(`Welcome back, ${user.name}!`, 'success');
        window.location.href = 'diary.html';
    } else {
        document.getElementById('loginError').textContent = 'Invalid email or password';
        document.getElementById('loginError').style.display = 'block';
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const errorEl = document.getElementById('signupError');
    
    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match';
        errorEl.style.display = 'block';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
        errorEl.textContent = 'Email already registered';
        errorEl.style.display = 'block';
        return;
    }
    
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    appState.currentUser = { name, email, profilePic: null };
    localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
    updateUIForLoggedInUser();
    showToast(`Welcome, ${name}!`, 'success');
    window.location.href = 'diary.html';
}

function logout() {
    appState.currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOutUser();
    showToast('Logged out successfully', 'success');
    window.location.href = 'index.html';
}

function updateUIForLoggedInUser() {
    const container = document.getElementById('navAuthContainer');
    if (!container || !appState.currentUser) return;
    const initial = appState.currentUser.name.charAt(0).toUpperCase();
    
    if (appState.currentUser.profilePic) {
        container.innerHTML = `<div class="profile-avatar" onclick="location.href='profile.html'"><img src="${appState.currentUser.profilePic}" alt="Profile"></div>`;
    } else {
        container.innerHTML = `<div class="profile-avatar" onclick="location.href='profile.html'">${initial}</div>`;
    }
}

function updateUIForLoggedOutUser() {
    const container = document.getElementById('navAuthContainer');
    if (!container) return;
    container.innerHTML = `<a href="auth.html" class="btn">Login/Sign Up</a>`;
}

// PROFILE
function loadProfileData() {
    if (!appState.currentUser) return;
    document.getElementById('profileName').value = appState.currentUser.name;
    document.getElementById('profileEmail').value = appState.currentUser.email;
    document.getElementById('profileQuote').value = appState.currentUser.quote || '';
    document.getElementById('profileWritingTime').value = appState.currentUser.writingTime || 'Evening';
    document.getElementById('profileGoal').value = appState.currentUser.goal || 'Daily reflection';
    document.getElementById('profileGreeting').textContent = `Hello, ${appState.currentUser.name}!`;
    
    const picDisplay = document.getElementById('profilePicDisplay');
    if (appState.currentUser.profilePic) {
        picDisplay.innerHTML = `<img src="${appState.currentUser.profilePic}" alt="Profile">`;
    } else {
        picDisplay.textContent = appState.currentUser.name.charAt(0).toUpperCase();
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    const newName = document.getElementById('profileName').value;
    const newPassword = document.getElementById('profileNewPassword').value;
    const quote = document.getElementById('profileQuote').value;
    const writingTime = document.getElementById('profileWritingTime').value;
    const goal = document.getElementById('profileGoal').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === appState.currentUser.email);
    
    if (userIndex !== -1) {
        users[userIndex].name = newName;
        users[userIndex].quote = quote;
        users[userIndex].writingTime = writingTime;
        users[userIndex].goal = goal;
        if (newPassword) users[userIndex].password = newPassword;
        if (appState.currentUser.profilePic) users[userIndex].profilePic = appState.currentUser.profilePic;
        
        localStorage.setItem('users', JSON.stringify(users));
        
        appState.currentUser.name = newName;
        appState.currentUser.quote = quote;
        appState.currentUser.writingTime = writingTime;
        appState.currentUser.goal = goal;
        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
        
        updateUIForLoggedInUser();
        showToast('Profile updated!', 'success');
        loadProfileData();
    }
}

function handleProfilePicUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            appState.currentUser.profilePic = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.email === appState.currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].profilePic = e.target.result;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            loadProfileData();
            updateUIForLoggedInUser();
            showToast('Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    }
}


function closeLoginPrompt() {
    document.getElementById('loginPromptModal').classList.remove('show');
}

function goToAuth() {
    closeLoginPrompt();
    window.location.href = 'auth.html';
}

// MEDITATION
let meditationInterval = null;
let meditationSeconds = 300;
let meditationRunning = false;
let meditationPaused = false;
let meditationFullscreen = false;
let originalMeditationSeconds = 300;

function setTimer(minutes) {
    if (meditationRunning) {
        showToast('Stop current meditation first', 'error');
        return;
    }
    meditationSeconds = minutes * 60;
    originalMeditationSeconds = meditationSeconds;
    updateTimerDisplay();
    showToast(`Timer set to ${minutes} minutes`, 'success');
}

function setCustomTimer() {
    const input = document.getElementById('customMinutes');
    const minutes = parseInt(input.value);
    
    if (!minutes || minutes < 1 || minutes > 60) {
        showToast('Please enter 1-60 minutes', 'error');
        return;
    }
    
    if (meditationRunning) {
        showToast('Stop current meditation first', 'error');
        return;
    }
    
    meditationSeconds = minutes * 60;
    originalMeditationSeconds = meditationSeconds;
    updateTimerDisplay();
    showToast(`Timer set to ${minutes} minutes`, 'success');
    input.value = '';
}

function updateTimerDisplay() {
    const mins = Math.floor(meditationSeconds / 60);
    const secs = meditationSeconds % 60;
    const time = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) timerDisplay.textContent = time;
    
    const fullscreenTimer = document.getElementById('fullscreenTimer');
    if (fullscreenTimer) fullscreenTimer.textContent = time;
}

function startMeditation() {
    console.log('startMeditation called');
    console.log('Current state - Running:', meditationRunning, 'Paused:', meditationPaused);
    
    // If running, pause it
    if (meditationRunning && !meditationPaused) {
        pauseTimer();
        return;
    }
    
    // If paused, resume
    if (meditationPaused) {
        resumeTimer();
        return;
    }
    
    // Starting fresh
    const useFullscreen = confirm('Would you like fullscreen meditation mode with calming music?\n\nOK = Fullscreen with music\nCancel = Normal timer');
    
    if (useFullscreen) {
        enterFullscreenMode();
    }
    
    actuallyStartTimer();
}

function enterFullscreenMode() {
    meditationFullscreen = true;
    const fullscreenEl = document.getElementById('meditationFullscreen');
    if (fullscreenEl) {
        fullscreenEl.classList.add('active');
        console.log('Fullscreen activated');
    } else {
        console.error('Fullscreen element not found');
    }
    
    // Start meditation music
    if (audioPlayer) {
        audioPlayer.src = relaxingMusic[4].url;
        audioPlayer.loop = true;
        audioPlayer.volume = 0.5;
        audioPlayer.play().catch(err => {
            console.log('Audio play error:', err);
            showToast('Click to enable audio', 'info');
        });
    }
}

function actuallyStartTimer() {
    console.log('actuallyStartTimer called with seconds:', meditationSeconds);
    
    meditationRunning = true;
    meditationPaused = false;
    
    const btn = document.getElementById('timerBtn');
    if (btn) {
        btn.textContent = 'Pause';
        console.log('Button text changed to Pause');
    }
    
    meditationInterval = setInterval(() => {
        meditationSeconds--;
        updateTimerDisplay();
        
        // Update breathing text
        const cycle = meditationSeconds % 8;
        const breatheText = cycle < 4 ? 'Breathe In...' : 'Breathe Out...';
        
        const breatheEl = document.getElementById('breatheText');
        if (breatheEl) breatheEl.textContent = breatheText;
        
        const fullscreenBreathe = document.getElementById('fullscreenBreathe');
        if (fullscreenBreathe) fullscreenBreathe.textContent = breatheText;
        
        // Check completion
        if (meditationSeconds <= 0) {
            completeMeditation();
        }
    }, 1000);
    
    console.log('Interval started');
}

function pauseTimer() {
    console.log('Pausing timer');
    meditationRunning = false;
    meditationPaused = true;
    clearInterval(meditationInterval);
    
    const btn = document.getElementById('timerBtn');
    if (btn) btn.textContent = 'Resume';
    
    const breatheEl = document.getElementById('breatheText');
    if (breatheEl) breatheEl.textContent = 'Paused';
    
    const fullscreenBreathe = document.getElementById('fullscreenBreathe');
    if (fullscreenBreathe) fullscreenBreathe.textContent = 'Paused';
    
    showToast('Paused', 'info');
}

function resumeTimer() {
    console.log('Resuming timer');
    actuallyStartTimer();
    showToast('Resumed', 'success');
}

function stopTimer() {
    console.log('Stopping timer');
    meditationRunning = false;
    meditationPaused = false;
    clearInterval(meditationInterval);
    
    const btn = document.getElementById('timerBtn');
    if (btn) btn.textContent = 'Start Meditation';
    
    const breatheEl = document.getElementById('breatheText');
    if (breatheEl) breatheEl.textContent = 'Breathe';
    
    // Exit fullscreen
    if (meditationFullscreen) {
        const fullscreenEl = document.getElementById('meditationFullscreen');
        if (fullscreenEl) fullscreenEl.classList.remove('active');
        meditationFullscreen = false;
    }
    
    // Stop audio
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.loop = false;
        audioPlayer.currentTime = 0;
    }
}

function resetTimer() {
    console.log('Resetting timer');
    stopTimer();
    meditationSeconds = originalMeditationSeconds;
    updateTimerDisplay();
    showToast('Timer reset', 'info');
}

function completeMeditation() {
    console.log('Meditation complete');
    clearInterval(meditationInterval);
    meditationRunning = false;
    meditationPaused = false;
    
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.loop = false;
    }
    
    if (meditationFullscreen) {
        document.getElementById('meditationFullscreen').classList.remove('active');
        meditationFullscreen = false;
    }
    
    const btn = document.getElementById('timerBtn');
    if (btn) btn.textContent = 'Start Meditation';
    
    showToast('Meditation complete! Well done.', 'success');
    
    meditationSeconds = originalMeditationSeconds;
    updateTimerDisplay();
}

function exitMeditation() {
    document.getElementById('meditationFullscreen').classList.remove('active');
    meditationFullscreen = false;
    showToast('Exited fullscreen. Timer still running.', 'info');
}

function pauseTimerFromFullscreen() {
    pauseTimer();
}

function stopTimerFromFullscreen() {
    if (confirm('Stop meditation and exit?')) {
        stopTimer();
    }
}

// GRATITUDE
function addGratitude() {
    const input = document.getElementById('gratitudeInput');
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
    
    list.innerHTML = gratitudes.slice(0, 5).map(item => `
        <div class="gratitude-item">
            <strong>${escapeHtml(item.text)}</strong>
            <div style="font-size: 0.85rem; opacity: 0.7; margin-top: 0.3rem;">${item.date}</div>
        </div>
    `).join('');
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

function initializeAudioPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    if (!audioPlayer) return;
    audioPlayer.addEventListener('ended', () => {
        if (currentlyPlayingMusic !== null) {
            document.getElementById(`music-${currentlyPlayingMusic}`).classList.remove('playing');
            document.getElementById(`play-icon-${currentlyPlayingMusic}`).textContent = '▶';
            currentlyPlayingMusic = null;
        }
    });
}

function loadMusicList() {
    const listEl = document.getElementById('musicList');
    if (!listEl) return;
    listEl.innerHTML = relaxingMusic.map((m, i) => `
        <div class="music-item" id="music-${i}">
            <div class="music-info">
                <button class="play-btn" onclick="toggleMusic(${i})">
                    <span id="play-icon-${i}">▶</span>
                </button>
                <div class="music-title">${m.title}</div>
            </div>
            <div>${m.duration}</div>
        </div>
    `).join('');
}

function toggleMusic(index) {
    if (!audioPlayer) initializeAudioPlayer();
    if (!audioPlayer) return;

    const item = document.getElementById(`music-${index}`);
    const icon = document.getElementById(`play-icon-${index}`);
    if (!item || !icon) return;
    
    if (currentlyPlayingMusic !== null && currentlyPlayingMusic !== index) {
        document.getElementById(`music-${currentlyPlayingMusic}`).classList.remove('playing');
        document.getElementById(`play-icon-${currentlyPlayingMusic}`).textContent = '▶';
        audioPlayer.pause();
    }
    
    if (currentlyPlayingMusic === index) {
        item.classList.remove('playing');
        icon.textContent = '▶';
        currentlyPlayingMusic = null;
        audioPlayer.pause();
    } else {
        item.classList.add('playing');
        icon.textContent = '⏸';
        currentlyPlayingMusic = index;
        audioPlayer.src = relaxingMusic[index].url;
        audioPlayer.play();
        showToast(`Playing: ${relaxingMusic[index].title}`, 'success');
    }
}

// UTILS
function showToast(message, type = 'info') {
    // Some pages may not include a toast container; create one lazily.
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
// DIARY BOOK CREATION
function selectDiaryColor(color, element) {
    console.log('Color selected:', color);
    selectedDiaryColor = color;
    
    // Remove selected class from all
    const allOptions = document.querySelectorAll('.color-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked element
    if (element) {
        element.classList.add('selected');
    }
}




function createDiary() {
    console.log('=== CREATE DIARY STARTED ===');
    
    if (!appState.currentUser) {
        showToast('Please login to create diaries', 'error');
        return;
    }
    
    const nameInput = document.getElementById('diaryName');
    const startInput = document.getElementById('diaryStartDate');
    const endInput = document.getElementById('diaryEndDate');
    
    if (!nameInput || !startInput || !endInput) {
        showToast('Error: Form not loaded. Try refreshing.', 'error');
        return;
    }
    
    const name = nameInput.value.trim();
    const startDate = startInput.value;
    const endDate = endInput.value;
    
    if (!name) {
        showToast('Please enter a diary name', 'error');
        return;
    }
    
    if (!startDate || !endDate) {
        showToast('Please select both dates', 'error');
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
        showToast('Start date must be before end date', 'error');
        return;
    }
    
    // Get all entries
    const storageKey = `diary_${appState.currentUser.email}`;
    const allEntries = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Filter entries and store ONLY IDs (not full content)
    const filteredEntryIds = allEntries
        .filter(entry => {
            const entryDate = new Date(entry.date);
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            return entryDate >= start && entryDate <= endOfDay;
        })
        .map(entry => entry.id); // Store only IDs!
    
    console.log('Filtered entry IDs:', filteredEntryIds.length);
    
    if (filteredEntryIds.length === 0) {
        showToast('No entries found in this date range', 'error');
        return;
    }
    
    // Get existing diaries
    const diariesKey = `diaries_${appState.currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(diariesKey) || '[]');
    
    // Create new diary with ONLY entry IDs
    const newDiary = {
        id: Date.now(),
        name: name,
        color: selectedDiaryColor,
        startDate: startDate,
        endDate: endDate,
        entryIds: filteredEntryIds, // Store IDs only!
        entryCount: filteredEntryIds.length,
        createdAt: new Date().toISOString()
    };
    
    diaries.unshift(newDiary);
    
    try {
        localStorage.setItem(diariesKey, JSON.stringify(diaries));
        console.log('Diary saved successfully');
    } catch (e) {
        console.error('Storage error:', e);
        showToast('Storage full. Try deleting old entries.', 'error');
        return;
    }
    
    // Clear form
    nameInput.value = '';
    startInput.value = '';
    endInput.value = '';
    selectedDiaryColor = '#f5dcd4';
    
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector('.color-option[data-color="#f5dcd4"]')?.classList.add('selected');
    
    loadDiaries();
    showToast(`"${name}" created with ${filteredEntryIds.length} entries!`, 'success');

    const usage = checkStorageUsage();
    console.log('Storage usage after save:', usage, 'MB');
    
    if (parseFloat(usage) > 4) {
        showToast('Storage getting full. Consider deleting old entries.', 'info');
    }
}



function loadDiaries() {
    if (!appState.currentUser) return;
    
    const storageKey = `diaries_${appState.currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    console.log('Loading', diaries.length, 'diaries');
    
    const panel = document.getElementById('diariesPanel');
    if (!panel) return;
    
    if (diaries.length === 0) {
        panel.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: white; border-radius: 25px; border: 2px dashed var(--mauve);">
                <p style="font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--brown); margin-bottom: 0.5rem;">No diary books yet</p>
                <p style="color: var(--text-dark); opacity: 0.7;">Create your first diary book above!</p>
            </div>
        `;
        return;
    }
    
    panel.innerHTML = diaries.map(diary => `
        <div class="diary-book-card" style="border-color: ${diary.color};" onclick="openDiaryReader(${diary.id})">
            <div class="diary-book-spine" style="background: ${diary.color};"></div>
            <h4>${escapeHtml(diary.name)}</h4>
            <p style="font-weight: 600; color: var(--brown);">${diary.entryCount || diary.entryIds?.length || 0} entries</p>
            <p style="font-size: 0.9rem; opacity: 0.7;">${new Date(diary.startDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${new Date(diary.endDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</p>
            <div class="diary-actions-mini" onclick="event.stopPropagation()">
                <button onclick="deleteDiary(${diary.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}


function deleteDiary(diaryId) {
    console.log('Deleting diary:', diaryId);
    
    if (!confirm('Delete this diary book? This will not delete your original entries.')) {
        return;
    }
    
    const diariesKey = `diaries_${appState.currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(diariesKey) || '[]');
    
    console.log('Diaries before delete:', diaries.length);
    
    const filtered = diaries.filter(d => d.id !== diaryId);
    
    console.log('Diaries after delete:', filtered.length);
    
    try {
        localStorage.setItem(diariesKey, JSON.stringify(filtered));
        console.log('Deleted successfully');
    } catch (e) {
        console.error('Error deleting:', e);
        showToast('Error deleting diary', 'error');
        return;
    }
    
    loadDiaries();
    showToast('Diary book deleted', 'success');
}


// DIARY READER - COMPLETE WITH BOOK COVER
let currentDiaryPages = [];
let currentPageIndex = 0;
let currentDiaryColor = '#f5dcd4';

function openDiaryReader(diaryId) {
    console.log('Opening diary:', diaryId);
    
    const diariesKey = `diaries_${appState.currentUser.email}`;
    const diaries = JSON.parse(localStorage.getItem(diariesKey) || '[]');
    const diary = diaries.find(d => d.id === diaryId);
    
    if (!diary) {
        console.error('Diary not found');
        showToast('Diary not found', 'error');
        return;
    }
    
    // Get actual entries from storage using IDs
    const entriesKey = `diary_${appState.currentUser.email}`;
    const allEntries = JSON.parse(localStorage.getItem(entriesKey) || '[]');
    
    // Load full entries by matching IDs
    currentDiaryPages = allEntries.filter(entry => 
        diary.entryIds?.includes(entry.id)
    );
    
    console.log('Loaded', currentDiaryPages.length, 'entries for diary');
    
    if (currentDiaryPages.length === 0) {
        showToast('No entries found in this diary', 'error');
        return;
    }
    
    currentPageIndex = 0;
    currentDiaryColor = diary.color;
    
    // Set up book cover
    const coverFront = document.getElementById('bookCoverFront');
    if (coverFront) {
        coverFront.style.background = `linear-gradient(135deg, ${diary.color} 0%, ${adjustColorBrightness(diary.color, -20)} 100%)`;
    }
    
    document.getElementById('coverTitle').textContent = diary.name;
    document.getElementById('coverInfo').textContent = `${currentDiaryPages.length} entries`;
    document.getElementById('coverDates').textContent = `${new Date(diary.startDate).toLocaleDateString()} - ${new Date(diary.endDate).toLocaleDateString()}`;
    
    // Set spine
    const spine = document.querySelector('.book-spine');
    if (spine) {
        spine.style.background = `linear-gradient(90deg, ${adjustColorBrightness(diary.color, -60)} 0%, ${adjustColorBrightness(diary.color, -40)} 50%, ${adjustColorBrightness(diary.color, -60)} 100%)`;
    }
    
    document.getElementById('spineTitle').textContent = diary.name;
    
    // Reset cover
    const bookCover = document.getElementById('bookCover');
    if (bookCover) {
        bookCover.classList.remove('opened');
    }
    
    document.getElementById('bookControls').style.display = 'none';
    
    // Show reader
    document.getElementById('diaryReader').classList.add('active');
}

function openBookCover() {
    console.log('Opening book cover');
    
    // Animate cover opening
    document.getElementById('bookCover').classList.add('opened');
    
    // Show controls after animation
    setTimeout(() => {
        document.getElementById('bookControls').style.display = 'flex';
        displayCurrentPages();
    }, 1000);
}

function closeDiaryReader() {
    document.getElementById('diaryReader').classList.remove('active');
    currentDiaryPages = [];
    currentPageIndex = 0;
}

function displayCurrentPages() {
    const leftPage = document.getElementById('leftPageContent');
    const rightPage = document.getElementById('rightPageContent');
    const leftNum = document.getElementById('leftPageNumber');
    const rightNum = document.getElementById('rightPageNumber');
    
    console.log('Displaying pages, index:', currentPageIndex, 'total:', currentDiaryPages.length);
    
    // Left page
    if (currentPageIndex < currentDiaryPages.length) {
        const entry = currentDiaryPages[currentPageIndex];
        leftPage.innerHTML = `
            <div class="page-date">${entry.dateFormatted}</div>
            ${entry.content}
        `;
        leftNum.textContent = currentPageIndex + 1;
    } else {
        leftPage.innerHTML = '<p style="text-align: center; opacity: 0.5; margin-top: 50%; font-family: Playfair Display; font-size: 1.5rem;">The End</p>';
        leftNum.textContent = '';
    }
    
    // Right page
    if (currentPageIndex + 1 < currentDiaryPages.length) {
        const entry = currentDiaryPages[currentPageIndex + 1];
        rightPage.innerHTML = `
            <div class="page-date">${entry.dateFormatted}</div>
            ${entry.content}
        `;
        rightNum.textContent = currentPageIndex + 2;
    } else {
        rightPage.innerHTML = '';
        rightNum.textContent = '';
    }
    
    // Update controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
    if (nextBtn) nextBtn.disabled = currentPageIndex >= currentDiaryPages.length - 2;
    
    const indicator = document.getElementById('pageIndicator');
    if (indicator) {
        const endPage = Math.min(currentPageIndex + 2, currentDiaryPages.length);
        indicator.textContent = `Page ${currentPageIndex + 1}-${endPage} of ${currentDiaryPages.length}`;
    }
}

function nextPage() {
    console.log('Next page clicked');
    if (currentPageIndex < currentDiaryPages.length - 2) {
        // Animate page turn
        const rightPage = document.getElementById('rightPage');
        rightPage.style.transition = 'transform 0.6s ease-in-out';
        rightPage.style.transformOrigin = 'left center';
        rightPage.style.transform = 'rotateY(-180deg)';
        
        setTimeout(() => {
            currentPageIndex += 2;
            displayCurrentPages();
            rightPage.style.transition = 'none';
            rightPage.style.transform = 'rotateY(0deg)';
        }, 600);
    }
}

function previousPage() {
    console.log('Previous page clicked');
    if (currentPageIndex > 0) {
        // Animate page turn back
        const leftPage = document.getElementById('leftPage');
        leftPage.style.transition = 'transform 0.6s ease-in-out';
        leftPage.style.transformOrigin = 'right center';
        leftPage.style.transform = 'rotateY(180deg)';
        
        setTimeout(() => {
            currentPageIndex -= 2;
            displayCurrentPages();
            leftPage.style.transition = 'none';
            leftPage.style.transform = 'rotateY(0deg)';
        }, 600);
    }
}

// Helper function to adjust color brightness
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 +
        (B<255?B<1?0:B:255))
        .toString(16).slice(1);
}
