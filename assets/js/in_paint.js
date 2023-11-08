$(document).ready(function () {
    $('.btn-load-img-inpaint-img').click(function () {
        var Data = {
            folderName: 'assets/uploads/restoration/inpaint'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/inpaint", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#inpaint-image-modal').modal('show');
            $('#btn-inpaint-modal-close').click(function () {
                $('#inpaint-image-modal').modal('hide');
            });
            const btn_inpaint_submit_image = document.getElementById('btn-inpaint-input-image-submit');
            $(btn_inpaint_submit_image).click(function () {
                const inpaint_input_image = document.getElementById('inpaint-input-image');
                if (inpaint_input_image.files.length > 0) {
                    const fileName = inpaint_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#inpaint-image-modal').modal('hide');
                        $.ajax({
                            url: '/restoring/in_paint_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);

                                $('.inpaint-input-image-collapse').append(data['template']);
                                $('#output-inpainting-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.inpaint-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['inpaint_img']}" id="${data['inpaint_img']}" alt="inpainted Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-clustering-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-clustering-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['inpaint_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-inpaint-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['inpaint_img']}`;
                                    a.download = "inpaint_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.inpaint-user-image').offset().top
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
    $('.btn-load-video-tutorial-inpaint').click(function () {
        $.get("/user_tutorial_video/inpaint", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#inpaint-user-video-tutorial-modal').modal('show');
            $('.inpaint-user-video-tutorial-modal-close').click(function () {
                $('#inpaint-user-video-tutorial-modal').modal('hide');
                $('#inpaint-user-video-tutorial-modal').remove();
                location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-in-paint-matlab-script-code').click(function () {
        $('#in-paint-python-code').remove();
        let content = `                <div class="container" id="in-paint-matlab-code">
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
                            % Create a Laplacian filter
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>laplacian_filter = fspecial('laplacian', 0);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply the Laplacian filter using
                            imfilter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>laplacian_image = imfilter(gray_image, laplacian_filter);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the Laplacian image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(laplacian_image), title('Laplacian Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-in-paint-python-code').click(function () {
        $('#in-paint-matlab-code').remove();
        let content = `                <div class="container" id="in-paint-python-code">
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
                        <code>from matplotlib import pyplot as plt
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Convert the image to grayscale</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the original image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(8, 4))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1), plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)), plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.axis('off')</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Define the region to be inpainted (create a mask)
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>mask = np.zeros_like(gray_image, dtype=np.uint8)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.rectangle(mask, (100, 200), (250, 150), 255, -1)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Inpaint the masked region
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>inpainted_image = cv2.inpaint(image, mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the inpainted image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2), plt.imshow(cv2.cvtColor(inpainted_image, cv2.COLOR_BGR2RGB)), plt.title('Inpainted Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.axis('off')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
