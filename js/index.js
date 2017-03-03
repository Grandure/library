

function searchPage(setPage){  //查询页面 若输入参数为设置页面，若参数为空为查询页面
	var getPage = document.getElementById('my-page');
	currentPage = parseInt(getPage.value);
	if(arguments.length == 0){
		return currentPage
	}
	currentPage = setPage;
	return currentPage;
}

function compusePage(itemTotal){ //计算当前显示的页数:pageNum表示页数，itemTotal表示数据库内容总数
 		var pageNum = searchPage(); //从Ajax获取数据库内容 searchPage参数需要增加获取的值;
		var result = itemTotal / pageNum;
		//searchPage(); //查询当前设置页数
		if(itemTotal % pageNum !== 0){
			result = result + 1;
		}
		if(result <= 1) {
			pageNum = 1;
		}
		pageNum = parseInt(result,10);
		console.log('当前分页数为:' + '' + pageNum);
}

function showPage(){
	
}
// $(document).ready(function() {
// 	function loaddata() {
//         $.ajax({
//             url: '../data/index.php',
//             type: 'get',
//             dataType: 'json',
//             data: {},
//             success: function(res) {
//                 console.log(res);
//                 var result = res;
//                 var _html = "";
//                 for (var i = 0; i < res.length; i++) {
//                     _html += "<tr><td>" + "<input type='checkbox'/>" + "<span>" + res[i]['id'] + "</span>" + "\
//                     </td>/<td>" + res[i]['book'] + "</td>\
//                     <td>" + res[i]['code'] + "</td>\
//                     <td>" + res[i]['borrower'] + "</td>\
//                     <td>" + res[i]['contact'] + "</td>\
//                     <td>" + res[i]['more'] + "</td>\</tr>";
//                 }
//                 // _html += "</table><a href='add.html'>新增图书</a>";
//                 setTimeout(function() {
//                     $('#list-book').html(_html);
//                 }, 930)
//             },
//             error: function() {
//                 alert("erro!");
//             }
//         });
//     }
//     loaddata();
// });
$(document).ready(function(){
    alert("erro");
}) 

// $(document).ready(function() {
// 	$('tr>th').addClass('bg-info');
// 	$('tr:even').addClass('success');
// });