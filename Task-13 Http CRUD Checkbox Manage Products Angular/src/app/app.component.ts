import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './Service/products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularHttpRequest';
  productList: any;
  editMode: boolean = false; // for change "Add Product button" to "update product button"
  currentProductId: string;

  @ViewChild('productsForm') form: NgForm;
  constructor(private http: HttpClient, private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // for selecting all the products based on the checkbox selected 
  onSelectAllChange(event: any) {
    const isChecked = event.target.checked;
        
    this.productList.forEach((product: any) => {
      product.selected = isChecked;
      console.log("product.selected", product.selected);
    });
  }

  // for selecting one or more products based on the checkbox selected 
  onCheckboxChange(event: any, productName: string) {
    const product = this.productList.find((prod: any) => prod.pName === productName);
    if (product) {
      product.selected = event.target.checked;
    }

    const selectedItems = this.productList
      .filter((prod: any) => prod.selected)
      .map((prod: any) => prod.pName);
    console.log(selectedItems);
  }

  DeleteSelectedProduct() {
    const selectedProducts = this.productList.filter((prod: any) => prod.selected);
    console.log("selectedProducts", selectedProducts);

    // Perform the delete operation for selected products (e.g., using an API call)
    const deleteRequests = selectedProducts.map((prod: any) => {
      const url = `https://angularbysuraj-default-rtdb.firebaseio.com/products/${prod.id}.json`;
      this.http.delete(url).subscribe();
    });

    // After successful deletion, remove the selected products from the productList array
    this.productList = this.productList.filter((prod: any) => !prod.selected);
    console.log("productList", this.productList);
  }

  //1.create OR update product in Database
  onProductcreate(products: { pName: string, desc: string, price: string }) {
    if (!this.editMode) {
      this.productService.createProduct(products).subscribe(() => {
        this.fetchProducts(); // Fetch products after creating a new one
        this.form.reset(); // Reset the form after successful creation
      });
    } else {
      this.productService.updateProduct(this.currentProductId, products)
        .subscribe(() => {
          this.fetchProducts(); // Fetch products after creating a new one
          this.form.reset(); // Reset the form after successful creation
          this.editMode = false; // Reset the edit mode to false so that add product button will come back
        });
    }
  }


  // 2.Getting/fetching data from  API 
  private fetchProducts() {
    this.productService.fetchProduct().subscribe((products) => {
      // console.log("products are ", products);
      this.productList = products;
    })
  }

  // 3. To delete single data from the API
  onDeleteProduct(id: string) {
    this.productService.deleteProduct(id)
      .subscribe(() => {
        this.fetchProducts(); // Fetch products after deleting a new one
      });
  }

  // 4. To delete multiple data from the API

  // 5. To delete all the data from the API
  onDeleteAllProducts() {
    this.productService.deleteAllProducts()
      .subscribe(() => {
        this.fetchProducts(); // Fetch products after deleting all 
      });
  }

  // update data in the API
  onEditClicked(id: string) {
    //get the product based on the id
    this.currentProductId = id;
    let currentProduct = this.productList.find((p: any) => { return p.id === id; })

    //populate all the product details
    this.form.setValue({
      pName: currentProduct.pName,
      desc: currentProduct.desc,
      price: currentProduct.price
    })

    //change the button value to update product
    this.editMode = true;

  }
}


