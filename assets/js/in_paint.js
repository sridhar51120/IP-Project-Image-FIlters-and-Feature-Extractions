$(document).ready(function () {
    $('.btn-load-img-inpaint-img').click(function () {
        $.get("/modals/inpaint", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#inpaint-image-modal').modal('show');
            $('#btn-inpaint-modal-close').click(function () {
                $('#inpaint-image-modal').modal('hide');
            });
            const btn_inpaint_submit_image = document.getElementById('btn-inpaint-input-image-submit');
            $(btn_inpaint_submit_image).click(function () {
                const inpaint_input_image = document.getElementById('inpaint-input-image');
                if (inpaint_input_image.files.length > 0) {
                    const fileName = inpaint_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#inpaint-image-modal').modal('hide');
                        $.ajax({
                            url: '/restoring/in_paint_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.inpaint-image-collapse').append(data['template']);
                                $('#output-inpainting-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['inpaint_img']}" id="${data['inpaint_img']}" alt="inpainted Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-clustering-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-clustering-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['inpaint_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-inpaint-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['inpaint_img']}`;
                                    a.download = "inpaint_img.jpg";
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