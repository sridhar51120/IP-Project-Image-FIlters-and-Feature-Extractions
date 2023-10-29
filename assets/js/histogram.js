$(document).ready(function () {
    $('.btn-load-img-histogram-equal').click(function () {
        $.get("/modals/histogram", function (data) {
            $('.modal-content').append(data);
            const temp = data;
            $('#histogram-image-modal').modal('show');
            $('#btn-histogram-modal-close').click(function () {
                $('#histogram-image-modal').modal('hide');
            });
            const btn_histogram_submit_image = document.getElementById('btn-histogram-input-image-submit');
            $(btn_histogram_submit_image).click(function () {
                const histogram_input_image = document.getElementById('histogram-input-image');
                if (histogram_input_image.files.length > 0) {
                    const fileName = histogram_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#histogram-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Histogram_Equalization_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')), // formdata only work in 'document.getElementById()' 
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.histo_image_collapse').append(data['template']);
                                $(".output-histogram-toggle-groups").collapse("toggle");
                                var toggleState = $(".output-histogram-toggle-groups").hasClass("show");
                                if (toggleState) {
                                    $(".output-histogram-toggle-groups").attr("data-toggle", "");
                                } else {
                                    $(".output-histogram-toggle-groups").attr("data-toggle", "collapse");
                                }

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['histo_img']}" id="${data['histo_img']}" alt="Histogram Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-histogram-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-histogram-output-histo-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['histo_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-histogram').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['histo_img']}`;
                                    a.download = "histo_img.jpg";
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