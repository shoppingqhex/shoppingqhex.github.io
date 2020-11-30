"use strict";

//選單active設定
function currentPage() {
  var currentUrl = window.location.pathname.split('/')[2];
  console.log(currentUrl);
  var assignment = document.querySelector('.assignment');
  var admin = document.querySelector('.admin');

  if (currentUrl === 'index.html') {
    assignment.classList.add('active');
  } else if (currentUrl === 'admin.html') {
    admin.classList.add('active');
  }
}

currentPage(); //assignment收合設定

$(".assignment_toggle").click(function () {
  $(".assignment_toggle_body").slideToggle("slow");
}); //modal切換

$(document).ready(function () {
  // console.log("gogogo");
  $('button[data-toggle="modal"][data-dismiss="modal"]').on('click', function () {
    // console.log("fighting");
    var target = $(this).data('target');
    console.log('target', target);
    $(target).on('shown.bs.modal', function () {
      console.log(12 + 12);
      $('body').addClass('modal-open');
    });
  });
});
//# sourceMappingURL=all.js.map
