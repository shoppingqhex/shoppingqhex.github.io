const url = 'https://vue3-course-api.hexschool.io'; // 站點
const path = 'shoppingq'; // 個人 API Path

const app = {
    data: {
        products: [],
    },

    getData() {
        axios.get(`${url}/api/${path}/admin/products`)
            .then((res) => {
                // console.log(res.data.products);
                this.data.products = res.data.products;
                // console.log(this.data.products);
                this.render();
            })
    },
    render() {
        const prodList = document.querySelector("#productList");
        const prodCount = document.querySelector("#productCount");
        let str = "";
        this.data.products.forEach((item) => {
            str += `<tr>
            <td>${item.title}</td>
            <td width="120">
                ${item.origin_price}
            </td>
            <td width="120">
            ${item.price}
            </td>
            <td width="100">
                ${item.is_enabled}
            </td>
            <td width="120">
                <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                    data-action="remove" data-id="${item.id}"> 刪除 </button>
            </td>
        </tr>`
        });
        prodList.innerHTML = str;
        productCount.textContent = this.data.products.length;

        const delBtn = document.querySelectorAll(".deleteBtn");
        delBtn.forEach((item) => {
            item.addEventListener("click", this.delProd);
        })
    },
    delProd(e) {
        const id = e.target.dataset.id;
        axios.delete(`${url}/api/${path}/admin/product/${id}`)
            .then((res) => {
                if(res.data.success){
                    alert("成功刪除一筆商品");
                    app.getData();
                } 
            })
    },
    init() {
        //取出cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.getData();
    }
}

app.init();