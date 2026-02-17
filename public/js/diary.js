
// ==========================================
// DIARY.JS — Original formatting preserved + all missing functions added
// ==========================================

// DIARY DATE & GREETING
function updateJournalDate() {
    const dateEl = document.getElementById('journalDate');
    const greetingEl = document.getElementById('journalGreeting');
    if (!dateEl || !greetingEl) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dateEl.textContent = dateStr;

    const greetings = ["What's in your heart today?", "Welcome to your safe space", "Your thoughts matter"];
    greetingEl.textContent = greetings[Math.floor(Math.random() * greetings.length)];
}

// TAB SWITCHING
function switchDiaryTab(tab) {
    const writeTab = document.getElementById('writeTab');
    const viewTab = document.getElementById('viewTab');
    const buttons = document.querySelectorAll('.tab-btn');

    buttons.forEach(btn => btn.classList.remove('active'));

    if (tab === 'write') {
        writeTab.style.display = 'block';
        viewTab.style.display = 'none';
        buttons[0].classList.add('active');
        updateJournalDate();
    } else {
        writeTab.style.display = 'none';
        viewTab.style.display = 'block';
        buttons[1].classList.add('active');
        loadDiaryEntries();
    }
}

// ==========================================
// FORMATTING — Original working code preserved exactly
// ==========================================

function changeFont() {
    const select = document.getElementById('fontSelect');
    const editor = document.getElementById('diaryEditor');
    const fonts = {
        dancing: "'Dancing Script', cursive",
        caveat: "'Caveat', cursive",
        indie: "'Indie Flower', cursive",
        shadows: "'Shadows Into Light', cursive"
    };
    editor.style.fontFamily = fonts[select.value];
    appState.formatting.font = select.value;
}

function changeFontSize() {
    const slider = document.getElementById('sizeSlider');
    const size = slider.value;
    document.getElementById('sizeDisplay').textContent = size + 'px';
    appState.formatting.size = parseInt(size);

    // Apply to selection
    const editor = document.getElementById('diaryEditor');
    editor.focus();
    document.execCommand('fontSize', false, '7'); // Use command first

    // Then override with custom size
    const fontElements = editor.querySelectorAll('font[size="7"]');
    fontElements.forEach(el => {
        el.removeAttribute('size');
        el.style.fontSize = size + 'px';
    });
}

function changeFontWeight() {
    const slider = document.getElementById('weightSlider');
    const editor = document.getElementById('diaryEditor');
    const weight = slider.value;
    editor.style.fontWeight = weight;
    appState.formatting.weight = parseInt(weight);
}

function changeTextColor() {
    const color = document.getElementById('colorInput').value;
    document.execCommand('foreColor', false, color);
    appState.formatting.color = color;
}

function toggleFormat(type) {
    const editor = document.getElementById('diaryEditor');
    editor.focus();

    const commands = {
        bold: 'bold',
        italic: 'italic',
        underline: 'underline'
    };

    document.execCommand(commands[type], false, null);

    // Toggle button visual state
    const btn = document.getElementById(`${type}Btn`);
    const isActive = document.queryCommandState(commands[type]);

    if (isActive) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function toggleHighlight() {
    const editor = document.getElementById('diaryEditor');
    editor.focus();

    const btn = document.getElementById('highlightBtn');
    const selection = window.getSelection();

    if (!selection.rangeCount) return;

    if (btn.classList.contains('active')) {
        // Remove highlight
        document.execCommand('removeFormat', false, null);
        btn.classList.remove('active');
    } else {
        // Add highlight
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = '#ffeb3b';
        span.style.padding = '2px 4px';
        span.style.borderRadius = '3px';

        try {
            range.surroundContents(span);
            btn.classList.add('active');
        } catch (e) {
            // Fallback to execCommand
            document.execCommand('hiliteColor', false, '#ffeb3b');
            btn.classList.add('active');
        }
    }
}

// ==========================================
// IMAGE UPLOAD & COMPRESSION
// ==========================================

async function compressImage(base64Str, maxWidth = 800, maxHeight = 800) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
    });
}

