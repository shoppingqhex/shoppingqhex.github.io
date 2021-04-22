//DOM
const prodList = document.querySelector(".productWrap");
const prodSelect = document.querySelector(".productSelect");
const cartList = document.querySelector(".shoppingCart-table");
const customerName = document.querySelector("#customerName");
const customerPhone = document.querySelector("#customerPhone");
const customerEmail = document.querySelector("#customerEmail");
const customerAddress = document.querySelector("#customerAddress");
const tradeWay = document.querySelector("#tradeWay");
const orderBtn = document.querySelector(".orderInfo-btn");

//var 
const apiUrl = "https://hexschoollivejs.herokuapp.com/api/livejs/v1/customer";
const api_path = "shoppingq";
let prodData = [];
let prodSelectedData = [];
let cartData = [];
let isFilled = false;

//init
function init() {
    getProdList();
    getCartList()
}
init();

//獲得資料，並渲染產品列表
function getProdList() {
    axios.get(`${apiUrl}/${api_path}/products`)
        .then((rsp) => {
            prodData = rsp.data.products;
            console.log(prodData);
            renderProdList(prodData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function renderProdList(arr) {
    let str = "";
    arr.forEach((item) => {
        str += `<li class="productCard">
        <h4 class="productType">新品</h4>
        <img src="${item.images}" alt="">
        <div class="addCartGroup">
            <select name="" class="addCartNum">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <a href="#" id="addCardBtn" data-id="${item.id}" data-num ="1">加入購物車</a>
        </div>
        
        <h3>${item.title}</h3>
        <del class="originPrice">NT$${item.origin_price}</del>
        <p class="nowPrice">NT$${item.price}</p>
    </li>`;
    })
    prodList.innerHTML = str;
}
//產品列表篩選
prodSelect.addEventListener("change", function (e) {
    let cat = e.target.value;
    prodData.forEach(item => {
        if (cat === "全部") {
            prodSelectedData.push(item);
            renderProdList(prodSelectedData);
        } else if (cat === item.category) {
            prodSelectedData.push(item);
            renderProdList(prodSelectedData);
        }
    })
    prodSelectedData = [];
})

//取得購物車列表
function getCartList() {
    axios.get(`${apiUrl}/${api_path}/carts`)
        .then((rsp) => {
            cartData = rsp.data.carts;
            renderCartList(cartData);
            console.log(cartData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function renderCartList(arr) {
    let totalPrice = 0;
    let str =
        `<tr>
        <th width="40%">品項</th>
        <th width="15%">單價</th>
        <th width="15%">數量</th>
        <th width="15%">金額</th>
        <th width="15%"></th>
    </tr>`;
    if (arr.length > 0) {
        arr.forEach(item => {
            totalPrice += parseInt(item.product.price) * parseInt(item.quantity);
            str +=
                `<tr>
                <td>
                    <div class="cardItem-title">
                        <img src=${item.product.images} alt="">
                        <p>${item.product.title}</p>
                    </div>
                </td>
                <td>NT$${item.product.price}</td>
                <td><input type="number" min="1" class="cartAmt" value="${item.quantity}" data-id="${item.id}" ></td>
                <td>NT$${parseInt(item.product.price) * parseInt(item.quantity)}</td>
                <td class="discardBtn">
                    <a href="#" class="material-icons" data-action="removeItem" data-id="${item.id}">
                        clear
                    </a>
                </td>
            </tr>`;
        })
    } else if (arr.length === 0) {
        str += `
        <tr><td>
        <p>購物車目前沒有商品</p>
        </td> </tr>`
    }

    str +=
        `<tr>
            <td>
                <a href="#" class="discardAllBtn" data-action="removeAll">刪除所有品項</a>
            </td>
            <td></td>
            <td></td>
            <td>
                <p>總金額</p>
            </td>
            <td>NT$${totalPrice}</td>
        </tr>`;
    cartList.innerHTML = str;
}

//加入購物車列表
prodList.addEventListener("change", function (e) {
    if (e.target.getAttribute("class") === "addCartNum") {
        let prodNum = e.target.value;
        e.target.nextElementSibling.dataset.num = prodNum;
    };
});
prodList.addEventListener("click", addCart);

function addCart(e) {
    e.preventDefault();
    if (e.target.getAttribute("id") === "addCardBtn") {
        let prodId = e.target.dataset.id;
        let prodNum = e.target.dataset.num;
        addCartItem(prodId, prodNum);
        e.target.previousElementSibling.value = 1;
        e.target.dataset.num = 1
    };
}

function addCartItem(id, num) {
    let cartQty = parseInt(num);
    cartData.forEach(item => {
        if (item.product.id === id) {
            cartQty = item.quantity += parseInt(num);
        }
    })
    let data = {
        "data": {
            "productId": id,
            "quantity": cartQty
        }
    }

    axios.post(`${apiUrl}/${api_path}/carts`, data)
        .then((rsp) => {
            swal("成功加入購物車", "歡迎您繼續選購", "success");
            cartData = rsp.data.carts;
            renderCartList(cartData);
        })
        .catch(function (error) {
            console.log(error);
        })
}
//更改購物車數量
cartList.addEventListener("change", function (e) {
    e.preventDefault();
    if (e.target.getAttribute("class") !== "cartAmt") {
        return
    }
    let changeNum = e.target.value;
    let cartId = e.target.dataset.id;
    editCartNum(changeNum, cartId)
});

function editCartNum(num, id) {
    if (num > 0) {
        let data = {
            "data": {
                "id": id,
                "quantity": parseInt(num)
            }
        }
        axios.patch(`${apiUrl}/${api_path}/carts`, data)
            .then((rsp) => {
                swal("恭喜您", "成功修改數量", "success");
                getCartList(cartData);
            })
            .catch(function (error) {
                console.log(error);
            })
    } else {
        let data = {
            "data": {
                "id": id,
                "quantity": 1
            }
        }
        axios.patch(`${apiUrl}/${api_path}/carts`, data)
            .then((rsp) => {
                getCartList(cartData);
            })
            .catch(function (error) {
                console.log(error);
            })
        swal("數量錯誤", "數量必須大於1", "error");
        return;
    }
}


//監控購物車列表點擊行為
cartList.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.dataset.action === "removeAll") {
        removeAll()
    } else if (e.target.dataset.action === "removeItem") {
        console.log(e.target.dataset.id);
        const cartItemId = e.target.dataset.id;
        removeItem(cartItemId);
    }
});
//刪除購物車內全部品項
function removeAll() {
    if (cartData.length > 0) {
        axios.delete(`${apiUrl}/${api_path}/carts`)
            .then((rsp) => {
                swal(rsp.data.message, "歡迎您繼續選購", "success");
                console.log(rsp.status);
                cartData = rsp.data.carts;
                renderCartList(cartData);
            })
            .catch(function (error) {

                console.log(error);
            })
    } else {
        swal("Error", "購物車已經是清空的狀態", "error");
        return;
    }

}
//刪除購物車內單項品項
function removeItem(id) {
    axios.delete(`${apiUrl}/${api_path}/carts/${id}`)
        .then((rsp) => {
            if (rsp.data.status === true) {
                swal("成功刪除一筆購物車資料", "歡迎您繼續選購", "success");
            } else {
                swal("Error", rsp.data.message, "error");
            }
            cartData = rsp.data.carts;
            renderCartList(cartData);
        })
        .catch(function (error) {
            console.log(error);
        })
}

//驗證資料表單
const constraints = {
    "姓名": {
        presence: {
            message: "是必填欄位"
        },
    },
    "電話": {
        presence: {
            message: "是必填欄位"
        },
        format: {
            pattern: "[-0-9]+",
            message: "只能填入數字0-9"
        },
        length: {
            minimum: 8,
            message: "^請填入多於8個數字"
        }
    },
    "Email": {
        presence: {
            message: "是必填欄位"
        },
        email: {
            message: "資料可能不是有效的email格式"
        }
    },
    "寄送地址": {
        presence: {
            message: "是必填欄位"
        },
    },
} //// message填入^可以消除預設資料
const form = document.querySelector(".orderInfo-form");
const inputs = document.querySelectorAll(".orderInfo-input");
inputs.forEach(item => {
    item.addEventListener("change", function () {
        item.nextElementSibling.textContent = "";
        let errors = validate(form, constraints);
        if (errors) {
            Object.keys(errors).forEach(item => {
                document.querySelector(`[data-message ="${item}"]`).textContent = errors[item];
            })
        } else {
            isFilled = true;
        }
    })
})

//送出表單資料
orderBtn.addEventListener("click", createOrder);

function createOrder(e) {
    e.preventDefault();
    let data = {
        "data": {
            "user": {
                "name": customerName.value,
                "tel": customerPhone.value,
                "email": customerEmail.value,
                "address": customerAddress.value,
                "payment": tradeWay.value
            }
        }
    }
    if (cartData.length <= 0) {
        swal("購物車是空的", "請在購物車加入至少一品項", "error");
        return;
    } else if (isFilled !== true) {
        swal("訂購資料不完整", "必填欄位必須填寫且填寫正確", "error");
        return;
    } else {
        axios.post(`${apiUrl}/${api_path}/orders`, data)
            .then((rsp) => {
                swal("訂單成功送出", "感謝您選擇WOWOROOM，我們將盡速為您服務", "success");
                console.log(rsp);
                console.log(cartData);
                getCartList(cartData);
                form.reset();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}