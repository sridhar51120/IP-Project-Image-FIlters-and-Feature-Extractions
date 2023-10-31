$(document).ready(function () {
    $('.btn-load-img-high-pass-filter').click(function () {
        $.get("/modals/high_pass_filter_filter", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#high-pass-filter-image-modal').modal('show');
            $('#btn-high-pass-filter-modal-close').click(function () {
                $('#high-pass-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-high-pass-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('high-pass-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#high-pass-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/high_pass_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.high-pass-filter-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-high-pass-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['high_pass_filter']}" id="${data['high_pass_filter']}" alt="High Pass Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-high-pass-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-high-pass-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['high_pass_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-high-pass-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['high_pass_filter']}`;
                                    a.download = "high_pass_output_img.jpg";
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

