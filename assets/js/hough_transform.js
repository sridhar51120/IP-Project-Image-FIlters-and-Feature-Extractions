$(document).ready(function () {
    $('.btn-load-img-hough-transform').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/hough_transform'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/hough_transform", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#hough-tansform-image-modal').modal('show');
            $('#btn-hough-tansform-modal-close').click(function () {
                $('#hough-tansform-image-modal').modal('hide');
                $('#hough-tansform-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-hough-tansform-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('hough-tansform-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#hough-tansform-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters3/hough_trasform_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.hough-transform-input-image-collapse').append(data['template']);
                                $('.output-hough-transform-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.hough-transform-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['hough_transform']}" id="${data['hough_transform']}" alt="Hough Transform Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-hough-transform-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-hough-transform-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['hough_transform']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-hough-transform').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['hough_transform']}`;
                                    a.download = "hough_transform_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.hough-transform-user-image').offset().top
                                    }, 1000);
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
    $('.btn-load-video-tutorial-hough-transform').click(function () {
        $.get("/user_tutorial_video/hough_transform", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#hough-transform-user-video-tutorial-modal').modal('show');
            $('.hough-transform-user-video-tutorial-modal-close').click(function () {
                $('#hough-transform-user-video-tutorial-modal').modal('hide');
                $('#hough-transform-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-hough-transform-python-code').click(function () {
        $('#hough-transform-matlab-code').remove();
        let content = `                <div class="container" id="hough-transform-python-code">
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
                    <code>from matplotlib import pyplot as plt</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Apply edge detection (can use Canny or
                        other edge detectors)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>edges = cv2.Canny(image, 50, 150, apertureSize=3)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Apply Hough Line Transform
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>lines = cv2.HoughLines(edges, 1, np.pi / 180, 200)  # Adjust parameters as needed</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Draw detected lines on a copy of the original image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hough_image = np.copy(image)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if lines is not None:</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for line in lines:
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>rho, theta = line[0]
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> a = np.cos(theta)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>b = np.sin(theta)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>x0 = a * rho
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>y0 = b * rho
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>x1 = int(x0 + 1000 * (-b))  # Set the line length as needed
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>y1 = int(y0 + 1000 * (a))   # Set the line length as needed
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>x2 = int(x0 - 1000 * (-b))  # Set the line length as needed
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>y2 = int(y0 - 1000 * (a))   # Set the line length as needed
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.line(hough_image, (x1, y1), (x2, y2), (0, 0, 255), 2)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Display the Hough Transform image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.imshow(hough_image, cmap='gray')</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.title('Hough Transform')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.axis('off')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.show()
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-hough-transform-matlab-script-code').click(function () {
        $('#hough-transform-python-code').remove();
        let content = `                <div class="container" id="hough-transform-matlab-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);                      </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Apply edge detection (e.g., Canny or
                        other edge detectors)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>edges = edge(gray_image, 'Canny');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Apply Hough Transform for lines
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>[H, theta, rho] = hough(edges);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Find peaks in Hough space
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>P = houghpeaks(H, 10);  % Adjust the number of peaks as needed</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Extract lines from Hough space using peak values
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>lines = houghlines(edges, theta, rho, P);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Display the detected lines on the original image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(image);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hold on;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for k = 1:length(lines)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>xy = [lines(k).point1; lines(k).point2];</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plot(xy(:,1), xy(:,2), 'LineWidth', 2, 'Color', 'red');</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hold off;</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})