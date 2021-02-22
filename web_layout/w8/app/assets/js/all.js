$(document).ready(function () {
  //去除a標籤href屬性
  $('a.disabled').removeAttr('href');
  $('a.disabled>div').removeClass('hover-mask');
  // iconToggle
  $('.icon-border,.icon').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.icon-border,.icon').toggleClass('active');
  });

  //表單驗證
  (function () {
    'use strict';
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();

  //返回頁首
  var scroll_top = 0;
  var goTop = document.querySelector('.goTop');

  window.onscroll = function () {
    var scroll_top = window.scrollY;
    console.log(scroll_top)

    if (scroll_top > 80) {
      goTop.classList.remove('d-none')
    } else {
      goTop.classList.add('d-none')
    }
  }

  //animate.css取代AOS
  AOS.init({
    useClassNames: true,
    initClassName: false,
    animatedClassName: 'animate__animated',
  });


  ////////////////////swiper////////////////////
  //swiper.banner
  var swiper = new Swiper('.swiper-container.banner', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var container = $('.container').css('margin-left');
  console.log(container);
  $(document).ready(function () {
    $('.banner .swiper-button-prev').css({
      'margin-left': container
    });
    $('.banner .swiper-button-next').css({
      'margin-right': container
    });
    $(window).resize(function () {
      window.location.reload();
    });
  });


  //Top Choices
  var swiper = new Swiper('.swiper-container.topChoice', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });


  //Get Inspiration
  var swiper = new Swiper('.swiper-container.inspiration', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 480px
      768: {
        slidesPerView: 3,
      },
    }
  });
  ////////////////////swiper////////////////////

  //icon旋轉
  $('.reserve_toggle').click(function () {
    $('.reserve_toggle_title').toggleClass('visibility_hid');
    $('.reserve_toggle_icon').toggleClass('transform_rotate180');
  })

  //dateRange
  $(function () {
    var start = "17 JUN";
    var end = "19 JUN";

    function cb(start, end) {
      $('.inDate').html(start);
      $('.outDate').html(end);
    }

    $('.calendar').daterangepicker({
      "startDate": start,
      "endDate": end,
      locale: {
        format: 'D MMM'
      }
    }, cb);
    cb(start, end);
  });

  $('li>a').on('click', function(e) {
    $(this).addClass('active').parent().siblings().find('a').removeClass('active');
  })

  // result filter
  $('.result_filter').on('click', function(e) {
    e.preventDefault();
    $('.filter_content').slideToggle();
  }) 
  $('.result_sort').on('click', function(e) {
    e.preventDefault();
    $('.sort_content').slideToggle();
  }) 


});











//counter
// var num = 0;

// function click(num_var){
//   num = num + num_var;
//   $(".num").text(num);
// };

// $(".minus").click(
//   function(){
//     click(-1);
//     check();
//   }
// );

// $(".plus").click(
//   function(){
//     click(1)
//     check();
//   }
// );