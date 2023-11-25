$(document).ready(function () {
    $('.btn-load-img-average-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/average_filters'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/average_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#average-filter-image-modal').modal('show');
            $('#btn-average-filter-modal-close').click(function () {
                $('#average-filter-image-modal').modal('hide');
                $('#average-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-average-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('average-filter-input-image');
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
                            url: '/filters2/average_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('#average-filter-image-modal').modal('hide');
                                $('#average-filter-image-modal').remove();
                                $('.average-filter-input-image-collapse').append(data['template']);
                                $('.output-average-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();
                                $('.average-filter-user-input-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Average_filter']}" id="${data['Average_filter']}" alt="Average Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-average-filter-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-average-filter-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['Average_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-average-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['Average_filter']}`;
                                    a.download = "average_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.average-filter-user-input-image').offset().top
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
    $('.btn-load-video-tutorial-average-filter').click(function () {
        $.get("/user_tutorial_video/average_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#average-user-video-tutorial-modal').modal('show');
            $('.average-user-video-tutorial-modal-close').click(function () {
                $('#average-user-video-tutorial-modal').modal('hide');
                $('#average-user-video-tutorial-modal').remove();
                location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-average-filter-python-code').click(function () {
        $('#average-filter-matlab-code').remove();
        let content = `                <div class="container" id="average-filter-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define the kernel size for the average
                            filter (adjust as needed)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kernel_size = (5, 5)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply the average filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = cv2.blur(image, kernel_size)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the original and filtered
                            images</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Original Image', image)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Average Filtered Image', filtered_image)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitKey(0)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllWindows()
                            </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-average-filter-matlab-script-code').click(function () {
        $('#average-filter-python-code').remove();
        let content = `                <div class="container" id="average-filter-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale if
                            needed</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Define the size of the filter (adjust
                            as needed)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filter_size = 5; % For a 5x5 filter
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Create the averaging filter
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filter = fspecial('average', [filter_size filter_size]);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Apply the filter to the image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = imfilter(gray_image, filter, 'replicate'); % 'replicate' pads the image boundaries</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
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
                        <code>subplot(1, 2, 2), imshow(filtered_image), title('Average Filtered Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})


$('#dropdownMenuButton').click(function () {
    $('.dropdown-toggle').dropdown('toggle');
});
