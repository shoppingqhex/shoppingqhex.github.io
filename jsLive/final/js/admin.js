//var
const apiUrl = "https://hexschoollivejs.herokuapp.com/api/livejs/v1/admin";
const api_path = "shoppingq";
const token = "r3l0Qj39y7ZWxErj8pZfTfGo3fQ2";
let orderData = []

//DOM
const delAllBtn = document.querySelector(".discardAllBtn");
const orderList = document.querySelector(".orderPage-table");

//init
function init() {
    getOrderList();
}
init();

//取得訂單列表
function getOrderList() {
    axios.get(`${apiUrl}/${api_path}/orders`, {
            headers: {
                authorization: token,
            }
        })
        .then((rsp) => {
            orderData = rsp.data.orders;
            console.log(rsp.data.orders);
            sortedOrderData(orderData);
            renderC3();
            renderC3_LV2()
        })
        .catch(function (error) {
            console.log(error);
        })
}
//排列訂單
function sortedOrderData(arr){
    orderData = orderData.sort(function (a,b) {
        return b.createdAt - a.createdAt;
    })
    renderOrderList(orderData);
}
//渲染orderList
function renderOrderList(arr) {
    let str = `<thead>
    <tr>
        <th width="10%">訂單編號</th>
        <th width="10%">聯絡人</th>
        <th width="10%">聯絡地址</th>
        <th width="15%">電子郵件</th>
        <th width="25%">訂單品項</th>
        <th width="15%">訂單日期</th>
        <th width="10%">訂單狀態</th>
        <th width="5%">操作</th>
    </tr>
    </thead>`
    if (arr.length > 0) {
        arr.forEach(item => {
            //組時間戳字串
            let timeStamp = new Date( item.createdAt *1000);
            // let orderTime = `${timeStamp.getFullYear()}/${timeStamp.getMonth()+1}/${timeStamp.getDate()}`;
            // let orderTime = timeStamp.toLocaleDateString();
            let orderTime = timeStamp.toLocaleString();
            //訂單品項字串
            let prodStr = "";
            item.products.forEach(prodItem => {
                prodStr += `<p>${prodItem.title}X${prodItem.quantity}</p>`
            })
            //訂單狀態字串
            let orderStatus = "";
            if(item.paid === true){
                orderStatus = "已處理";
            }else{
                orderStatus = "未處理";
            }

            //組訂單字串
            str +=
                `<tr>
                <td>${item.id}</td>
                <td>
                    <p>${item.user.name}</p>
                    <p>${item.user.tel}</p>
                </td>
                <td>${item.user.address}</td>
                <td>${item.user.email}</td>
                <td>
                    <p>${prodStr}</p>
                </td>
                <td>${orderTime}</td>
                <td class="orderStatus">
                    <a href="#" data-action="orderStatus" data-status="${item.paid}" data-id="${item.id}">${orderStatus}</a>
                </td>
                <td>
                    <input type="button" class="delSingleOrder-Btn" data-id="${item.id}" data-action="delOrder" value="刪除">
                </td>
            </tr>`;
        })
    } else if (arr.length === 0) {
        str += `
    <tr><td colspan="8">
    <p class="text-center">訂單目前沒有資料</p>
    </td> </tr>`
    }
    orderList.innerHTML = str;
}


//監聽orderList行為
orderList.addEventListener("click",function(e){
    e.preventDefault();
    let targetAction = e.target.dataset.action;
    let orderId = e.target.getAttribute("data-id");
    if(targetAction === "orderStatus"){
        let orderStatus = e.target.getAttribute("data-status");
        changeOrderStatus(orderStatus,orderId);
        return;
    }else if(targetAction === "delOrder"){
        delOrder(orderId);
        return;
    }
})
//修改訂單狀態
function changeOrderStatus(status,id){
    let newStatus;
    if(status === "true"){
        newStatus = false;
    }else{
        newStatus = true
    }
    axios.put(`${apiUrl}/${api_path}/orders`,{
        "data": {
          "id": id,
          "paid": newStatus
        }
      }, {
        headers: {
            authorization: token,
        }
    })
    .then((rsp) => {
        swal("恭喜您", "訂單狀態修改成功", "success" );
        getOrderList(orderData);
    })
    .catch(function (error) {
        console.log(error);
    })
}
//刪除特定訂單
function delOrder(id){
    axios.delete(`${apiUrl}/${api_path}/orders/${id}`, {
        headers: {
            authorization: token,
        }
    })
    .then((rsp) => {
        swal("恭喜您", "成功刪除一筆訂單", "success" );
        getOrderList(orderData);
    })
    .catch(function (error) {
        console.log(error);
    })
}

//刪除全部訂單
delAllBtn.addEventListener("click",delAllOrder);
function delAllOrder(){ 
    axios.delete(`${apiUrl}/${api_path}/orders`, {
        headers: {
            authorization: token,
        }
    })
    .then((rsp) => {
        swal("恭喜您", "成功刪除全部訂單", "success" );
        getOrderList(orderData);
    })
    .catch(function (error) {
        console.log(error);
    })
}

//繪製C3圖表(LV1)
function renderC3(){
    let obj = {};
    orderData.forEach(item =>{
        item.products.forEach(prodItem =>{
            if(obj[prodItem.category] === undefined){
                obj[prodItem.category] = prodItem.price * prodItem.quantity;
            }else{
                obj[prodItem.category] += prodItem.price * prodItem.quantity;
            }
        })
    })
    let catAry= Object.keys(obj);
    let newData = [];
    catAry.forEach(item =>{
        let ary = [];
        ary.push(item);
        ary.push(obj[item]);
        newData.push(ary)
    })
    
    let chart = c3.generate({
        bindto: '#chart', // HTML 元素綁定
        data: {
            type: "pie",
            columns: newData,
           
        },
        colors: {
            pattern: ["#DACBFF", "#9D7FEA", "#5434A7", "#301E5F" ]
        }
    });

}

//繪製C3圖表(LV1)
function renderC3_LV2(){
    //資料蒐集
    let obj = {};
    orderData.forEach(item =>{
        item.products.forEach(prodItem =>{
            if(obj[prodItem.title] === undefined){
                obj[prodItem.title] = prodItem.price * prodItem.quantity;
            }else{
                obj[prodItem.title] += prodItem.price * prodItem.quantity;
            }
        })
    })

    //資料關聯
    let keysAry = Object.keys(obj);
    let newData = [];
    keysAry.forEach(item =>{
        let ary = [];
        ary.push(item);
        ary.push(obj[item]);
        newData.push(ary);
    })
    console.log(newData);
    
    //資料排序
    newData.sort(function(a,b){
        return b[1]-a[1];
    })

    //整合成四筆資料
    let len = newData.length
    if(len > 3){
        let otherTotal = 0;
        newData.forEach((item,i) =>{
            if(i > 2){
                otherTotal += newData[i][1];
            }
        })
        newData.splice(3,len-3);
        newData.push(["其他", otherTotal]);
        //如果需要的話，可以再次排序
    }

    //C3圖表
    let chart = c3.generate({
        bindto: '#chart_lv2', // HTML 元素綁定
        data: {
            type: "pie",
            columns: newData,
           
        },
        colors: {
            pattern: ["#DACBFF", "#9D7FEA", "#5434A7", "#301E5F" ]
        }
    });
}

