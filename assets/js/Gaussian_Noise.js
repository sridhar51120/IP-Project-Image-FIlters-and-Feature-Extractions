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
                            url: '/filter1/Gaussian_noise_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

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
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-gaussian-noise-output-image-show').click(function () {
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
                                // console.log('XHR status:', status);
                                // console.log('XHR error:', error);
                            },
                            complete: function (xhr, status) {
                                // console.log('Request complete. XHR status:', status);
                            }
                        });
                    } else {
                        const alert_msg = `
                        <div class="card bg-primary alert-container-body">
                            <div class="card-body text-center text-dark">
                                Invalid File Extension
                            </div>
                        </div>`
                        $('.alert-container').append(alert_msg);
                        setTimeout(function () {
                            $('.alert-container-body').remove();
                        }, 3000);

                    }
                } else {
                    alert("File Not Selected!");
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
                    <div class="col col-12 d-flex justify-content-start"><span># Convert the image to grayscale (if
                            needed)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
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
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Add the Gaussian noise to the image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = gray_image + gaussian_noise</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Ensure pixel values are within 0-255 range
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = np.clip(noisy_image, 0, 255)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
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
                        <code>imshow(gray_image);</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>title('Original Image');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Define the standard deviation for the Gaussian noise
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>std_dev = 25;  % Adjust the standard deviation as needed for the noise level
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Generate Gaussian noise with the same
                            dimensions as the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noise = std_dev * randn(size(gray_image));
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Add the Gaussian noise to the
                            image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = double(gray_image) + noise; </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the noisy image</span>
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