function handleImageUpload(e) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const editor = document.getElementById('diaryEditor');

    Array.from(files).forEach(function (file) {
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = async function (event) {
            const compressedBase64 = await compressImage(event.target.result);

            const img = document.createElement('img');
            img.src = compressedBase64;
            img.style.maxWidth = '100%';
            img.style.borderRadius = '8px';
            img.style.margin = '10px 0';
            img.style.display = 'block';

            // Insert at cursor position or append
            insertAtCursor(img, editor);

            showToast('Image added and compressed', 'success');
        };
        reader.readAsDataURL(file);
    });

    // Reset input so same file can be re-selected
    e.target.value = '';
}

function insertAtCursor(node, editor) {
    editor.focus();
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && editor.contains(selection.getRangeAt(0).commonAncestorContainer)) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(node);

        // Move cursor after the inserted node
        const newRange = document.createRange();
        newRange.setStartAfter(node);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);

        // Save this new range for subsequent insertions (like emojis)
        savedRange = newRange.cloneRange();
    } else {
        editor.appendChild(node);
    }
}

// ==========================================
// EMOJI PICKER
// ==========================================

// emojiData is defined in app.js

var emojiPickerOpen = false;
var savedRange = null;

// Track cursor position precisely
document.addEventListener('selectionchange', function () {
    var editor = document.getElementById('diaryEditor');
    if (document.activeElement === editor) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0).cloneRange();
        }
    }
});

function toggleEmojiPicker() {
    var picker = document.getElementById('emojiPicker');
    if (!picker) return;

    emojiPickerOpen = !emojiPickerOpen;
    picker.style.display = emojiPickerOpen ? 'block' : 'none';

    if (emojiPickerOpen) {
        // Default to smileys category
        var grid = document.getElementById('emojiGrid');
        if (grid && window.emojiData) {
            grid.innerHTML = window.emojiData.smileys.map(function (emoji) {
                return '<span class="emoji-item" onclick="insertEmoji(\'' + emoji + '\')">' + emoji + '</span>';
            }).join('');
        }
    }
}

function showEmojiCategory(category) {
    const grid = document.getElementById('emojiGrid');
    if (!grid || !window.emojiData || !window.emojiData[category]) return;

    // Update active category button
    const buttons = document.querySelectorAll('.emoji-category-btn');
    buttons.forEach(function (btn) { btn.classList.remove('active'); });

    // Find the button that was clicked (based on the emoji it contains)
    const categoryIcons = { smileys: '😊', nature: '🌸', objects: '⚡', symbols: '❤️' };
    buttons.forEach(btn => {
        if (btn.innerText === categoryIcons[category]) btn.classList.add('active');
    });

    grid.innerHTML = window.emojiData[category].map(function (emoji) {
        return `<span class="emoji-item" onclick="insertEmoji('${emoji}')">${emoji}</span>`;
    }).join('');
}

function insertEmoji(emoji) {
    var editor = document.getElementById('diaryEditor');
    editor.focus();

    // Restore selection if we have it within the editor
    var sel = window.getSelection();
    if (savedRange && editor.contains(savedRange.commonAncestorContainer)) {
        sel.removeAllRanges();
        sel.addRange(savedRange);
    }

    // Insert emoji
    document.execCommand('insertText', false, emoji);

    // Update saved range after insertion
    if (sel.rangeCount > 0) {
        savedRange = sel.getRangeAt(0).cloneRange();
    }
}

// Close emoji picker when clicking outside
document.addEventListener('click', function (e) {
    var picker = document.getElementById('emojiPicker');
    var container = document.querySelector('.emoji-picker-container');
    if (picker && container && !container.contains(e.target) && emojiPickerOpen) {
        emojiPickerOpen = false;
        picker.style.display = 'none';
    }
});

// IMAGE RESIZING & ALIGNMENT
// ==========================================
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && document.getElementById('diaryEditor').contains(e.target)) {
        showImageResizer(e.target);
    } else if (!e.target.closest('#imageResizerControl')) {
        hideImageResizer();
    }
});

