import {
    createApp
} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.1/vue.esm-browser.min.js';

//Dom


const app = createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io', // 站點
            apiPath: 'shoppingq', // 個人 API Path
            emailAdd:"",
            pwd:""
        }
    },
    methods: {
        login() {
            const username = this.emailAdd;
            const password = this.pwd;
            const data = {
                username,
                password
            };

            axios.post(`${this.apiUrl}/admin/signin`, data)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        alert("恭喜您，登入成功")
                        const {
                            token,
                            expired
                        } = res.data;
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
                        window.location = 'w03_product.html'
                    } else {
                        alert(res.data.message)
                    }
                })
        }
    },
    created() {
    }
});

app.mount("#app");