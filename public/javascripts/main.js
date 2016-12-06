$(document).ready(function(){
	var urlData1 = "/javascripts/data/data1.json";
	var urlData2 = "/javascripts/data/data2.json";
	var urlData3 = "/javascripts/data/data3.json";
	// 查得資料
	var promiseData1 = $.ajax({url: urlData1, cache: false});
	var promiseData2 = $.ajax({url: urlData2, cache: false});
	var promiseData3 = $.ajax({url: urlData3, cache: false});
	// 建立列
	var getRowHtml = function(obj, data2map, data3map){
		return '<tr>' +
			'<td><span class="star"></span>' + obj.key + '</td>' +
			'<td>' + obj.cell1 + '</td>' +
			'<td>' + obj.cell2 + '</td>' +
			'<td>' + obj.cell3 + '</td>' +
			'<td>' + obj.cell4 + '</td>' +
			'<td>' + obj.cell5 + '</td>' +
			'<td>' + obj.cell6 + '</td>' +
			'<td>' + obj.cell7 + '</td>' +
			'<td>' + data2map[obj.key] + '</td>' +
			'<td>' + data3map[obj.cell4] + '</td>' +
			'</tr>';
	};

	var t0 = new Date();
	// 資料全部取得
	$.when(promiseData1, promiseData2, promiseData3).done(function(a1, a2, a3){
		// var t0 = new Date();
		var i, len, key;
		var data1 = a1[0];
		var data2 = a2[0];
		var data3 = a3[0];
		// 整理至 data2map
		var data2map = {};
		len = data2.length;
		for (i=0; i<len; i++) {
			var data = data2[i];
			data2map[data.key] = data.cell8;
		}
		// 整理至 data3map
		var data3map = {};
		for (key in data3) {
			data3map[data3[key].cell4] = data3[key].cell9;
		}
		console.log(data3map);
		// 建立表格
		var table = $('table');
		len = data1.length;
		var tbodyHtml = "";
		for (i=0; i<len; i++) {
			key = data1[i].key;
			tbodyHtml += getRowHtml(data1[i], data2map, data3map);
		}
		$('<tbody>' + tbodyHtml + '</tbody>').appendTo(table);
		// 點選列變色
		table.on('click', 'tbody tr', function(){
			var tr = $(this).addClass('selected');
			if (window.lastSelectedTr)
				window.lastSelectedTr.removeClass('selected');
			window.lastSelectedTr = tr;
		});
		// 點擊星星效果
		table.on('click', 'tbody .star', function(ev){
			$(this).toggleClass('selected');
			ev.stopPropagation();
		});
		// 使用時間
		const useTimed = new Date() - t0;
		$('.usuage').text(useTimed);

		//時間儲存
		const timeArrJSON = sessionStorage.getItem('main');
		const timeArr = JSON.parse(timeArrJSON);
		timeArr.push(useTimed);
		sessionStorage.setItem('main', JSON.stringify(timeArr))

	});
});
