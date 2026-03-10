/**
 * DocFlow — DOCX to PDF Converter
 * script.js
 *
 * Features:
 *  - Drag-and-drop file upload
 *  - File validation (type + size)
 *  - Animated progress bar
 *  - Proper error messages
 *  - Auto-triggers download on success
 */

const API_URL = "https://doc-to-pdf-backend.onrender.com/convert";
const MAX_FILE_MB = 20;

// ── DOM Refs ──────────────────────────────────────────────────────────────────
const fileInput    = document.getElementById("fileInput");
const dropZone     = document.getElementById("dropZone");
const dropInner    = document.getElementById("dropInner");
const fileSelected = document.getElementById("fileSelected");
const fileNameEl   = document.getElementById("fileName");
const fileSizeEl   = document.getElementById("fileSize");
const clearBtn     = document.getElementById("clearBtn");
const convertBtn   = document.getElementById("convertBtn");
const statusWrap   = document.getElementById("statusWrap");
const statusMsg    = document.getElementById("statusMsg");
const progressWrap = document.getElementById("progressWrap");
const progressFill = document.getElementById("progressFill");
const progressLabel= document.getElementById("progressLabel");
const btnText      = convertBtn.querySelector(".btn-text");
const btnArrow     = convertBtn.querySelector(".btn-arrow");
const btnSpinner   = convertBtn.querySelector(".btn-spinner");

// ── State ─────────────────────────────────────────────────────────────────────
let selectedFile = null;

// ── File Input Change ─────────────────────────────────────────────────────────
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) handleFile(fileInput.files[0]);
});

// ── Clear Button ──────────────────────────────────────────────────────────────
clearBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  resetFile();
});

// ── Drag & Drop ───────────────────────────────────────────────────────────────
dropZone.addEventListener("click", (e) => {
  // Don't open file picker when clicking clear button
  if (e.target === clearBtn || clearBtn.contains(e.target)) return;
  if (!selectedFile) fileInput.click();
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", (e) => {
  if (!dropZone.contains(e.relatedTarget)) {
    dropZone.classList.remove("drag-over");
  }
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drag-over");
  const dt = e.dataTransfer;
  if (dt.files.length > 0) handleFile(dt.files[0]);
});

// ── Handle File ───────────────────────────────────────────────────────────────
function handleFile(file) {
  // Validate type
  const allowed = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const ext = file.name.split(".").pop().toLowerCase();

  if (!allowed.includes(file.type) && !["doc", "docx"].includes(ext)) {
    showStatus("Only .doc and .docx files are supported.", "error");
    return;
  }

  // Validate size
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    showStatus(`File is too large. Maximum size is ${MAX_FILE_MB} MB.`, "error");
    return;
  }

  selectedFile = file;

  // Update UI
  fileNameEl.textContent = file.name;
  fileSizeEl.textContent = formatFileSize(file.size);
  dropInner.style.display    = "none";
  fileSelected.style.display = "flex";
  convertBtn.disabled        = false;
  hideStatus();
  hideProgress();
}

// ── Reset File ────────────────────────────────────────────────────────────────
function resetFile() {
  selectedFile = null;
  fileInput.value = "";
  dropInner.style.display    = "";
  fileSelected.style.display = "none";
  convertBtn.disabled        = true;
  hideStatus();
  hideProgress();
}

// ── Convert ───────────────────────────────────────────────────────────────────
async function convertFile() {
  if (!selectedFile) return;

  setConverting(true);
  showStatus("Uploading your document…", "info");
  showProgress(10);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    showProgress(30);

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    showProgress(70);

    if (!response.ok) {
      // Try to get error message from server
      let errMsg = `Server error (${response.status})`;
      try {
        const errData = await response.json();
        if (errData.message || errData.error) {
          errMsg = errData.message || errData.error;
        }
      } catch (_) { /* ignore parse errors */ }
      throw new Error(errMsg);
    }

    // Check content type
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("pdf")) {
      // If server returns JSON error even on 200
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        throw new Error(data.message || data.error || "Unexpected server response.");
      } catch (_) {
        // Not JSON — treat as PDF bytes anyway
      }
    }

    showProgress(90);

    const blob = await response.blob();

    // Validate blob is actually a PDF
    if (blob.size === 0) {
      throw new Error("Received an empty file. Please try again.");
    }

    showProgress(100);

    // Trigger download
    const url = window.URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = selectedFile.name.replace(/\.docx?$/i, ".pdf") || "converted.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showStatus("✅ PDF downloaded successfully!", "success");

    // Reset after success
    setTimeout(() => {
      resetFile();
      hideProgress();
    }, 3000);

  } catch (err) {
    console.error("Conversion error:", err);

    let message = "Conversion failed. Please try again.";
    if (err.message) message = err.message;
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      message = "Could not reach the server. Check your connection.";
    }

    showStatus("❌ " + message, "error");
    hideProgress();
  } finally {
    setConverting(false);
  }
}

// ── UI Helpers ────────────────────────────────────────────────────────────────
function setConverting(loading) {
  convertBtn.disabled = loading;
  if (loading) {
    btnText.style.display    = "none";
    btnArrow.style.display   = "none";
    btnSpinner.style.display = "flex";
  } else {
    btnText.style.display    = "";
    btnArrow.style.display   = "";
    btnSpinner.style.display = "none";
    // Re-enable only if a file is selected
    convertBtn.disabled = !selectedFile;
  }
}

function showStatus(msg, type) {
  statusMsg.textContent  = msg;
  statusMsg.className    = "status-msg " + (type || "");
  statusWrap.style.display = "";
}

function hideStatus() {
  statusWrap.style.display = "none";
}

function showProgress(pct) {
  progressWrap.style.display = "";
  progressFill.style.width   = pct + "%";
  progressLabel.textContent  = pct + "%";
}

function hideProgress() {
  progressWrap.style.display = "none";
  progressFill.style.width   = "0%";
  progressLabel.textContent  = "0%";
}

function formatFileSize(bytes) {
  if (bytes < 1024)       return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}