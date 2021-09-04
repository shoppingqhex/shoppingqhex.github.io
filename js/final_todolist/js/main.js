let data = JSON.parse(localStorage.getItem('allData')) || [];
let tabStatus = "whole";

//DOM
const txt = document.querySelector('.txt');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
const tabs = document.querySelector('.tab');
const tab = document.querySelectorAll(".tab li");
const sum = document.querySelector('.sum')
const deleteAll = document.querySelector('.deleteAll');

//渲染畫面
function renderList(arr) {
    let str = "";
    arr.forEach((item,i) => {
        str +=`<li data-id="${item.id}"" data-index="${i}">
        <label class="checkbox" for="">
            <input type="checkbox" ${item.checked} />
            <span>${item.content}</span>
        </label>
        <a href="#" class="delete"></a>
    </li>`
    })
    list.innerHTML = str;
}
//初始化
function init() {
    updateList()
}
init()

//1.新增資料
addBtn.addEventListener('click', addItem);
function addItem() {
    if(txt.value.trim() === "") {
        alert('請輸入待辦內容');
        return
    }else{
        const obj = {};
        obj.content = txt.value.trim();
        obj.checked = "";
        obj.id = new Date().getTime();
        data.push(obj);
        localStorage.setItem('allData', JSON.stringify(data));
        //優化，在已完成頁面新增事項時直接跳回全部頁面
        if(tabStatus === "done"){
            tab.forEach(item => {
                item.classList.remove('active');
            });
            tab[0].classList.add('active');
            tabStatus = "whole"
        }
        updateList();
        txt.value = ""
    }
}
//1.1鍵盤事件
txt.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        addItem()
    }
})

//2.list監聽(checked+刪除資料)
list.addEventListener('click', function (e) {
    const index = e.target.closest('li').dataset.index;
    const id = e.target.closest('li').dataset.id;
    //checkbox點擊
    if (e.target.localName === "input") {
        data.forEach((item, index) => {
            if(item.id == id){
              if(item.checked === ""){
                item.checked = "checked"
              }else{
                item.checked = ""
              }
            }
        })
    }
    //刪除
    if (e.target.getAttribute('class') === 'delete') {
        e.preventDefault();
        if (confirm('確定要刪除嗎?')) {
            data= data.filter(item => item.id != id)
        }
    }
    localStorage.setItem('allData', JSON.stringify(data));
    updateList();
    console.log(data);
})

//3.標籤換頁
tabs.addEventListener('click', function (e) {
    //改變分頁狀態
    tabStatus = e.target.dataset.tab;
    //增減active
    tab.forEach(item => {
        item.classList.remove('active');
    });
    e.target.classList.add('active');
    updateList();
})
//3.1 隨分頁切換改變list
function updateList() {
    let tabData = [];
    if(tabStatus == 'whole'){
        tabData = data
    }else if(tabStatus == 'pending'){
        tabData = data.filter(item => item.checked === "")
    }else if(tabStatus == 'done'){
        tabData = data.filter(item => item.checked === "checked")
    };

    renderList(tabData);
    //總計並顯示目前頁面的項目個數
    let len = tabData.length;
    sum.textContent = `總共有${len}個項目`
    if(len === 0){
        list.innerHTML = `<p class="message">目前沒有資料</p>`
    }
}

//4.刪除全部項目
deleteAll.addEventListener('click', function (e) {
    e.preventDefault();
    if(confirm('確定要刪除所有已完成項目?')){
        data = data.filter(item => item.checked==="");
        localStorage.setItem('allData', JSON.stringify(data));
    }
    updateList();
})