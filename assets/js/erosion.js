$(document).ready(function () {
    $('.btn-load-img-errosion').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/errosion'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/errosion", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#errosion-image-modal').modal('show');
            $('#btn-errosion-modal-close').click(function () {
                $('#errosion-image-modal').modal('hide');
                $('#errosion-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-errosion-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('errosion-input-image');
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
                            url: '/filters3/erosion_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#errosion-image-modal').modal('hide');
                                $('#errosion-image-modal').remove();
                                $('.errosion-input-image-collapse').append(data['template']);
                                $('.output-errosion-image-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.erosion-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['erroded_img']}" id="${data['erroded_img']}" alt="Errorded Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-errosion-image-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });

                                $('.btn-errosion-image-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['erroded_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-errosion-image').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['erroded_img']}`;
                                    a.download = "erroded_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.erosion-user-image').offset().top
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
    $('.btn-load-video-tutorial-erosion').click(function () {
        $.get("/user_tutorial_video/errosion", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#erosion-user-video-tutorial-modal').modal('show');
            $('.erosion-user-video-tutorial-modal-close').click(function () {
                $('#erosion-user-video-tutorial-modal').modal('hide');
                $('#erosion-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-erosion-python-code').click(function () {
        $('#erosion-matlab-code').remove();
        let content = `                <div class="container" id="erosion-python-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import cv2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>from matplotlib import pyplot as plt</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image in grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Define the structuring element for
                        erosion (kernel)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>kernel = np.ones((5, 5), np.uint8)  # You can modify the kernel size as needed
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Apply erosion
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>eroded_image = cv2.erode(image, kernel, iterations=1)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Display the original and eroded images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.figure(figsize=(8, 4))</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.subplot(1, 2, 1)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.imshow(image, cmap='gray')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.title('Original Image')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.axis('off')</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.subplot(1, 2, 2)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.imshow(eroded_image, cmap='gray')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.title('Eroded Image')</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.axis('off')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.tight_layout()
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.show()</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-erosion-matlab-script-code').click(function () {
        $('#erosion-python-code').remove();
        let content = `                <div class="container" id="erosion-matlab-code">
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
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Create a structuring element for
                        erosion (disk-shaped element)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>se = strel('disk', 5);  % You can modify the size of the disk as needed
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Apply erosion to the image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>eroded_image = imerode(gray_image, se);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Display the original and eroded images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(gray_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Original Image');
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 2);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(eroded_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Eroded Image');
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})