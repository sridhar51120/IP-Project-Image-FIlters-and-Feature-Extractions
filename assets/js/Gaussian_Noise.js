$(document).ready(function () {
    $('.btn-load-img-gaussian-noise').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/gaussian_filter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        // alert("Button clicked");
        $.get("/modals/Gaussian_Noise", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#gaussian-noise-image-modal').modal('show');

            $('#btn-gaussian-noise-modal-close').click(function () {
                $('#gaussian-noise-image-modal').modal('hide');
                $('#gaussian-noise-image-modal').remove();
            });

            const submit_image = document.getElementById('btn-gaussian-noise-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('gaussian-noise-input-image');
                if (input_image.files.length > 0) {
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
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/filter1/Gaussian_noise_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('#gaussian-noise-image-modal').modal('hide');
                                $('#gaussian-noise-image-modal').remove();
                                $('.gaussian_input_image_collapse').append(data['template']);
                                $('.output-gaussian-noise-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.gaussian-noise-user-image').remove();
                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Gaussian_noise']}" id="${data['Gaussian_noise']}" alt="Gaussian Noise Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-gaussian-noise-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-gaussian-noise-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['Gaussian_noise']}`), {
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
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.gaussian-noise-user-image').offset().top
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
    $('.btn-load-video-tutorial-gaussian').click(function () {
        $.get("/user_tutorial_video/Gaussian_Noise", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#gaussian-noise-user-video-tutorial-modal').modal('show');
            $('.gaussian-noise-user-video-tutorial-modal-close').click(function () {
                $('#gaussian-noise-user-video-tutorial-modal').modal('hide');
                $('#gaussian-noise-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-gaussian-noise-python-code').click(function () {
        $('#gaussian-noise-matlab-code').remove();
        let content = `                <div class="container" id="gaussian-noise-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Convert the image to grayscale (if
                            needed)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Generate Gaussian noise
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>mean = 0</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>std_dev = 25 # Adjust the standard deviation as needed for the noise level</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gaussian_noise = np.random.normal(mean, std_dev, gray_image.shape)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Add the Gaussian noise to the image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = gray_image + gaussian_noise</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Ensure pixel values are within 0-255 range
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = np.clip(noisy_image, 0, 255)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the noisy image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Noisy Image', np.uint8(noisy_image))</code>
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
    $('#dropdown-gaussian-noise-matlab-script-code').click(function () {
        $('#gaussian-noise-python-code').remove();
        let content = `                <div class="container" id="gaussian-noise-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale (if it's
                            a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Display the original image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>imshow(gray_image);</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>title('Original Image');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Define the standard deviation for the Gaussian noise
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>std_dev = 25;  % Adjust the standard deviation as needed for the noise level
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Generate Gaussian noise with the same
                            dimensions as the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noise = std_dev * randn(size(gray_image));
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Add the Gaussian noise to the
                            image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = double(gray_image) + noise; </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the noisy image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>imshow(uint8(noisy_image));</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>title('Noisy Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

