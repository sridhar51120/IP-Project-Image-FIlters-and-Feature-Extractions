$(document).ready(function () {
    $('.btn-load-img-clustering-img').click(function () {
        $.get("/modals/cluster", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#histogram-image-modal').modal('show');
            $('#btn-histogram-modal-close').click(function () {
                $('#histogram-image-modal').modal('hide');
            });
            const btn_cluster_submit_image = document.getElementById('btn-cluster-input-image-submit');
            $(btn_cluster_submit_image).click(function () {
                const cluster_input_image = document.getElementById('cluster-input-image');
                if (cluster_input_image.files.length > 0) {
                    const fileName = cluster_input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#histogram-image-modal').modal('hide');
                        $.ajax({
                            url: '/segmentation/Clustering_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {

                                // console.log('Server response:', response);
                                // console.log('Data : ', data);

                                $('.cluster-image-collapse').append(data['template']);
                                $('#output-clustering-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['clustered_img']}" id="${data['clustered_img']}" alt="Clustered Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-clustering-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-clustering-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['clustered_img']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-clustering-img').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['clustered_img']}`;
                                    a.download = "clustered_img.jpg";
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

