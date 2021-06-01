const url = 'https://vue3-course-api.hexschool.io'; // 站點
const path = 'shoppingq'; // 個人 API Path

//Dom
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn")

//event
loginBtn.addEventListener("click", login);

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const data = {
        username,
        password
    };

    axios.post(`${url}/admin/signin`, data)
        .then((res) => {
            console.log(res);
            if(res.data.success){
                const {token , expired} = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
                window.location = 'w02_product.html'
            }else {
                alert(res.data.message)
            }  
        })
}