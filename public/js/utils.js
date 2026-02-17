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

window.showToast = showToast;
window.escapeHtml = escapeHtml;
window.checkStorageUsage = checkStorageUsage;
