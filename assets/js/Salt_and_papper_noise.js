$(document).ready(function () {
    $('.btn-load-img-salt-and-papper-noise').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/salt_and_papper_noise'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                console.error('Request failed:', errorThrown);
            });
        $.get("/modals/salt_and_papper_noise", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#salt-and-papper-noise-image-modal').modal('show');

            $('#btn-salt-and-papper-noise-modal-close').click(function () {
                $('#salt-and-papper-noise-image-modal').modal('hide');
                $('#salt-and-papper-noise-image-modal').remove();
            });

            const submit_image = document.getElementById('btn-salt-and-papper-noise-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('salt-and-papper-noise-input-image');
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
                            url: '/filter1/salt_and_papper_noise_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#salt-and-papper-noise-image-modal').modal('hide');
                                $('#salt-and-papper-noise-image-modal').remove();
                                $('.salt-and-papper-noise_image_collapse').append(data['template']);
                                $('.output-salt-and-papper-noise-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.salt-and-papper-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['salt_and_papper_noise']}" id="${data['salt_and_papper_noise']}" alt="Salt and Papper Noise Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-salt-and-papper-noise-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-salt-and-papper-noise-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['salt_and_papper_noise']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-salt-and-papper-noise').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['salt_and_papper_noise']}`;
                                    a.download = "Salt_and_papper_Noise_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.salt-and-papper-user-image').offset().top
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
    $('.btn-load-video-tutorial-salt-and-pappser-noise').click(function () {
        $.get("/user_tutorial_video/salt_and_papper_noise", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#salt-and-papper-noise-user-video-tutorial-modal').modal('show');
            $('.salt-and-papper-noise-user-video-tutorial-modal-close').click(function () {
                $('#salt-and-papper-noise-user-video-tutorial-modal').modal('hide');
                $('#salt-and-papper-noise-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-salt_and_papper_noise-python-code').click(function () {
        $('#salt_and_papper_noise_matlab_code').remove();
        let content = `            <div class="container" id="salt_and_papper_noise_python_code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Libraies</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import cv2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Check for color image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if len(image.shape) == 3:</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Extract image dimensions</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if len(image.shape) == 2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>row, col = image.shape</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>else:</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>raise ValueError("Invalid image format. Expected grayscale image.")</code>
                </div>

                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Add salt and pepper noise</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>num_salt = np.ceil(amount * image.size * 0.5)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>num_pepper = np.ceil(amount * image.size * 0.5)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Add salt noise</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>salt_coords = [np.random.randint(0, i - 1, int(num_salt)) for i in image.shape]</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image[salt_coords[0], salt_coords[1]] = 255</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Add pepper noise</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>pepper_coords = [np.random.randint(0, i - 1, int(num_pepper)) for i in image.shape]</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image[pepper_coords[0], pepper_coords[1]] = 0</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the noisy image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow('Noisy Image', image)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.waitKey(0)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.destroyAllWindows()</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Save the resulting image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imwrite("noisy_image.png", image)</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);

    })
    $('#dropdown-salt_and_papper_noise-matlab-script-code').click(function () {
        $('#salt_and_papper_noise_python_code').remove();
        let content = `            <div class="container" id="salt_and_papper_noise_matlab_code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span> </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>original_image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale (if it's
                        a color image)</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(original_image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the original image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Introduce salt-and-pepper noise</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>noise_density = 0.05;  % Adjust the noise density (percentage of pixels to be affected)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>noisy_image = imnoise(gray_image, 'salt & pepper', noise_density);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the noisy image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 2), imshow(noisy_image), title('Salt-and-Pepper Noisy Image');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);

    })
})

