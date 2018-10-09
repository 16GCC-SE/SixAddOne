import java.util.Random;
import java.util.Scanner;

public class practice {

    /**
     * 函数功能：对数据进行运算
     */
    public int getTotal(int x,int y,String symbol){
        int total = 0;
        switch(symbol){
            case "+":
                total = x + y;
                break;
            case "-":
                total = x-y;
                break;
            case "*":
                total = x*y;
                break;
            case "/":
                if(y==0){
                    newTitle();
                }else if(x<y){
                    total=0;
                }else {
                    total = x/y;
                }
                break;
        }
        return total;
    }

    /**
     * 函数功能：获取随机数
     * @return num 一个1-100的随机数
     */
    public int getNum(){
        int num = (int)(1+Math.random()*(100-1+1));
        return num;
    }

    /**
     * 函数功能：获取随机运算符
     * @return 运算符字符串
     */
    public  String getSymbol(){
        int symbol = (int)(1+Math.random()*(4-1+1));
        switch (symbol){
            case 1:
                return "+";
            case 2:
                return "-";
            case 3:
                return "*";
            case 4:
                return "/";
        }
        return "";
    }
    public int opLevel(String op){
        if(op.equals("+")||op.equals("-")){
            return 0;
        }else return 1;
    }
    public int newTitle(){
        int total;
        int answer;
        /*
        得到随机运算符以及数值
         */
        int x = getNum();
        String op1 = getSymbol();
        int y  = getNum();
        String op2 = getSymbol();
        int z = getNum();
        /*
        判断运算符优先级
         */
        int level1 = opLevel(op1);
        int level2 = opLevel(op2);
        if (level2>level1){
             total = getTotal(y, z, op2);
             answer = getTotal(x,total, op1);
        }else {
             total = getTotal(x, y, op1);
             answer = getTotal(total,z, op2);
        }

        if (answer>=0){
            System.out.print(x+op1+y+op2+z+"=");

        }
        else {
            answer=newTitle();
            return answer
        ;
        }
        return answer;
    }



}
