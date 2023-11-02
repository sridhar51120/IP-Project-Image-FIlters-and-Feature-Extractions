$(document).ready(function () {
    $('.btn-load-img-laplacian-filter').click(function () {
        $.get("/modals/laplacian_filter", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#laplacian-filter-image-modal').modal('show');
            $('#btn-laplacian-filter-modal-close').click(function () {
                $('#laplacian-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-laplacian-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('laplacian-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#laplacian-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/laplacian_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.laplacian-filter-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-laplacian-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['laplacian_filter']}" id="${data['laplacian_filter']}" alt="Laplacian Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-laplacian-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-laplacian-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['laplacian_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-laplacian-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['laplacian_filter']}`;
                                    a.download = "laplacian_filter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
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
    $('#dropdown-laplacian-filter-python-code').click(function () {
        $('#laplacian-matlab-code').remove();
        let content = `            <div class="card bg-dark" id="code-block">
                <div class="container" id="laplacian-python-code">
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
                    <div class="col col-12 d-flex justify-content-start"><span># Load the Input Image</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0) </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Apply Laplacian operator</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>laplacian_image = cv2.Laplacian(image, cv2.CV_64F)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Normalize the output to display the Laplacian image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>laplacian_image = cv2.convertScaleAbs(laplacian_image)
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Display the original and Laplacian images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1), plt.imshow(image, cmap='gray'), plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2), plt.imshow(laplacian_image, cmap='gray'), plt.title('Laplacian Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-laplacian-filter-matlab-script-code').click(function () {
        $('#laplacian-python-code').remove();
        let content = `                <div class="container" id="laplacian-matlab-code">
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
                        <code>subplot(1, 2, 2), imshow(laplacian_image), title('Laplacian Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})



