import { Component, OnInit } from '@angular/core';
// import { Product } from '../models/model';
// import { ProductdataService } from '../productdata.service'
import { ProductServiceService } from "../Services/product-service.service";
import { Observable, map, filter } from 'rxjs';
import { Products } from '../models/ProductsModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent{
  public allProducts: Products[];
  public categories:string[] = ["Apparels","Electronics","Footwear","Home Needs","Sports","Stationery"];
  
  constructor(private productdataservice: ProductServiceService) {

    this.productdataservice.getAllProducts().subscribe(response => 
      this.allProducts = response
      );
  }

  showAllProducts(){
    let c=0;
    this.allProducts.forEach(function(p) {
      c+=1;
    })
    console.log("count :"+c);
  }

  
//   category:string=""
//   showcategory:boolean=false;
//   productData$: Observable<Product[]>;

//   constructor(private productdataservice: ProductdataService) {
//     this.productData$ = this.productdataservice.getData();
//    }

//   ngOnInit() {
// //this.productData$ = this.productdataservice.getData();
//   }

//   pushFavorite(pname: string) {
//     this.productdataservice.updateFavorites(pname);
//   }

//   displayCategory(event:any)
//   {
//     this.showcategory=true;
//     const target = event.target as HTMLElement;
//     const cItemDiv = target.closest('.c-item');

//     if (cItemDiv) {
//       this.category = cItemDiv.lastElementChild.innerHTML;
//     }
//     console.log("val is : ",this.category);

//     this.productData$ = this.productdataservice.getData().pipe(
//       // Filter the product data based on the selected category
//       // filter()
//      map((data : Product[]) => data.filter((x) => x.category === this.category))
//     );
//   }


}
