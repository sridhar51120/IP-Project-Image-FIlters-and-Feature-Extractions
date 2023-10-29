$(document).ready(function () {
    $('.btn-load-img-thresholding').click(function () {
        $.get("/modals/thresolding", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#thresolding-image-modal').modal('show');
            $('#btn-thresolding-modal-close').click(function () {
                $('#thresolding-image-modal').modal('hide');
            });
            const btn_thresold_submit_image = document.getElementById('btn-thresolding-input-image-submit');
            $(btn_thresold_submit_image).click(function () {
                const thresold_input_image = document.getElementById('thresolding-input-image');
                if (thresold_input_image.files.length > 0) {
                    const fileName = thresold_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#thresolding-image-modal').modal('hide');
                        $.ajax({
                            url: '/segmentation/Thresolding_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('.thresolding-input-image-collapse').append(data['template']);
                                $('#output-thresholding-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['thresholding']}" id="${data['thresholding']}" alt="Thresolded Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);
                                $('.btn-thresholding-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-thresholding-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['thresholding']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-thresolding').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['thresholding']}`;
                                    a.download = "thresholding_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                            },
                            error: function (xhr, status, error) {
                                // console.log('XHR status:', status);
                                // console.log('XHR error:', error);
                            },
                            complete: function (xhr, status) {
                                // console.log('Request complete. XHR status:', status);
                            }
                        });
                    } else {
                        const alert_msg = `
                        <div class="card bg-primary">
                            <div class="card-body text-center text-dark">
                                Invalid File Extension
                            </div>
                        </div>`
                        $('.alert-container').append(alert_msg);

                    }
                } else {
                    alert("File Not Selected!");
                }
            })
        });
    });
});
