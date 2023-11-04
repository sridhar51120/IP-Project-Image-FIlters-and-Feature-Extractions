$(document).ready(function () {
    $('.btn-load-img-thresholding').click(function () {
        var Data = {
            folderName: 'assets/uploads/segmantation/thresholding'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/thresolding", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#thresolding-image-modal').modal('show');
            $('#btn-thresolding-modal-close').click(function () {
                $('#thresolding-image-modal').modal('hide');
            });
            const btn_thresold_submit_image = document.getElementById('btn-thresolding-input-image-submit');
            $(btn_thresold_submit_image).click(function () {
                const thresold_input_image = document.getElementById('thresolding-input-image');
                if (thresold_input_image.files.length > 0) {
                    const fileName = thresold_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#thresolding-image-modal').modal('hide');
                        $.ajax({
                            url: '/segmentation/Thresolding_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);
                                $('.thresolding-input-image-collapse').append(data['template']);
                                $('#output-thresholding-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['thresholding']}" id="${data['thresholding']}" alt="Thresolded Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);
                                $('.btn-thresholding-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-thresholding-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['thresholding']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-thresolding').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['thresholding']}`;
                                    a.download = "thresholding_img.jpg";
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
    $('#dropdown-threshold-matlab-script-code').click(function () {
        $('#thresholding-python').remove();
        let content = `<div class="container" id="thresholding-matlab">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Read the
                        image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Convert the image
                        to grayscale
                        (if it's a color image)</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Perform simple
                        global thresholding</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>threshold_value = 128;  % Adjust the threshold value as needed</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>thresholded_image = gray_image > threshold_value;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Display the
                        original and thresholded images</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>figure;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1), imshow(gray_image), title('Original Image');</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 2), imshow(thresholded_image), title('Thresholded Image');</code>
                </div>

            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $("#dropdown-threshold-python-code").click(function () {
        $('#thresholding-matlab').remove();
        let content = `<div class="container" id="thresholding-python">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import cv2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Load the Image</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread("input_image.jpg", cv2.IMREAD_GRAYSCALE)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Set a threshold value (you can
                        experiment with different values)</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>threshold_value = 128</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Apply binary thresholding</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>ret, thresholded_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY) </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Display the thresholded image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gamma_corrected = np.power(image/255.0, gamma)</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span></span># Display the image</div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow("Thresholded Image", thresholded_image)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>code': 'cv2.waitKey(0)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.destroyAllWindows()</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})
