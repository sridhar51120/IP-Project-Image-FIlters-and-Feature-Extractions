$(document).ready(function () {
    $('.btn-load-img-region-growing').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/region_growing'
        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                // console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                // console.error('Request failed:', errorThrown);
            });
        $.get("/modals/region_growing", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#region-growing-modal').modal('show');
            $('#btn-region-growing-modal-close').click(function () {
                $('#region-growing-modal').modal('hide');
                $('#region-growing-modal').remove();
            });
            const submit_image = document.getElementById('btn-region-growing-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('region-growing-input-image');
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
                            url: '/filters3/region_growing_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#region-growing-modal').modal('hide');
                                $('#region-growing-modal').remove();
                                $('.region-growing-image-collapse').append(data['template']);
                                $('.output-region-growing-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.region-growing-user-image').remove();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['region_growing']}" id="${data['region_growing']}" alt="Region Growing Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-region-growing-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-region-growing-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['region_growing']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-region-growing').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['region_growing']}`;
                                    a.download = "regiom_growing_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.region-growing-user-image').offset().top
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
    $('.btn-load-video-tutorial-region-growing').click(function () {
        $.get("/user_tutorial_video/region_growing", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#region-growing-user-video-tutorial-modal').modal('show');
            $('.region-growing-user-video-tutorial-modal-close').click(function () {
                $('#region-growing-user-video-tutorial-modal').modal('hide');
                $('#region-growing-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-region-growing-matlab-script-code').click(function () {
        $('#region-merging-python-code').remove();
        let content = `                <div class="container" id="region-merging-matlab-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Read the image</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = imread('path_to_your_image.jpg');</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Convert the image to grayscale</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>gray_image = rgb2gray(image);</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">% Use k-means clustering for initial
                        segmentation</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>numClusters = 5;
                    </code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>initialSegments = imsegkmeans(gray_image, numClusters);
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Use regionprops for region merging
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>stats = regionprops(initialSegments, 'PixelList');</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>mergedSegments = initialSegments;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Define a similarity threshold for merging regions (adjust as needed)
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>similarityThreshold = 500;</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Merge regions based on similarity
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for i = 1:numel(stats)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>currentPixelList = stats(i).PixelList;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>for j = i+1:numel(stats)</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>comparePixelList = stats(j).PixelList;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>if pdist2(currentPixelList, comparePixelList) < similarityThreshold</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code> mergedSegments(initialSegments == j) = i;</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>end</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Display the merged segments
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imshow(label2rgb(mergedSegments))</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        % Save the merged segments
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>imwrite(label2rgb(mergedSegments), 'merged_segments.jpg');</code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
    $('#dropdown-region-growing-python-code').click(function () {
        $('#region-merging-matlab-code').remove();
        let content = `                <div class="container" id="region-merging-python-code">
                <div class="mb-1"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Import Required Library</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>from skimage import io, segmentation, color</code>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>import numpy as np</code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Read the image </span></div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>image = io.imread('path_to_your_image.jpg')                       </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace"># Perform Felzenszwalb's region
                        merging</span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>segments_felzenszwalb = segmentation.felzenszwalb(image, scale=100, sigma=0.5, min_size=50)
                    </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Generate a segmented image using the region average color
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>segmented_image_felzenszwalb = color.label2rgb(segments_felzenszwalb, image, kind='avg')                        </code>
                </div>
                <div class="mb-3"></div>
                <div class="col col-12 d-flex justify-content-start"><span class="text-muted text-center fs-6 fw-normal font-monospace">
                        # Save the segmented image
                    </span>
                </div>
                <div class="col col-12 d-flex justify-content-start">
                    <code>io.imsave('segmented_image_felzenszwalb.jpg', segmented_image_felzenszwalb)
                    </code>
                </div>
            </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });
})