$(document).ready(function () {
    $('.btn-load-img-dft-imag-load').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/dft'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/dft", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#dft-image-modal').modal('show');
            $('#btn-dft-modal-close').click(function () {
                $('#dft-image-modal').modal('hide');
                $('#dft-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-dft-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('dft-input-image');
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
                            url: '/filters3/descrete_forier_trasnform_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#dft-image-modal').modal('hide');
                                $('#dft-image-modal').remove();
                                $('.discrete-fourier-transform-image-collapse').append(data['template']);
                                $('.output-dft-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.dft-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['dft_output_img']}" id="${data['dft_output_img']}" alt="DFT Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-dft-filter-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-dft-filter-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['dft_output_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-dft-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['dft_output_img']}`;
                                    a.download = "dft_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.dft-user-image').offset().top
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
    $('.btn-load-video-tutorial-dft').click(function () {
        $.get("/user_tutorial_video/dft", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#dft-user-video-tutorial-modal').modal('show');
            $('.dft-user-video-tutorial-modal-close').click(function () {
                $('#dft-user-video-tutorial-modal').modal('hide');
                $('#dft-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-d-f-t-python-code').click(function () {
        $('#dft-matlab-code').remove();
        let content = `                <div class="container" id="dft-python-code">
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
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Discrete Fourier Transform
                        (DFT)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft_shift = np.fft.fftshift(dft)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Compute the magnitude spectrum (logarithmic scale for visualization)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>magnitude_spectrum = 20 * np.log(cv2.magnitude(dft_shift[:, :, 0], dft_shift[:, :, 1]))
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Display the original image and its DFT magnitude spectrum
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.figure(figsize=(10, 5))
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.subplot(1, 2, 1)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.imshow(image, cmap='gray')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.title('Input Image')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.axis('off')
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-d-f-t-matlab-script-code').click(function () {
        $('#dft-python-code').remove();
        let content = `                <div class="container" id="dft-matlab-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Compute the Discrete Fourier Transform
                        (DFT)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft = fft2(double(gray_image));
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dft_shift = fftshift(dft);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Compute the magnitude spectrum (logarithmic scale for visualization)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>magnitude_spectrum = log(1 + abs(dft_shift));
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Display the original image and its DFT magnitude spectrum
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(gray_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Input Image');
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(magnitude_spectrum, []);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('DFT Magnitude Spectrum');</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>colormap('gray');
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})
