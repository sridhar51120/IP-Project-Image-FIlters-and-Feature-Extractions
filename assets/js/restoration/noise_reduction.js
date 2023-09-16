$(document).ready(function () {
    $('.btn-load-img-noise-detect').click(function () {
        $.get("/modals/noise_reduction", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#noise-reduction-image-modal').modal('show');
            $('#btn-noise-reduction-modal-close').click(function () {
                $('#noise-reduction-image-modal').modal('hide');
            });
            const btn_noise_submit_image = document.getElementById('btn-noise-img-input-image-submit');
            $(btn_noise_submit_image).click(function () {
                const noise_input_image = document.getElementById('noise-img-input-image');
                if (noise_input_image.files.length > 0) {
                    const fileName = noise_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#noise-reduction-image-modal').modal('hide');
                        $.ajax({
                            url: '/restoring/noise_reduction_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.noise-image-collapse').append(data['template']);
                                $('#output-noise-reduction-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['noise_img']}" id="${data['noise_img']}" alt="Noised Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-noise-reduction-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-noise-reduction-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['noise_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
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
