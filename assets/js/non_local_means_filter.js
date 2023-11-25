$(document).ready(function () {
    $('.btn-load-img-non-local-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/non_local_means_filters'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/non_local_mean_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#non-local-means-filter-image-modal').modal('show');
            $('#btn-non-local-means-filter-modal-close').click(function () {
                $('#non-local-means-filter-image-modal').modal('hide');
                $('#non-local-means-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-non-local-means-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('non-local-means-input-image');
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
                            url: '/filters2/non_local_mean_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#non-local-means-filter-image-modal').modal('hide');
                                $('#non-local-means-filter-image-modal').remove();
                                $('.non-local-mean-input-image-collapse').append(data['template']);
                                $('.output-non-local-mean-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.non-local-mean-filter-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['non_local_mean']}" id="${data['non_local_mean']}" alt="Non local Mean Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-non-local-mean-filter-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-non-local-mean-filter-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['non_local_mean']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-non-local-mean-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['non_local_mean']}`;
                                    a.download = "non_local_mean_filter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.non-local-mean-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-weiner').click(function () {
        $.get("/user_tutorial_video/weiner_user_tutorial_video", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#weiner-user-video-tutorial-modal').modal('show');
            $('.weiner-user-video-tutorial-modal-close').click(function () {
                $('#weiner-user-video-tutorial-modal').modal('hide');
                $('#weiner-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-non-local-mean-filter-python-code').click(function () {
        $('#non-local-mean-filter-matlab-code').remove();
        let content = `</div>
                <div class="container" id="non-local-mean-filter-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Input Image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Non-Local Means Denoising</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = cv2.fastNlMeansDenoising(image, None, h=3, hForColor=3, templateWindowSize=7, searchWindowSize=21)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the original and denoised images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Original Image', image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('NLM Filtered Image', filtered_image)</code>
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
    $('#dropdown-non-local-mean-filter-matlab-script-code').click(function () {
        $('#non-local-mean-filter-python-code').remove();
        let content = `<div class="container" id="non-local-mean-filter-matlab-code">
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
                            % Apply Non-Local Means Filtering
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = nlfilter(gray_image, [3 3], @(x) mean2((x - mean2(x)).^2));
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the NLM-filtered image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(uint8(filtered_image)), title('NLM Filtered Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

