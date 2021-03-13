$(document).ready(function () {
    $('.textbar').on('click', function (e) {
        $(this).parent().find('table').slideToggle();
    })
});