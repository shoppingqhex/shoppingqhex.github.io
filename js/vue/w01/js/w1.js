//資料、畫面、方法、生命週期

//DOM
const addProd = document.getElementById('addProduct');
const clearAll = document.getElementById('clearAll');
const list = document.getElementById('productList');
const count = document.getElementById('productCount');
const prodTitle = document.getElementById('title');
const prodOriginPrice = document.getElementById('origin_price');
const prodPrice = document.getElementById('price');

//資料
let productData = [];
function getData() {
  const timeStamp = Math.floor(Date.now());
  productData.push({
    id: timeStamp,
    title: prodTitle.value.trim(),
    origin_price: parseInt(prodOriginPrice.value) || 0,
    price: parseInt(prodPrice.value) || 0,
    is_enabled: false,
  })
}

//方法
//新增資料
addProd.addEventListener('click', function (e) {
  if (prodTitle.value.trim() !== '') {
    getData();
    renderList();
    prodTitle.value = '';
    prodOriginPrice.value = '';
    prodPrice.value = '';
  }else{
    alert('"產品標題" 不可為空');
    return
  }
});

//刪除全部
clearAll.addEventListener('click', function (e) {
  e.preventDefault();
  productData = [];
  renderList()
});

//刪除單筆或改變狀態
list.addEventListener('click', function (e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (action === 'remove') {
    let newIndex = 0;
    productData.forEach((item, key) => {
      if (id == item.id) {
        newIndex = key;
      }
    })
    productData.splice(newIndex, 1);

  } else if (action === 'status') {
    productData.forEach((item) => {
      if (id == item.id) {
        item.is_enabled = !item.is_enabled;
      }
    })
  }
  renderList()
});

//渲染頁面
function renderList() {
  let str = '';
  productData.forEach((item) => {
    str += `
  <tr>
    <td>${item.title}</td>
    <td width="120">
      ${item.origin_price}
    </td>
    <td width="120">
      ${item.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled? 'checked': ''} data-action="status" data-id="${item.id}">
        <label class="form-check-label" data-action="status" for="${item.id}">${item.is_enabled? '啟用' : '未啟用'}</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
    </td>
  </tr>`;
  })
  list.innerHTML = str;
  count.textContent = productData.length;
}
//生命週期
function init() {
  renderList();
}
init();
