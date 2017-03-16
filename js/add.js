$(document).ready(function() {
    $('#my-sub').on('click', function(even) {
        even.preventDefault();
        $.ajax({
            url: 'data/add.php',
            type: 'get',
            dataType: 'json',
            data: {
                book: $('#bookname').val(),
                code: $('#codenumber').val(),
                borrower: $('#borrower').val(),
                contact: $('#contact').val(),
                more: $('#more').val()
            },
            success: function(res) {
                if (res.status == "ok") {
                    alert('添加成功');
                    location.href = 'index.html';
                } else {
                    alert('添加失败，请检查php文件');
                }
            },
            error: function() {
                alert("添加出错了");
            }
        });
    });
    $('#res').click(function() {
        alert('取消当前操作,返回借书列表')
        document.location.href = 'index.html';
    });
});
