$(document).ready(function () {
    $('.btn-load-img-geometric-mean').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/geometric_mean'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/geometric", function (data) {
            //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#geometric-filter-image-modal').modal('show');

            $('#btn-geometric-filter-modal-close').click(function () {
                $('#geometric-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-geometric-filter-img-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('geometric-filter-img-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#geometric-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filter1/geometric_mean_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.geometric-mean_image_collapse').append(data['template']);
                                $('.output-geometric-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['geometric_img']}" id="${data['geometric_img']}" alt="Geometric Mean Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-geometric-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                // TODO: 404 Error Occured -> Image Not Found
                                $('.btn-geometric-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['geometric_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-geometric-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['geometric_img']}`;
                                    a.download = "Geometric_output_img.jpg";
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
    $('#dropdown-geometric-filter-matlab-script-code').click(function () {
        $('#geometric-python-code').remove();
        let content = `                <div class="container" id="geometric-matlab-code">
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
                    <div class="col col-12 d-flex justify-content-start"><span>% Apply the geometric mean filter using
                            nlfilter</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = nlfilter(gray_image, [filter_size filter_size], @(x) geomean(x(:)));
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>% Display the filtered image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imshow(filtered_image, []), title('Geometric Mean Filtered Image');
                        </code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-geometric-filter-python-code').click(function () {
        $('#geometric-matlab-code').remove();
        let content = `
            <div class="container" id="geometric-python-code">
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
                        <code>from scipy.ndimage import generic_filter
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg', 0)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span># Define the geometric mean filter
                            function</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>def geometric_mean(data):
                        </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>&nbsp;&nbsp;&nbsp;return np.prod(data) ** (1.0 / len(data))
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span>
                            # Apply the geometric mean filter using a 3x3 window
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>filtered_image = generic_filter(image, geometric_mean, size=3)</code>
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
                        <code>cv2.imshow('Geometric Mean Filtered Image', filtered_image)</code>
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
})

