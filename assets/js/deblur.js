$(document).ready(function () {
    $('.btn-load-img-deblur').click(function () {
        var Data = {
            folderName: 'assets/uploads/restoration/deblur'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/deblur", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#deblur-image-modal').modal('show');

            $('#btn-deblur-modal-close').click(function () {
                $('#deblur-image-modal').modal('hide');
                $('#deblur-image-modal').remove();
            });
            const btn_deblur_submit_image = document.getElementById('btn-deblur-input-image-submit');
            $(btn_deblur_submit_image).click(function () {
                const deblur_input_image = document.getElementById('deblur-input-image');
                if (deblur_input_image.files.length > 0) {
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
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/restoring/deblur_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#deblur-image-modal').modal('hide');
                                $('#deblur-image-modal').remove();
                                $('.deblur-image-collapse').append(data['template']);
                                $('#output-deblur-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.deblur-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['deblur_img']}" id="${data['deblur_img']}" alt="Deblured Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-deblur-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-deblur-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['deblur_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-deblur').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['deblur_img']}`;
                                    a.download = "deblur_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.deblur-user-image').offset().top
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
    $('.btn-load-video-tutorial-deblur').click(function () {
        $.get("/user_tutorial_video/deblur", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#deblur-user-video-tutorial-modal').modal('show');
            $('.deblur-user-video-tutorial-modal-close').click(function () {
                $('#deblur-user-video-tutorial-modal').modal('hide');
                $('#deblur-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-deblur-python-code').click(function () {
        $('#deblur-matlab-code').remove();
        let content = `                <div class="container" id="deblur-python-code">
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
                        <code>from skimage import color, data, restoration</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import matplotlib.pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Convert the image to float for
                            deconvolution</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = color.rgb2gray(image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Generate a blurry version of the image (simulating motion blur)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>psf = np.ones((5, 5)) / 25</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image_blurred = cv2.filter2D(image, -1, psf)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Perform Richardson-Lucy deconvolution
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>deconvolved_image, _ = restoration.richardson_lucy(image_blurred, psf, iterations=30)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Blurred Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(image_blurred, cmap='gray')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Deblurred Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(deconvolved_image, cmap='gray')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-deblur-matlab-script-code').click(function () {
        $('deblur-python-code').remove();
        let content = `                <div class="container" id="deblur-matlab-code">
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
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Generate a blurry version of the image
                            (simulating motion blur)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>psf = fspecial('motion', 25, 45); % Creating a motion blur PSF
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>blurred_image = imfilter(gray_image, psf, 'conv', 'circular');
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Perform Richardson-Lucy deconvolution
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>deblurred_image = deconvlucy(blurred_image, psf, 10); % Adjust iterations as needed                        </code>
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
                        <code>subplot(1, 2, 1), imshow(blurred_image), title('Blurred Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(deblurred_image), title('Deblurred Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

