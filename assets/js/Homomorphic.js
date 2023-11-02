$(document).ready(function () {
    $('.btn-load-img-homomarphic-filter').click(function () {
        $.get("/modals/homomarphic_filter", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#homomarphic-filter-image-modal').modal('show');
            $('#btn-homomarphic-filter-modal-close').click(function () {
                $('#homomarphic-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-homomarphic-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('homomarphic-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#homomarphic-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/homomarphic_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.homomarphic-filter-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-homomarphic-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['homomorphic_filter']}" id="${data['homomorphic_filter']}" alt="HomoMarphic Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-homomarphic-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-homomarphic-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['homomorphic_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-homomarphic-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['homomorphic_filter']}`;
                                    a.download = "homomorphic_filter_output_img.jpg";
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

