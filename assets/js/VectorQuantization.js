$(document).ready(function () {
    $('.btn-load-img-vector-quantization').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/vector_quantization'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/vectorQuantization", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#vector-quantization-image-modal').modal('show');
            $('#btn-vector-quantization-modal-close').click(function () {
                $('#vector-quantization-image-modal').modal('hide');
                $('#vector-quantization-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-vector-quantization-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('vector-quantization-input-image');
                if (input_image.files.length > 0) {
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
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/filters3/vectorQuantization_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('#vector-quantization-image-modal').modal('hide');
                                $('#vector-quantization-image-modal').remove();
                                $('.vector-quantization-input-image-collapse').append(data['template']);
                                $('.output-vector-quantization-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.vector-quantization-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['vector_quantization']}" id="${data['vector_quantization']}" alt="Vector Quantization Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-vector-quantization-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-vector-quantization-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['vector_quantization']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-vector-quantization').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['vector_quantization']}`;
                                    a.download = "vector_quantization_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.vector-quantization-user-image').offset().top
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
    $('.btn-load-video-tutorial-vector-quantization').click(function () {
        $.get("/user_tutorial_video/vectorQuantization", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#vector-quantization-user-video-tutorial-modal').modal('show');
            $('.vector-quantization-user-video-tutorial-modal-close').click(function () {
                $('#vector-quantization-user-video-tutorial-modal').modal('hide');
                $('#vector-quantization-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})


$(document).ready(function () {
    $('#dropdown-vector-quantization-python-code').click(function () {
        $('#vector-quantization-matlab-code-snippet').remove();
        let content = `                <div class="container" id="vector-quantization-python-code-snippet">
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
                    <code>from sklearn.cluster import KMeans</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = cv2.imread('path_to_your_image.jpg', 0)                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Reshape the image to a 2D array of
                        pixels (rows x columns, 3 color channels)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>reshaped_image = image.reshape((-1, 3))
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Define the number of colors or intensities you want after vector quantization
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>num_colors = 16  # You can adjust this number based on your preference
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Apply KMeans clustering for vector quantization
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>kmeans = KMeans(n_clusters=num_colors, n_init=10) 
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>kmeans.fit(reshaped_image)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Get cluster centers or colors
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cluster_centers = kmeans.cluster_centers_.astype(int)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Replace pixel values with cluster centers to create the quantized image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>quantized_image = np.reshape(cluster_centers[kmeans.labels_], image.shape).astype(np.uint8)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Display the original and quantized images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow('Original Image', image)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>cv2.imshow('Quantized Image', quantized_image)
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

    });
    $('#dropdown-vector-quantization-matlab-script-code').click(function () {
        $('#vector-quantization-python-code-snippet').remove();
        let content = ` <div class="container" id="vector-quantization-matlab-code-snippet">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>original_image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to double precision
                        for processing</span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>original_image = im2double(original_image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Specify the number of colors (codebook
                        size)</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>num_colors = 16;  % Change this value as needed
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Reshape the image data to be a list of RGB pixels
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>data = reshape(original_image, [], 3);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Perform k-means clustering for vector quantization
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>[cluster_idx, codebook] = kmeans(data, num_colors);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Replace each pixel value with its nearest centroid (quantized value)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>quantized_image = reshape(codebook(cluster_idx, :), size(original_image));
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Display the original and quantized images
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 1);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(original_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Original Image');
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>subplot(1, 2, 2);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(quantized_image);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Quantized Image');
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
});
