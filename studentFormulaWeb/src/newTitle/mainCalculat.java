package newTitle;

import java.io.IOException;
import java.util.Scanner;

public class mainCalculat
{
    int textNum;//存放用户输入的题数
    int trueTitle=0;//存放用户答对题数
    float score;//存放用户得分
    public static void main(String[] args)
    {
        System.out.println("********** 欢迎使用四则运算小程序 **********");
        System.out.println("************* 开发作者：阿  叔 *************");
        mainCalculat mc=new mainCalculat();
        mc.putInNum();//让用户输入题数
        mc.countScore();//计算得分
    }

    /*
    * 功能：让用户输入题数
    * 参数：无
    * 返回值：无
    * */
    private void putInNum()
    {
        System.out.print("请输入需要生成的题目数（正整数）：");
        Scanner scanner=new Scanner(System.in);
        textNum=scanner.nextInt();//获取用户输入
        if(textNum>0)
        {
            System.out.println("您输入的题目数为："+textNum+"道！");
            System.out.println("请按回车键出题......");
            try
            {//按回车键继续
                System.in.read();
            }
            catch (IOException e)
            {
                e.printStackTrace();
            }
        }
        else
        {
            System.out.println("输入数字有误，请重新输入！");
            putInNum();
        }

    }

    /*
    * 功能：计算用户得分
    * 参数：无
    * 返回值：无
    * */
    private void countScore()
    {
        //循环输出式子
        for(int i=0;i<textNum;i++)
        {
            newFomula nfomula=new newFomula();
            int trueResule=nfomula.newFomulate();
            //获取用户输入的值
            Scanner scanner=new Scanner(System.in);
            int userResult=scanner.nextInt();
            if(trueResule==userResult)
            {
                System.out.println("回答正确！");
                trueTitle++;//累加答对的题数
            }
            else
            {
                System.out.println("回答错误！正确答案是"+trueResule);
            }
        }
        score=100/textNum*trueTitle;//计算用户答题得分
        System.out.println("总分100分，每小题为"+100/textNum+"分，您的分数为："+score);
        if(score<60)
        {
            System.out.println("分数不及格！");
        }
        if(score>=60)
        {
            System.out.println("分数及格！");
        }
    }
}
