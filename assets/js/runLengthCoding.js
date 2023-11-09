$(document).ready(function () {
    $('.btn-load-img-run-length-coding').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/runLengthCoding'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/runLengthCoding", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#run-length-coding-image-modal').modal('show');
            $('#btn-run-length-coding-modal-close').click(function () {
                $('#run-length-coding-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-run-length-coding-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('run-length-coding-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#run-length-coding-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters3/runLengthCoding_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.run-length-coding-image-collapse').append(data['template']);
                                data['template']
                                $('.output-run-length-coding-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.run-length-coding-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['runLengthEncode']}" id="${data['runLengthEncode']}" alt="Run Length Encode Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-run-length-coding-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-run-length-coding-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['runLengthEncode']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-run-length-coding').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['runLengthEncode']}`;
                                    a.download = "runLengthEncode_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.run-length-coding-user-image').offset().top
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
    $('.btn-load-video-tutorial-run-length-encode').click(function () {
        $.get("/user_tutorial_video/runLengthCoding", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#run-length-encode-user-video-tutorial-modal').modal('show');
            $('.run-length-encode-user-video-tutorial-modal-close').click(function () {
                $('#run-length-encode-user-video-tutorial-modal').modal('hide');
                $('#run-length-encode-user-video-tutorial-modal').remove();
               // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-run-length-encode-python-code').click(function () {
        $('#run-length-encode-matlab-code').remove();
        let content = `                <div class="container" id="run-length-encode-python-code">
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
                    <code>from skimage import io</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image_flat = image.ravel()
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data = []
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>current_pixel = image_flat[0]
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = 1
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # RLE Encoding
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for pixel in image_flat[1:]:</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if pixel == current_pixel:</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count += 1
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>else:
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data.extend([current_pixel, count])
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>current_pixel = pixel
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = 1
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data.extend([current_pixel, count])
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data = np.array(encoded_data)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_data = []
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for i in range(0, len(encoded_data), 2):
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>pixel = encoded_data[i]
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = encoded_data[i + 1]
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_data.extend([pixel] * count)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_image = np.array(decoded_data).reshape(image.shape)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_image = decoded_image.astype(np.uint8)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Save the decoded image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>path = "path/to/save/"  # Replace 'path/to/save/' with the desired directory</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> img_path = path + "run_length_encoding_output_img.jpg"</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> io.imsave(img_path, decoded_image)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>
                        print("Encoded image saved at:",img_path)
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-run-length-encode-matlab-script-code').click(function () {
        $('#run-length-encode-python-code').remove();
        let content = `                <div class="container" id="run-length-encode-python-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% 1. Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% 2. Flatten the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image_flat = reshape(image, 1, []);                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % 3. RLE Encoding
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data = [];</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>current_pixel = image_flat(1);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = 1;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for i = 2:length(image_flat)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if image_flat(i) == current_pixel
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> count = count + 1;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>else
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data = [encoded_data, current_pixel, count];
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>current_pixel = image_flat(i);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = 1;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>encoded_data = [encoded_data, current_pixel, count];
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % 4. Save the encoded data to a file (optional)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>save('encoded_data.mat', 'encoded_data');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % 5. Decode the encoded data (optional)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_data = zeros(1, sum(encoded_data(2:2:end)));</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>index = 1;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for i = 1:2:length(encoded_data)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>pixel = encoded_data(i);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>count = encoded_data(i + 1);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_data(index:index + count - 1) = pixel;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>index = index + count;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % 6. Save the decoded image (optional)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decoded_image = reshape(decoded_data, size(image));</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imwrite(uint8(decoded_image), 'decoded_image.jpg');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})