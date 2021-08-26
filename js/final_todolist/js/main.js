let data = JSON.parse(localStorage.getItem('allData')) || [];
let doneCount = JSON.parse(localStorage.getItem('doneCount')) || 0;
let pendingCount = data.length ;

//DOM
const txt = document.querySelector('.txt');
const addBtn = document.querySelector('.addBtn');
const list = document.querySelector('.list');
const tab = document.querySelector('.tab');
const sum = document.querySelector('.sum')
const deleteAll = document.querySelector('.deleteAll');

//清除tab空白節點
const nodes = tab.childNodes;
nodes.forEach(node => {
    if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
        node.parentNode.removeChild(node);
    }
})


//函式
//初始化
function init() {
    render();
}
init()

//渲染畫面
function render(){
    renderList();
    summary()
}
function renderList() {
    let str = "";
    data.forEach((item, i) => {
        if (item.isChecked) {
            str += `<li  data-status="${item.status}">
        <label class="checkbox" for="">
            <input type="checkbox" data-index="${i}"  checked />
            <span>${item.key}</span>
        </label>
        <a href="#" class="delete" data-index="${i}"></a>
    </li>`;
        } else {
            str += `<li  data-status="${item.status}">
        <label class="checkbox" for="">
            <input type="checkbox" data-index="${i}" />
            <span>${item.key}</span>
        </label>
        <a href="#" class="delete" data-index="${i}"></a>
    </li>`;
        }
    })
    list.innerHTML = str;
}
function summary(){
    let str = '';
    if (tab.childNodes[0].classList.contains('active')) {
        str = `總共有${data.length}個項目`;
        if(data.length === 0){
            list.innerHTML = `<p class="message">目前沒有項目</p>`
        }
    } else if (tab.childNodes[1].classList.contains('active')) {
        str = `總共有${pendingCount}個待完成項目`;
        if(pendingCount === 0){
            list.innerHTML = `<p class="message">目前沒有待完成項目</p>`
        }
    } else if (tab.childNodes[2].classList.contains('active')) {
        str = `總共有${doneCount}個已完成項目`;
        if(doneCount === 0){
            list.innerHTML = `<p class="message">目前沒有已完成項目</p>`
        }
    }
    sum.textContent = str;
}

//移除active
function removeActive() {
    const tabs = document.querySelectorAll(".tab li");
    tabs.forEach(item => {
        item.classList.remove('active');
    })
}
//隱藏pending或done項目
function hideItem() {
    //選定tab節點
    nodes.forEach(node => {
        //當tab在某頁時，顯示或隱藏項目
        const items = list.childNodes;
        if (node.classList.contains('whole') && node.classList.contains('active')) {
            items.forEach(item => {
                item.classList.remove('hide');
            })
        } else if (node.classList.contains('pending') && node.classList.contains('active')) {
            items.forEach(item => {
                item.classList.remove('hide');
                if (item.getAttribute('data-status') === "done") {
                    item.setAttribute("class", "hide")
                }
            })
        } else if (node.classList.contains('done') && node.classList.contains('active')) {
            items.forEach(item => {
                item.classList.remove('hide');
                if (item.getAttribute('data-status') === "pending") {
                    item.setAttribute("class", "hide")
                }
            })
        }
    })
}

//監聽
//新增資料
addBtn.addEventListener('click', function () {
    if(txt.value === "") {
        alert('請輸入待辦內容');
        return
    }else{
        const obj = {};
        obj.key = txt.value;
        obj.isChecked = false;
        obj.status = "pending";
        data.push(obj);
        pendingCount = data.length ;
        localStorage.setItem('allData', JSON.stringify(data));
        if(tab.lastChild.classList.contains('active')){
            removeActive()
            tab.firstChild.classList.add('active');
        }
        render();
        hideItem();
        txt.value = ""
    }
})

//list監聽(checked+刪除資料)
list.addEventListener('click', function (e) {
    const num = e.target.dataset.index;

    //checkbox點擊
    if (e.target.localName === "input") {
        //將checked寫進data
        data[num].isChecked = e.target.checked;
        //將狀態寫進data
        if (e.target.checked) {
            data[num].status = "done";
            doneCount ++;
            pendingCount = data.length - doneCount ;
            localStorage.setItem('doneCount', JSON.stringify(doneCount));
        } else {
            data[num].status = "pending";
            doneCount --;
            pendingCount = data.length - doneCount ;
            localStorage.setItem('doneCount', JSON.stringify(doneCount));
        }
        localStorage.setItem('allData', JSON.stringify(data));
        render();
        //顯示或隱藏項目
        hideItem();
    }

    //刪除
    if (e.target.getAttribute('class') === 'delete') {
        if (confirm('確定要刪除嗎?')) {
            data.splice(num, 1);
            localStorage.setItem('allData', JSON.stringify(data));
            render();
            hideItem();
        }
    }
})

//標籤換頁
tab.addEventListener('click', function (e) {
    //增減active
    removeActive();
    e.target.classList.add('active');
    render();
    hideItem();
    console.log(data.length , pendingCount , doneCount);
})

deleteAll.addEventListener('click', function (e) {
    e.preventDefault();
    data.forEach((item, i) => {
        if (item.status === 'done'){
            data.splice(i, 1);
        }
    })
    doneCount = 0 ;
    localStorage.setItem('allData', JSON.stringify(data));
    localStorage.setItem('doneCount', JSON.stringify(doneCount));
    render();
})





