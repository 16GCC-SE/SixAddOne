import java.util.Scanner;

public class main {
    public static void main(String arg[]){
        System.out.print("---------欢迎使用四则运算小学生版-----------\n");
        System.out.print("        201606120048   黄泳棋              \n");
        System.out.print("请输入题目数量：");
        Scanner scanner = new Scanner(System.in);
        int inputNum = scanner.nextInt();
        int answer;
        int right = 0;
        for (int i = 0 ; i<inputNum ; i++){
            practice practice = new practice();
            answer = practice.newTitle();
            int inputAnswer = scanner.nextInt();
            if (answer==inputAnswer){
                right++;
                System.out.println("回答正确!");
            }else{
                System.out.println("回答错误, 正确答案是"+answer);
            }
        }
        System.out.println("共"+inputNum + "总分为100分，每题分数为" + 100/inputNum);
        System.out.println("您答对了" + right +"题 ， 分数为"+100/inputNum*right);
    }

}
