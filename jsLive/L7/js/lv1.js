// 篩選地區，並累加數字上去
let data = [];
function init() {
  axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json")
    .then(function (rsp) {
      console.log(rsp.data);
      data = rsp.data;
      renderC3()
    })
}
init();

function renderC3() {
  // totalObj 會變成 {高雄: 2, 台北: 1, 台中: 2}
  let totalObj = {};
  data.forEach(function (item, index) {
    if (totalObj[item.area] == undefined) {
      totalObj[item.area] = 1;
    } else {
      totalObj[item.area] += 1;
    }
  })

  // newData = [["高雄", 2], ["台北",1], ["台中", 1]]
  let newData = [];
  let area = Object.keys(totalObj);
  // area output ["高雄","台北","台中"]
  area.forEach(function (item, index) {
    let ary = [];
    ary.push(item);
    ary.push(totalObj[item]);
    newData.push(ary);
  })

  // 將 newData 丟入 c3 產生器
  const chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: newData,
      type: 'donut',
    },
    donut: {
      title: "地區"
    }
  });
}