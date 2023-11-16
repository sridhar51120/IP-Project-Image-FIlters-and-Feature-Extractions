$(document).ready(function () {
    $('.btn-load-img-adaptive-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/adaptivefilter'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/adaptive_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#adaptive-filter-image-modal').modal('show');
            $('#btn-adaptive-filter-modal-close').click(function () {
                $('#adaptive-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-adaptive-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('adaptive-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#adaptive-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/adpative_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.adaptive-filter-image-collapse').append(data['template']);
                                data['template']
                                $('.output-adaptive-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.adaptive-filter-user-input-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Adaptive_filter']}" id="${data['Adaptive_filter']}" alt="Adaptive Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-adaptive-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-adaptive-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['Adaptive_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-adaptive-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['Adaptive_filter']}`;
                                    a.download = "adaptive_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.adaptive-filter-user-input-image').offset().top
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
                        <div class="card bg-primary alert-container-body">
                            <div class="card-body text-center text-dark">
                                Invalid File Extension
                            </div>
                        </div>`
                        $('.alert-container').append(alert_msg);
                        setTimeout(function () {
                            $('.alert-container-body').remove();
                        }, 3000);

                    }
                } else {
                    alert("File Not Selected!");
                }
            })
        });
    });
});


$(document).ready(function () {
    $('.btn-load-video-tutorial-adaptive-filter').click(function () {
        $.get("/user_tutorial_video/adaptive_filter", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#adaptive-filter-user-video-tutorial-modal').modal('show');
            $('.adaptive-filter-user-video-tutorial-modal-close').click(function () {
                $('#adaptive-filter-user-video-tutorial-modal').modal('hide');
                $('#adaptive-filter-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-adaptive-filter-python-code').click(function () {
        $('#adaptive-filter-matlab-code').remove();
        let content = `                <div class="container" id="adaptive-filter-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Apply adaptive thresholding</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>adaptive_thresh = cv2.adaptiveThreshold(image, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Display the original and adaptive
                            threshold images</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Original Image', image)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Adaptive Threshold Image', adaptive_thresh)
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
    $('#dropdown-adaptive-filter-matlab-script-code').click(function () {
        $('#adaptive-filter-python-code').remove();
        let content = `                <div class="container" id="adaptive-filter-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Read the image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Convert the image to grayscale (if it's
                            a color image)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = rgb2gray(original_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply adaptive thresholding</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>adaptive_thresh = imbinarize(gray_image, 'adaptive');
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Display the original and adaptive thresholded images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(adaptive_thresh), title('Adaptive Thresholded Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})


