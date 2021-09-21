//DOM
const url = 'https://hexschool.github.io/js-filter-data/data.json';
const list = document.querySelector('.showList');
const btnGroup = document.querySelector('.button-group');
const input = document.querySelector('.rounded-end');
const searchBtn = document.querySelector('#js-search');
const removeBtn = document.querySelector('#js-remove');
const select = document.querySelector('#js-select');
const sortBar = document.querySelector('.js-sort-advanced');

let data = [];
let filterData = [];
let finalData = [];
let type = 'all';

//撈取資料
function getData() {
    axios.get(url)
        .then(function (rsp) {
            data = rsp.data.filter(item => item.作物名稱 !== null);
            filterData = data;
            finalData = filterData;
            render(filterData);
        })
};
getData();
function render(arr) {
    let str = "";
    arr.forEach(item => {
        str += `<tr>
        <td>${item.作物名稱}</td>
        <td>${item.上價}</td>
        <td>${item.中價}</td>
        <td>${item.下價}</td>
        <td>${item.平均價}</td>
        <td>${item.交易量}</td> 
    </tr>`;
    })
    list.innerHTML = str;
};

//種類篩選
btnGroup.addEventListener('click', function (e) {
    if (e.target.localName === 'button') {
        type = e.target.dataset.type;
        finalize()
    }
    const btns = document.querySelectorAll('.button-group button');
    btns.forEach(item => {
        item.classList.remove('active');
    })
    e.target.classList.add('active');
})
function finalize() {
    if (type === "all") {
        render(filterData);
    } else {
        finalData = filterData.filter(item => item.種類代碼 === type);
        if (finalData.length === 0) {
            list.innerHTML = '<tr><td colspan="6" class="text-center p-3">本分類查詢不到相關資料</td></tr>';
        } else {
            render(finalData);
        }
    }
}

//搜尋作物
searchBtn.addEventListener('click', searchFilter);
input.addEventListener('keyup', searchFilter);
removeBtn.addEventListener('click', searchFilter);

function searchFilter(e) {
    if (e.target.localName === "button") {
        if (e.target.getAttribute("id") === "js-search") {
            searchFn()
        } else if (e.target.getAttribute("id") === "js-remove") {
            removeFn()
        }
    } else if (e.target.localName === "input") {
        if (e.key === 'Enter') {
            searchFn()
        } else if (e.key === 'Backspace') {
            if (input.value === "") {
                removeFn()
            }
        }
    }
}

function searchFn() {
    const val = input.value.trim();
    if (val === "") {
        alert('搜尋不能為空值')
    } else {
        filterData = data.filter(item => item.作物名稱.match(val));
        finalize()
    }
}
function removeFn() {
    input.value = "";
    filterData = data;
    finalize();
}


//排序-select
select.addEventListener('change', function (e) {
    switch (e.target.value) {
        case '依上價排序':
            selectChange('上價');
            break;
        case '依中價排序':
            selectChange('中價');
            break;
        case '依下價排序':
            selectChange('下價');
            break;
        case '依平均價排序':
            selectChange('平均價');
            break;
        case '依交易量排序':
            selectChange('交易量');
            break;
    }
})

function selectChange(value) {
    finalData.sort((a, b) => b[value] - a[value]);
    render(finalData);
}

//排序-進階
sortBar.addEventListener('click', function (e) {
    if (e.target.localName !== 'i') {
        return;
    } else {
        const sortName = e.target.dataset.price;
        const sortType = e.target.dataset.sort;
        if (sortType === 'up') {
            finalData.sort((a, b) => b[sortName] - a[sortName]);
        } else {
            finalData.sort((a, b) => a[sortName] - b[sortName]);
        }
    }
    render(finalData);
})