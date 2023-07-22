// 6. Write a program to print the factorial of its digits?

import java.util.*;
public class Factorial {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         while (n != 0) {
            int d = n % 10;
            n =n/10;
            int fact = 1;
            for (int i = 1; i <= d; i++) {
                fact=fact*i;
            }           
            System.out.println("Factorial of " + d + " = " + fact);
}
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}	
}
}
