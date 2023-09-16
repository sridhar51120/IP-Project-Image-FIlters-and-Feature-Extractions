$(document).ready(function () {
    $('.btn-load-img-spatial-filter').click(function () {
        $.get("/modals/spatial", function (data) {
            // console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#spatial-image-modal').modal('show');
            $('#btn-spatial-modal-close').click(function () {
                $('#spatial-image-modal').modal('hide');
            });
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
                                // var template = `
                                //         <div class="toast-container bottom-0 end-0 p-3 ">
                                //             <div class="toast file-selected-alert bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                                //                 <div class="toast-body">
                                //                     <strong class='text-muted'> ${fileName} file has been Selected</strong>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     `
                                // $('.spatial-toast-container-alert').append(template);
                                // $('.file-selected-alert').toast('show');
                                // setTimeout(function () {
                                //     $('.file-selected-alert').toast('hide');
                                // }, 6000);
                                console.log('Server response:', response);
                                console.log('Data : ', data);

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
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-spatial-filter-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['spatial_filter']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
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
                       console.log("Extension not valid")
                    }
                } else {
                    // var template = `
                    // <div class="toast-container bottom-0 end-0 p-3 ">
                    //     <div class="toast file-not-found-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    //         <div class="toast-body">
                    //             <strong class='text-muted'>Error: No file selected.</strong>
                    //         </div>
                    //     </div>
                    // </div>
                    // `
                    // $('.spatial-toast-container-alert').append(template);
                    // $('.file-not-found-alert').toast('show');
                    // setTimeout(function () {
                    //     $('.file-not-found-alert').toast('hide');
                    // }, 6000);
                }
            })
        });
    });
});
