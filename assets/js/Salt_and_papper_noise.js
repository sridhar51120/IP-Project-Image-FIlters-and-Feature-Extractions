$(document).ready(function () {
    $('.btn-load-img-salt-and-papper-noise').click(function () {
        // alert("Button clicked");
        $.get("/modals/salt_and_papper_noise", function (data) {
            console.log("Data received:", data);
            $('.modal-content').append(data);
            $('#salt-and-papper-noise-image-modal').modal('show');

            $('#btn-salt-and-papper-noise-modal-close').click(function () {
                $('#salt-and-papper-noise-image-modal').modal('hide');
            });

            const submit_image = document.getElementById('btn-salt-and-papper-noise-input-image-submit');
            $(submit_image).click(function () {
                const input_image = document.getElementById('salt-and-papper-noise-input-image');
                if (input_image.files.length > 0) {
                    const fileName = input_image.files[0].name;
                    // alert(fileName);
                    if (/\.(jpg|png)$/i.test(fileName)) {
                        $('#salt-and-papper-noise-image-modal').modal('hide');
                        $.ajax({
                            url: '/filter1/salt_and_papper_noise_output',
                            type: 'POST',
                            data: new FormData(document.getElementById('uploadForm')),
                            processData: false,
                            contentType: false,
                            success: function (data, response) {
                                console.log('Server response:', response);
                                console.log('Data : ', data);

                                $('.salt-and-papper-noise_image_collapse').append(data['template']);
                                $('.output-salt-and-papper-noise-toggle-groups').collapse({
                                    toggle: false
                                }).show();

                                var image_template = `
                            <img src="${data['img_url']}" id="${data['img_url']}" alt="original Image" style="display:none;">
                            <img src="${data['salt_and_papper_noise']}" id="${data['salt_and_papper_noise']}" alt="Salt and Papper Noise Image" style="display:none;">
                            `;
                                $(document.body).append(image_template);

                                $('.btn-salt-and-papper-noise-output-original-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['img_url']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-salt-and-papper-noise-output-image-show').click(function () {
                                    new Viewer(document.getElementById(`${data['salt_and_papper_noise']}`), {
                                        loop: true,
                                        interval: 500
                                    }).show();
                                });
                                $('.btn-download-img-salt-and-papper-noise').click(function () {
                                    const a = document.createElement("a");
                                    a.href = `${data['salt_and_papper_noise']}`;
                                    a.download = "Salt_and_papper_Noise_img.jpg";
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
