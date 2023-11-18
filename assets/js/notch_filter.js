$(document).ready(function () {
    $('.btn-load-img-notch-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/notch_filter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/notch_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#notch-filter-image-modal').modal('show');
            $('#btn-notch-filter-modal-close').click(function () {
                $('#notch-filter-image-modal').modal('hide');
                $('#notch-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-notch-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('notch-input-image');
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
                            url: '/filters2/notch_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#notch-filter-image-modal').modal('hide');
                                $('#notch-filter-image-modal').remove();
                                $('.notch-filter-input-image-collapse').append(data['template']);
                                $('.output-notch-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.notch-filter-user-image').remove();
                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['notch_filter']}" id="${data['notch_filter']}" alt="Notch Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-notch-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-notch-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['notch_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-notch-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['notch_filter']}`;
                                    a.download = "notch_filter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.notch-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-notch-filter').click(function () {
        $.get("/user_tutorial_video/notch_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#notch-filter-user-video-tutorial-modal').modal('show');
            $('.notch-filter-user-video-tutorial-modal-close').click(function () {
                $('#notch-filter-user-video-tutorial-modal').modal('hide');
                $('#notch-filter-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-notch-filter-python-code').click(function () {
        $('#notch-filter-matlab-code').remove();
        let content = `
            <div class="container" id="notch-filter-python-code">
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
                        <code>from matplotlib import pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Input Image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0) </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Fast Fourier Transform
                            (FFT)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f = np.fft.fft2(image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fshift = np.fft.fftshift(f)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Find the center of the image
                        </span>

                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>rows, cols = image.shape</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>crow, ccol = rows // 2, cols // 2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Create a mask with notches at specific
                            frequencies (for example, removing a certain frequency at (100, 100))</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>notch_radius = 30</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fshift[crow - notch_radius:crow + notch_radius, ccol - notch_radius:ccol + notch_radius] = 0</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Apply inverse FFT to get the image in spatial domain
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_ishift = np.fft.ifftshift(fshift)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = np.fft.ifft2(f_ishift)
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = np.abs(filtered_image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the original and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1), plt.imshow(image, cmap='gray'), plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2), plt.imshow(filtered_image, cmap='gray'), plt.title('Notch Filtered Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()</code>
                    </div>
                </div>
            `;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-notch-filter-matlab-script-code').click(function () {
        $('#notch-filter-python-code').remove();
        let content = `<div class="container" id="notch-filter-matlab-code">
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
                        <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Perform FFT on the image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fft_image = fft2(double(gray_image));
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fft_image_shifted = fftshift(fft_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Define the center and the radius for
                            the notch filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_x = size(fft_image_shifted, 2) / 2;
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_y = size(fft_image_shifted, 1) / 2;
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>notch_radius = 20;
                        </code>
                    </div>

                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Define the center and the radius for
                            the notch filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_x = size(fft_image_shifted, 2) / 2;
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_y = size(fft_image_shifted, 1) / 2;
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>notch_radius = 20;
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Create a notch filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>notch_filter = ones(size(fft_image_shifted));
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>notch_filter(center_y-notch_radius:center_y+notch_radius, center_x-notch_radius:center_x+notch_radius) = 0;
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Apply the notch filter in the frequency
                            domain</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_fft_image = fft_image_shifted .* notch_filter;
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Perform Inverse FFT to get the image in
                            the spatial domain</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = ifft2(ifftshift(filtered_fft_image));
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = uint8(abs(filtered_image));
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the notch-filtered image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(filtered_image), title('Notch Filtered Image');
                        </code>
                    </div>
                </div>
            `;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

