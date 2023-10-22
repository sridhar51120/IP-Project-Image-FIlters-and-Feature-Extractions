$(document).ready(function () {
    $('.btn-load-img-gamma-correction').click(function () {
        $.get("/modals/gamma_correction", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#gamma-correction-image-modal').modal('show');
            $('#btn-gamma-correction-modal-close').click(function () {
                $('#gamma-correction-image-modal').modal('hide');
            });
            const btn_gamma_correction_submit_image = document.getElementById('btn-gamma-correction-input-image-submit');
            $(btn_gamma_correction_submit_image).click(function () {
                const gamma_input_image = document.getElementById('gamma-correction-input-image');
                if (gamma_input_image.files.length > 0) {
                    const fileName = gamma_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#gamma-correction-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Gamma_correction_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('.gammma-correction-image-collapse').append(data['template']);
                                $('#output-gamma-correction-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['gamm_img']}" id="${data['gamm_img']}" alt="Gamma Correction Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-gamma-correction-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-gamma-correction-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['gamm_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
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