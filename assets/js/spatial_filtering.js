$(document).ready(function () {
    $('.btn-load-img-spatial-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/enhancement/spatial_filter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/spatial", function (data) {
            $('.modal-content').append(data);
            $('#spatial-image-modal').modal('show');
            $('#btn-spatial-modal-close').click(function () {
                $('#spatial-image-modal').modal('hide');
                $('#spatial-image-modal').remove();
            });
            const btn_spatial_filter_submit_image = document.getElementById('btn-spatial-filter-input-image-submit');
            $(btn_spatial_filter_submit_image).click(function () {
                const spatial_filter_input_image = document.getElementById('spatial-filter-input-image');
                if (spatial_filter_input_image.files.length > 0) {
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
                    const fileName = spatial_filter_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/enhancement/Spatial_filtering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);

                                $('#spatial-image-modal').modal('hide');
                                $('#spatial-image-modal').remove();
                                $('.spatial-filter-input-image-collapse').append(data['template']);
                                $('#output-spatial-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.spatial-filter-user-imager').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['spatial_filter']}" id="${data['spatial_filter']}" alt="Spatial Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-spatial-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-spatial-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['spatial_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-spatial-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['spatial_filter']}`;
                                    a.download = "spatial_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.spatial-filter-user-imager').offset().top
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
    $('.btn-load-video-tutorial-spatial-filter').click(function () {
        $.get("/user_tutorial_video/spatial", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#spatial-filter-user-video-tutorial-modal').modal('show');
            $('.spatial-filter-user-video-tutorial-modal-close').click(function () {
                $('#spatial-filter-user-video-tutorial-modal').modal('hide');
                $('#spatial-filter-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-code-spatial-filter-snippets-python-code').click(function () {
        $('#spatial-filter-matlab').remove();
        let content = `<div class="container" id="spatial-filter-python">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Libraies</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Image File</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread("input_image.jpg")</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define a 3x3 averaging filter
                            kernel</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kernel = np.array([[1, 1, 1],[1, 1, 1],[1, 1, 1]]) / 9</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Perform convolution</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>output_image = cv2.filter2D(input_image, -1, kernel)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define a 3x3 averaging filter
                            kernel</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kernel = np.array([[1, 1, 1],[1, 1, 1],[1, 1, 1]]) / 9</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Save the output image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imwrite("output.jpg", output_image)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define a 3x3 averaging filter
                            kernel</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kernel = np.array([[1, 1, 1],[1, 1, 1],[1, 1, 1]]) / 9</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the output image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow("Filtered Image", output_image)</code>
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
    $('#dropdown-code-spatial-filter-snippets-matlab-code').click(function () {
        $('#spatial-filter-python').remove();
        let content = `<div class="container" id="spatial-filter-matlab">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale
                            (if it's a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(image);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Define Gaussian filter
                            parameters</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filter_size = 5; % Filter size (5x5 in this case)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>sigma = 1; % Standard deviation for Gaussian</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Create Gaussian filter kernel</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gaussian_filter = fspecial('gaussian', [filter_size, filter_size], sigma);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Apply the filter using imfilter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = imfilter(gray_image, gaussian_filter, 'conv');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the original and
                            filtered images</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(filtered_image), title('Gaussian Filtered Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
});

