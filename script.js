let notes = JSON.parse(localStorage.getItem('smart_notes')) || [];
let editId = null;

const titleInput = document.getElementById('note-title');
const contentInput = document.getElementById('note-content');
const saveBtn = document.getElementById('save-btn');
const notesContainer = document.getElementById('notes-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Save or Update Note
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title && !content) return;

  if (editId !== null) {
    notes = notes.map(n => n.id === editId ? { ...n, title, content } : n);
    editId = null;
    saveBtn.textContent = 'Note Save Karein';
  } else {
    const newNote = {
      id: Date.now(),
      title,
      content,
      pinned: false
    };
    notes.unshift(newNote);
  }

  saveToStorage();
  clearInput();
  renderNotes();
});

function renderNotes(filterText = '') {
  notesContainer.innerHTML = '';
  
  // Sort: Pinned notes pehle aayein
  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  const filtered = sortedNotes.filter(n => 
    n.title.toLowerCase().includes(filterText.toLowerCase()) || 
    n.content.toLowerCase().includes(filterText.toLowerCase())
  );

  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = `note-card ${note.pinned ? 'pinned' : ''}`;
    card.innerHTML = `
      <div class="note-header">
        <span>${note.title || 'Untitled'}</span>
        <button class="icon-btn" onclick="togglePin(${note.id})">${note.pinned ? '📌' : '📍'}</button>
      </div>
      <div class="note-body">${note.content}</div>
      <div class="note-actions">
        <button class="icon-btn" onclick="editNote(${note.id})">✏️</button>
        <button class="icon-btn" onclick="deleteNote(${note.id})">🗑️</button>
      </div>
    `;
    notesContainer.appendChild(card);
  });
}

function togglePin(id) {
  notes = notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n);
  saveToStorage();
  renderNotes(searchInput.value);
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (note) {
    titleInput.value = note.title;
    contentInput.value = note.content;
    editId = id;
    saveBtn.textContent = 'Update Note';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveToStorage();
  renderNotes(searchInput.value);
}

function clearInput() {
  titleInput.value = '';
  contentInput.value = '';
}

function saveToStorage() {
  localStorage.setItem('smart_notes', JSON.stringify(notes));
}

searchInput.addEventListener('input', (e) => renderNotes(e.target.value));

// Theme Control
themeToggle.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Load Theme & Notes
if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}
renderNotes();
