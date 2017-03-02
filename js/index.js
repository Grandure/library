

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
 		var pageNum = searchPage();
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