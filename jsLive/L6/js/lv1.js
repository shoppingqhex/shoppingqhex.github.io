let data = [];
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json")
  .then(function (rsp) {
    data = rsp.data;
    complete()
  })

function complete() {
  //DOM
  const list = document.querySelector(".ticketCard-area");
  const areaSelect = document.querySelector(".regionSearch");
  const searchResult = document.querySelector("#searchResult-text");
  let newArr = [];
  let searchNum;
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

  //搜尋次數
  function searchTotal(arr) {
    searchNum = arr.length;
    searchResult.textContent = `本次搜尋共 ${searchNum} 筆資料`;
  }
  searchTotal(data);

  // init，將data資料渲染到介面上
  function init(arr) {
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
  init(data);


  //監聽地區
  areaSelect.addEventListener('change', function (e) {
    data.forEach(item => {
      if (areaSelect.value === "全部地區") {
        newArr.push(item);
        init(newArr);
      } else if (areaSelect.value === item.area) {
        newArr.push(item);
        init(newArr);
      }
    })
    searchTotal(newArr);
    newArr = [];
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
    init(data);
    searchTotal(data);
  }

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
    }else if(ticketDescription.value.length >100){
      alert(`套票描述請勿超過100字`);
      return;
    }
    
    addData();
    alert("恭喜您，成功新增一筆資料");

    Object.values(inputContent).forEach(item => {
      item.value = "";
    })
  })
}


