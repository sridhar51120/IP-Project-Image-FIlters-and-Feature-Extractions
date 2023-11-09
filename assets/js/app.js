$(document).ready(function () {
    $('.btn-user-guide-modal').click(function () {
        const data = `<div class="modal fade" id="UserGuideModal"  aria-labelledby="UserGuideModalLabel" tabindex="-1" role="dialog" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-primary">System Requirements</h5>
                </div>
                <div class="modal-body">
                <div class="container">
                    <p class="font-weight-bold">To utilize our Web App, you typically require several libraries and modules to be
                        installed in your system.</p>
                    <div class="python">
                        <h5 class="text-dark">For Python</h5>
                        <p>Download the requirements file and execute the subsequent commands to install the necessary packages on
                            your system.</p>
                        <button class="btn btn-primary btn-sm btn-download-requirements-file-system-requirements">
                            Show Requirements
                        </button>
                        <div class="collapse" id="for-python-code-snippets">
                            <br>
                            <div class="card card-body">
                                <div id="Required-content">
                                    <div class="row">
                                        <div class="d-flex justify-content-end">
                                            <button class="btn btn-primary btn-copy-content-code-requirement btn-sm">
                                            <div class="change-icon-clipboard-icon-requirments-file">
                                            <i class="bi bi-clipboard b-icon-clipboard-fill-requirements-file"></i>
                                        </div></button>
                                        </div>
                                        <code>Flask</code>
                                        <code>numpy</code>
                                        <code>opencv-python</code>
                                        <code>scipy</code>
                                        <code>matplotlib</code>
                                        <code>skimage</code>
                                        <code>pandas</code>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="card card-body">
                                Copy the ablove Content and create <b>requirement.txt</b> and Paste it to that file and run the below command in our
                                system
                            </div>
                            <br>
                            <div class="card card-body">
                                pip install -r requirement.txt
                            </div>
                        </div>
                    </div>
                    <div class="mb-3"></div>
                    <div class="python">
                        <h5 class="text-dark">For MatLab Tool</h5>
                        <p>copy the respective code and go to the matlab tool and paste the code into matlab code pallate and run
                            the matlab code</p>
                        <a href="https://youtu.be/uHpeViKdWW8?feature=shared" class="btn btn-primary btn-sm" target="_blank">How Can i Run the
                            Matlab Tool</a>
                    </div>
                </div>
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-system-requirements-modal-close" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
        </div>
        `;
        $('#code-block').append(data);
        $('#UserGuideModal').modal('show');

        $('.btn-system-requirements-modal-close').click(function () {
            $('#UserGuideModal').modal('hide');
            location.reload();
        });
        $('.btn-download-requirements-file-system-requirements').click(function () {
            $("#for-python-code-snippets").collapse("toggle");
            var toggleState = $("#for-python-code-snippets").hasClass("show");
            if (toggleState) {
                $("#for-python-code-snippets").attr("data-toggle", "");
            } else {
                $("#for-python-code-snippets").attr("data-toggle", "collapse");
            }

        })
        $('.btn-copy-content-code-requirement').click(function () {
            var codeBlock = document.getElementById('Required-content');
            var range = document.createRange();
            range.selectNode(codeBlock);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            let data = `<i class="bi bi-0-square-fill b-icon-square-fill-requirements-file"></i>`;
            $('.b-icon-clipboard-fill-requirements-file').remove();
            $('.change-icon-clipboard-icon-requirments-file').append('<i class="bi bi-check2-circle"></i>');
            setTimeout(function () {
                $('.b-icon-square-fill-requirements-file').remove();
                $('.change-icon-clipboard-icon-requirments-file').append('<i class="bi bi-clipboard b-icon-clipboard-fill-requirements-file"></i>');
            }, 3000);
        })
    })

    $('.btn-copy-content-code').click(function () {
        var codeBlock = document.getElementById('code-block');
        var range = document.createRange();
        range.selectNode(codeBlock);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        let data = `<i class="bi bi-0-square-fill"></i>`;
        $('.bi-clipboard').remove();
        $('.change-icon-clipboard-icon').append('<i class="bi bi-check2-circle"></i>');
        setTimeout(function () {
            $('.bi-check2-circle').remove();
            $('.change-icon-clipboard-icon').append('<i class="bi bi-clipboard"></i>');
        }, 3000);
    })
})
// For Side Bar Collapse
$(document).ready(function () {
    $(".sidebar-title-digital-image-fundamentals").click(function () {
        $(".sidebar-collapse-content-digital-image-fundamentals").collapse("toggle");
        var toggleState = $(".sidebar-collapse-content-digital-image-fundamentals").hasClass("show");
        if (toggleState) {
            $(".sidebar-collapse-content-digital-image-fundamentals").attr("data-toggle", "");
        } else {
            $(".sidebar-collapse-content-digital-image-fundamentals").attr("data-toggle", "collapse");
        }
    });

    $(".sidebar-title-image-enhancement-restoration").click(function () {
        $(".sidebar-collapse-content-image-enhancement-restoration").collapse("toggle");
        var toggleState = $(".sidebar-collapse-content-image-enhancement-restoration").hasClass("show");
        if (toggleState) {
            $(".sidebar-collapse-content-image-enhancement-restoration").attr("data-toggle", "");
        } else {
            $(".sidebar-collapse-content-image-enhancement-restoration").attr("data-toggle", "collapse");
        }
    });

    $(".sidebar-title-image-segmentation-description").click(function () {
        $(".sidebar-collapse-content-image-segmentation-description").collapse("toggle");
        var toggleState = $(".sidebar-collapse-content-image-segmentation-description").hasClass("show");
        if (toggleState) {
            $(".sidebar-collapse-content-image-segmentation-description").attr("data-toggle", "");
        } else {
            $(".sidebar-collapse-content-image-segmentation-description").attr("data-toggle", "collapse");
        }
    });

    $(".sidebar-title-image-compression").click(function () {
        $(".sidebar-collapse-content-image-compression").collapse("toggle");
        var toggleState = $(".sidebar-collapse-content-image-compression").hasClass("show");
        if (toggleState) {
            $(".sidebar-collapse-content-image-compression").attr("data-toggle", "");
        } else {
            $(".sidebar-collapse-content-image-compression").attr("data-toggle", "collapse");
        }
    });

    $(".sidebar-title-image-restoration").click(function () {
        $(".sidebar-collapse-content-image-restoration").collapse("toggle");
        var toggleState = $(".sidebar-collapse-content-image-restoration").hasClass("show");
        if (toggleState) {
            $(".sidebar-collapse-content-image-restoration").attr("data-toggle", "");
        } else {
            $(".sidebar-collapse-content-image-restoration").attr("data-toggle", "collapse");
        }
    });
});




