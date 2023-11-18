$(document).ready(function () {
    $('.btn-load-img-contrast-strching').click(function () {
        var Data = {
            folderName: 'assets/uploads/enhancement/contrast_strching'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/contrast_strching", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#contrast-image-modal').modal('show');

            $('#btn-contrast-modal-close').click(function () {
                $('#contrast-image-modal').modal('hide');
                $('#contrast-image-modal').remove();
            });
            const btn_contrast_strching_submit_image = document.getElementById('btn-contrast-strching-input-image-submit');
            $(btn_contrast_strching_submit_image).click(function () {
                const contrast_strching_input_image = document.getElementById('contrast-strching-input-image');
                if (contrast_strching_input_image.files.length > 0) {
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
                    const fileName = contrast_strching_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/enhancement/Contrast_Stretching_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {

                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);
                                $('#contrast-image-modal').modal('hide');
                                $('#contrast-image-modal').remove();
                                $('.contrast-strching-image-collapse').append(data['template']);
                                $('#output-contrast-strching-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.contrast-streching-user-image').remove();

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
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.contrast-streching-user-image').offset().top
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
    $('.btn-load-video-tutorial-contrast-strching').click(function () {
        $.get("/user_tutorial_video/contrast_strching", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#contrast-strching-user-video-tutorial-modal').modal('show');
            $('.contrast-strching-user-video-tutorial-modal-close').click(function () {
                $('#contrast-strching-user-video-tutorial-modal').modal('hide');
                $('#contrast-strching-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-contrast-strching-python-code').click(function () {
        $('#contrast-stretched-matlab-code').remove();
        let content = `                <div class="container" id="contrast-stretched-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import matplotlib.pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define the minimum and maximum
                            intensity values after stretching</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>min_intensity = 50  # Adjust as needed
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>max_intensity = 200  # Adjust as needed
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Apply contrast stretching
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>stretched_image = np.copy(image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>stretched_image[image < min_intensity] = min_intensity</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>stretched_image[image > max_intensity] = max_intensity
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>stretched_image = cv2.normalize(stretched_image, None, 0, 255, cv2.NORM_MINMAX)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the original and contrast-stretched images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1), plt.imshow(image, cmap='gray'), plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2), plt.imshow(stretched_image, cmap='gray'), plt.title('Contrast-Stretched Image')
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()
                            </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-contrast-strching-matlab-script-code').click(function () {
        $('#contrast-stretched-python-code').remove();
        let content = `                <div class="container" id="contrast-stretched-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale (if
                            it's
                            a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Define the minimum and maximum
                            intensity values after stretching</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>min_intensity = 50; % Adjust as needed
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>max_intensity = 200; % Adjust as needed
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Apply contrast stretching using imadjust
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>stretched_image = imadjust(gray_image, [min_intensity/255, max_intensity/255], []);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Display the images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(stretched_image), title('Contrast-Stretched Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
