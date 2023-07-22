// 4. Write a program to print the maximum digit of an entered number?(eg:-9876, max=9) 
import java.util.*;
public class MaxNumber {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int temp = n, largest = 0;
    while (temp != 0) {
        int d = temp % 10;
       // largest = Math.max(d, largest);
        if(d>largest) largest = d;
        temp =temp/10;
}
    System.out.println("The max number is "+ largest);
} 
catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
