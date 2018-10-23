package newTitle;

import java.util.Random;

public class newFomula
{
    public String fomula;//存放最终式子
    int numCount=3;//式子的数字个数
    int ranClass;//随机生成题目类型（阶乘还是四则运算）
    int[] stringNum=new int[numCount];//式子的三个数字
    int jiecNum;//放随机出的阶乘数
    int[] op=new int[numCount-1];//式子的两个运算符的数组下标,运算符个数总比数字个数少一个
    String[] operator=new String[4];//用数组存放四个运算符
    int[] pri=new int[numCount-1];//标记运算符优先级情况，若为“+”“-”则为0，“*”“/”则为1
    int result;//运算结果


    /*
    * 功能：生成一条四则运算题
    * 参数：无
    * 返回值：返回运算结果值
    * */
    public int newFomulate()
    {
        fomula="";//初始化式子字符串
        Random random=new Random();

        ranClass=random.nextInt(2)+1;//随机1代表四则运算，2代表阶乘

        if(ranClass==1){
            result=0;//初始化式子结果为0
            for (int i=0;i<numCount;i++)//生成式子的三个随机数数字
            {
                stringNum[i]=random.nextInt(100)+1;
            }
            //将运算符放进运算符数组
            operator[0]="+";
            operator[1]="-";
            operator[2]="x";
            operator[3]="/";

            //随机生成两个运算符
            for (int i = 0; i<numCount-1; i++)
            {
                int randOpera=random.nextInt(4);//随机生成运算符数组的下标数
                op[i]=randOpera;
                if (op[i]==0 || op[i]==1)
                {
                    pri[i]=0;//若为“+”“-”则为0
                }
                if(op[i]==2 || op[i]==3)
                {
                    pri[i]=1;//若为“*”“/”则为1
                }
            }

            //计算式子的答案
            //如果前运算符的优先级低于后运算符
            if(pri[0]<pri[1])
            {
                int temp=stringNum[numCount-1];//存最后一个数字
                for(int i=numCount-2;i>=0;i--)
                {
                    if(op[i]==0)
                    {
                        temp=stringNum[i]+temp;
                    }
                    if(op[i]==1)
                    {
                        temp=stringNum[i]-temp;
                    }
                    if(op[i]==2)
                    {
                        temp=stringNum[i]*temp;
                    }
                    if(op[i]==3)
                    {
                        temp=stringNum[i]/temp;
                    }

                }
                result=temp;
            }
            //如果前运算符的优先级高于或等于后运算符
            else
            {
                result+=stringNum[0];//把第一个数字放进去
                for (int i=1,j=0;i<numCount && j<numCount-1;i++,j++)
                {
                    if(op[j]==0)
                    {
                        result+=stringNum[i];
                    }
                    if(op[j]==1)
                    {
                        result-=stringNum[i];
                    }
                    if(op[j]==2)
                    {
                        result*=stringNum[i];
                    }
                    if(op[j]==3)
                    {
                        result/=stringNum[i];
                    }
                }
            }

            //如果结果为正数，输出式子
            if(result>=0)
            {
                for(int i=0;i<numCount-1;i++)
                {
                    fomula = fomula + stringNum[i] + operator[op[i]];
                }
                fomula=fomula+stringNum[numCount-1]+"=";
            }
            //如果结果不是正数，重新生成题目
            else
            {
                newFomulate();
            }
        }
        else if(ranClass==2){
            result=1;//初始化result为1
            jiecNum=random.nextInt(100)+1;
            fomula=jiecNum+"!=";
            for(int i=jiecNum;i>0;i--){
                result*=i;
            }
        }

        return result;
    }
}
