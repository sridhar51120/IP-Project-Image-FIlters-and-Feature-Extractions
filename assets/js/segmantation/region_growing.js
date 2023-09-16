$(document).ready(function () {
    $('.btn-load-img-region-detection').click(function () {
        $.get("/modals/region_detection", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#region-detect-image-modal').modal('show');
            $('#btn-region-growing-modal-close').click(function () {
                $('#region-detect-image-modal').modal('hide');
            });
            const btn_region_detect_submit_image = document.getElementById('btn-region-growing-input-image-submit');
            $(btn_region_detect_submit_image).click(function () {
                const region_input_image = document.getElementById('region-growing-input-image');
                if (region_input_image.files.length > 0) {
                    const fileName = region_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        // TODO: Chcck the encountered error in 


                        // segmantation.region_detection()
                        //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                        //     File "E:\GITHUB\Image-FIlters-and-Feature-Extractions\src\Segmentation.py", line 35, in region_detection
                        // cv2.watershed(image, markers)
                        // cv2.error: OpenCV(4.8.0) D: \a\opencv - python\opencv - python\opencv\modules\imgproc\src\segmentation.cpp: 161: error: (-215:Assertion failed) src.type() == CV_8UC3 && dst.type() == CV_32SC1 in function 'cv::watershed'

            $.ajax({
                url: '/segmentation/Region_growing_output',
                type: 'POST',
                data: new FormData(document.getElementById('uploadForm')),
                processData: false,
                contentType: false,
                success: function (data, response) {
                    $('#region-detect-image-modal').modal('hide');
                    console.log('Server response:', response);
                    console.log('Data : ', data);
                    $('.region-input-image-collapse').append(data['template']);
                    $('#output-region-detection-toggle-groups').collapse({
                        toggle: false
                    }).show();

                    var image_template = `
                <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                <img src="${data['region_detection']}" id="${data['region_detection']}" alt="Region Detection Image" style="display:none;">
                `;
                    $(document.body).append(image_template);
                    $('.btn-region-detection-output-original-image-show').click(function () {
                        var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                            loop: true,
                            interval: 500
                        }).show();
                    });
                    $('.btn-region-detection-output-image-show').click(function () {
                        var viewer = new Viewer(document.getElementById(`${data['region_detection']}`), {
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
            // var template = `
            // <div class="toast-container bottom-0 end-0 p-3 ">
            //     <div class="toast invalid-extension-alert bg-danger" id='invalid-extension-alert' role="alert" aria-live="assertive" aria-atomic="true">
            //         <div class="toast-body">
            //             <strong class='text-muted'>Error: Invalid File Extension</strong>
            //         </div>
            //     </div>
            // </div>
            // `
            // $('.region-container-alert').append(template);
            // $('.invalid-extension-alert').toast('show');
            // setTimeout(function () {
            //     $('.invalid-extension-alert').toast('hide');
            // }, 6000);
        }
                } else {
        // var template = `
        // <div class="toast-container bottom-0 end-0 p-3 ">
        //     <div class="toast file-not-found-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
        //         <div class="toast-body">
        //             <strong class='text-muted'>Error: No file selected.</strong>
        //         </div>
        //     </div>
        // </div>
        // `
        // $('.region-container-alert').append(template);
        // $('.file-not-found-alert').toast('show');
        // setTimeout(function () {
        //     $('.file-not-found-alert').toast('hide');
        // }, 6000);
    }
            })
        });
    });

});