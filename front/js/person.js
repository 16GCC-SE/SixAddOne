$(document).ready(function () {
    //用户中心--
    document.getElementsByClassName('left_aside_ul')[0].children[0].classList.add('class_js');
    document.getElementsByClassName('user_icon01')[0].classList.add('class_foucus');

    $('.user_icon09').parent().parent().click(function () {
        console.log(222222);
        $('.user_center01').css('display', 'none');
        $('.user_center09').css('display', 'block');
        $('.user_center02').css('display', 'none');
    });
    $('.user_icon02').parent().parent().click(function () {
        console.log(33333);
        $('.user_center01').css('display', 'none');
        $('.user_center02').css('display', 'block');
        $('.user_center09').css('display', 'none');
    });

    // .class_js{
    //     border: 1px #e83a17 solid;
    //     background-color: #e83a17;
    //     color: white;
    // }
    // .class_foucus{
    // color: white;
    // background: url('../img/icon_person02/yonghu.png') no-repeat left center;
    // }


    // var _list_index =  $('.left_aside_ul')
    // var _len = list_index.length;

    // for(var i = 0; i<_len; i++){
    //     _list_index.index = i;
    //     _list_index.onclick = function(){
    //         console.log(this.index);
    //     }
    // }


})

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


function getQueryByName(url, name) {
    var reg = new RegExp('[?&]' + name + '=([^&#]+)');
    var query = url.match(reg);
    return query ? query[1] : null;
}

var object_data = new Object();


function save_basic() {

    var change_name = document.getElementById('user_name').value;
    var change_age = document.getElementById("user_age").value;
    var change_man_sex = document.getElementById("sex_man").getAttribute("value");
    var change_woman_sex = document.getElementById("sex_woman").getAttribute("value");
    var sex_value = "";
    if (change_man_sex == "男") {
        sex_value = "男";
    } else if (change_woman_sex == '女') {
        sex_value = "女";
    }

    var user_iphone = document.getElementById('user_iphone').value;
    var user_QQ = document.getElementById('user_QQ').value;
    // var change_sex =
    var json_data_basic = {
        userId: object_data.userId,
        userName: change_name,
        userAge: change_age,
        userPhone: user_iphone,
        userQQ: user_QQ,
        userSex: sex_value,
    };
    $.ajax({
        url: 'http://binguo.online/users/change',
        type: 'POST',
        dataType: 'json',
        data: json_data_basic,
        contentType: "application/x-www-form-urlencoded",
        success: function (data) {
            console.log(data);
            alert("保存成功");
        }
    });
}

$('#save_basic').click(save_basic);

function to_render(data) {
    console.log("重新渲染页面");
    console.log(data);
    data = data.result;
    $('#user_id').text(data.userId);
    $('#user_name').attr("value", data.userName);
    $('#brithday').attr("value", data.userAge);
    $('#user_iphone').attr("value", data.userPhone);
    $('#user_QQ').attr("value", data.userQQ);
    $("#user_Number").text(data.userNumber);
    if (data.userSex == "男") {
        change_sex_man();
    } else if (data.userSex == "女") {
        change_sex_woman();
    }
    $('#user_center_id').text(data.userId);
}

$(document).ready(function () {
    var userId_value = getQueryByName(window.location.href, 'userId');
    console.log(userId_value);
    var json_data = {
        userId: userId_value
    }
    $.ajax({
        url: "http://binguo.online/users/check",
        type: 'GET',
        dataType: 'json',
        data: json_data,
        success: function (data) {
            console.log(data);
            object_data = data;
            if (data.status == 0) {
                console.log("查询成功");
                to_render(data);
            }
            else {
                alert("请先登录");
                window.location.href = "index.html";
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
})

function security_fuc() {
    var pwd = document.getElementById('newPwd').value;
    var oldPwd = object_data.result.userPwd;
    var newpwd = document.getElementById('oldPwd').value;
    if (newpwd == '') {
        alert("请输入值");
        return;
    }
    if (oldPwd != pwd) {
        $("#newpwd").attr('placeholder', "密码输入错误!!");
        alert('原密码错误');
        return;
    } else {

        var json_data_basic = {
            userId: object_data.userId,
            userPwd: newpwd
        }
        $.ajax({
            url: 'http://binguo.online/users/change',
            type: 'POST',
            dataType: 'json',
            data: json_data_basic,
            contentType: "application/x-www-form-urlencoded",
            success: function (data) {
                console.log(data);
            }
        });
        alert("保存成功");
    }

}