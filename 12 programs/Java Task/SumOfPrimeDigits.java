// 8. Write a program to print the sum of the prime digits of an entered number? 
import java.util.*;

public class SumOfPrimeDigits {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n, sum = 0;
         while (temp != 0) {
             int d = temp % 10;
     
             temp =temp/10;
            //  if (d == 2 || d == 3 || d == 5 || d == 7){
            //          sum=sum+d;
            //      }

            boolean isPrime = true;
            if (d <= 1) {
                isPrime = false;
                //break;
            }
            for (int i = 2; i < d; i++) {
                if (d % i == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                sum=sum+d;
             }
            }
         System.out.println("The sum of the Prime digits is: "+ sum);
         
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}
}
