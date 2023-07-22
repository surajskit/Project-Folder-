// 9. Write a program to print whether the sum of digits of an entered number is odd or even?
import java.util.*;

public class sumEvenOdd {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n, sum = 0;
    while (temp != 0) {
        int d = temp % 10;
        sum=sum+d;
        temp =temp/10;
}
    System.out.println(sum);
    if(sum%2==0)
        System.out.println("After the sum of digits , final number i.e "+sum+ " is : Even number");
    else
    System.out.println("After the sum of digits , final number i.e "+sum+ " is : Odd number");        

} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
