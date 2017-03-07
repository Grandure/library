function searchPage(setPage) { //查询页面 若输入参数为设置页面，若参数为空为查询页面
    var getPage = document.getElementById('my-page');
    currentPage = parseInt(getPage.value);
    if (arguments.length == 0) {
        return currentPage
    }
    currentPage = setPage;
    return currentPage;
}

function compusePage(itemTotal) { //itemTotal表示数据库内容总数
    var pageNum = searchPage(); //从Ajax获取数据库内容 searchPage参数需要增加获取的值;
    var result = itemTotal / pageNum;
    //searchPage(); //查询当前设置页数
    if (itemTotal % pageNum !== 0) {
        result = result + 1;
    }
    if (result <= 1) {
        pageNum = 1;
    }
    pageNum = parseInt(result, 10);
    console.log('当前分页数为:' + '' + pageNum);
}
var myModul = (function(m) { //创建一个模块用于存储数据库的内容
    var f = {};
    var Fnum;
    f.getnum = function() {
        // console.log(Fnum);
        return Fnum
    };
    f.setnum = function(n) {
        Fnum = n;
    };
    return f;
}());

$(document).ready(function() {
    function list(Pages, res, index) { //获取数据库内容并显示出来
        var _list = ""; //存储列表临时变量
        var _page = ""; //存储页面临时变量
        var compuse;
        var abc = res;
        index = index || 0;
        myModul.setnum(abc);
        //console.log('全部数据如下:' + myModul.getnum());
        for (var i = index; i < Pages; i++) {
            _list += "<tr><td>" + "<input type='checkbox'/>" + "<span>" + res[i]['id'] + "</span>" + "\
                    </td>/<td>" + res[i]['book'] + "</td>\
                    <td>" + res[i]['code'] + "</td>\
                    <td>" + res[i]['borrower'] + "</td>\
                    <td>" + res[i]['tel'] + "</td>\
                    <td>" + res[i]['more'] + "</td>\</tr>";

        }
        compuse = compusePage(res.length);
        for (var i = 1; i <= compuse; i++) {
            // $('#Nex').parent().html('');
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
                var Pages = searchPage(); //获取当前页数
                list(Pages, res); //显示数据库
            },
            error: function() {
                alert("数据导入失败，请检查数据库是否正确连接或index.html文件是否在服务器下运行");
            }
        });
    }
    loaddata();
    $(document).ready(function() {
        $('tbody').on('click', 'tr', function() {
            $('tr>th').addClass('bg-info');
            $('tr:even').addClass('success');
        });
        setTimeout(function() {
            $('tr').trigger('click')
        }, 10);
    });
});