function showImageResizer(img) {
    hideImageResizer(); // Clear existing

    var resizer = document.createElement('div');
    resizer.id = 'imageResizerControl';
    resizer.style.cssText = 'position: absolute; background: white; padding: 12px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.2); z-index: 1000; display: flex; flex-direction: column; gap: 12px; border: 1px solid var(--mauve, #c9a0dc); min-width: 200px;';

    // Position near the image
    var rect = img.getBoundingClientRect();
    resizer.style.top = (window.scrollY + rect.bottom + 10) + 'px';
    resizer.style.left = (window.scrollX + rect.left) + 'px';

    // Size Slider
    var sliderContainer = document.createElement('div');
    sliderContainer.style.cssText = 'display: flex; align-items: center; gap: 10px; width: 100%;';

    var label = document.createElement('span');
    label.innerText = 'Size:';
    label.style.cssText = 'font-weight: 600; font-size: 0.85rem;';

    var slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '10';
    slider.max = '100';
    var parentWidth = img.parentElement.offsetWidth;
    var currentWidth = (img.offsetWidth / parentWidth) * 100;
    slider.value = currentWidth || 50;
    slider.style.flex = '1';

    slider.oninput = function () {
        img.style.width = this.value + '%';
        img.style.maxWidth = '100%';
    };

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);

    // Alignment Buttons
    var alignContainer = document.createElement('div');
    alignContainer.style.cssText = 'display: flex; gap: 8px; justify-content: center; border-top: 1px solid #eee; pt: 8px; margin-top: 4px; padding-top: 8px;';

    const alignments = [
        { icon: '⬅️', val: 'left' },
        { icon: '↔️', val: 'center' },
        { icon: '➡️', val: 'right' }
    ];

    alignments.forEach(align => {
        var btn = document.createElement('button');
        btn.innerText = align.icon;
        btn.style.cssText = 'border: 1px solid #ddd; background: #fff; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 1rem;';
        btn.onclick = function () {
            if (align.val === 'center') {
                img.style.display = 'block';
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
            } else if (align.val === 'left') {
                img.style.display = 'block';
                img.style.marginLeft = '0';
                img.style.marginRight = 'auto';
            } else {
                img.style.display = 'block';
                img.style.marginLeft = 'auto';
                img.style.marginRight = '0';
            }
        };
        alignContainer.appendChild(btn);
    });

    var deleteBtn = document.createElement('button');
    deleteBtn.innerText = '🗑️';
    deleteBtn.style.cssText = 'background: #fff; border: 1px solid #ffcfcf; border-radius: 6px; cursor: pointer; font-size: 1rem; padding: 5px 10px; margin-left: auto;';
    deleteBtn.onclick = function () {
        img.remove();
        hideImageResizer();
    };
    alignContainer.appendChild(deleteBtn);

    resizer.appendChild(sliderContainer);
    resizer.appendChild(alignContainer);
    document.body.appendChild(resizer);

    resizer.addEventListener('mousedown', function (e) { e.stopPropagation(); });
}

function hideImageResizer() {
    var existing = document.getElementById('imageResizerControl');
    if (existing) existing.remove();
}

// ==========================================
// SAVE / LOAD / CLEAR DIARY ENTRIES
// ==========================================

async function saveDiaryEntry() {
    if (!appState.currentUser) {
        var modal = document.getElementById('loginPromptModal');
        if (modal) {
            modal.classList.add('show');
        } else {
            showToast('Please log in to save your progress', 'error');
        }
        return;
    }

    var editor = document.getElementById('diaryEditor');
    var content = editor.innerHTML.trim();

    if (!content || content === '<br>' || content === '<div><br></div>') {
        showToast('Please write something before saving', 'error');
        return;
    }

    var editingId = editor.dataset.editingId;

    try {
        if (editingId) {
            await api.updateEntry(editingId, content, null);
            showToast('Entry updated successfully', 'success');

            delete editor.dataset.editingId;
            var saveBtn = document.querySelector('.diary-actions .btn');
            if (saveBtn) saveBtn.textContent = 'Save Entry';
        } else {
            await api.createEntry(content, null);
            showToast('New entry saved to your journal', 'success');
        }

        loadDiaryEntries();

        // Clear editor without the "Editor cleared" alert during save
        editor.innerHTML = '';
        delete editor.dataset.editingId;
        var saveBtn = document.querySelector('.diary-actions .btn');
        if (saveBtn) saveBtn.textContent = 'Save Entry';

    } catch (e) {
        console.error('Save error:', e);
        showToast('Failed to save entry', 'error');
    }
}

