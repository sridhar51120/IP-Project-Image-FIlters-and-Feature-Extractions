$(document).ready(function () {
    $('.btn-user-guide-modal').click(function () {
        const data = `<div class="modal fade" id="UserGuideModal" aria-labelledby="UserGuideModalLabel" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-primary">System Requirements</h5>
                    <button type="button" class="btn-system-requirements-modal-close btn btn-primary" data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="font-weight-bold"><strong>To utilize our Web App, you typically require several libraries
                            and
                            modules to be
                            installed in your system.</strong></p>
                    <hr class="bg-dark">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="container">
                                    <div class="python">
                                        <h5 class="text-dark">For Python</h5>
                                        <p>Download the requirements file and execute the subsequent commands to install the
                                            necessary
                                            packages on
                                            your system.</p>
                                        <div class="card">
                                            <div class="card-body btn btn-download-requirements-file-system-requirements d-flex justify-content-start text-dark" data-toggle="tooltip" data-placement="top" title="Shows the What all are the requirements needed to run the particular code in our System" >
                                            <b>Show Requirements</b>
                                            </div>
                                        </div>
                                      <div class="collapse" id="for-python-code-snippets">
                                            <br>
                                            <div class="card card-body">
                                                <div id="Required-content">
                                                    <div class="row">
                                                        <div class="d-flex justify-content-end">
                                                            <button
                                                                class="btn btn-primary btn-copy-content-code-requirement btn-sm">
                                                                <div class="change-icon-clipboard-icon-requirments-file">
                                                                    <i
                                                                        class="bi bi-clipboard b-icon-clipboard-fill-requirements-file"></i>
                                                                </div>
                                                            </button>
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
                                                <div class="row">
                                                    <div class="d-flex justify-content-center">
                                                        <strong>( <b>or</b> )</strong>
                                                    </div>
                                                </div>
                                                <br>
                                                <button
                                                    class="btn btn-success btn-sm btn-download-requirment-text-file">Download
                                                    requirement.txt File</button>
    
                                            </div>
                                            <br>
                                            <div class="card card-body">
                                                Copy the ablove Content and create <b>requirement.txt</b> and Paste it to
                                                that
                                                file and
                                                run the below command in our
                                                system
                                            </div>
                                            <br>
                                            <div class="card card-body">
                                                <div id="copy-requirement-command-content">
                                                    <code>pip install -r requirement.txt</code>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="container">
                                <div class="python">
                                    <h5 class="text-dark">For MatLab Tool</h5>
                                    <p>copy the respective code and go to the matlab tool and paste the code into matlab
                                        code
                                        pallate and run
                                        the matlab code</p>
                                    <a href="https://youtu.be/uHpeViKdWW8?feature=shared" class="btn btn-success btn-sm"
                                        target="_blank">How Can i Run the
                                        Matlab Tool</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-system-requirements-modal-close"
                        data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
        `;
        $('#code-block').append(data);
        $('#UserGuideModal').modal('show');
        function showAlert() {
            alert("Card body clicked!");
        }
        $('.btn-download-requirment-text-file').click(function () {
            var lines = [
                "Flask",
                "numpy",
                "opencv-python",
                "scipy",
                "matplotlib",
                "skimage",
                "pandas"
            ];
            var textData = lines.join("\n");
            var blob = new Blob([textData], { type: "text/plain" });
            var a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = "requirement.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        $('.btn-system-requirements-modal-close').click(function () {
            $('#UserGuideModal').modal('hide');
            // location.reload();
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




