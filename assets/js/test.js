


var formData = new FormData($('#uploadForm')[0]);
$.ajax({
    type: "POST",
    
    url: "/Histogram_Equalization_output",
    data: { imageName : formData},
    dataType: "json",
    success: function (response) {
        console.log("Server response:", response);
    },
    error: function (xhr, status, error) {
        console.log("XHR status:", status);
        console.log("XHR error:", error);
    },
    complete: function (xhr, status) {
        console.log("Request complete. XHR status:", status);
    },
    xhr: function () {
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function (event) {
            if (event.lengthComputable) {
                var percentComplete = (event.loaded / event.total) * 100;
                console.log("Upload progress:", percentComplete + "%");
            }
        }, false);
        return xhr;
    }
});

