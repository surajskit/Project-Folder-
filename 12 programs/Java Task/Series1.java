//7 A. S=1+3+5+7+9+___________+n
import java.util.*;
public class Series1 {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
        System.out.println("Sample Series is : S=1+3+5+7+9+___________+n");
         System.out.println("enter the number of terms");
         int n=sc.nextInt();
         sc.close();
   
        if(n%2==0){
            for(int i=1,k=1;i<=(n/2);i++,k+=2) {
                System.out.print(k);  
                if (i!=(n/2)) {
                    System.out.print("+");
            }
        }
    }
        else{
            for(int i=1,k=1;i<=((n/2)+1);i++,k+=2) {
                System.out.print(k);  
                if (i!=((n/2)+1)) {
                    System.out.print("+");
            }
        }
    }
}
catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}
}