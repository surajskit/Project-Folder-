import { Injectable  } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs';

@Injectable({ providedIn: "root" })

export class ProductService  {
    productList!:any;
    constructor(private http: HttpClient) {}
   
    //create product in Database using post request
    createProduct(products: { pName: string, desc: string, price: string }) {
        console.log(products); 
        const headers = new HttpHeaders({ 'myHeader': 'academy' })
        // post(url:string, body:any, options:{headers?:...............})  
       return this.http.post('https://angularbysuraj-default-rtdb.firebaseio.com/products.json', 
       //By adding return before the this.http.post statement, the method now returns an observable. 
       //Now you can subscribe to the observable in the onProductcreate method of the AppComponent class.
            products, { headers: headers })
           
    }

    //fetch product from Database using get request
    fetchProduct() {
    // get(url:string,options:{headers?:...............})  
    return this.http.get('https://angularbysuraj-default-rtdb.firebaseio.com/products.json')
    // to convert into array of object we use pipe
    .pipe(map((res) => {
      const products = [];
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          products.push({ ...res[key], id: key })
        }
      }
      this.productList = products;
      console.log(this.productList);
      return products
    }))
    }

    //delete product from Database using delete request
    deleteProduct(id: string) {
      return  this.http.delete('https://angularbysuraj-default-rtdb.firebaseio.com/products/' + id + '.json')
        // .subscribe();
      }

    //delete all products from Database using delete request
    deleteAllProducts() {
       return this.http.delete('https://angularbysuraj-default-rtdb.firebaseio.com/products.json')
        // .subscribe();
    }

    updateProduct(id:string,products: { pName: string, desc: string, price: string } ){
        console.log("update is ",id ,products);
         // put(url:string,options:{headers?:...............})  
         return this.http.put('https://angularbysuraj-default-rtdb.firebaseio.com/products/' + id + '.json',products)
        //  .subscribe();
    }
}

