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

async function handleProfileUpdate(e) {
    e.preventDefault();
    const newName = document.getElementById('profileName').value;
    const newPassword = document.getElementById('profileNewPassword').value;
    const quote = document.getElementById('profileQuote').value;
    const writingTime = document.getElementById('profileWritingTime').value;
    const goal = document.getElementById('profileGoal').value;

    try {
        // Build update object
        const updateData = {
            name: newName,
            quote: quote,
            writingTime: writingTime,
            goal: goal
        };
        if (newPassword) updateData.password = newPassword;

        // NOTE: api.js needs updateUserInfo if we want to save this to backend
        // For now, updating local state for immediacy
        Object.assign(appState.currentUser, updateData);
        localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));

        updateUIForLoggedInUser();
        showToast('Profile updated!', 'success');
        loadProfileData();
    } catch (err) {
        console.error(err);
        showToast('Failed to update profile', 'error');
    }
}

function handleProfilePicUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            appState.currentUser.profilePic = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
            loadProfileData();
            updateUIForLoggedInUser();
            showToast('Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

window.loadProfileData = loadProfileData;
window.handleProfileUpdate = handleProfileUpdate;
window.handleProfilePicUpload = handleProfilePicUpload;
