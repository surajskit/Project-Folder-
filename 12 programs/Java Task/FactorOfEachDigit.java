//10. Write a program to print the factors of each digit of an entered number?
import java.util.*;

public class FactorOfEachDigit {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n;
         System.out.print("Factors for each digit of  " + n + " are: ");
     while (temp != 0) {
         int d = temp % 10;
         temp =temp/10;
         for (int i = 1; i <= d; ++i) {
             if (d % i == 0) {
               System.out.print(i+ " ");
             }     
         }
         System.out.println(); 
 }    
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
