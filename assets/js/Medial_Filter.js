$(document).ready(function () {
    $('.btn-load-img-meadian-filter').click(function () {
        // alert("Button clicked");
        $.get("/modals/median_filter", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#median-filter-image-modal').modal('show');

            $('#btn-median-filter-modal-close').click(function () {
                $('#median-filter-image-modal').modal('hide');
            });

            const submit_image = document.getElementById('btn-median-filter-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('median-filter-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#median-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filter1/median_filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.meadian-filter_image_collapse').append(data['template']);
                                $('.output-median-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['median_img']}" id="${data['median_img']}" alt="Median Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-medial-filter-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-medial-filter-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['median_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-medial-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['median_img']}`;
                                    a.download = "Median_Filter_img.jpg";
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
