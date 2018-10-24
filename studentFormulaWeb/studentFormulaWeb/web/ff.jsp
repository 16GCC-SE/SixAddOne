<%--suppress ALL --%>
<%--
  Created by IntelliJ IDEA.
  User: shenshu
  Date: 2018/10/20
  Time: 11:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <%--<meta http-equiv="X-UA-Compatible" content="IE=edge">--%>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">

    <title>小小运算家</title>
    <meta charset="utf-8"/>
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


    <section id="intro" style="width: 75%;margin: auto;padding: 3% 10%">
        <span class="icon fa-diamond major" style="text-align: center;"></span>
        <div class="form-group" style="position: relative;left: 32%">
            <form method="get" action="jump.jsp">
                <select style="text-align: center" class="form-control" id="select1" name="select1">
                    <option value="0">请选择倒计时时间</option>
                    <option value="12">50秒</option>
                    <option value="100">100秒</option>
                    <option value="120">120秒</option>
                </select>
                <select style="text-align: center" class="form-control" id="select2" name="select1">
                    <option value="0">请选择题目数量</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <button class="btn btn-pill btn-block btn-dark" type="submit"
                        style="margin-top:1em;width: 35%;height: 3em">点击设置
                </button>
            </form>
        </div>


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
