$(document).ready(function () {
    $('.btn-load-img-contrast-strching').click(function () {
        $.get("/modals/contrast_strching", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#contrast-image-modal').modal('show');

            $('#btn-contrast-modal-close').click(function () {
                $('#contrast-image-modal').modal('hide');
            });
            const btn_contrast_strching_submit_image = document.getElementById('btn-contrast-strching-input-image-submit');
            $(btn_contrast_strching_submit_image).click(function () {
                const contrast_strching_input_image = document.getElementById('contrast-strching-input-image');
                if (contrast_strching_input_image.files.length > 0) {
                    const fileName = contrast_strching_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#contrast-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Contrast_Stretching_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {

                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.contrast-strching-image-collapse').append(data['template']);
                                $('#output-contrast-strching-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['contrast_img']}" id="${data['contrast_img']}" alt="Contrast Strching Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-contrast-strching-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-contrast-strching-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['contrast_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-contrast-strching').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['contrast_img']}`;
                                    a.download = "contrast_img.jpg";
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
