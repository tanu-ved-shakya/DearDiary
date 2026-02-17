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

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const result = await api.login(email, password);

        if (result.ok) {
            appState.currentUser = result.data.user;
            updateUIForLoggedInUser();
            showToast(`Welcome back, ${result.data.user.name}!`, 'success');
            window.location.href = 'diary.html';
        } else {
            document.getElementById('loginError').textContent = result.data.msg || 'Invalid email or password';
            document.getElementById('loginError').style.display = 'block';
        }
    } catch (err) {
        console.error(err);
        document.getElementById('loginError').textContent = 'Server connection error';
        document.getElementById('loginError').style.display = 'block';
    }
}

async function handleSignup(e) {
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

    try {
        const result = await api.register(name, email, password);

        if (result.ok) {
            appState.currentUser = result.data.user;
            updateUIForLoggedInUser();
            showToast(`Welcome, ${name}!`, 'success');
            window.location.href = 'diary.html';
        } else {
            errorEl.textContent = result.data.msg || 'Registration failed';
            errorEl.style.display = 'block';
        }
    } catch (err) {
        console.error(err);
        errorEl.textContent = 'Server connection error';
        errorEl.style.display = 'block';
    }
}

window.toggleAuthForm = toggleAuthForm;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
