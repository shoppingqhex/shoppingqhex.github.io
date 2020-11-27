"use strict";

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

currentPage();
//# sourceMappingURL=all.js.map
