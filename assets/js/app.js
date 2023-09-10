$(document).ready(function () {
    $('.btn-load-img-histogram-equal').click(function () {
        $('#histogram-image-modal').modal('show');
    });
    $('#btn-histogram-modal-close').click(function () {
        $('#histogram-image-modal').modal('hide');
    });

    $(document).ready(function () {
        const btn_histogram_submit_image = document.getElementById('btn-histogram-modal-submit');
        $(btn_histogram_submit_image).click(function () {
            const histogram_input_image = document.getElementById('histogram-input-image');
            if (histogram_input_image.files.length > 0) {
                const fileName = histogram_input_image.files[0].name;
                if (/\.(jpg|png)$/i.test(fileName)) {
                    // alert(fileName); 
                    $.ajax({
                        url: '/enhancement/Histogram_Equalization_output',
                        type: 'POST',
                        data: new FormData(document.getElementById('uploadForm')), // formdata only work in 'document.getElementById()' 
                        processData: false,
                        contentType: false,
                        success: function (data, response) {
                            // console.log('Server response:', response);
                            console.log('Data : ', data);
                            $('.histo_image_collapse').append(data['template']);
                            $(".output-histogram-toggle-groups").collapse("toggle");
                            var toggleState = $(".output-histogram-toggle-groups").hasClass("show");

                            if (toggleState) {
                                $(".output-histogram-toggle-groups").attr("data-toggle", "");
                            } else {
                                $(".output-histogram-toggle-groups").attr("data-toggle", "collapse");
                            }

                            var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['histo_img']}" id="${data['histo_img']}" alt="Histogram Image" style="display:none;">
                            `;
                            $(document.body).append(image_template);

                            $('.btn-histogram-output-histo-image-show').click(function () {
                                var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                    loop: true,
                                    interval: 500
                                }).show();
                            });
                            $('.btn-histogram-output-histo-image-show').click(function () {
                                var viewer = new Viewer(document.getElementById(`${data['histo_img']}`), {
                                    loop: true,
                                    interval: 500
                                }).show();
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
                    $('#histogram-image-modal').modal('hide');
                    var template = `
                        <div class="toast-container top-0 start-0 p-3 ">
                            <div class="toast file-selected-alert bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-body">
                                    <strong> ${fileName} file Selected</strong>
                                </div>
                            </div>
                        </div>
                        `
                    $('.toast-container-alert').append(template);
                    $('.file-selected-alert').toast('show');
                    setTimeout(function () {
                        $('.file-selected-alert').toast('hide');
                    }, 6000);
                    // $('.toast-container-alert').remove();
                } else {
                    var template = `
                    <div class="toast-container top-0 start-0 p-3 ">
                        <div class="toast invalid-extension-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-body">
                                <strong>Error: Invalid File Extension</strong>
                            </div>
                        </div>
                    </div>
                    `
                    $('.toast-container-alert').append(template);
                    $('.invalid-extension-alert').toast('show');
                    setTimeout(function () {
                        $('.invalid-extension-alert').toast('hide');
                    }, 6000);
                    // $('.toast-container-alert').remove();
                }
            } else {
                var template = `
                <div class="toast-container top-0 start-0 p-3 ">
                    <div class="toast file-not-found-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-body">
                            <strong>Error: No file selected.</strong>
                        </div>
                    </div>
                </div>
                `
                $('.toast-container-alert').append(template);
                $('.file-not-found-alert').toast('show');
                setTimeout(function () {
                    $('.file-not-found-alert').toast('hide');
                }, 6000);
                // $('.toast-container-alert').remove();
            }
        })
    });

});
