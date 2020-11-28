"use strict";

/////// series.html 分頁 ///////
var btns = document.querySelectorAll('.btn');
var contents = document.querySelectorAll('.content');

var _loop = function _loop(i) {
  var index = i;
  var btn = btns[i];
  var content = contents[i];

  btns[i].onclick = function () {
    // console.log(index);
    remove_active();
    btn.classList.add('active');
    content.classList.add('active');
  };
};

for (var i = 0; i < btns.length; i++) {
  _loop(i);
}

function remove_active() {
  for (var _i = 0; _i < btns.length; _i++) {
    btns[_i].classList.remove('active');

    contents[_i].classList.remove('active');
  }
} /////// 分頁 ///////
//# sourceMappingURL=all.js.map
