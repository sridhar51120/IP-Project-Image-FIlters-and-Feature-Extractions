$(document).ready(function () {
    $('.btn-load-img-gamma-correction').click(function () {
        var Data = {
            folderName: 'assets/uploads/enhancement/gamma_correction'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/gamma_correction", function (data) {
            //  console.log("Data received:", data);
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
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);
                                $('.gammma-correction-image-collapse').append(data['template']);
                                $('#output-gamma-correction-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.gamma-correction-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['gamm_img']}" id="${data['gamm_img']}" alt="Gamma Correction Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-gamma-correction-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-gamma-correction-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['gamm_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-gamma-correction').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['gamm_img']}`;
                                    a.download = "gamma_correction_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.gamma-correction-user-image').offset().top
                                    }, 1000);
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

$(document).ready(function () {
    $('.btn-load-video-tutorial-gamma-correction').click(function () {
        $.get("/user_tutorial_video/gamma_correction", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#gamma-correction-user-video-tutorial-modal').modal('show');
            $('.gamma-correction-user-video-tutorial-modal-close').click(function () {
                $('#gamma-correction-user-video-tutorial-modal').modal('hide');
                $('#gamma-correction-user-video-tutorial-modal').remove();
                location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-gamma-corrected-python-code').click(function () {
        $('#gamma-corrected-matlab-code').remove();
        let content = `                <div class="container" id="gamma-corrected-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Define the gamma value (adjust as
                            needed)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gamma = 1.5
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Apply gamma correction
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gamma_corrected = np.power(image / 255.0, gamma) * 255.0</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the gamma-corrected image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Gamma Corrected Image', np.uint8(gamma_corrected))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitKey(0)
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllWindows()
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-gamma-corrected-matlab-script-code').click(function () {
        $('#gamma-corrected-python-code').remove();
        let content = `                <div class="container" id="gamma-corrected-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to grayscale (if it's
                            a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Display the original image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>imshow(original_image);</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>title('Original Image');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Define the gamma value (adjust as needed)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gamma = 1.5; </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply gamma correction using
                            imadjust</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gamma_corrected_image = imadjust(original_image, [], [], gamma);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the gamma-corrected
                            image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>imshow(gamma_corrected_image);</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>title('Gamma Corrected Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
