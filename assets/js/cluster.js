$(document).ready(function () {
    $('.btn-load-img-clustering-img').click(function () {
        var Data = {
            folderName: 'assets/uploads/segmantation/cluster'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/cluster", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#cluster-image-modal').modal('show');
            $('#btn-cluster-modal-close').click(function () {
                $('#cluster-image-modal').modal('hide');
                $('#cluster-image-modal').remove();
            });
            const btn_cluster_submit_image = document.getElementById('btn-cluster-input-image-submit');
            $(btn_cluster_submit_image).click(function () {
                const cluster_input_image = document.getElementById('cluster-input-image');
                if (cluster_input_image.files.length > 0) {
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
                    const fileName = cluster_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/segmentation/Clustering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {

                                // // console.log('Server response:', response);
                                // // console.log('Data : ', data);
                                $('#cluster-image-modal').modal('hide');
                                $('#cluster-image-modal').remove();
                                $('.cluster-image-collapse').append(data['template']);
                                $('#output-clustering-toggle-groups').collapse({
                                    toggle: false
                                }).show();
                                $('.cluster-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['clustered_img']}" id="${data['clustered_img']}" alt="Clustered Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-clustering-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-clustering-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['clustered_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-clustering-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['clustered_img']}`;
                                    a.download = "clustered_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.cluster-user-image').offset().top
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
    $('.btn-load-video-tutorial-cluster').click(function () {
        $.get("/user_tutorial_video/cluster", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#cluster-user-video-tutorial-modal').modal('show');
            $('.cluster-user-video-tutorial-modal-close').click(function () {
                $('#cluster-user-video-tutorial-modal').modal('hide');
                $('#cluster-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-clustering-python-code').click(function () {
        $('#clustering-matlab-code').remove();
        let content = `                <div class="container" id="clustering-python-code">
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
                    <div class="col col-12 d-flex justify-content-start">
                        <code>import matplotlib.pyplot as plt</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.imread('path_to_your_image.jpg')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Flatten the image array</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>pixels = image.reshape((-1, 3))
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Specify the number of clusters (adjust
                            as needed)</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>num_clusters = 5
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Perform K-means clustering</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kmeans = KMeans(n_clusters=num_clusters, random_state=42)
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>kmeans.fit(pixels)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Get cluster labels and centroids</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>labels = kmeans.labels_
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>centers = kmeans.cluster_centers_
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Create the segmented image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>segmented_image = centers[labels].reshape(image.shape)
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            # Display the original and clustered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.figure(figsize=(10, 5))</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 1)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Original Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.subplot(1, 2, 2)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.imshow(segmented_image)</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.title('Clustered Image')</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>plt.show()</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
    $('#dropdown-clustering-matlab-script-code').click(function () {
        $('#clustering-python-code').remove();
        let content = `                <div class="container" id="clustering-matlab-code">
                    <div class="mb-1"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the original image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>original_image = imread('path_to_your_image.jpg');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>image = double(original_image);
                        </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Flatten the image array</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>[rows, cols, channels] = size(image);
                            </code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>pixels = reshape(image, rows * cols, channels);
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Specify the number of clusters (adjust
                            as needed)</span></div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>num_clusters = 5;
                            </code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Perform K-means clustering
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>[idx, centers] = kmeans(pixels, num_clusters);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Reshape the pixel indices to form the clustered image
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>segmented_image = reshape(idx, rows, cols);</code>
                    </div>
                    <div class="mb-3"></div>
                    <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                            % Display the original and clustered images
                        </span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>figure;</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 1), imshow(original_image), title('Original Image');</code>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>subplot(1, 2, 2), imagesc(segmented_image), colormap(gca, jet), colorbar, title('Clustered Image');</code>
                    </div>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    })
})


