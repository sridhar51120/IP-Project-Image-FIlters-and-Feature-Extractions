(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
    
    // For Changing Background Theme
    $('.btn-change-background-theme').on('click', function () {
        if ($('#code-block').hasClass('bg-dark')) {
            $('#code-block').removeClass('bg-dark');
            $('#code-block').addClass('bg-white');
        } else {
            $('#code-block').removeClass('bg-white');
            $('#code-block').addClass('bg-dark');
        }
    });
})(jQuery);




