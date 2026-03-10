// Doc2PDF — script.js

var API_BASE = "https://doc-to-pdf-backend.onrender.com";
var API_URL  = API_BASE + "/convert";
var MAX_MB   = 20;
var selectedFile = null;
var isConverting = false;

// ─── Wire up events on DOM ready ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {

  // File input change
  document.getElementById("fileInput").addEventListener("change", function () {
    if (this.files && this.files.length > 0) {
      handleFile(this.files[0]);
    }
  });

  // Drag & drop
  var dz = document.getElementById("dropZone");

  dz.addEventListener("dragover", function (e) {
    e.preventDefault();
    dz.classList.add("drag-over");
  });

  dz.addEventListener("dragleave", function (e) {
    if (!dz.contains(e.relatedTarget)) {
      dz.classList.remove("drag-over");
    }
  });

  dz.addEventListener("drop", function (e) {
    e.preventDefault();
    dz.classList.remove("drag-over");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

});

// ─── Browse button — called by inline onclick ─────────────────────────────────
function openFilePicker() {
  document.getElementById("fileInput").click();
}

// ─── Remove file — called by inline onclick ───────────────────────────────────
function clearFile() {
  if (isConverting) return;
  selectedFile = null;
  document.getElementById("fileInput").value = "";
  document.getElementById("emptyState").style.display = "";
  document.getElementById("fileState").style.display  = "none";
  document.getElementById("convertBtn").disabled      = true;
  hideStatus();
  hideProgress();
}

// ─── Handle selected/dropped file ────────────────────────────────────────────
function handleFile(file) {
  var ext = file.name.split(".").pop().toLowerCase();

  if (ext !== "doc" && ext !== "docx") {
    showStatus("❌ Only .doc and .docx files are supported.", "error");
    return;
  }

  if (file.size > MAX_MB * 1024 * 1024) {
    showStatus("❌ File too large — max " + MAX_MB + " MB.", "error");
    return;
  }

  selectedFile = file;
  document.getElementById("fileName").textContent     = file.name;
  document.getElementById("fileSize").textContent     = fmtSize(file.size);
  document.getElementById("emptyState").style.display = "none";
  document.getElementById("fileState").style.display  = "flex";
  document.getElementById("convertBtn").disabled      = false;

  hideStatus();
  hideProgress();
}

// ─── Convert — called by inline onclick ──────────────────────────────────────
function convertFile() {
  if (!selectedFile || isConverting) return;
  doConvert();
}

async function doConvert() {
  isConverting = true;
  setBusy(true);
  hideStatus();

  try {
    // Step 1: Wake up the server (Render free tier spins down after inactivity)
    showStatus("⏳ Waking up server, please wait…", "info");
    setProgress(5);

    try {
      var wakeResp = await fetchWithTimeout(API_BASE, 25000);
      // We don't care about the response, just that the server is alive
    } catch (wakeErr) {
      // Server might not have a root route — that's fine, keep going
    }

    // Step 2: Send file
    showStatus("📤 Uploading your document…", "info");
    setProgress(20);

    var form = new FormData();
    form.append("file", selectedFile);

    setProgress(40);

    var response = await fetchWithTimeout(API_URL, 120000, {
      method: "POST",
      body: form
    });

    setProgress(75);

    // Step 3: Handle response
    if (!response.ok) {
      var errMsg = "Server error (" + response.status + ")";
      try {
        var ct = response.headers.get("content-type") || "";
        if (ct.indexOf("json") !== -1) {
          var errJson = await response.json();
          errMsg = errJson.message || errJson.error || errMsg;
        } else {
          var errText = await response.text();
          if (errText && errText.length < 200) errMsg = errText;
        }
      } catch (e) { /* ignore */ }
      throw new Error(errMsg);
    }

    // Step 4: Read blob
    showStatus("📥 Processing PDF…", "info");
    setProgress(90);

    var blob = await response.blob();

    if (!blob || blob.size === 0) {
      throw new Error("Server returned an empty file. Please try again.");
    }

    setProgress(100);

    // Step 5: Download
    var dlUrl  = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href     = dlUrl;
    anchor.download = selectedFile.name.replace(/\.docx?$/i, ".pdf") || "converted.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setTimeout(function () { URL.revokeObjectURL(dlUrl); }, 2000);

    showStatus("✅ Done! Your PDF download has started.", "success");
    setTimeout(function () {
      clearFile();
      hideProgress();
    }, 4000);

  } catch (err) {
    var msg = "Conversion failed. Please try again.";

    if (!err) {
      msg = "Unknown error. Please try again.";
    } else if (err.name === "TimeoutError") {
      msg = "⏱ Request timed out. The server may be busy — please try again in a moment.";
    } else if (err.name === "TypeError" || err.message === "Failed to fetch") {
      msg = "Cannot reach the server. Check your internet connection.";
    } else if (err.message) {
      msg = err.message;
    }

    showStatus("❌ " + msg, "error");
    hideProgress();

  } finally {
    isConverting = false;
    setBusy(false);
  }
}

// ─── Fetch with timeout helper ────────────────────────────────────────────────
function fetchWithTimeout(url, ms, options) {
  options = options || {};
  var controller = new AbortController();
  var timer = setTimeout(function () {
    controller.abort();
  }, ms);

  return fetch(url, Object.assign({}, options, { signal: controller.signal }))
    .then(function (res) {
      clearTimeout(timer);
      return res;
    })
    .catch(function (err) {
      clearTimeout(timer);
      if (err.name === "AbortError") {
        var e = new Error("Request timed out.");
        e.name = "TimeoutError";
        throw e;
      }
      throw err;
    });
}

// ─── UI helpers ──────────────────────────────────────────────────────────────
function setBusy(on) {
  var btn     = document.getElementById("convertBtn");
  var label   = document.getElementById("btnLabel");
  var arrow   = document.getElementById("btnArrow");
  var spinner = document.getElementById("btnSpinner");

  label.style.display   = on ? "none" : "";
  arrow.style.display   = on ? "none" : "";
  spinner.style.display = on ? ""     : "none";
  btn.disabled          = on ? true   : (selectedFile === null);
}

function showStatus(text, type) {
  var el = document.getElementById("statusMsg");
  el.textContent   = text;
  el.className     = "status-msg " + (type || "");
  el.style.display = "";
}

function hideStatus() {
  document.getElementById("statusMsg").style.display = "none";
}

function setProgress(pct) {
  document.getElementById("progressRow").style.display = "";
  document.getElementById("progressFill").style.width  = pct + "%";
  document.getElementById("progressPct").textContent   = pct + "%";
}

function hideProgress() {
  document.getElementById("progressRow").style.display = "none";
  document.getElementById("progressFill").style.width  = "0%";
  document.getElementById("progressPct").textContent   = "0%";
}

function fmtSize(bytes) {
  if (bytes < 1024)        return bytes + " B";
  if (bytes < 1048576)     return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
}