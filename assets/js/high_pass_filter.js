$(document).ready(function () {
    $('.btn-load-img-high-pass-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/highpassFilter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/high_pass_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#high-pass-filter-image-modal').modal('show');
            $('#btn-high-pass-filter-modal-close').click(function () {
                $('#high-pass-filter-image-modal').modal('hide');
                $('#high-pass-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-high-pass-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('high-pass-input-image');
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
                            url: '/filters2/high_pass_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#high-pass-filter-image-modal').modal('hide');
                                $('#high-pass-filter-image-modal').remove();
                                $('.high-pass-filter-input-image-collapse').append(data['template']);
                                $('.output-high-pass-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.high-pass-filter-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['high_pass_filter']}" id="${data['high_pass_filter']}" alt="High Pass Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-high-pass-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-high-pass-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['high_pass_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-high-pass-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['high_pass_filter']}`;
                                    a.download = "high_pass_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.high-pass-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-high-pass-fiilter').click(function () {
        $.get("/user_tutorial_video/high_pass_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#high-pass-user-video-tutorial-modal').modal('show');
            $('.high-pass-user-video-tutorial-modal-close').click(function () {
                $('#high-pass-user-video-tutorial-modal').modal('hide');
                $('#high-pass-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-high-passfilter-python-code').click(function () {
        $('#high-pass-filter-matlab-code').remove();
        let content = `
            <div class="container" id="high-pass-filter-python-code">
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
                        <code>from matplotlib import pyplot as plt
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Perform Fourier Transform</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_transform = np.fft.fft2(image)
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_shift = np.fft.fftshift(f_transform)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Get image dimensions
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>rows, cols = image.shape</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>crow, ccol = rows // 2, cols // 2
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Create a high-pass filter mask
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>d = 30  # Adjust the cutoff distance for high-pass filter</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>mask = np.ones((rows, cols), np.uint8)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>mask[crow - d:crow + d, ccol - d:ccol + d] = 0
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Apply high-pass filter by multiplying the Fourier Transform with the mask
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_shift_filtered = f_shift * mask</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Perform Inverse Fourier Transform
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_ishift = np.fft.ifftshift(f_shift_filtered)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = np.fft.ifft2(f_ishift)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = np.abs(filtered_image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the original and high-pass filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1), plt.imshow(image, cmap='gray'), plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2), plt.imshow(filtered_image, cmap='gray'), plt.title('High-Pass Filtered Image')
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
    $('#dropdown-high-passfilter-matlab-script-code').click(function () {
        $('#high-pass-filter-python-code').remove();
        let content = `                <div class="container" id="high-pass-filter-matlab-code">
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
                        <code>subplot(1, 3, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Perform Fast Fourier Transform (FFT) to work in the frequency domain
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fft_image = fft2(double(gray_image));
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Find the size of the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>[M, N] = size(fft_image);
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_x = fix(M / 2);
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>center_y = fix(N / 2);
                        </code>
                    </div>

                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Create a high-pass filter (for example,
                            a notch filter with 1s in the corners)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cutoff = 30; % Adjust the cutoff frequency
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>high_pass = ones(M, N);
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>high_pass(center_x - cutoff:center_x + cutoff, center_y - cutoff:center_y + cutoff) = 0;
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Apply the high-pass filter in the
                            frequency domain</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fft_filtered = fft_image .* high_pass;
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Perform the Inverse Fourier Transform
                            to obtain the image in the spatial domain</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = ifft2(fft_filtered);
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = abs(filtered_image);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the filtered image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 3, 3), imshow(filtered_image, []), title('High-Pass Filtered Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})


