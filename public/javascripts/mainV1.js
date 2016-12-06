$(document).ready(function() {
    const urlData1 = "/javascripts/data/data1.json";
    const urlData2 = "/javascripts/data/data2.json";
    const urlData3 = "/javascripts/data/data3.json";

    const clickEvent = {
        previousElm: {},
        'SPAN': function(eTarget) {
            eTarget.classList.toggle('selected')
        },
        'TH': function(eTarget) {
            this.previousElm.className = "";
            eTarget.parentElement.classList.add('selected');
            this.previousElm = eTarget.parentElement.classList;
            console.log(this.previousElm);
            console.log(this.previousElm);
        }
    }

    const startTime = new Date().getTime();
//     $.when($.getJSON(urlData1), $.getJSON(urlData2), $.getJSON(urlData3)).done(function(data1, data2, data3) {
//         var templateStrings = ``;
//         for (let i = 0, length = data1[0].length; i < length; i++) {
//             const data3Values = Object.values(data3[0]);
//             const table = `<tr>
// 												<th><span class="star"></span>${data1[0][i].key}</th>
// 												<th>${data1[0][i].cell1}</th>
// 												<th>${data1[0][i].cell2}</th>
// 												<th>${data1[0][i].cell3}</th>
// 												<th>${data3Values[i].cell4}</th>
// 												<th>${data1[0][i].cell5}</th>
// 												<th>${data1[0][i].cell6}</th>
// 												<th>${data1[0][i].cell7}</th>
// 												<th>${data2[0][i].cell8}</th>
// 												<th>${data3Values[i].cell9}</th>
// 											</tr>`;
//             templateStrings = templateStrings + table;
//         }
//         $('#tbody').append(templateStrings);
//
//     }).done(function() {
//         $(document).on('click', '#tbody>tr', function(e) {
//             const eTarget = e.target;
//             clickEvent[eTarget.tagName](eTarget);
//             if (eTarget.tagName == 'TH') {
//                 clickEvent.previousElm = this;
//             }
//         })
//         const requestTime = new Date().getTime() - startTime;
//         $('#usuage').html(requestTime);
//     });
// });

$.when($.getJSON(urlData1), $.getJSON(urlData2), $.getJSON(urlData3)).done(function(data1, data2, data3) {
    var templateStrings = ``;
    // data1.map((piecesOfArr,i)=>{console.log(piecesOfArr);})

    for (let i = 0, length = data1[0].length; i < length; i++) {
        const data3Values = Object.values(data3[0]);
        const table = `<tr>
                    <th><span class="star"></span>${data1[0][i].key}</th>
                    <th>${data1[0][i].cell1}</th>
                    <th>${data1[0][i].cell2}</th>
                    <th>${data1[0][i].cell3}</th>
                    <th>${data3Values[i].cell4}</th>
                    <th>${data1[0][i].cell5}</th>
                    <th>${data1[0][i].cell6}</th>
                    <th>${data1[0][i].cell7}</th>
                    <th>${data2[0][i].cell8}</th>
                    <th>${data3Values[i].cell9}</th>
                  </tr>`;
        templateStrings = templateStrings + table;
    }
    $('#tbody').append(templateStrings);

}).done(function() {
    $(document).on('click', '#tbody>tr', function(e) {
        const eTarget = e.target;
        clickEvent[eTarget.tagName](eTarget);
        if (eTarget.tagName == 'TH') {
            clickEvent.previousElm = this;
        }
    })
    const requestTime = new Date().getTime() - startTime;
    $('#usuage').html(requestTime);

    //時間儲存
		const timeArrJSON = sessionStorage.getItem('mainV1');
		const timeArr = JSON.parse(timeArrJSON);
		timeArr.push(requestTime);
		sessionStorage.setItem('mainV1', JSON.stringify(timeArr))

});
});
