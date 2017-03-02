

function searchPage(setPage){  //查询页面 若输入参数为设置页面，若参数为空为查询页面
	var getPage = document.getElementById('my-page');
	currentPage = parseInt(getPage.value);
	if(arguments.length == 0){
		return currentPage
	}
	currentPage = setPage;
	return currentPage;
}

// $(document).ready(function() {
// 	console.log($('#my-page').val());
// 	$('#my-page').change(function(event) {
// 			alert($(this).val());		
// 	});
// });


function showContent(num){ //显示页面
	function compusePage(){ //计算当前显示的页数

	}
}