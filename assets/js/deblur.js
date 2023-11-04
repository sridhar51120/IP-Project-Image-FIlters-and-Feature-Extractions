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
            });
            const btn_deblur_submit_image = document.getElementById('btn-deblur-input-image-submit');
            $(btn_deblur_submit_image).click(function () {
                const deblur_input_image = document.getElementById('deblur-input-image');
                if (deblur_input_image.files.length > 0) {
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#deblur-image-modal').modal('hide');
                        $.ajax({
                            url: '/restoring/deblur_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.deblur-image-collapse').append(data['template']);
                                $('#output-deblur-toggle-groups').collapse({
                                    toggle: false
                                }).show();

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
    $('#dropdown-deblur-python-code').click(function () {
        $('#deblur-matlab-code').remove();
        let content = `                <div class="container" id="deblur-python-code">
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
                        <code>from skimage import color, data, restoration</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import matplotlib.pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Convert the image to float for
                            deconvolution</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = color.rgb2gray(image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
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
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Perform Richardson-Lucy deconvolution
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>deconvolved_image, _ = restoration.richardson_lucy(image_blurred, psf, iterations=30)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
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
                    <div class="col col-12 d-flex justify-content-start"><span>% Generate a blurry version of the image
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
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Perform Richardson-Lucy deconvolution
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>deblurred_image = deconvlucy(blurred_image, psf, 10); % Adjust iterations as needed                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
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

