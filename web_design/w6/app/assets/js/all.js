//去除a標籤href屬性
$(document).ready(function () {
  $('a.disabled').removeAttr('href');
  $('a.disabled>div').removeClass('hover-mask');
});


// iconToggle
$(document).ready(function () {
  // console.log($('.icon-border').siblings())
  $('.icon-border,.icon').on('click', function () {
    $(this).toggleClass('active');
    $(this).siblings('.icon-border,.icon').toggleClass('active');
  });
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