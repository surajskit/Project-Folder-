import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularHttpRequest';
  productList: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // 1.Adding data to the  API
  onProductcreate(products: { pName: string, desc: string, price: string }) {
    console.log(products);
    const headers = new HttpHeaders({ 'myHeader': 'proacademy' })
    // post(url:string, body:any, options:{headers?:...............})  
    this.http.post('https://angularbysuraj-default-rtdb.firebaseio.com/products.json',
      products, { headers: headers })
      .subscribe((products) => {
        console.log(products);
      })
  };

  //https://www.youtube.com/watch?v=Nuh6hTDh31s&t=1s
  // 2.Getting/fetching data from  API 
  private fetchProducts() {
    // get(url:string,options:{headers?:...............})  
    this.http.get('https://angularbysuraj-default-rtdb.firebaseio.com/products.json')
      // to convert into array of object we use pipe
      .pipe(map((res) => {
        const products = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            products.push({ ...res[key], id: key })
          }
        }
        return products
      }))
      .subscribe((products) => {
        console.log("products are ", products);
        this.productList = products;
      })
  }

  // 3. To delete data from the API
  onDeleteProduct(id: string) {
    this.http.delete('https://angularbysuraj-default-rtdb.firebaseio.com/products/' + id + '.json')
      .subscribe();
  }

  // 4. To delete all the data from the API
  onDeleteAllProducts() {
    this.http.delete('https://angularbysuraj-default-rtdb.firebaseio.com/products.json')
      .subscribe();
  }
}


