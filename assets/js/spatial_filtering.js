$(document).ready(function () {
    $('.btn-load-img-spatial-filter').click(function () {
        $.get("/modals/spatial", function (data) {
            $('.modal-content').append(data);
            $('#spatial-image-modal').modal('show');
            $('#btn-spatial-modal-close').click(function () {
                $('#spatial-image-modal').modal('hide');
            });''
            const btn_spatial_filter_submit_image = document.getElementById('btn-spatial-filter-input-image-submit');
            $(btn_spatial_filter_submit_image).click(function () {
                const spatial_filter_input_image = document.getElementById('spatial-filter-input-image');
                if (spatial_filter_input_image.files.length > 0) {
                    const fileName = spatial_filter_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#spatial-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Spatial_filtering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.spatial-filter-image-collapse').append(data['template']);
                                $('#output-spatial-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['spatial_filter']}" id="${data['spatial_filter']}" alt="Spatial Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-spatial-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-spatial-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['spatial_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-spatial-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['spatial_filter']}`;
                                    a.download = "spatial_img.jpg";
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
