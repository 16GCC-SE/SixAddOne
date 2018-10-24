<%@ page import="newTitle.newFomula" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">

    <title>小小运算家</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link rel="stylesheet" href="css/main.css"/>

    <!-- Icons-->
    <link href="vendors/@coreui/icons/css/coreui-icons.min.css" rel="stylesheet">
    <link href="vendors/flag-icon-css/css/flag-icon.min.css" rel="stylesheet">
    <link href="vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="vendors/simple-line-icons/css/simple-line-icons.css" rel="stylesheet">
    <link href="vendors/pace-progress/css/pace.min.css" rel="stylesheet">
</head>
<body>

<!-- Header -->
<header id="header" class="alt">
    <div class="inner">
        <h1>小小运算家</h1>
        <p>本程序提供四则运算以及阶乘题目</p>
    </div>
</header>

<!-- Wrapper -->
<div id="wrapper">

    <!-- Banner -->
    <section id="intro" style="width: 800px;margin: auto;padding: 3% 10%">
        <span class="icon fa-diamond major" style="text-align: center;"></span>
        <h2 style="margin-top: 1.5em">开始你的运算之旅吧<span id="time" style="float: right">
      <%
          String ti = String.valueOf(session.getAttribute("title"));
          String[] timu;
          timu = ti.split(",");
      %>
      <script>
        var times =<%=session.getAttribute("time")%>;
        var timer;
        var second;

        function time() {
            timer = setInterval(function () {
                second = 0;//时间默认值
                if (times > 0) {
                    second = times;
                }
                if (second <= 9) second = '0' + second;
                document.getElementById("time").innerHTML = "00" + ":" + second + "秒";
                if (times == -1) {
                    clearTimeout(timer);
                    alert("时间到啦！请停止答题！")
                    for (var i = 0; i <<%=session.getAttribute("nums")%>; i++) {
                        var s = document.getElementById("formularAn"+i); //选择框
                        s.disabled = true;
                    }
                }
                times--;
            }, 1000);
        }

        function titleNum() {
            $("#begin").hide();
            document.getElementById("formFormula").style.display = "block";
            for (var i = 1; i <=<%=session.getAttribute("nums")%>; i++) {
                document.getElementById("t" + i).style.display = "flex";
            }
            time();
        }
      </script>
    </span></h2>


        <button id="begin" onclick="titleNum()" style="text-align: right;" class="btn btn-sm btn-primary" type="button">
            开始
        </button>
        <script>
            // var options1=$("#select1 option:selected");
            // var options2=$("#select2 option:selected");
            // function set() {
            //     if(options1.text()!="请选择倒计时时间" && options2.text()!="请选择题目数量"){
            //         document.getElementById("time").innerHTML=options1.text();
            //         $('input').val("");
            //         titleNum();
            //         time();
            //     }
            // }

            function trueOfFalse() {
                clearInterval(timer);
                var startTime = <%=session.getAttribute("time")%>;
                var endTime = second;
                var totalTime = startTime - endTime;

                <%
                    String an= String.valueOf(session.getAttribute("ans"));
                    String[] answer ;
                    answer= an.split(",");
                    int k=0;
                    for(int j=0;j<5;j++){
                        if(answer[j].equals("dd")){
                            k++;
                        }
                    }
                %>

                var an = new Array(5);
                var rAn = new Array(5);
                for (var i = 0; i <<%=session.getAttribute("nums")%>; i++) {
                    an[i] =document.getElementById("formularAn" + i).value;
                    document.getElementById("a" + i).style.display = "flex";
                }
                var rTi=0;
                <% for(int i=0;i<5-k;i++){%>
                rAn[<%=i%>]=<%=answer[i]%>;
                if ( an[<%=i%>] == rAn[<%=i%>] ) {
                    document.getElementById("tof" + <%=i%>).innerHTML = "&nbsp;<i class=\"fa fa-check fa-lg mt-4\" style='font-size: 1.3125rem;'>正确答案是:</i>"
                    rTi++;
                } else {
                    document.getElementById("tof" + <%=i%>).innerHTML = "&nbsp;<i class=\"fa fa-remove fa-lg mt-4\" style='font-size: 1.3125rem;'>正确答案是:</i>"
                }
                <%}%>
                alert("您用时为："+totalTime+"秒！正确题数为："+rTi+"题，答错题数为："+(<%=session.getAttribute("nums")%>-rTi));
            }
        </script>
        <form id="formFormula" action="" method="post" style="display: none">

            <div class="form-group">
                <div class="input-group" id="title">
                    <h4 style="display: none;" id="t1">
                        <span id="formula1" class="input-group-text"><%=timu[0]%></span>
                        <input style="border: none;border-bottom: solid" id="formularAn0" name="username3" type="text">
                        <span id="tof0"></span><span id="a0" style="display: none"><%=answer[0]%></span>
                    </h4>
                    <h4 style="display: none;" id="t2">
                        <span id="formula2" class="input-group-text"><%=timu[1]%></span>
                        <input style="border: none;border-bottom: solid" id="formularAn1" name="username3" type="text">
                        <span id="tof1"></span><span id="a1" style="display: none"><%=answer[1]%></span>
                    </h4>
                    <h4 style="display: none;" id="t3">
                        <span id="formula3" class="input-group-text"><%=timu[2]%></span>
                        <input style="border: none;border-bottom: solid" id="formularAn2" name="username3" type="text">
                        <span id="tof2"></span><span id="a2" style="display: none"><%=answer[2]%></span>
                    </h4>
                    <h4 style="display: none;" id="t4">
                        <span id="formula4" class="input-group-text"><%=timu[3]%></span>
                        <input style="border: none;border-bottom: solid" id="formularAn3" name="username3" type="text">
                        <span id="tof3"></span><span id="a3" style="display: none"><%=answer[3]%></span>
                    </h4>
                    <h4 style="display: none;" id="t5">
                        <span id="formula5" class="input-group-text"><%=timu[4]%></span>
                        <input style="border: none;border-bottom: solid" id="formularAn4" name="username3" type="text">
                        <span id="tof4"></span><span id="a4" style="display: none"><%=answer[4]%></span>
                    </h4>
                </div>
            </div>
            <div>
                <button onclick="trueOfFalse()" style="text-align: right;" class="btn btn-sm btn-primary" type="button">
                    确定
                </button>
            </div>

        </form>
    </section>

    <!-- Footer -->
    <footer id="footer">
        <ul class="icons">
            <li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
            <li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
            <li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
            <li><a href="#" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
            <li><a href="#" class="icon fa-envelope"><span class="label">Email</span></a></li>
        </ul>
    </footer>

</div>

<!-- Scripts -->
<script src="js/jquery.min.js"></script>
<script src="js/skel.min.js"></script>
<script src="js/util.js"></script>
<script src="js/main.js"></script>
<!-- CoreUI and necessary plugins-->
<script src="vendors/jquery/js/jquery.min.js"></script>
<script src="vendors/popper.js/js/popper.min.js"></script>
<script src="vendors/bootstrap/js/bootstrap.min.js"></script>
<script src="vendors/pace-progress/js/pace.min.js"></script>
<script src="vendors/perfect-scrollbar/js/perfect-scrollbar.min.js"></script>
<script src="vendors/@coreui/coreui/js/coreui.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>

</body>
</html>
