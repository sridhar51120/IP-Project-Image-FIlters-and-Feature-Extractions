$(document).ready(function () {
    $('.btn-load-img-notch-filter').click(function () {
        $.get("/modals/notch_filter", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#notch-filter-image-modal').modal('show');
            $('#btn-notch-filter-modal-close').click(function () {
                $('#notch-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-notch-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('notch-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#notch-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/notch_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.notch-filter-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-notch-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['notch_filter']}" id="${data['notch_filter']}" alt="Notch Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-notch-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-notch-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['notch_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-notch-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['notch_filter']}`;
                                    a.download = "notch_filter_output_img.jpg";
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

