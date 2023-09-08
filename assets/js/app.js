$(document).ready(function () {
    $('.btn-load-img-histogram-equal').click(function () {
        $('#histogram-image-modal').modal('show');
    });
    $('#btn-histogram-modal-close').click(function () {
        $('#histogram-image-modal').modal('hide');
    });

    // $('.btn-histogram-modal-submit').click(function () {
    //     const name = $('#histogram-input-image')
    //     const imageName = name.files[0].name;
    //     $.post('/upload', { imageName: imageName }, function (data) {
    //         console.log(data);
    //     });
    // });

    $(document).ready(function () {
        const btn_histogram_submit_image = document.getElementById('btn-histogram-modal-submit');
        $(btn_histogram_submit_image).click(function () {
            const histogram_input_image = document.getElementById('histogram-input-image');
            if (histogram_input_image.files.length > 0) {
                const fileName = histogram_input_image.files[0].name;
                // alert(fileName);
                // TODO: Only acceptable file formate is .jpg and .png
                $('#histogram-image-modal').modal('hide');
                $(".output-histogram-toggle-groups").collapse("toggle");
                var toggleState = $(".output-histogram-toggle-groups").hasClass("show");
                if (toggleState) {
                    $(".output-histogram-toggle-groups").attr("data-toggle", "");
                } else {
                    $(".output-histogram-toggle-groups").attr("data-toggle", "collapse");
                }
            } else {
                alert('No file selected.');
            }
        })
    });

});
