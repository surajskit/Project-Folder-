//1. Write a program to print the number of the prime digits of an entered number? 
import java.util.*;
public class PrimeDigitCount
{
	public static void main(String[] args) {
		    Scanner sc=new Scanner(System.in);
	     try {
	         System.out.println("enter number:");
	         int num=sc.nextInt();
             sc.close();
	         int temp = num, count = 0;
	         while (temp != 0) {
        int d = temp % 10;
        temp =temp/10;

        boolean isPrime = true;
        if (d <= 1) {
            isPrime = false;    
        }
        for (int i = 2; i < d; i++) {
            if (d % i == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            count++;
         }
        }   
        System.out.println("The Number of prime digits is :"+count);              
}   
catch (InputMismatchException ex) {
    System.out.println("Invalid Input ");
}
}	
} 