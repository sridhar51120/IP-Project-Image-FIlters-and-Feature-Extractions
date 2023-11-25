$(document).ready(function () {
    $('.btn-load-img-weiner-filter').click(function () {
        var Data = {
            folderName: 'assets/uploads/filters/weiner_filter'

        };
        $.get('/files/isAvailablle_folder', { data: JSON.stringify(Data) })
            .done(function (response) {
                console.log('Server response:', response);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                console.error('Request failed:', errorThrown);
            });
        $.get("/modals/weiner_filter", function (data) {
            // //  console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#weiner-filter-image-modal').modal('show');
            $('#btn-weiner-filter-modal-close').click(function () {
                $('#weiner-filter-image-modal').modal('hide');
                $('#weiner-filter-image-modal').remove();
            });
            const submit_image = document.getElementById('btn-weiner-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('weiner-input-image');
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
                            url: '/filters2/weiner_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('#weiner-filter-image-modal').modal('hide');
                                $('#weiner-filter-image-modal').remove();
                                $('.weiner-input-image-collapse').append(data['template']);
                                $('.output-weiner-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                $('.weiner-user-image').remove();

                                var image_template = `
                                <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                                <img src="${data['weiner_filter']}" id="${data['weiner_filter']}" alt="Weiner Filter Image" style="display:none;">
                                `;
                                $(document.body).append(image_template);

                                $('.btn-weiner-filter-output-original-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-weiner-filter-output-image-show').click(function () {
                                    var $button = $(this);
                                    $button.prop('disabled', true).addClass('bg-danger').text('The Image is Only Available for a Single Viewing.Try Again');
                                    new Viewer(document.getElementById(`${data['weiner_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-weiner-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['weiner_filter']}`;
                                    a.download = "weiner_filter_output_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                });
                                $('.btn-window-localtion-reload').click(function () {
                                    location.reload();
                                    $('html, body').animate({
                                        scrollTop: $('.weiner-user-image').offset().top
                                    }, 1000);
                                });
                            },
                            error: function (xhr, status, error) {
                                $('.alert-container-body').remove();
                                const alert_msg = `
                                    <div class="toast bg-primary alert-container-body" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                                        <div class="toast-body">
                                        <div class="container">
                                        <div class="text-center text-dark ">
                                        <strong class="mr-auto">An error occurred during the processing of your image.<br>Please provide another image to
                                                receive the output.</strong>
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
    $('.btn-load-video-tutorial-weiner').click(function () {
        $.get("/user_tutorial_video/weiner_user_tutorial_video", function (data) {
            $('.user-tutorial-video-content').append(data);
            $('#weiner-user-video-tutorial-modal').modal('show');
            $('.weiner-user-video-tutorial-modal-close').click(function () {
                $('#weiner-user-video-tutorial-modal').modal('hide');
                $('#weiner-user-video-tutorial-modal').remove();
                // location.reload();
            });
        });
    })
})

$(document).ready(function () {
    $('#dropdown-weiner-java-script-code').click(function () {
        $('#weiner-python-code-snippet').remove();
        let content = `<div class="container" id="weiner-JavascriptCode">
                    <div class="mb-1"></div>
                    <pre><code class="python bg-secondary" >// HTML Code</code></pre>
                    <pre><code class="python" >// Create a Input Field with ' type="file" id="fileInput" '</code></pre>
                    <pre><code class="python" >// Create a Canvas Field with ' id="originalCanvas"  ' for Showing Original Image File </code></pre>
                    <pre><code class="python" >// Create a Canvas Field with ' id="wienerCanvas" ' for  Showing Weiner Output FIle</code></pre>
                    <hr>
                    <pre><code class="jscode bg-secondary">// JavaScript Code (include the given code to script tag field )</code></pre>
                    <pre><code class="jscode">document.getElementById('fileInput').addEventListener('change', function(e) {</code></pre>
                    <pre><code class="jscode">  var file = e.target.files[0];</code></pre>
                    <pre><code class="jscode">  var img = new Image();</code></pre>
                    <pre><code class="jscode">  img.onload = function() {</code></pre>
                    <pre><code class="jscode">          var originalCanvas = document.getElementById('originalCanvas');</code></pre>
                    <pre><code class="jscode">          var wienerCanvas = document.getElementById('wienerCanvas');</code></pre>
                    <pre><code class="jscode">          var originalCtx = originalCanvas.getContext('2d');</code></pre>
                    <pre><code class="jscode">                  var wienerCtx = wienerCanvas.getContext('2d');</code></pre>
                    <pre><code class="jscode">                  // Draw the original image on the original canvas</code></pre>
                    <pre><code class="jscode">                  originalCtx.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);</code></pre>
                    <pre><code class="jscode">                  // Here you would apply the Wiener filter algorithm or other image processing techniques</code></pre>
                    <pre><code class="jscode">                  // However, implementing the Wiener filter in pure JavaScript here is complex and not practical</code></pre>
                    <pre><code class="jscode">                  // Display the modified image (in this case, it will just copy the original)</code></pre>
                    <pre><code class="jscode">                  var imgData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);</code></pre>
                    <pre><code class="jscode">                  wienerCtx.putImageData(imgData, 0, 0);</code></pre>
                    <pre><code class="jscode">          };</code></pre>
                    <pre><code class="jscode">      });</code></pre>
                    <pre><code class="jscode"></code></pre>
                </div>`;
        $('#code-block').append(content);
        $('#code-block').html(content);
    });

    $('#dropdown-weiner-python-code').click(function () {
        $('#weiner-JavascriptCode').remove();
        let content = `
            <div class="container" id="weiner-python-code-snippet">
                    <div class="mb-1"></div>
                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace">#Import Required Library</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <code>import numpy as np</code>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <code>import cv2</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Load the degraded image</span>
                    </div>
                    <div class="row">
                        <div class="col col-8 d-flex justify-content-start">
                            <code>degraded_image = cv2.imread('degraded_image.jpg', 0)</code>
                        </div>
                        <div class="col col-4 justify-content-start">
                            <span class="text-muted text-center fs-6 fw-normal font-monospace"># Load as grayscale (0)</span>
                        </div>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Compute the point spread function (PSF) or create a simulated PSF</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># PSF represents the blur in the image caused by the system</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># For simplicity, you can create a simple averaging filter (use a suitable PSF for real
                            images)</span>
                    </div>
                    <div class="row">
                        <div class="col col-8 d-flex justify-content-start">
                            <code>PSF = np.ones((5, 5)) / 25</code>
                        </div>
                        <div class="col col-4 justify-content-start">
                            <span class="text-muted text-center fs-6 fw-normal font-monospace"># Example: 5x5 averaging filter</span>
                        </div>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Wiener deconvolution</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <code>restored_image = cv2.filter2D(degraded_image, -1, PSF)</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Estimate the noise variance in the degraded image</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># In practice, this could be estimated from the known noise characteristics or using
                            statistical methods</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># For this example, let's assume a known variance</span>
                    </div>
                    <div class="col-12 d-flex justify-content-start">
                        <code>noise_var = 0.1</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col col-12 justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Apply Wiener deconvolution to restore the image using the estimated noise
                            variance</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>wiener_restoration = np.fft.ifft2(np.fft.fft2(restored_image) / (np.fft.fft2(PSF) + noise_var))</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col col-12 justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Normalize the restored image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>wiener_restoration = np.uint8(wiener_restoration)</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col col-12 justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Display the original, degraded, and Wiener-restored images</span>
                    </div>
                    <div class="row">
                        <div class="col col-8 d-flex justify-content-start">
                            <code>cv2.imshow('Original Image', cv2.imread('original_image.jpg'))</code>
                        </div>
                        <div class="col col-4 justify-content-start">
                            <span class="text-muted text-center fs-6 fw-normal font-monospace"># Display original image</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-8 d-flex justify-content-start">
                            <code>cv2.imshow('Degraded Image', degraded_image)</code>
                        </div>
                        <div class="col col-4 justify-content-start">
                            <span class="text-muted text-center fs-6 fw-normal font-monospace"># Display Degraded image</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-8 d-flex justify-content-start">
                            <code>cv2.imshow('Wiener-Restored Image', wiener_restoration)</code>
                        </div>
                        <div class="col col-4 justify-content-start">
                            <span class="text-muted text-center fs-6 fw-normal font-monospace"># Display Wiener-Restored image</span>
                        </div>
                    </div>
                    <div class="col col-8 d-flex justify-content-start">
                        <code>cv2.waitKey(0)</code>
                    </div>
                    <div class="col col-8 d-flex justify-content-start">
                        <code>cv2.destroyAllWindows()</code>
                    </div>
                    <div class="mb-3"></div>

                    <div class="col col-12 justify-content-start">
                        <span class="text-muted text-center fs-6 fw-normal font-monospace"># Save the Wiener-restored image</span>
                    </div>
                    <div class="col col-12 d-flex justify-content-start">
                        <code>cv2.imwrite('wiener_restored_image.jpg', wiener_restoration)</code>
                    </div>
                </div>`;

        $('#code-block').append(content);
        $('#code-block').html(content);
    });
});
