function searchPage(setPage) {

    //查询页面 若输入参数为设置页面，若参数为空为查询页面
    var getPage = document.getElementById('my-page');

    currentPage = parseInt(getPage.value);
    if (arguments.length == 0) {
        return currentPage
    }
    currentPage = setPage;

    return currentPage;
}

function PageNum() {
    var getPage = document.getElementsByClassName('myInput'),
        len = getPage.length;
    return len;
}

function compusePage(itemTotal) {

    //itemTotal表示数据库内容总数
    var pageNum = searchPage(),
        //从Ajax获取数据库内容 searchPage参数需要增加获取的值;
        result = itemTotal / pageNum;

    //searchPage(); //查询当前设置页数
    if (itemTotal % pageNum !== 0) {
        result = result + 1;
    }
    if (result <= 1) {
        pageNum = 1;
    }
    pageNum = parseInt(result, 10);
    return pageNum;
    console.log('当前分页数为:' + '' + pageNum);
}
var myModul = (function() {
    //创建一个模块用于存储数据库的内容
    var f = {},
        Fnum,
        Fpage;

    f.setnum = function(n) {
        Fnum = n;
    };
    f.getnum = function() {
        // console.log(Fnum);
        return Fnum
    };
    f.setPage = function(p) {
        Fpage = p;
    }
    f.getPage = function() {
        return Fpage;
    }
    return f;
}());

function searchCheckbox() {
    //创建一个查询选取input[type=checkbox]被选取的内容
}
$(document).ready(function() {
    function list(Pages, res, index) {

        //获取数据库内容并显示出来
        var _list = "",
            //存储列表临时变量
            _page = "",
            //存储页面临时变量
            compuse,
            abc = res,
            idArr=[],
            index = index || 0;
        myModul.setnum(abc);

        for (var i = index; i < Pages; i++) {
            _list += "<tr><td>" + "<input type='checkbox' class='myInput' />" + "<span class='itemList'>" + res[i]['id'] + "</span>" + "\
                    </td>/<td>" + res[i]['book'] + "</td>\
                    <td>" + res[i]['code'] + "</td>\
                    <td>" + res[i]['borrower'] + "</td>\
                    <td>" + res[i]['tel'] + "</td>\
                    <td>" + res[i]['more'] + "</td>\</tr>";

                    //获取数据库中的ID值，将其存入idArr中
                    idArr.push(res[i]['id']);

        }
        var check = document.getElementsByClassName('myInput'),
            len = Pages - index;

        setTimeout(function() {

        //延时，待表格内容创建完成时向input[type=checkbox]中添加与id对应的属性值
            for (var i = 0; i < idArr.length; i++) {
                check[i].setAttribute('value', idArr[i]);
                
            }
        }, 100);


        compuse = compusePage(res.length);

        for (var i = 1; i <= compuse; i++) {
            $('#Nex').parent().before('<li><a href="" class="mybt-page">' + i + '</a></li>');
        }

        (function() {

            $('#list-book').html(_list);

            $('#item-total').html('共含有' + "<span id='dataNumber'>" + res.length + '</span>' + ' ' + '条数据');
        })();

        $('#Pre').after(_page);

        $(document).ready(function() {
            $('tbody').on('click', 'tr', function() {
                $('tr>th').addClass('bg-info');
                $('tr:even').addClass('success');
                $('tr:odd').addClass('set-color');
            });

            setTimeout(function() {
                $('tr').trigger('click')
            }, 10);
        });
    }

    function loaddata() {
        $.ajax({
            url: 'data/index.php',
            type: 'get',
            dataType: 'json',
            data: {},
            success: function(res) {
                // alert('数据导入成功!')
                console.log('数据载入成功!');

                var len = res.length,
                    Pages = searchPage();

                if (Pages > len) {
                    Pages = len;
                }
                //获取当前页数
                list(Pages, res);
                //显示数据库
            },
            error: function() {
                alert("数据导入失败，请检查数据库是否正确连接或index.html文件是否在服务器下运行");
            }
        });
    }

    loaddata();

    $('select').change(function() {


        var _html = "",
            myContent = myModul.getnum(),
            total = myContent.length,
            pages = searchPage(),
            final;

        $('#list-book').html(_html);
        $('.mybt-page').remove();
        final = total - pages;
        if (final < 0) {
            pages = total;
        }
        list(pages, myContent);
        compusePage(total);
    });

    $('.pager').on('click', '.mybt-page', function(event) {

        //页码切换
        var pageNum;

        event.preventDefault();
        pageNum = parseInt($(this).text());
        pageJump(pageNum);

    });

    $('.pager').on('click', '#Pre', function(event) {

        //向前翻页
        var pageNum;

        event.preventDefault();
        pageNum = myModul.getPage();
        if (pageNum !== 1) {
            pageNum--;
        }
        pageJump(pageNum);
    });

    $('.pager').on('click', '#Nex', function(event) {

        //向后翻页
        var pageNum,
            total,
            pageTotal;

        event.preventDefault();
        total = myModul.getnum().length;
        //获取数据长度;
        pageTotal = compusePage(total);
        //获取页面总数
        pageNum = myModul.getPage();

        if (pageNum !== pageTotal) {
            pageNum++;
        }

        pageJump(pageNum);
    });

    function pageJump(pageNum) {

        //创建一个拥有跳页功能的函数
        var index,
            //定义数据的起始位置;
            last,
            //定义数据的末尾位置;
            myContent = myModul.getnum(),
            //获取数据库内数据;
            currentPage,
            //获取当前页码数;
            total,
            //获取数据总数;
            final;

        total = myContent.length;
        currentPage = searchPage();
        myModul.setPage(pageNum);
        //存储当前页码数;
        index = currentPage * (pageNum - 1);
        last = currentPage * pageNum;
        final = total - index;

        if (final < currentPage) {
            last = index + final;
        }
        $('.pager>li').children('.mybt-page').remove();
        list(last, myContent, index);
    }
    $('#del-data').click(function(event) {
        //删除功能
        event.preventDefault();
        //组织默认事件
        var myInput = document.getElementsByClassName('myInput'),
            arr = [],
            check,
            obj;

        for (obj in myInput) {

            if (myInput[obj].checked) {
                //判断如果input-check被选中，则将其value值存入arr数组中
                arr.push(myInput[obj].value);
            }
        }
        var _id = arr;
        console.log(arr);
        $.ajax({
            url: 'data/delete.php',
            type: 'get',
            dataType: 'json',
            data: {
                id: _id
            },
            success: function(res) {

                // console.log("删除成功");
                if(res.status == 'ok'){
                    alert(res.status);
                }
                else{
                    console.log('删除失败');
                    console.log(res.status);
                }
                // var _html = "",
                // $('#list-book').html(_html);
                $('.pager>li').children('.mybt-page').remove();
                loaddata();
                // var myInput = document.getElementsByClassName('myInput'),
                //         arr = []; 
                //         check,
                //         obj;

                // for (obj in myInput) {

                //     if(myInput[obj].checked){
                //     //判断如果input-check被选中，则将其value值存入arr数组中
                //         arr.push(myInput[obj].checked.value);
                //     }
                // }
                // console.log(arr);

            },
            error: function(erro) {
                console.log('删除失败');
            }
        });
    });
});

function compuseCheck() {

}
