$(document).ready(function () {
    $('.btn-load-img-butter-worth-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/butterworth_filters'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/butterworth_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#butterworth-filter-image-modal').modal('show');
            $('#btn-butterworth-filter-modal-close').click(function () {
                $('#butterworth-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-butterworth-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('butterworth-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#butterworth-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/butterworth_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.butterworth-filter-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-butterworth-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['butterworth_high_pass_filter']}" id="${data['butterworth_high_pass_filter']}" alt="Butter Worth High Pass Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-butterworth-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-butterworth-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['butterworth_high_pass_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-butterworth-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['butterworth_high_pass_filter']}`;
                                    a.download = "butterworth_high_pass_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
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
    $('#dropdown-butterworth-filter-matlab-script-code').click(function () {
        $('#butterworth-filter-python-code').remove();
        let content = `                <div class="container" id="butterworth-filter-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply Fourier Transform</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>f_image = fft2(double(gray_image));
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Define cutoff frequencies and order for
                            the Butterworth filter</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>D0 = 0.1; % lower cutoff frequency
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>D1 = 0.5; % higher cutoff frequency
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>n = 3;    % order of the filter
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Create the Butterworth filter in the frequency domain
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>[m, n] = size(f_image);;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>[u, v] = meshgrid(1:m, 1:n);
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>D = sqrt((u - m/2).^2 + (v - n/2).^2);</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>H = 1 ./ (1 + (D ./ D0).^(2 * n)) .* (1 - 1 ./ (1 + (D ./ D1).^(2 * n)));</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Apply the filter to the Fourier transformed image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = abs(ifft2(f_image .* H));</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Display the original and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(uint8(filtered_image)), title('Butterworth Filtered Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-butterworth-filter-python-code').click(function () {
        $('#butterworth-filter-matlab-code').remove();
        let content = `                <div class="container" id="butterworth-filter-python-code">
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
                        <code>from scipy.signal import butter, freqz, fftconvolve</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import matplotlib.pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Get the size of the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>rows, cols = image.shape
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Create a Butterworth band-pass
                            filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>def butterworth_bandpass_filter(shape, low_cutoff, high_cutoff, order):
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;rows, cols = shape
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;x = np.linspace(-0.5, 0.5, cols)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;y = np.linspace(-0.5, 0.5, rows)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;X, Y = np.meshgrid(x, y)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;D = np.sqrt(X**2 + Y**2)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;H = 1 / (1 + (D * low_cutoff / (D**2 - high_cutoff**2))**(2 * order))
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;return H
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Define the cutoff frequencies and order
                            for the Butterworth filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>low_cutoff = 0.1
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>high_cutoff = 0.5
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>order = 3
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Create the Butterworth filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>butterworth_filter = butterworth_bandpass_filter((rows, cols), low_cutoff, high_cutoff, order)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Apply the filter to the image in the
                            frequency domain</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>fft_image = np.fft.fft2(image)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = np.fft.ifft2(fft_image * butterworth_filter).real
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the original and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(image, cmap='gray')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(filtered_image, cmap='gray')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Butterworth Filtered Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

