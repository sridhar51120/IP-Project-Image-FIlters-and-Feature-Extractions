$(document).ready(function () {
    $('.btn-load-img-dilation').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/dilation'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/dilation", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#dilation-image-modal').modal('show');
            $('#btn-dilation-modal-close').click(function () {
                $('#dilation-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-dilation-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('dilation-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#dilation-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters3/dilation_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.dilation-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-dilation-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.dilation-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['dilation_output_img']}" id="${data['dilation_output_img']}" alt="Dilation Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-dilation-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-dilation-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['dilation_output_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-dilation-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['dilation_output_img']}`;
                                    a.download = "dilation_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.dilation-user-image').offset().top
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
    $('.btn-load-video-tutorial-dilation').click(function () {
        $.get("/user_tutorial_video/dilation", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#dilation-user-video-tutorial-modal').modal('show');
            $('.dilation-user-video-tutorial-modal-close').click(function () {
                $('#dilation-user-video-tutorial-modal').modal('hide');
                $('#dilation-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-dilation-python-code').click(function () {
        $('#dilation-matlab-code').remove();
        let content = `                <div class="container" id="dilation-python-code">
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
                <div class="col col-12 d-flex justify-content-start"><span># Define the structuring element for
                        dilation (kernel)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>kernel = np.ones((5, 5), np.uint8)  # You can modify the kernel size as needed
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Apply dilation
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dilated_image = cv2.dilate(image, kernel, iterations=1)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Display the original and dilated images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.figure(figsize=(8, 4))
                    </code>
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
                    <code>plt.imshow(dilated_image, cmap='gray')
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>plt.title('Dilated Image')</code>
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
                    <code>plt.show()
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-dilation-matlab-script-code').click(function () {
        $('#dilation-python-code').remove();
        let content = `                <div class="container" id="dilation-matlab-code">
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
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Create a structuring element for
                        dilation (disk-shaped element)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>se = strel('disk', 5);  % You can modify the size of the disk as needed
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Apply dilation to the image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>dilated_image = imdilate(gray_image, se);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Display the original and dilated images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;
                    </code>
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
                    <code>imshow(dilated_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Dilated Image');
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})