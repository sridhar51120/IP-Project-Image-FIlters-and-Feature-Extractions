$(document).ready(function () {
    $('.btn-load-img-constrained-least-square-filtering').click(function () {
        $.get("/modals/constraint_least_square", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#constraine-least-image-modal').modal('show');

            $('#btn-constraine-least-modal-close').click(function () {
                $('#constraine-least-image-modal').modal('hide');
            });
            const btn_constrain_submit_image = document.getElementById('btn-constraine-least-input-image-submit');
            $(btn_constrain_submit_image).click(function () {
                const deblur_input_image = document.getElementById('constraine-least-input-image');
                if (deblur_input_image.files.length > 0) {
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#constraine-least-image-modal').modal('hide');
                        $.ajax({
                            url: '/segmentation/Constrained_least_square_filtering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.constrained-least_image_collapse').append(data['template']);
                                $('#output-constraint-least-toggle-groups').collapse({
                                    toggle: false
                                }).show();
// TODO:
                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['constaint_img']}" id="${data['constaint_img']}" alt="Deblured Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-constraint-least-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-constraint-least-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['constaint_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-constraint-least').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['constaint_img']}`;
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
