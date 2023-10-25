$(document).ready(function () {
    $('.btn-load-img-deblur').click(function () {
        $.get("/modals/deblur", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#deblur-image-modal').modal('show');

            $('#btn-deblur-modal-close').click(function () {
                $('#deblur-image-modal').modal('hide');
            });
            const btn_deblur_submit_image = document.getElementById('btn-deblur-input-image-submit');
            $(btn_deblur_submit_image).click(function () {
                const deblur_input_image = document.getElementById('deblur-input-image');
                if (deblur_input_image.files.length > 0) {
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#deblur-image-modal').modal('hide');
                        $.ajax({
                            url: '/restoring/deblur_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.deblur-image-collapse').append(data['template']);
                                $('#output-deblur-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['deblur_img']}" id="${data['deblur_img']}" alt="Deblured Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-deblur-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-deblur-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['deblur_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-deblur').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['deblur_img']}`;
                                    a.download = "deblur_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                            },
                            error: function (xhr, status, error) {
                                console.log('XHR status:', status);
                                console.log('XHR error:', error);
                            },
                            complete: function (xhr, status) {
                                console.log('Request complete. XHR status:', status);
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
