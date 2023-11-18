$(document).ready(function () {
    $('.btn-load-img-thresholding').click(function () {
        var Data = {
            folderName: 'assets/uploads/segmantation/thresholding'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/thresolding", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#thresolding-image-modal').modal('show');
            $('#btn-thresolding-modal-close').click(function () {
                $('#thresolding-image-modal').modal('hide');
            });
            const btn_thresold_submit_image = document.getElementById('btn-thresolding-input-image-submit');
            $(btn_thresold_submit_image).click(function () {
                const thresold_input_image = document.getElementById('thresolding-input-image');
                if (thresold_input_image.files.length > 0) {
                    const alert_msg = `
                    <div class="toast bg-success alert-container-body" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                        <div class="toast-body">
                            <div class="container">
                                <div class="text-center text-dark ">
                                    <strong class="mr-auto">Processing<br>Please Wait a Few Seconds...</strong>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $('.alert-container').append(alert_msg);
                    $('.alert-container-body').toast('show');
                    const fileName = thresold_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/segmentation/Thresolding_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);

                                $('#thresolding-image-modal').modal('hide');
                                $('#thresolding-image-modal').remove();
                                $('.thresolding-input-image-collapse').append(data['template']);
                                $('#output-thresholding-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.thresholding-user-image').remove();
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
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.thresholding-user-image').offset().top
                                    }, 1000);
                                });
                            },
                            error: function (xhr, status, error) {
                                $('.alert-container-body').remove();
                                const alert_msg = `
                                    <div class="toast bg-primary alert-container-body" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-body">
        <div class="container">
            <div class="text-center text-dark ">
                <strong class="mr-auto">
                    An error occurred during the processing of your image.
                    <br>Please provide another image to receive the output.
                    <br>Your Image Doesn't support our Machine so provide another image to get the to receive the
                    output</strong>
            </div>
        </div>
    </div>
</div>`;
                                $('.alert-container').append(alert_msg);
                                $('.alert-container-body').toast('show');
                                $('.alert-container-body').on('hidden.bs.toast', function () {
                                    $('.alert-container-body').remove();
                                });
                            },
                            complete: function (xhr, status) {
                                // console.log('Request complete. XHR status:', status);
                            }
                        });
                    } else {
                        $('.alert-container-body').remove();
                        const alert_msg = `
                        <div class="toast bg-primary alert-container-body" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-body">
                            <div class="container">
                            <div class="text-center text-dark ">
                            <strong class="mr-auto">Invalid File Extension.<br>Only <.jpg or .png > allowed</strong> 
                            </div>
                        </div>
                            </div>
                        </div>`;
                        $('.alert-container').append(alert_msg);
                        $('.alert-container-body').toast('show');
                        $('.alert-container-body').on('hidden.bs.toast', function () {
                            $('.alert-container-body').remove();
                        });
                    }
                } else {
                    const alert_msg = `
                        <div class="toast bg-primary alert-container-body" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-body">
                            <div class="container">
                            <div class="text-center text-dark ">
                            <strong class="mr-auto">File Not Selected</strong> 
                            </div>
                        </div>
                            </div>
                        </div>`;
                    $('.alert-container').append(alert_msg);
                    $('.alert-container-body').toast('show');
                    $('.alert-container-body').on('hidden.bs.toast', function () {
                        $('.alert-container-body').remove();
                    });
                }
            })
        });
    });
});

$(document).ready(function () {
    $('.btn-load-video-tutorial-thresholding').click(function () {
        $.get("/user_tutorial_video/thresolding", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#threshold-user-video-tutorial-modal').modal('show');
            $('.threshold-user-video-tutorial-modal-close').click(function () {
                $('#threshold-user-video-tutorial-modal').modal('hide');
                $('#threshold-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-threshold-matlab-script-code').click(function () {
        $('#thresholding-python').remove();
        let content = `<div class="container" id="thresholding-matlab">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the
                        image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image
                        to grayscale
                        (if it's a color image)</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Perform simple
                        global thresholding</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>threshold_value = 128;  % Adjust the threshold value as needed</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>thresholded_image = gray_image > threshold_value;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the
                        original and thresholded images</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 2), imshow(thresholded_image), title('Thresholded Image');</code>
                </div>

            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $("#dropdown-threshold-python-code").click(function () {
        $('#thresholding-matlab').remove();
        let content = `<div class="container" id="thresholding-python">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import cv2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Set a threshold value (you can
                        experiment with different values)</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>threshold_value = 128</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply binary thresholding</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>ret, thresholded_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY) </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the thresholded image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_corrected = np.power(image/255.0, gamma)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"></span># Display the image</div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow("Thresholded Image", thresholded_image)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>code': 'cv2.waitKey(0)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.destroyAllWindows()</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
