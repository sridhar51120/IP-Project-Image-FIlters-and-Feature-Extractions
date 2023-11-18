$(document).ready(function () {
    $('.btn-load-img-meadian-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/median_filter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/median_filter", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#median-filter-image-modal').modal('show');

            $('#btn-median-filter-modal-close').click(function () {
                $('#median-filter-image-modal').modal('hide');
                $('#median-filter-image-modal').remove();
            });

            const submit_image = document.getElementById('btn-median-filter-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('median-filter-input-image');
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
                            url: '/filter1/median_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#median-filter-image-modal').modal('hide');
                                $('#median-filter-image-modal').remove();
                                $('.meadian-filter_image_collapse').append(data['template']);
                                $('.output-median-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.medial-filter-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['median_img']}" id="${data['median_img']}" alt="Median Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-medial-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-medial-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['median_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-medial-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['median_img']}`;
                                    a.download = "Median_Filter_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.medial-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-median-filter').click(function () {
        $.get("/user_tutorial_video/median_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#median-filter-user-video-tutorial-modal').modal('show');
            $('.median-filter-user-video-tutorial-modal-close').click(function () {
                $('#median-filter-user-video-tutorial-modal').modal('hide');
                $('#median-filter-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-median-filter-python-code').click(function () {
        $('#non-local-mean-filter-matlab-code').remove();
        let content = `                <div class="container" id="median-filter-python-code">
            <div class="mb-1"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>import cv2</code>
            </div>
            <div class="mb-3"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Input Image</span></div>
            <div class="col col-12 d-flex justify-content-start">
                <code>image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)</code>
            </div>
            <div class="mb-3"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply the median filter</span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>filtered_image = cv2.medianBlur(image, kernel_size)
                </code>
            </div>
            <div class="mb-3"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                    # Display the original and filtered images
                </span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>cv2.imshow(f"Median Filtered Image (Kernel Size = {kernel_size})", filtered_image)</code>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>cv2.waitKey(0)</code>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>cv2.destroyAllWindows()</code>
            </div>
            <div class="mb-3"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                    # Save the resulting image
                </span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>cv2.imwrite(filtered_img_path, filtered_image)</code>
            </div>
        </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-median-filter-matlab-script-code').click(function () {
        $('#median-filter-python-code').remove();
        let content = `                <div class="container" id="median-filter-matlab-code">
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
                    % Apply median filtering for noise reduction
                </span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>filter_size = 3; % Define the size of the median filter window (3x3 in this case)
                    </code>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>filtered_image = medfilt2(gray_image, [filter_size, filter_size]);
                </code>
            </div>
            <div class="mb-3"></div>
            <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the median-filtered
                    image</span>
            </div>
            <div class="col col-12 d-flex justify-content-start">
                <code>subplot(1, 2, 2), imshow(filtered_image), title('Median Filtered Image');
                </code>
            </div>
        </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
