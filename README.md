# 📝 Smart Notes App (PWA)

A stylish, modern, and light-weight Progressive Web App (PWA) built with pure HTML, CSS, and JavaScript. It supports offline functionality, dark/light theme switching, note pinning, searching, and full installation on Mobile and Desktop devices.

---

## ✨ Features

* **📌 Pin Important Notes:** Keep your most crucial notes at the top of the list.
* **🔍 Instant Search:** Quickly filter and find notes by title or content.
* **🌗 Dark & Light Mode:** Toggle between dark and light themes with preference memory.
* **✏️ Full CRUD Functionality:** Easily Create, Read, Edit, and Delete notes.
* **📱 Progressive Web App (PWA):**
  * Full-screen native app experience on Mobile (Android & iOS).
  * Desktop app window support.
  * Offline capability via Service Worker caching.
* **💾 Local Storage:** All your notes and settings are saved locally on your device.

---

## 📁 File Structure

```text
├── index.html       # App structure and markup
├── style.css        # Responsive styling & theme variables
├── script.js        # App logic, CRUD functions & Service Worker registration
├── manifest.json    # PWA configuration for app installation & shortcuts
└── sw.js            # Service worker for offline caching
