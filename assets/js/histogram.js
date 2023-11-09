$(document).ready(function () {
    $('.btn-load-img-histogram-equal').click(function () {
        var Data = {
            folderName: 'assets/uploads/enhancement/histogram'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/histogram", function (data) {
            $('.modal-content').append(data);
            const temp = data;
            $('#histogram-image-modal').modal('show');
            $('#btn-histogram-modal-close').click(function () {
                $('#histogram-image-modal').modal('hide');
            });
            const btn_histogram_submit_image = document.getElementById('btn-histogram-input-image-submit');
            $(btn_histogram_submit_image).click(function () {
                const histogram_input_image = document.getElementById('histogram-input-image');
                if (histogram_input_image.files.length > 0) {
                    const fileName = histogram_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#histogram-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Histogram_Equalization_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')), // formdata only work in 'document.getElementById()' 
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);

                                $('.histo_image_input_collapse').append(data['template']);
                                $('.output-histogram-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.histogram-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['histo_img']}" id="${data['histo_img']}" alt="Histogram Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-histogram-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-histogram-output-histo-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['histo_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-histogram').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['histo_img']}`;
                                    a.download = "histo_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.histogram-user-image').offset().top
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
                        <div class="card bg-primary">
                            <div class="card-body text-center text-dark">
                                Invalid File Extension
                            </div>
                        </div>`
                        $('.alert-container').append(alert_msg);
                    }
                } else {
                    alert("File Not Selected!");
                }
            })
        });
    });

});
$(document).ready(function () {
    $('.btn-load-video-tutorial-histogram').click(function () {
        $.get("/user_tutorial_video/histogram", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#histogram-user-video-tutorial-modal').modal('show');
            $('.histogram-user-video-tutorial-modal-close').click(function () {
                $('#histogram-user-video-tutorial-modal').modal('hide');
                $('#histogram-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-histogram-python-code').click(function () {
        $('#histogram-matlab-code').remove();
        let content = `                <div class="container" id="histogram-python-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = cv2.imread('your_image.jpg', cv2.IMREAD_GRAYSCALE)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Apply histogram equalization</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>equalized_image = cv2.equalizeHist(original_image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the original and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Original Image', original_image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Histogram Image', equalized_image)
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.waitKey(0)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.destroyAllWindows()
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-histogram-matlab-script-code').click(function () {
        $('#histogram-python-code').remove();
        let content = `                <div class="container" id="histogram-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Read the original image</span>
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
                    <div class="col col-12 d-flex justify-content-start"><span>
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
                    <div class="col col-12 d-flex justify-content-start"><span>
                            % Perform histogram equalization
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>equalized_image = histeq(gray_image);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the histogram equalized
                            image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(equalized_image), title('Histogram Equalized Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
