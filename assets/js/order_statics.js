$(document).ready(function () {
    $('.btn-load-img-order-statistic').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/order_statistics_filters'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        // alert("Button clicked");
        $.get("/modals/order_statics", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#order-statics-image-modal').modal('show');

            $('#btn-order-statics-modal-close').click(function () {
                $('#order-statics-image-modal').modal('hide');
                $('#order-statics-image-modal').remove();
            });
            const btn_order_staitcs_submit_image = document.getElementById('btn-order-statics-img-input-image-submit');
            $(btn_order_staitcs_submit_image).click(function () {
                const deblur_input_image = document.getElementById('order-statics-img-input-image');
                if (deblur_input_image.files.length > 0) {
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
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/filter1/Order_statistics_filters_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#order-statics-image-modal').modal('hide');
                                $('#order-statics-image-modal').remove();
                                $('.order-statistic_image_collapse').append(data['template']);
                                $('.output-oreder-statics-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.order-statcies-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Order_statistics']}" id="${data['Order_statistics']}" alt="Ordered Statics Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-oreder-statics-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-oreder-statics-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['Order_statistics']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-oreder-statics').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['Order_statistics']}`;
                                    a.download = "Order_statistics_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.order-statcies-user-image').offset().top
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
    $('.btn-load-video-tutorial-order-statices').click(function () {
        $.get("/user_tutorial_video/order_statics", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#order-statistic-user-video-tutorial-modal').modal('show');
            $('.order-statistic-user-video-tutorial-modal-close').click(function () {
                $('#order-statistic-user-video-tutorial-modal').modal('hide');
                $('#order-statistic-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})
$(document).ready(function () {
    $('#dropdown-order-statics-filter-python-code').click(function () {
        $('#order-statistic-matlab-code').remove();
        let content = `<div class="container" id="order-statistic-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Input Image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>input_image = cv2.imread("input_img.jpg", cv2.IMREAD_GRAYSCALE)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define Kernal size of the
                            image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kernel_size = 5</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Apply Median Blur Operation
                        </span>

                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = cv2.medianBlur(input_image, kernel_size)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Save the file</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imwrite(img_path, filtered_image)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the file using
                            opencv Lib</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow("filtered_image","Output Image")</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitKey(0)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllwindows()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-order-statics-filter-matlab-script-code').click(function () {
        $('#order-statistic-python-code').remove();
        let content = `                <div class="container" id="order-statistic-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale (if
                            it's a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);</code>
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
                            % Apply median filtering
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filter_size = 3;  % Set the size of the filter window (3x3 in this case)
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
                </div>
            `;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})

