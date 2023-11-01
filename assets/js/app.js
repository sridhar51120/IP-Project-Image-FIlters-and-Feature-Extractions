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
                                    <div class="card card-body">
                                        <pre><code>Flask</code></pre>
                                        <pre><code>numpy</code></pre>
                                        <pre><code>opencv-python</code></pre>
                                        <pre><code>scipy</code></pre>
                                        <pre><code>matplotlib</code></pre>
                                        <pre><code>skimage</code></pre>
                                        <pre><code>pandas</code></pre>
                                    </div>
                                </div>
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
        });
        $('.btn-download-requirements-file-system-requirements').click(function(){
            alert("hello ");
            $('#for-python-code-snippets').collapse('show');
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
        alert('Code copied to clipboard');
    })
})

