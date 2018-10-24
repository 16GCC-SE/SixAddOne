<%@ page import="newTitle.newFomula" %><%--
  Created by IntelliJ IDEA.
  User: Hyq
  Date: 2018/10/22
  Time: 23:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<%
    StringBuffer timus=new StringBuffer();
    StringBuffer answer=new StringBuffer();
    String[] timu = new String[5];
    int[] ans = new int[5];
    String num =request.getParameter("select2");
    String time =request.getParameter("select1");

    int nums=Integer.valueOf(num);
    session.setAttribute("nums",nums);
    for(int i = 0;i< nums ;i++){
        newFomula newFomula = new newFomula();
        ans[i] = newFomula.newFomulate();
        timu[i] = newFomula.fomula;
        timus.append(timu[i]+",");
        answer.append(ans[i]+",");
    }
    for(int j=0 ; j<5-nums ; j++){
        timus.append("dd"+",");
        answer.append("dd"+",");
    }
    session.setAttribute("ans",answer.toString());
    session.setAttribute("title",timus.toString());
    session.setAttribute("time",time);
    response.sendRedirect("ss.jsp");
%>

<body>

</body>
</html>