async function loadDiaryEntries() {
    if (!appState.currentUser) {
        var viewTab = document.getElementById('viewTab');
        if (viewTab) {
            viewTab.innerHTML = '<div style="text-align: center; padding: 3rem;">' +
                '<p style="font-family: \'Playfair Display\', serif; font-size: 1.3rem; color: var(--brown, #4a2f2f);">Please log in to view your journal</p>' +
                '<button class="btn" onclick="window.location.href=\'auth.html\'" style="margin-top: 1rem;">Log In</button>' +
                '</div>';
        }
        return;
    }

    let entries = [];
    try {
        entries = await api.getEntries();
        window.currentEntries = entries;
    } catch (e) {
        console.error('Failed to load entries', e);
        showToast('Unable to fetch entries', 'error');
        return;
    }

    var viewTab = document.getElementById('viewTab');
    if (!viewTab) return;

    if (entries.length === 0) {
        viewTab.innerHTML = '<div style="text-align: center; padding: 3rem; background: white; border-radius: 25px; border: 2px dashed var(--mauve, #c9a0dc);">' +
            '<p style="font-family: \'Playfair Display\', serif; font-size: 1.3rem; color: var(--brown, #4a2f2f); margin-bottom: 0.5rem;">No entries yet</p>' +
            '<p style="color: var(--text-dark, #333); opacity: 0.7;">Write your first entry to begin your journey.</p>' +
            '</div>';
        return;
    }

    var html = '<div class="entries-search" style="margin-bottom: 1rem;">' +
        '<input type="text" id="entrySearchInput" placeholder="Search your thoughts..." ' +
        'oninput="filterEntries(this.value)" ' +
        'style="width: 100%; padding: 10px 16px; border: 2px solid var(--mauve, #c9a0dc); border-radius: 15px; font-family: \'Raleway\', sans-serif; font-size: 1rem; outline: none; background: white;">' +
        '</div>' +
        '<div id="entriesList">';

    entries.forEach(function (entry) {
        html += renderEntryCard(entry);
    });

    html += '</div>';
    viewTab.innerHTML = html;
}

function renderEntryCard(entry) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = entry.content;
    var previewText = tempDiv.textContent || tempDiv.innerText || '';
    var preview = previewText.substring(0, 150) + (previewText.length > 150 ? '...' : '');

    var editedBadge = entry.lastEdited
        ? '<span style="font-size: 0.75rem; opacity: 0.6; margin-left: 8px;">✏️ updated</span>'
        : '';

    return '<div class="entry-card" id="entry-' + entry.id + '" style="background: white; border-radius: 20px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-left: 4px solid var(--mauve, #c9a0dc); transition: transform 0.2s, box-shadow 0.2s;">' +
        '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">' +
        '<div style="font-family: \'Playfair Display\', serif; font-size: 0.95rem; color: var(--brown, #4a2f2f); font-weight: 600;">' +
        entry.dateFormatted + editedBadge +
        '</div>' +
        '<div style="display: flex; gap: 6px;">' +
        '<button onclick="editEntry(\'' + entry.id + '\')" title="Edit" style="background: none; border: 1px solid var(--mauve, #c9a0dc); border-radius: 8px; padding: 4px 10px; cursor: pointer; font-size: 0.85rem;">✏️ Edit</button>' +
        '<button onclick="confirmDeleteEntry(\'' + entry.id + '\')" title="Delete" style="background: none; border: 1px solid #e57373; border-radius: 8px; padding: 4px 10px; cursor: pointer; font-size: 0.85rem; color: #e57373;">🗑️</button>' +
        '</div></div>' +
        '<div style="font-family: \'Dancing Script\', cursive; font-size: 1.1rem; color: var(--text-dark, #333); line-height: 1.6; cursor: pointer;" onclick="expandEntry(\'' + entry.id + '\')">' +
        preview +
        '</div></div>';
}

function filterEntries(searchText) {
    if (!appState.currentUser) return;

    var entries = window.currentEntries || [];
    var entriesList = document.getElementById('entriesList');

    if (!entriesList) return;

    var query = searchText.toLowerCase().trim();

    if (!query) {
        var html = '';
        entries.forEach(function (entry) { html += renderEntryCard(entry); });
        entriesList.innerHTML = html;
        return;
    }

    var filtered = entries.filter(function (entry) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = entry.content;
        var text = (tempDiv.textContent || '').toLowerCase();
        var date = (entry.dateFormatted || '').toLowerCase();
        return text.indexOf(query) !== -1 || date.indexOf(query) !== -1;
    });

    if (filtered.length === 0) {
        entriesList.innerHTML = '<div style="text-align: center; padding: 2rem; opacity: 0.6;"><p>No matches for "' + escapeHtml(searchText) + '"</p></div>';
    } else {
        var html = '';
        filtered.forEach(function (entry) { html += renderEntryCard(entry); });
        entriesList.innerHTML = html;
    }
}

