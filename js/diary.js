
// DIARY
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

// FORMATTING
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
