//C. S=1 , 22 , 333 , 4444 , 55555 , __________+n
import java.util.*;
public class Series3 {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
        System.out.println("Series is : S=1 , 22 , 333 , 4444 , 55555 , __________+n");
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         for(int r=0;r<=n;r++){
            for(int c=1;c<=r;c++){
                System.out.print(r);
            }
            System.out.print(" ");
        }  
         
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
