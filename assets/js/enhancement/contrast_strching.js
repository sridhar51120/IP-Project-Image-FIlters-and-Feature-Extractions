$(document).ready(function () {
    $('.btn-load-img-contrast-strching').click(function () {
        $.get("/modals/contrast_strching", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#contrast-image-modal').modal('show');

            $('#btn-contrast-modal-close').click(function () {
                $('#contrast-image-modal').modal('hide');
            });
            const btn_contrast_strching_submit_image = document.getElementById('btn-contrast-strching-input-image-submit');
            $(btn_contrast_strching_submit_image).click(function () {
                const contrast_strching_input_image = document.getElementById('contrast-strching-input-image');
                if (contrast_strching_input_image.files.length > 0) {
                    const fileName = contrast_strching_input_image.files[0].name;
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#contrast-image-modal').modal('hide');
                        $.ajax({
                            url: '/enhancement/Contrast_Stretching_output',
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
                                // $('.contra-toast-container-alert').append(template);
                                // $('.file-selected-alert').toast('show');
                                // setTimeout(function () {
                                //     $('.file-selected-alert').toast('hide');
                                // }, 6000);
                                // alert(data);
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.contrast-strching-image-collapse').append(data['template']);
                                $('#output-contrast-strching-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['contrast_img']}" id="${data['contrast_img']}" alt="Contrast Strching Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-contrast-strching-output-original-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-contrast-strching-output-image-show').click(function () {
                                    var viewer = new Viewer(document.getElementById(`${data['contrast_img']}`), {
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
                        alert("Invalid extension");
                        // var template = `
                        // <div class="toast-container bottom-0 end-0 p-3 ">
                        //     <div class="toast invalid-extension-alert bg-danger" id='invalid-extension-alert' role="alert" aria-live="assertive" aria-atomic="true">
                        //         <div class="toast-body">
                        //             <strong class='text-muted'>Error: Invalid File Extension</strong>
                        //         </div>
                        //     </div>
                        // </div>
                        // `
                        // $('.contrast-toast-container-alert').append(template);
                        // $('.invalid-extension-alert').toast('show');
                        // setTimeout(function () {
                        //     $('.invalid-extension-alert').toast('hide');
                        // }, 6000);
                    }
                } else {
                    alert("File not Found")
                    // var template = `
                    // <div class="toast-container bottom-0 end-0 p-3 ">
                    //     <div class="toast file-not-found-alert bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                    //         <div class="toast-body">
                    //             <strong class='text-muted'>Error: No file selected.</strong>
                    //         </div>
                    //     </div>
                    // </div>
                    // `
                    // $('.contrast-toast-container-alert').append(template);
                    // $('.file-not-found-alert').toast('show');
                    // setTimeout(function () {
                    //     $('.file-not-found-alert').toast('hide');
                    // }, 6000);

                }
            })
        });
    });
});
