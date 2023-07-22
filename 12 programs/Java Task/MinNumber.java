// 5. Write a program to print the minimum digit of an entered number?(eg:-1234,min=1) 

import java.util.*;
public class MinNumber {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n, smallest = 9;
    while (temp != 0) {
        int d = temp % 10;
        //smallest = Math.min(d,smallest);
        if(smallest>d) smallest = d;
        temp =temp/10;
}
    System.out.println("The Min number is "+smallest);
         
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
