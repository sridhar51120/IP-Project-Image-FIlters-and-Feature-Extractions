$(document).ready(function () {
    $('.btn-load-img-constrained-least-square-filtering').click(function () {
        var Data = {
            folderName: 'assets/uploads/segmantation/constraint_least_square'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/constraint_least_square", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#constraine-least-image-modal').modal('show');

            $('#btn-constraine-least-modal-close').click(function () {
                $('#constraine-least-image-modal').modal('hide');
                $('#constraine-least-image-modal').remove();
            });
            const btn_constrain_submit_image = document.getElementById('btn-constraine-least-input-image-submit');
            $(btn_constrain_submit_image).click(function () {
                const deblur_input_image = document.getElementById('constraine-least-input-image');
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
                            url: '/filter1/Constrained_least_square_filtering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#constraine-least-image-modal').modal('hide');
                                $('#constraine-least-image-modal').remove();
                                $('.constrained-least_image_collapse').append(data['template']);
                                $('#output-constraint-least-toggle-groups').collapse({
                                    toggle: false
                                }).show();
                                $('.constrained-least-square-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['constaint_img']}" id="${data['constaint_img']}" alt="Deblured Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-constraint-least-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-constraint-least-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['constaint_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-constraint-least').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['constaint_img']}`;
                                    a.download = "deblur_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.constrained-least-square-user-image').offset().top
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
    $('.btn-load-video-tutorial-constrained-least-square').click(function () {
        $.get("/user_tutorial_video/constraint_least_square", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#constrained-least-user-video-tutorial-modal').modal('show');
            $('.constrained-least-user-video-tutorial-modal-close').click(function () {
                $('#constrained-least-user-video-tutorial-modal').modal('hide');
                $('#constrained-least-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-constrained-least-python-code').click(function () {
        $('#constrained-least-matlab-code').remove();
        let content = `                <div class="container" id="constrained-least-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>from scipy.optimize import minimize</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Add noise to the image for
                            demonstration purposes</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noise = np.random.normal(0, 25, image.shape)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = image + noise
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Function to minimize (Least squares with edge preservation)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>def cost_function(x, image, noisy_image, lam):</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;return np.linalg.norm(x - noisy_image)**2 + lam * np.linalg.norm(np.gradient(x))**2                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Initial guess for optimization (use the noisy image as a starting point)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>x0 = noisy_image</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Set the regularization parameter (edge preservation, adjust as needed)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>lambda_param = 0.1</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Perform optimization
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>result = minimize(cost_function, x0, args=(image, noisy_image, lambda_param))
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Get the filtered image from the optimization result
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = result.x</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the noisy and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Noisy Image', noisy_image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Constrained Least Squares Filtered Image', filtered_image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitKey(0)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllWindows()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-constrained-least-matlab-script-code').click(function () {
        $('#constrained-least-python-code').remove();
        let content = `                <div class="container" id="constrained-least-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale (if
                            it's
                            a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Add noise to the image for
                            demonstration purposes</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>noisy_image = imnoise(gray_image, 'gaussian', 0, 0.01);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Set the regularization parameter (adjust as needed)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>lambda_param = 0.1;</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Perform constrained least squares filtering
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = lsqnonneg(noisy_image, lambda_param);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Display the noisy and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(noisy_image), title('Noisy Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(filtered_image), title('Constrained Least Squares Filtered Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})


