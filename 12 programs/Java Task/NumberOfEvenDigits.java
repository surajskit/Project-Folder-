// 3. Write a program to print the number of the even digits of an entered number? 

import java.util.*;
public class NumberOfEvenDigits {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n;
        System.out.println("The number of even digits are :");
    while (temp != 0) {
        int d = temp % 10;
        if(d%2==0){
            System.out.println(d);
        }
        temp =temp/10;
}
     } 
catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}

