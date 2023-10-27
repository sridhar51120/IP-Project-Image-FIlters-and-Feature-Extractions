$(document).ready(function () {
    $('.btn-load-img-harmonic-filter').click(function () {
        // alert("Button clicked");
        $.get("/modals/harmonic", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#harmonic-filter-image-modal').modal('show');

            $('#btn-harmonic-filter-modal-close').click(function () {
                $('#harmonic-filter-image-modal').modal('hide');
            });
            const submit_image = document.getElementById('btn-harmonic-filter-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('harmonic-filter-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#harmonic-filter-image-modal').modal('hide');
                        $.ajax({
                            url: '/filters/Hormonic_Filter_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.harmonic-filter_image_collapse').append(data['template']);
                                $('.output-harmonic-filter-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['harmonic_filter']}" id="${data['harmonic_filter']}" alt="Harmonic Filter Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-harmonic-filter-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-harmonic-filter-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['harmonic_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-harmonic-filter').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['harmonic_filter']}`;
                                    a.download = "Harmonic_FIlter_output_img.jpg";
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
