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
            });
            const submit_image = document.getElementById('btn-dft-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('dft-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#dft-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters3/descrete_forier_trasnform_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.discrete-fourier-transform-image-collapse').append(data['template']);
                                data['template']
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
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-dft-filter-output-image-show').click(function () {
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
                                // console.log('XHR status:', status);
                                // console.log('XHR error:', error);
                            },
                            complete: function (xhr, status) {
                                // console.log('Request complete. XHR status:', status);
                            }
                        });
                    } else {
                        const alert_msg = `
                        <div class="card bg-primary">
                            <div class="card-body text-center text-dark">
                                Invalid File Extension
                            </div>
                        </div>`
                        $('.alert-container').append(alert_msg);

                    }
                } else {
                    alert("File Not Selected!");
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
                <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span>
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
                <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Apply Discrete Fourier Transform
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
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Compute the magnitude spectrum (logarithmic scale for visualization)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>magnitude_spectrum = 20 * np.log(cv2.magnitude(dft_shift[:, :, 0], dft_shift[:, :, 1]))
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
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
                <div class="col col-12 d-flex justify-content-start"><span>% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Compute the Discrete Fourier Transform
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
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Compute the magnitude spectrum (logarithmic scale for visualization)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>magnitude_spectrum = log(1 + abs(dft_shift));
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
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
