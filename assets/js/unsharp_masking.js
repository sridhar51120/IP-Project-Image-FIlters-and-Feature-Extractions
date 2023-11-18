$(document).ready(function () {
    $('.btn-load-img-unsharp-masking').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/unsharp_masking'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/unsharp_masking", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#unsharp-masking-filter-image-modal').modal('show');
            $('#btn-unsharp-masking-filter-modal-close').click(function () {
                $('#unsharp-masking-filter-image-modal').modal('hide');
                $('#unsharp-masking-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-unsharp-masking-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('unsharp-masking-input-image');
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
                            url: '/filters2/unsharp_masking_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                setTimeout(function () {
                                    $('#unsharp-masking-filter-image-modal').modal('hide');
                                    $('#unsharp-masking-filter-image-modal').remove();

                                    $('.unsharp-masking-input-image-collapse').append(data['template']);
                                    $('.output-unsharp-masking-toggle-groups').collapse({
                                        toggle: false
                                    }).show();

                                    $('.unsharp-mask-user-image').remove();

                                    var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['unsharp_masking']}" id="${data['unsharp_masking']}" alt="UnSharp Masking Image" style="display:none;">
                            `;
                                    $(document.body).append(image_template);

                                    $('.btn-unsharp-masking-output-original-image-show').click(function () {
                                        new Viewer(document.getElementById(`${data['img_url']}`), {
                                            loop: true,
                                            interval: 500
                                        }).show();
                                    });
                                    $('.btn-unsharp-masking-output-image-show').click(function () {
                                        new Viewer(document.getElementById(`${data['unsharp_masking']}`), {
                                            loop: true,
                                            interval: 500
                                        }).show();
                                    });
                                    $('.btn-download-img-unsharp-masking').click(function () {
                                        const a = document.createElement("a");
                                        a.href = `${data['unsharp_masking']}`;
                                        a.download = "unsharp_masking_output_img.jpg";
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                    });
                                    $('.btn-window-localtion-reload').click(function () {
                                        location.reload();
                                        $('html, body').animate({
                                            scrollTop: $('.unsharp-mask-user-image').offset().top
                                        }, 1000);
                                    });
                                }, 1000);
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
    $('.btn-load-video-tutorial-unsharp-masking').click(function () {
        $.get("/user_tutorial_video/unsharp_masking", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#unsharp-masking-user-video-tutorial-modal').modal('show');
            $('.unsharp-masking-user-video-tutorial-modal-close').click(function () {
                $('#unsharp-masking-user-video-tutorial-modal').modal('hide');
                $('#unsharp-masking-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-unsharp-masking-matlab-code').click(function () {
        $('#unsharp-masking-python-code-snippet').remove();
        let content = `<div class="container" id="unsharp-masking-matlab-code-snippet">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Apply unsharp mask filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>unsharp_mask_image = imsharpen(original_image);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Display the original and unsharp mask images</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(original_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(unsharp_mask_image), title('Unsharp Mask Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-unsharp-masking-python-code').click(function () {
        $().remove('#unsharp-masking-matlab-code-snippet');
        let content = `<div class="container" id="unsharp-masking-python-code-snippet">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Libraries</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the Image file</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Gaussian blur</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>blurred_image = cv2.GaussianBlur(image, (0, 0), 2)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Create the unsharp mask</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>unsharp_mask = cv2.addWeighted(image, 1.5, blurred_image, -0.5, 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Display Gaussian blur output
                            image file</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code></code>cv2.imshow('unsharp_mask_output',unsharp_mask)
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitkKey(0)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllwindow()</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Save the result to a file</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imwrite('unsharp_mask_output.jpg', unsharp_mask)</code>
                    </div>
                    <div class="mb-3"></div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})

