let data = [{
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];

//DOM
const list = document.querySelector(".ticketCard-area");
const areaSelect = document.querySelector(".regionSearch");
const searchResult = document.querySelector("#searchResult-text");
let searchTotal = data.length;
searchResult.textContent = `本次搜尋共 ${searchTotal} 筆資料`;
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const btn = document.querySelector(".addTicket-btn");

const inputContent = {
  "套票名稱": ticketName,
  "圖片網址": ticketImgUrl,
  "景點地區": ticketRegion,
  "套票金額": ticketPrice,
  "套票組數": ticketNum,
  "套票星級": ticketRate,
  "套票描述": ticketDescription,

}
// const inputArr = [ticketName, ticketImgUrl, ticketRegion, ticketDescription, ticketNum, ticketPrice, ticketRate];


//init
function init() {
  let str = "";
  data.forEach(item => {
    str +=
      `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
              ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
  })
  list.innerHTML = str;
}
init();

//監聽地區
areaSelect.addEventListener('change', function (e) {
  let str = "";
  searchTotal = 0;
  data.forEach(item => {
    if (areaSelect.value === "全部地區") {
      str +=
        `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
              ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
      searchTotal++;
    } else if (areaSelect.value === item.area) {
      str +=
        `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
              ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
      searchTotal++;
    }
  })
  list.innerHTML = str;
  searchResult.textContent = `本次搜尋共 ${searchTotal} 筆資料`;
})

//新增資料

function addData() {
  let obj = {};
  obj.id = data.length;
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = parseInt(ticketNum.value);
  obj.price = parseInt(ticketPrice.value);
  obj.rate = parseInt(ticketRate.value);
  data.push(obj);
}

btn.addEventListener('click', function (e) {
  //確保欄位不能空白
  // Object.keys(inputContent).forEach(key => {
  //   console.log(key);
  //   if (inputContent[key].value === "") {
  //     alert(`${key}欄位不可空白`);
  //   }
  // })
  for (let i = 0; i < Object.keys(inputContent).length; i++) {
    let newArr = Object.keys(inputContent);
    // console.log(inputContent[newArr[i]].value);
    if (inputContent[newArr[i]].value === "") {
      alert(`${newArr[i]}欄位不可空白`);
      return;
    }
  }
  if (ticketRate.value != "" && (ticketRate.value < 1 || ticketRate.value > 10)) {
    alert(`套票星級應該1~10的區間內`);
    return;
  }
  addData();
  init();
  // inputArr.forEach(item => {
  //   item.value = "";
  // })
  Object.values(inputContent).forEach(item => {
    item.value = "";
  })
})