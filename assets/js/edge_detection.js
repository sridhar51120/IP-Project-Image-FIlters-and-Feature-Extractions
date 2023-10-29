$(document).ready(function () {
    $('.btn-load-img-edge-detection').click(function () {
        $.get("/modals/edge_detection", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#edge-detection-image-modal').modal('show');
            $('#btn-edge-detection-modal-close').click(function () {
                $('#edge-detection-image-modal').modal('hide');
            });
            const btn_edge_submit_image = document.getElementById('btn-edge-detect-input-image-submit');
            $(btn_edge_submit_image).click(function () {
                const edge_input_image = document.getElementById('edge-input-image');
                if (edge_input_image.files.length > 0) {
                    const fileName = edge_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $.ajax({
                            url: '/segmentation/Edge_detection_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                $('#edge-detection-image-modal').modal('hide');
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);
                                $('.edge-detect-image-collapse').append(data['template']);
                                $('.output-edge-detection-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['edge_detection']}" id="${data['edge_detection']}" alt="Edge Detection Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-edge-detection-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-edge-detection-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['edge_detection']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-edge-detection').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['edge_detection']}`;
                                    a.download = "cedge_detection_img.jpg";
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