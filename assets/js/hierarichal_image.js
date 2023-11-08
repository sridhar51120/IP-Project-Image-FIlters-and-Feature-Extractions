$(document).ready(function () {
    $('.btn-load-img-hierarchical-image').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/hierarchical-image'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/hierarchical-image", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#hierarchical-image-image-modal').modal('show');
            $('#btn-hierarchical-image-modal-close').click(function () {
                $('#hierarchical-image-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-hierarchical-image-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('hierarchical-image-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#hierarchical-image-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters3/hierarichal_image_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.hierarchical-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-hierarchical-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.hierarchical-image-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['hierarchical']}" id="${data['hierarchical']}" alt="Hierarchical Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-hierarchical-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-hierarchical-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['hierarchical']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-hierarchical-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['hierarchical']}`;
                                    a.download = "hierarchical_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.hierarchical-image-user-image').offset().top
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
    $('.btn-load-video-tutorial-hierarchical').click(function () {
        $.get("/user_tutorial_video/hierarchical-image", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#hierarchical-user-video-tutorial-modal').modal('show');
            $('.hierarchical-user-video-tutorial-modal-close').click(function () {
                $('#hierarchical-user-video-tutorial-modal').modal('hide');
                $('#hierarchical-user-video-tutorial-modal').remove();
                location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-hierarchical-image-python-code').click(function () {
        $('#hierarchical-image-matlab-code').remove();
        let content = `                <div class="container" id="hierarchical-image-python-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Import Required Library</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import cv2</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>from skimage import io, color</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = io.imread('path_to_your_image.jpg')</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span># Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = color.rgb2gray(image)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        # Function for quadtree decomposition
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>def quadtree_decomposition(img, level):</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if level == 0:                        </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>return img.mean()
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>else:
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>rows, cols = img.shape
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>half_rows, half_cols = rows // 2, cols // 2
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>quads = [img[:half_rows, :half_cols], img[:half_rows, half_cols:],
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img[half_rows:, :half_cols], img[half_rows:, half_cols:]]
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>quad_img = cellfun(@(x) quadtree_decomposition(x, level-1), quads, 'UniformOutput', false);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hierarchical_img = [quad_img{1}, quad_img{2}; quad_img{3}, quad_img{4}];
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
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Set the level of decomposition
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decomposition_level = 4;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Perform quadtree decomposition
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hierarchical_img = quadtree_decomposition(gray_image, decomposition_level);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Display the hierarchical image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(hierarchical_img);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Hierarchical Image Representation');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-hierarchical-image-matlab-script-code').click(function () {
        $('#hierarchical-image-python-code').remove();
        let content = `                <div class="container" id="hierarchical-image-matlab-code">
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
                    <code>gray_image = rgb2gray(image);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>% Perform quadtree decomposition
                        function</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>function hierarchical_img = quadtree_decomposition(img, level)
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if level == 0
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hierarchical_img = img;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>else
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> [rows, cols] = size(img);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>half_rows = floor(rows / 2);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>half_cols = floor(cols / 2);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>quads = {img(1:half_rows, 1:half_cols), img(1:half_rows, half_cols+1:end), ...
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>img(half_rows+1:end, 1:half_cols), img(half_rows+1:end, half_cols+1:end)};
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> quad_img = cellfun(@(x) quadtree_decomposition(x, level-1), quads, 'UniformOutput', false);
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hierarchical_img = [quad_img{1}, quad_img{2}; quad_img{3}, quad_img{4}];
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
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Set the level of decomposition
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>decomposition_level = 4;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Perform quadtree decomposition
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>hierarchical_img = quadtree_decomposition(gray_image, decomposition_level);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span>
                        % Display the hierarchical image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(hierarchical_img);</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>title('Hierarchical Image Representation');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})