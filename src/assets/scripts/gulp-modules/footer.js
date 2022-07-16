$(function() {
    // при нажатии на кнопку scrollup
    $('.pageup').click(function() {
        // переместиться в верхнюю часть страницы
        if ($.scrollify) {
            $.scrollify.move("#1");
            return;
        }
        $("html, body").animate({
            scrollTop:0
        },1000);
    })

})
