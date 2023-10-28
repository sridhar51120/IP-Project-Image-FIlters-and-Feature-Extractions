$(document).ready(function () {
    $('.btn-load-img-gaussian-noise').click(function () {
        // alert("Button clicked");
        $.get("/modals/Gaussian_Noise", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#gaussian-noise-image-modal').modal('show');

            $('#btn-gaussian-noise-modal-close').click(function () {
                $('#gaussian-noise-image-modal').modal('hide');
            });

            const submit_image = document.getElementById('btn-gaussian-noise-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('gaussian-noise-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#gaussian-noise-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters/Gaussian_noise_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.gaussian_input_image_collapse').append(data['template']);
                                $('.gaussian-noise-image-modal').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Gaussian_noise']}" id="${data['Gaussian_noise']}" alt="Gaussian Noise Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-gaussian-noise-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-gaussian-noise-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['Gaussian_noise']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-gaussian-noise').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['Gaussian_noise']}`;
                                    a.download = "Gaussian_Noise_img.jpg";
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
