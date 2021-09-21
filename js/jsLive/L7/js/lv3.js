//DOM
const list = document.querySelector(".ticketCard-area");
const areaSelect = document.querySelector(".regionSearch");
const searchResult = document.querySelector("#searchResult-text");
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

let data = [];
//取得資料，並執行渲染
function init() {
  axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json")
    .then(function (rsp) {
      console.log(rsp.data.data);
      data = rsp.data.data;
      renderTotal(data);
    })
}
init();


//函式

//畫面總渲染
function renderTotal(arr) {
  searchTotal(arr);
  renderList(arr);
  renderC3(arr)
}
//搜尋次數
function searchTotal(arr) {
  let searchNum;
  searchNum = arr.length;
  searchResult.textContent = `本次搜尋共 ${searchNum} 筆資料`;
}
// init，將data資料渲染到介面上
function renderList(arr) {
  let str = "";
  arr.forEach(item => {
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
//渲染C3
function renderC3(arr) {
  // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
  let totalObj = {};
  arr.forEach(item => {
    if (totalObj[item.area] === undefined) {
      totalObj[item.area] = 1;
    } else {
      totalObj[item.area] += 1;
    }
  })

  // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
  let newData = [];
  let area = Object.keys(totalObj);
  // area output ["高雄","台北","台中"]
  area.forEach(item => {
    let arr = [];
    arr.push(item);
    arr.push(totalObj[item]);
    newData.push(arr);
  })

  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: "#chart",
    size: {
      height: 240,
      width: 480
    },
    color: {
      pattern: ['#26C0C7', '#5151D3', '#E68618']
    },
    data: {
      columns: newData,
      type: 'donut',
    },
    donut: {
      title: "套票地區比重",
      label: {
        show: false, 
      },
      width: 25, 
    }
  });
}


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
  renderTotal(data);
  searchTotal(data);
}


//監聽
////地區搜尋
areaSelect.addEventListener('change', function (e) {
  let newArr = [];
  data.forEach(item => {
    if (areaSelect.value === "全部地區") {
      newArr.push(item);

    } else if (areaSelect.value === item.area) {
      newArr.push(item);
    }
  })
  renderTotal(newArr);
  newArr = [];
})
////新增資料
btn.addEventListener('click', function (e) {
  //確保欄位不能空白
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
  } else if (ticketDescription.value.length > 100) {
    alert(`套票描述請勿超過100字`);
    return;
  }

  addData();
  alert("恭喜您，成功新增一筆資料");

  Object.values(inputContent).forEach(item => {
    item.value = "";
  })
})