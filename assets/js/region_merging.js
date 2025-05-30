$(document).ready(function () {
    $('.btn-load-img-region-merging').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/region_merging'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/region_merging", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#region-merging-image-modal').modal('show');
            $('#btn-region-merging-modal-close').click(function () {
                $('#region-merging-image-modal').modal('hide');
                $('#region-merging-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-region-merging-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('region-merging-input-image');
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
                            url: '/filters3/region_merging_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#region-merging-image-modal').modal('hide');
                                $('#region-merging-image-modal').remove();
                                $('.region-merging-input-image-collapse').append(data['template']);
                                $('.output-region-merging-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.region-merging-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['region_merging']}" id="${data['region_merging']}" alt="Region Merging Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-region-merging-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-region-merging-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['region_merging']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-region-merging').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['region_merging']}`;
                                    a.download = "region_merging_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.region-merging-user-image').offset().top
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
    $('.btn-load-video-tutorial-region-merging').click(function () {
        $.get("/user_tutorial_video/region_merging", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#region-merging-user-video-tutorial-modal').modal('show');
            $('.region-merging-user-video-tutorial-modal-close').click(function () {
                $('#region-merging-user-video-tutorial-modal').modal('hide');
                $('#region-merging-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-region-merging-matlab-script-code').click(function () {
        $('#region-merging-python-code').remove();
        let content = `                <div class="container" id="region-merging-matlab-code">
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
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Apply edge detection using the Sobel
                        filter</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>edges = edge(gray_image, 'Sobel');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Perform watershed segmentation
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>segments = watershed(edges);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Generate a segmented image using the
                        region average color</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>segmented_image = label2rgb(segments, 'hsv', 'k', 'shuffle');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Save the segmented image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imwrite(segmented_image, 'segmented_image.jpg');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-region-merging-python-code').click(function () {
        $('#region-merging-matlab-code').remove();
        let content = `                <div class="container" id="region-merging-python-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>from skimage import io, color, segmentation, filters</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = io.imread('path_to_your_image.jpg')                     </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = color.rgb2gray(image)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Apply edge detection using the Sobel filter
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>edges = filters.sobel(gray_image)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Perform watershed segmentation
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>segmented_image = color.label2rgb(segments, image, kind='avg')</code>
                </div>

                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Save the segmented image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>io.imsave('segmented_image.jpg', segmented_image)</code>
                </div>

            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})