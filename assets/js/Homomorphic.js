$(document).ready(function () {
    $('.btn-load-img-homomarphic-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/homomarphic'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/homomarphic_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#homomarphic-filter-image-modal').modal('show');
            $('#btn-homomarphic-filter-modal-close').click(function () {
                $('#homomarphic-filter-image-modal').modal('hide');
                $('#homomarphic-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-homomarphic-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('homomarphic-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#homomarphic-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/homomarphic_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.homomarphic-filter-input-image-collapse').append(data['template']);
                                $('.output-homomarphic-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.homomorphic-filter-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['homomorphic_filter']}" id="${data['homomorphic_filter']}" alt="HomoMarphic Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-homomarphic-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-homomarphic-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['homomorphic_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-homomarphic-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['homomorphic_filter']}`;
                                    a.download = "homomorphic_filter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.homomorphic-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-homomarphic-filter').click(function () {
        $.get("/user_tutorial_video/homomarphic_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#homomorphic-user-video-tutorial-modal').modal('show');
            $('.homomorphic-user-video-tutorial-modal-close').click(function () {
                $('#homomorphic-user-video-tutorial-modal').modal('hide');
                $('#homomorphic-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})
$(document).ready(function () {
    $('#dropdown-homomarphic-filter-filter-python-code').click(function () {
        $('#homomarphic-filter-matlab-code').remove();
        let content = ` <div class="container" id="homomarphic-filter-python-code">
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
                    <code>input_image = 'input_image.jpg' </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>output_image = 'output_image.jpg'</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cutoff_freq_low = 10</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cutoff_freq_high = 60</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_l = 0.3</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_h = 1.5
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Convert to float32 for further
                        processing</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> img_float = np.float32(img)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Log-transform
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> img_log = np.log1p(img_float)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Apply Discrete Fourier Transform
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> dft = cv2.dft(img_log, flags=cv2.DFT_COMPLEX_OUTPUT)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Shift the zero frequency components to the center
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft_shift = np.fft.fftshift(dft)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Create a mask
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>  rows, cols = img.shape</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>  crow, ccol = rows // 2, cols // 2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>mask = np.zeros((rows, cols, 2), np.uint8) </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>mask[crow - cutoff_freq_low:crow + cutoff_freq_low, ccol - cutoff_freq_low:ccol + cutoff_freq_low] = 1 </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>mask[crow - cutoff_freq_high:crow + cutoff_freq_high, ccol - cutoff_freq_high:ccol + cutoff_freq_high] = 0</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Apply the mask
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> dft_shift_filtered = dft_shift * mask</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Shift the zero frequency components back to the corner
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft_shift_filtered = np.fft.ifftshift(dft_shift_filtered)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Inverse DFT
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img_filtered = cv2.idft(dft_shift_filtered, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Exponential transformation
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img_filtered = np.expm1(img_filtered)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> img_filtered = np.uint8(np.round(img_filtered))</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Apply gamma correction
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img_filtered = cv2.pow(img_filtered / 255.0, gamma_h)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img_filtered = np.uint8(img_filtered * 255.0)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Save the filtered image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imwrite(output_image,img_filtered)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Display the filtered image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow('Homomorphic Filtered Image', filtered_image)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.waitKey(0)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.destroyAllWindows()</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-homomarphic-filter-filter-matlab-script-code').click(function () {
        $('#homomarphic-filter-python-code').remove();
        let content = `                <div class="container" id="homomarphic-filter-matlab-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>input_image = imread('your_image.jpg');  % Replace 'your_image.jpg' with the path to your image
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Display the original image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(input_image);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Original Image');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to double precision
                        for processing</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>input_image = im2double(input_image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Parameters for homomorphic filtering
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cutoff_freq_low = 10;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cutoff_freq_high = 60;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_l = 0.3;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_h = 1.5;
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert image to log domain</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>log_image = log(1 + input_image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Apply Fourier Transform</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>fft_image = fft2(log_image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Center the FFT</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>fft_image_shifted = fftshift(fft_image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Create a Gaussian high-pass
                        filter</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>[m, n] = size(fft_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>[X, Y] = meshgrid(1:n, 1:m);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>center_x = floor(n / 2);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>center_y = floor(m / 2);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gaussian_filter = exp(-((X - center_x).^2 + (Y - center_y).^2) / (2 * cutoff_freq_high^2));
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gaussian_filter = 1 - gaussian_filter;
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Apply the high-pass filter</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>fft_image_filtered = fft_image_shifted .* gaussian_filter;
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Inverse FFT</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>filtered_image = ifft2(ifftshift(fft_image_filtered));
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Exponential to revert back from
                        log</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>filtered_image = exp(filtered_image) - 1;
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Apply gamma correction</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>filtered_image = filtered_image .^ gamma_h;
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to the original
                        range</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>filtered_image = im2uint8(filtered_image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Display the filtered image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(filtered_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Homomorphic Filtered Image');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Save the filtered image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imwrite(filtered_image, 'homomorphic_filtered_image.jpg');  % Save the filtered image to a file
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

