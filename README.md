# ⚡ DocFlow — DOCX to PDF Converter

A clean, fast, and mobile-responsive frontend for converting Word documents (`.doc` / `.docx`) to PDF — no sign-up, no file storage, completely private.

**🌐 Live Demo:** [addin-alt.github.io/doc-to-pdf-frontend](https://addin-alt.github.io/doc-to-pdf-frontend/)  
**⚙️ Backend API:** [doc-to-pdf-backend.onrender.com](https://doc-to-pdf-backend.onrender.com)

---

## ✨ Features

- 📂 **Drag & drop** or click-to-browse file selection
- ✅ **Client-side validation** — type checking and 20 MB size limit before upload
- 📊 **Animated progress bar** with real-time percentage updates
- 📱 **Fully responsive** — works great on mobile, tablet, and desktop
- 🔒 **Privacy-first** — files are never stored; processed and deleted instantly
- ⚡ **Auto-download** — the converted PDF downloads automatically on success
- 🎨 **Dark UI** with smooth animations and micro-interactions

---

## 🚀 Getting Started

### Option A — Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/addin-alt/doc-to-pdf-frontend.git

# 2. Navigate into the folder
cd doc-to-pdf-frontend

# 3. Open in browser
# Simply open index.html — no build step required
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option B — Serve with a local dev server (recommended)

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js / npx
npx serve .

# Then visit: http://localhost:8080
```

---

## 📁 Project Structure

```
doc-to-pdf-frontend/
├── index.html      # Main HTML — markup & structure
├── style.css       # All styles — dark theme, animations, responsive layout
├── script.js       # Conversion logic — drag/drop, validation, fetch, download
└── README.md       # Project documentation (you're here!)
```

---

## ⚙️ Configuration

The backend endpoint is defined at the top of `script.js`:

```js
const API_URL = "https://doc-to-pdf-backend.onrender.com/convert";
const MAX_FILE_MB = 20; // Maximum upload size
```

To point to a different backend, update `API_URL` to your server's URL.

---

## 🔌 Backend API

The frontend communicates with a backend that accepts `multipart/form-data` POST requests:

| Method | Endpoint   | Body          | Response                       |
| ------ | ---------- | ------------- | ------------------------------ |
| POST   | `/convert` | `file` (docx) | PDF binary (`application/pdf`) |

**Error handling:** Non-2xx responses are caught and the server's error message (JSON `message` or `error` field) is displayed to the user.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: add your feature description"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 🛠 Tech Stack

| Layer   | Technology                           |
| ------- | ------------------------------------ |
| Markup  | HTML5 (semantic)                     |
| Styles  | CSS3 (custom properties, animations) |
| Logic   | Vanilla JavaScript (ES2020+)         |
| Fonts   | Google Fonts — Sora + JetBrains Mono |
| HTTP    | Fetch API with `FormData`            |
| Hosting | GitHub Pages                         |

---

## 👨‍💻 Developer

<table>
  <tr>
    <td align="center">
      <strong>Al Addin</strong><br/>
      Full-stack developer passionate about building tools that make life easier.<br/><br/>
      <a href="https://github.com/addin-alt">GitHub</a> ·
      <a href="https://linkedin.com/in/addin-alt">LinkedIn</a> ·
      <a href="https://facebook.com/addin-alt">Facebook</a> ·
      <a href="https://instagram.com/addin_alt">Instagram</a>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">© 2026 Al Addin · Built with ❤️ and ☕</p>
