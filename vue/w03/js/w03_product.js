// shoppingqgjun@gmail.com
// drH343Vq6TM7LMH
import {
    createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.1/vue.esm-browser.min.js';
let productModal = {};

const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io', // 站點
            apiPath: 'shoppingq', // 個人 API Path
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            }
        }
    },
    mounted() {
        //token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        //Bootstrap modal
        productModal = new bootstrap.Modal(document.getElementById('productModal'));
        this.getProducts();
    },
    methods: {
        getProducts() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=:page`;
            axios.get(url)
                .then(res => {
                    // console.log(res);
                    if (res.data.success) {
                        this.products = res.data.products;
                    } else {
                        alert(res.data.messages)
                    }
                })
        },
        openModal(isNew, product) {
            this.isNew = isNew;
            if (this.isNew) {
                this.tempProduct = {
                    // imagesUrl : [],
                }
                productModal.show();
            } else {
                this.tempProduct = {
                    ...product
                };
                productModal.show();
            }
        },
        createImgAry() {
            this.tempProduct.imagesUrl = [""];
        },
        addProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let method = "post";
            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                method = "put";
            }

            axios[method](url, {
                    data: this.tempProduct
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.success) {
                        this.getProducts();
                        productModal.hide();
                    }
                })
        },
        delProduct(product) {
            this.tempProduct = product;
            const title = this.tempProduct.title;
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
            axios.delete(url, {
                data: this.tempProduct
            })
                .then(res => {
                    console.log(res)
                    if(res.data.success){
                        alert(`成功刪除${title}`)
                        this.getProducts();
                    }else{
                        alert(res.data.message);
                    }
                })
        }
    }
});

app.mount("#app");