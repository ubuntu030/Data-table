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
        }
    }

    const arrayTerminator = function(arr) {
        var template = ``;
        // 陣列切割
        const workHard = (arr) => {
            arr.map(() => {
                const piecesOfArr = arr.splice(0, 1000);
                domProcess(piecesOfArr)
            })
        }
        // dom處理
        const domProcess = (piecesOfArr) => {
            piecesOfArr.map((obj) => {
                const table = `<tr>
                  <th><span class="star"></span>${obj.key}</th>
                  <th>${obj.cell1}</th>
                  <th>${obj.cell2}</th>
                  <th>${obj.cell3}</th>
                  <th>${obj.cell4}</th>
                  <th>${obj.cell5}</th>
                  <th>${obj.cell6}</th>
                  <th>${obj.cell7}</th>
                  <th>${obj.cell8}</th>
                  <th>${obj.cell9}</th>
                </tr>`;
                template = template + table;
            })
            TakeAway(template);
        }
        // 外帶
        const TakeAway = (template) => {
            $('#tbody').append(template);
        }
        workHard(arr);
    }

    function checkObj(mainArr, targetKey) {
        for (let obj of mainArr) {
            if (obj.key == targetKey) {
                return obj
            }
        }
    }

    function checkObj1(mainArr, targetKey) {
        for (let obj of mainArr) {
            if (obj.cell4 == targetKey) {
                return obj.cell9
            }
        }
    }

    // Array-Like Object to Array
    function doorudo(Arr) {
        var bb = Object.values(Arr);
        return bb;
    }

    var startTime = new Date().getTime();
    $.when($.getJSON(urlData1), $.getJSON(urlData2), $.getJSON(urlData3)).done((data1, data2, data3) => {
        const newArr = [];
        const data3Arr = doorudo(data3[0]);
        data1[0].map((data1Obj, i) => {
            const data1Key = data1Obj.key;
            const data1Cell4 = data1Obj.cell4;
            $.when(data1Obj, checkObj(data2[0], data1Key), checkObj1(data3Arr, data1Cell4)).done((data1, data2, data3) => {
                // Extend data1Obj
                data1Obj.cell8 = data2.cell8;
                data1Obj.cell9 = data3;
                newArr.push(data1Obj)
            })
        })

    }).done((newArr) => {
        // Render table view
        arrayTerminator(newArr[0]);
        //
        $(document).on('click', '#tbody>tr', function(e) {
            const eTarget = e.target;
            clickEvent[eTarget.tagName](eTarget);
            if (eTarget.tagName == 'TH') {
                clickEvent.previousElm = this;
            }
        });
        var requestTime = new Date().getTime() - startTime;
        $('#usuage').html(requestTime);
    });

});
