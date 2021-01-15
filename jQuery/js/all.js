$(document).ready(function () {
    //選單收合
    $('.links>li>a').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('active').parent().siblings().find('a').removeClass('active');
    })
    $('.dropdown').on('click', function (e) {
        e.preventDefault();
        $('.dropdown_open').slideToggle();
    })
    
    
    //swiper
    var swiper = new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
    });
    //lightbox
    lightbox.option({
        'positionFromTop': 360,
    });

    //goTop
    $(window).on('scroll', function (e) {
        var scroll_top = window.scrollY;
        // console.log(scroll_top);
      
        if (scroll_top > 80) {
            $('.top').fadeIn(1200);
        } else {
            $('.top').fadeOut(800);
        }
    })
    $('.top a').on('click', function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop:0
        }, 700);  //會跟html：scroll-behavior互相衝突
    })

    //td的hover效果
    $('tr').find('td').hover(function () {
        // over
        $(this).parent().css('background','rgba(0, 204, 153, 0.1)');
    }, function () {
        // out
        $(this).parent().css('background','none');
    });
});