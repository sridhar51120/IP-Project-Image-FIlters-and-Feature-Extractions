$(document).ready(function () {
    $('.btn-load-img-unsharp-masking').click(function () {
        $.get("/modals/unsharp_masking", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#unsharp-masking-filter-image-modal').modal('show');
            $('#btn-unsharp-masking-filter-modal-close').click(function () {
                $('#unsharp-masking-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-unsharp-masking-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('unsharp-masking-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#unsharp-masking-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters2/unsharp_masking_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.unsharp-masking-input-image-collapse').append(data['template']);
                                data['template']
                                $('.output-unsharp-masking-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['unsharp_masking']}" id="${data['unsharp_masking']}" alt="UnSharp Masking Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-unsharp-masking-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-unsharp-masking-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['unsharp_masking']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-unsharp-masking').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['unsharp_masking']}`;
                                    a.download = "unsharp_masking_output_img.jpg";
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