function expandEntry(entryId) {
    if (!appState.currentUser) return;

    var entries = window.currentEntries || [];
    var entry = entries.find(function (e) { return e.id == entryId; });

    if (!entry) return;

    var existingModal = document.getElementById('entryModal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'entryModal';
    modal.className = 'modal show';
    modal.style.cssText = 'display: flex;';

    modal.innerHTML = '<div class="modal-content" style="max-width: 700px; padding: 2.5rem;">' +
        '<button onclick="document.getElementById(\'entryModal\').remove()" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #999;">✕</button>' +
        '<div style="font-family: \'Playfair Display\', serif; font-size: 1.1rem; color: var(--brown, #4a2f2f); margin-bottom: 1rem; font-weight: 600;">' + entry.dateFormatted + '</div>' +
        '<div style="font-family: \'Dancing Script\', cursive; font-size: 1.2rem; line-height: 1.8; color: #333;">' + entry.content + '</div>' +
        '</div>';

    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
}

function clearDiaryEditor() {
    var editor = document.getElementById('diaryEditor');
    if (editor) {
        if (editor.innerHTML.trim() !== '') {
            editor.innerHTML = '';
            delete editor.dataset.editingId;
            var saveBtn = document.querySelector('.diary-actions .btn');
            if (saveBtn) saveBtn.textContent = 'Save Entry';
            showToast('Journal editor cleared', 'info');
        }
    }
}

function editEntry(entryId) {
    if (!appState.currentUser) return;

    var entries = window.currentEntries || [];
    var entry = entries.find(function (e) { return e.id == entryId; });

    if (!entry) {
        showToast('Entry not found', 'error');
        return;
    }

    switchDiaryTab('write');

    var editor = document.getElementById('diaryEditor');
    editor.innerHTML = entry.content;
    editor.dataset.editingId = entryId;

    var saveBtn = document.querySelector('.diary-actions .btn');
    if (saveBtn) saveBtn.textContent = 'Update Entry';

    editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    editor.focus();
}

function confirmDeleteEntry(entryId) {
    var existingModal = document.getElementById('confirmDeleteModal');
    if (existingModal) existingModal.remove();

    var modal = document.createElement('div');
    modal.id = 'confirmDeleteModal';
    modal.className = 'modal show';
    modal.style.cssText = 'display: flex;';

    modal.innerHTML = '<div class="modal-content" style="max-width: 400px; text-align: center;">' +
        '<div style="font-size: 3rem; margin-bottom: 0.5rem;">🗑️</div>' +
        '<h3 style="font-family: \'Playfair Display\', serif; color: var(--brown, #4a2f2f); margin-bottom: 0.5rem;">Delete Entry?</h3>' +
        '<p style="color: #666; margin-bottom: 1.5rem; font-size: 0.95rem;">This action cannot be undone.</p>' +
        '<div style="display: flex; gap: 10px; justify-content: center;">' +
        '<button onclick="document.getElementById(\'confirmDeleteModal\').remove()" class="btn-secondary btn">Cancel</button>' +
        '<button onclick="deleteEntry(\'' + entryId + '\'); document.getElementById(\'confirmDeleteModal\').remove();" class="btn" style="background: #e57373;">Delete</button>' +
        '</div></div>';

    modal.addEventListener('click', function (e) {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
}

// INIT
window.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    updateJournalDate();
});

// Attach functions to window for global access
window.updateJournalDate = updateJournalDate;
window.switchDiaryTab = switchDiaryTab;
window.changeFont = changeFont;
window.changeFontSize = changeFontSize;
window.changeTextColor = changeTextColor;
window.toggleFormat = toggleFormat;
window.toggleHighlight = toggleHighlight;
window.handleImageUpload = handleImageUpload;
window.toggleEmojiPicker = toggleEmojiPicker;
window.showEmojiCategory = showEmojiCategory;
window.insertEmoji = insertEmoji;
window.saveDiaryEntry = saveDiaryEntry;
window.loadDiaryEntries = loadDiaryEntries;
window.clearDiaryEditor = clearDiaryEditor;
window.editEntry = editEntry;
window.confirmDeleteEntry = confirmDeleteEntry;
window.deleteEntry = deleteEntry;
window.expandEntry = expandEntry;
window.filterEntries = filterEntries;
window.closeDiaryReader = () => document.getElementById('diaryReader').classList.remove('show');

