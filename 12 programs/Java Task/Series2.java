//B. S=1-2+3-4+_______________+n
import java.util.*;
public class Series2 {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
        System.out.println("Series is : S=1-2+3-4+_______________+n");
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         //int sum=0;
        // for(int i=0;i<=n;i++){
        //     if(i%2==0)
        //         sum=sum-i;
        //     else
        //         sum=sum+i;
        // }
        // System.out.print("Sum of " +n+" term is:  " + sum);

        for(int i=1;i<=n;i++) {
            if(i%2==0){
                System.out.print(i);
                if (i != n) {
                System.out.print("+");
            }
            }
            else{
                System.out.print(i);
                if (i != n) {
                    System.out.print("-");
            }
        }
    }
} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	
}
