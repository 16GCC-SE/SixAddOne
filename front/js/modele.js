 $(document).ready(function () {
        $(document).scroll(function () {
            if ($(document).scrollTop() > 200) {
                console.log(111);
                $('#top_fixed').css("display", "block");
            }
            else {
                $('#top_fixed').css("display", "none");
            }
        })
    })
    function register_suc(data) {
        $('#register').css('display', 'none');
        $('#denglu').text(data.result.userId);

        //  传递参数给另外一个网页
        var u = "person.html?userId=" + data.result.userId;
        $('#a_person').attr("href", u);
    }


    $('#denglu').hover(function () {
        $('#bz_xiala').css('display', 'block');
    });


    $('#bz_xiala').hover(function () {
        $('#bz_xiala').css('display', 'block');
    }, function () {
        $('#bz_xiala').css('display', 'none');
    });

    $('#denglu').click(function () {
        $('#register').css('visibility', 'visible');
        $('#register').css('display', 'flex');
        $('#register').css('z-index', '11');
        $('.test_zhao').fadeIn();
    })
    $('#zhuce').click(function () {
            window.location.href = "register.html";
        });

        $('#icon_close').click(hidden_zhao);

         function register_in() {
        var user_name = document.getElementById('user_name').value;
        var user_pwd = document.getElementById('user_pwd').value;

        var json_data = {
            userId: user_name,
            userPwd: user_pwd
        }
        $.ajax({
            url: "http://binguo.online/users",
            type: 'POST',
            dataType: "json",
            data: json_data,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {

                if (data.status == 0) {
                    status = 0;
                    console.log("登录成功");
                    console.log(data);
                    hidden_zhao();
                    register_suc(data);
                    setCookie("userId", data.result.userId, 6);
                }
                else if (data.status == 103) {
                    $('.login_phone span').text("用户名不存在").css("color", "red");
                    status = 103;
                    console.log(data);
                } else if (data.status == 102) {
                    console.log("用户名或密码错误");
                    status = 102;
                    $('.login_phone span').text("用户名或密码错误");
                }
            },
            error: function (err) {
                console.log(err);
            }

        })
    }

    register_in();
    var ajax_button = document.getElementById('ajax_button');
    ajax_button.addEventListener('click', register_in);
function hidden_zhao() {
        $('#register').css('visibility', 'hidden');
        $('.test_zhao').css('display', 'none');
    }
    