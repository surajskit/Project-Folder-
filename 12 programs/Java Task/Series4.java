// D. S=1 , 12 , 123 , 1234 , 12345 
import java.util.*;
public class Series4 {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
     try {
        System.out.println("Series is : S=1 , 12 , 123 , 1234 , 12345");
         System.out.println("enter the number");
         int n=sc.nextInt();
         sc.close();
         int sum=0;
        for(int i=1;i<=n;i++){       
           sum=sum*10+i;
           System.out.print(sum+" ");
        }    
         

} catch (InputMismatchException ex) {
System.out.println("Invalid Input ");
}
}	

}
