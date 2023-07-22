// 2. Write a program to print the sum of the even digits of an entered number? 
import java.util.*;
public class SumOfEvenDigits {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number: ");
         int num=sc.nextInt();
         sc.close();
         int temp = num, sum = 0;
    while (temp != 0) {
        int d = temp % 10;
        if(d%2==0){
            sum=sum+d;
        }
        temp =temp/10;
}
   System.out.println("the sum of the even digits is :"+sum);

} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}
}
