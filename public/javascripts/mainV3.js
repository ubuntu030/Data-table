const urlData1 = "/javascripts/data/data1.json";
const urlData2 = "/javascripts/data/data2.json";
const urlData3 = "/javascripts/data/data3.json";

// fetch成功將傳回一個 Promise的 resolve狀態
const data1Promise = fetch(urlData1, {
    method: 'GET',
    cache: 'reload'
}).then((data) => data.json())
const data2Promise = fetch(urlData2, {
    method: 'GET',
    cache: 'reload'
}).then((data) => data.json())
const data3Promise = fetch(urlData3, {
    method: 'GET',
    cache: 'reload'
}).then((data) => data.json())

const clickEvent = {
    previousElm: {},
    'SPAN': function(eTarget) {
        eTarget.classList.toggle('selected')
    },
    'TH': function(eTarget) {
        const elmParent = eTarget.parentElement;
        const elmParentClassList = eTarget.parentElement.classList;
        console.log(this.previousElm);
        this.previousElm.className = "";
        elmParentClassList.add('selected')
    }
}

const createTableRow = (i, data1, data2, data3) => {
    const table = `<tr>
     <th><span class="star"></span>${data1.key}</th>
     <th>${data1.cell1}</th>
     <th>${data1.cell2}</th>
     <th>${data1.cell3}</th>
     <th>${data1.cell4}</th>
     <th>${data1.cell5}</th>
     <th>${data1.cell6}</th>
     <th>${data1.cell7}</th>
     <th>${data2}</th>
     <th>${data3}</th>
    </tr>`;
    return table
}

Promise.all([data1Promise, data2Promise, data3Promise]).then(PromiseArr => {
    var startTime = new Date().getTime();
    const data1Arr = PromiseArr[0]
    const data2Arr = PromiseArr[1]
    const data3Obj = PromiseArr[2]
    let htmlView = ``;

    // 重新排列鍵值，整理至data2map
    const data2map = {};
    for (obj of data2Arr) {
        data2map[obj.key] = obj.cell8
    }

    // 重新排列鍵值，整理至data3map
    const data3map = {};
    const d3Values = Object.values(data3Obj)
    for (obj of d3Values) {
        data3map[obj.cell4] = obj.cell9
    }

    data1Arr.map((data1Obj, i) => {
        const key = data1Obj.key
        const cell4 = data1Obj.cell4
        const tableRow = createTableRow(i, data1Obj, data2map[key], data3map[cell4])
        htmlView = htmlView + tableRow;
    })

    const tbody = document.getElementById('tbody')
    tbody.insertAdjacentHTML('beforeend', htmlView)

    Array.from(document.querySelectorAll("#tbody>tr")).forEach(tr => tr.addEventListener("click", (e) => {
        const eTarget = e.target;
        clickEvent[eTarget.tagName](eTarget);
        if (eTarget.tagName == 'TH') {
            clickEvent.previousElm = eTarget.parentElement;
        }
    }))

    const requestTime = new Date().getTime() - startTime;
    document.getElementById("usuage").innerHTML = requestTime

    //時間儲存
    const timeArrJSON = sessionStorage.getItem('mainV3')
    const timeArr = JSON.parse(timeArrJSON)
    timeArr.push(requestTime)
    sessionStorage.setItem('mainV3', JSON.stringify(timeArr))

    // return htmlView
})
