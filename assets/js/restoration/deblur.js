$(document).ready(function () {
    $('.btn-load-img-deblur').click(function () {
        var template = `
            <div class="container-fluid pt-4 px-4">
                <div class="collapse deblur-input-image-collapse-template">
                    <div class="bg-secondary text-center rounded p-4">
                        <div class="card card-body bg-dark text-secondary">
                            <div class="d-flex align-items-start justify-content-start">
                                <h6 class="text-primary">Upload your Image</h6>
                            </div>
                        </div>
                        <div class="mb-3"></div>
                        <div class="bg-secondary ">
                            <div class="card bg-dark">
                                <div class="card-body">
                                    <h5 class="card-title text-danger d-flex justify-content-start">
                                        File
                                        <span class="text-danger"><strong> *</strong></span>
                                    </h5>
                                    <form id="uploadForm" enctype="multipart/form-data">
                                        <input class="form-control d-flex justify-content-start border border-success" type="file"
                                            name="deblur-input-image-file" id="deblur-input-image" autocomplete="Image">
                                    </form>
                                </div>
                                <div class="card-footer ">
                                    <button class="btn btn-success d-flex justify-content-start"
                                        id="btn-deblur-input-image-submit">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        $('.deblur-strching-input-image-collapse').append(template);
        $('.deblur-input-image-collapse-template').collapse({
            toggle: false
        }).show();

        const btn_deblur_submit_image = document.getElementById('btn-deblur-input-image-submit');
        $(btn_deblur_submit_image).click(function () {
            const deblur_input_image = document.getElementById('deblur-input-image');
            if (deblur_input_image.files.length > 0) {
                const fileName = deblur_input_image.files[0].name;
                alert(fileName);
                if (/\.(jpg|png)$/i.test(fileName)) {
                    $.ajax({
                        url: '/restoring/deblur_output',
                        type: 'POST',
                        data: new FormData(document.getElementById('uploadForm')),
                        processData: false,
                        contentType: false,
                        success: function (data, response) {
                            var template = `
                                    <div class="toast-container bottom-0 end-0 p-3 ">
                                        <div class="toast file-selected-alert bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                                            <div class="toast-body">
                                                <strong class='text-muted'> ${fileName} file has been Selected</strong>
                                            </div>
                                        </div>
                                    </div>
                                `
                            $('.deblur-toast-container-alert').append(template);
                            $('.file-selected-alert').toast('show');
                            setTimeout(function () {
                                $('.file-selected-alert').toast('hide');
                            }, 6000);
                            console.log('Server response:', response);
                            console.log('Data : ', data);

                            $('.deblur-image-collapse').append(data['template']);
                            $('#output-deblur-toggle-groups').collapse({
                                toggle: false
                            }).show();

                            var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['deblur_img']}" id="${data['deblur_img']}" alt="Deblured Image" style="display:none;">
                            `;
                            $(document.body).append(image_template);

                            $('.btn-deblur-output-original-image-show').click(function () {
                                var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                    loop: true,
                                    interval: 500
                                }).show();
                            });
                            $('.btn-deblur-output-image-show').click(function () {
                                var viewer = new Viewer(document.getElementById(`${data['deblur_img']}`), {
                                    loop: true,
                                    interval: 500
                                }).show();
                            });
                        },
                        error: function (xhr, status, error) {
                            console.log('XHR status:', status);
                            console.log('XHR error:', error);
                        },
                        complete: function (xhr, status) {
                            console.log('Request complete. XHR status:', status);
                        }
                    });
                } else {
                    var template = `
                    <div class="toast-container bottom-0 end-0 p-3 ">
                        <div class="toast invalid-extension-alert bg-danger" id='invalid-extension-alert' role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-body">
                                <strong class='text-muted'>Error: Invalid File Extension</strong>
                            </div>
                        </div>
                    </div>
                    `
                    $('.deblur-toast-container-alert').append(template);
                    $('.invalid-extension-alert').toast('show');
                    setTimeout(function () {
                        $('.invalid-extension-alert').toast('hide');
                    }, 6000);
                }
            } else {
                var template = `
                <div class="toast-container bottom-0 end-0 p-3 ">
                    <div class="toast file-not-found-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-body">
                            <strong class='text-muted'>Error: No file selected.</strong>
                        </div>
                    </div>
                </div>
                `
                $('.deblur-toast-container-alert').append(template);
                $('.file-not-found-alert').toast('show');
                setTimeout(function () {
                    $('.file-not-found-alert').toast('hide');
                }, 6000);

            }
        })
    });
});

