$(document).ready(function () {
    $('.btn-load-img-harmonic-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/harmonics'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/harmonic", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#harmonic-filter-image-modal').modal('show');

            $('#btn-harmonic-filter-modal-close').click(function () {
                $('#harmonic-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-harmonic-filter-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('harmonic-filter-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#harmonic-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filter1/Hormonic_Filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.hormonic-filter_image_collapse').append(data['template']);
                                $('.output-harmonic-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.hormonic-filter-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['harmonic_filter']}" id="${data['harmonic_filter']}" alt="Harmonic Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-harmonic-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-harmonic-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['harmonic_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-harmonic-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['harmonic_filter']}`;
                                    a.download = "Harmonic_FIlter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.hormonic-filter-user-image').offset().top
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
    $('.btn-load-video-tutorial-hormonic-filter').click(function () {
        $.get("/user_tutorial_video/harmonic", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#hormonic-user-video-tutorial-modal').modal('show');
            $('.hormonic-user-video-tutorial-modal-close').click(function () {
                $('#hormonic-user-video-tutorial-modal').modal('hide');
                $('#hormonic-user-video-tutorial-modal').remove();
                location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-hormonic-filter-python-code').click(function () {
        $('#hormonic-matlab-code').remove();
        let content = `<div class="container" id="hormonic-python-code">
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
                        <code>from skimage.filters import rank
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Apply harmonic mean filtering</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = rank.harmonic(image, np.ones((3, 3)))
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the original and filtered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Original Image', image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imshow('Harmonic Filtered Image', filtered_image)
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
    $('#dropdown-hormonic-filter-matlab-script-code').click(function () {
        $('#hormonic-python-code').remove();
        let content = `<div class="container" id="hormonic-matlab-code">
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
                            % Define the size of the filter
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filter_size = 3;
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Create the harmonic mean filter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>harm_filter = ones(filter_size, filter_size) / numel(harm_filter);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply harmonic mean filtering</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = imfilter(double(gray_image), harm_filter, 'replicate');
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the filtered image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(uint8(filtered_image)), title('Harmonic Filtered Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
