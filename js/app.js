var btt = $('#back-to-top');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btt.addClass('show');
    } else {
        btt.removeClass('show');
    }
});

btt.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});
