async function convertFile() {
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (fileInput.files.length === 0) {
        status.innerText = "Please select a DOCX file.";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    status.innerText = "Converting...";

    try {
        const response = await fetch("https://doc-to-pdf-backend.onrender.com/convert", {
    method: "POST",
    body: formData
});


        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.pdf";
        a.click();

        status.innerText = "Download ready!";
    } catch (error) {
        status.innerText = "Conversion failed.";
    }
}
