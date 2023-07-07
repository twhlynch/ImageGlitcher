file_element = document.getElementById("file");
intensity_element = document.getElementById("intensity");
image_element = document.getElementById("image");
glitch_element = document.getElementById("glitch");
download_element = document.getElementById("download");
choose_file_element = document.getElementById("choose-file");

ctx = image_element.getContext("2d", { willReadFrequently: true });

choose_file_element.addEventListener("click", function (e) {
    file_element.click();
});

file_element.addEventListener("change", function (e) {
    image_element.style.display = "block";
    var file = file_element.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            image_element.width = img.width;
            image_element.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

glitch_element.addEventListener("click", function (e) {
    var file = file_element.files[0];
    var intensity = intensity_element.value;
    if (intensity < 1) {
        intensity = 1;
    }

    const reader = new FileReader();

    reader.onloadend = function (event) {
        const arrayBuffer = event.target.result;
        const byteArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < intensity; i++) {
            var index = Math.floor(Math.random() * byteArray.length);
            byteArray[index] = Math.floor(Math.random() * 255);
        }
        const blob = new Blob([byteArray], { type: "image/png" });
        const url = URL.createObjectURL(blob);          
        var link = document.createElement("a");
        link.download = "image.png";
        link.href = url;
        link.click();
        link.delete;
    };
    reader.readAsArrayBuffer(file);
});