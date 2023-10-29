$(document).ready(function () {
    $('.btn-load-img-order-statistic').click(function () {
        // alert("Button clicked");
        $.get("/modals/order_statics", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#order-statics-image-modal').modal('show');

            $('#btn-order-statics-modal-close').click(function () {
                $('#order-statics-image-modal').modal('hide');
            });
            const btn_order_staitcs_submit_image = document.getElementById('btn-order-statics-img-input-image-submit');
            $(btn_order_staitcs_submit_image).click(function () {
                const deblur_input_image = document.getElementById('order-statics-img-input-image');
                if (deblur_input_image.files.length > 0) {
                    const fileName = deblur_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#order-statics-image-modal').modal('hide');
                        $.ajax({
                            url: '/filter1/Order_statistics_filters_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.order-statistic_image_collapse').append(data['template']);
                                $('.output-oreder-statics-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['Order_statistics']}" id="${data['Order_statistics']}" alt="Ordered Statics Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-oreder-statics-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-oreder-statics-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['Order_statistics']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-oreder-statics').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['Order_statistics']}`;
                                    a.download = "Order_statistics_img.jpg";
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
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
