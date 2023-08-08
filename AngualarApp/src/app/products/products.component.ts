import { Component, OnInit } from '@angular/core';
// import { Product } from '../models/model';
// import { ProductdataService } from '../productdata.service'
import { ProductServiceService } from "../Services/product-service.service";
import { Observable, map, filter } from 'rxjs';
import { Products,MatchedProduct } from '../models/ProductsModel';
import { Router } from '@angular/router';
import { FavModel } from '../models/FavProductsModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  public allProducts: Products[];
  public favProducts : Products[];
  public userId:number;
  //there are no favourite products
  public noFavProductsFound = false;
  //duplicate check
  public duplicate=false;
  public matchedProduct: MatchedProduct;
  category:string="";
  public categories:string[] = ["Apparels","Electronics","Footwear","Home Needs","Sports","Stationery"];
  
  constructor(private productdataservice: ProductServiceService,private router:Router) {
    this.productdataservice.getAllProducts().subscribe(response => 
      this.allProducts = response
      );
  }

  ngOnInit(){

  }

  // updateFavorites(productName:string) {
  //       
  //     }


  

  onClickFavProduct(productId:number){
    this.userId = Number(localStorage.getItem("userId"));
    this.addTFavouriteProducts({productId,userId:this.userId});
    // console.log("dproducts 01 ");
    // this.productdataservice.checkDuplicateProduct({productId,userId:this.userId}).subscribe(response =>{
    //   this.duplicate = response;
    //   if(!this.duplicate){
    //     console.log("dproducts of else");
    //      this.addTFavouriteProducts({productId,userId:this.userId});
    //      this.duplicate=false;
    //   }
    // })
    
  }

  //Adding favProducts 
  addTFavouriteProducts(favProduct:FavModel){
    this.productdataservice.addToFavourites(favProduct).subscribe();
  }

  //this endpoint is using to check whether the current product is in Favourite list or not
  getAllFavouriteProducts(){
    this.productdataservice.getAllFavProducts().subscribe(response => {
      this.favProducts = response;
    
    }) 
    console.log("favProducts: ",this.favProducts);
    this.favProducts.forEach(element => {
      console.log("productName :",element.productName);
    });
  }

//categoery

displayCategory(event:any)
  {
  //    this.showcategory=true;
    const target = event.target as HTMLElement;
    const cItemDiv = target.closest('.item');

    if (cItemDiv) {
      this.category = cItemDiv.lastElementChild.innerHTML;
    }
   // console.log("val is : ",this.category);
    this.productdataservice.getAllProducts().subscribe(response => 
      this.allProducts = response.filter(x=>x.category===this.category) );   
  }







  // showAllProducts(){
  //   let c=0;
  //   this.allProducts.forEach(function(p) {
  //     c+=1;
  //   })
  //   console.log("count :"+c);
  // }

  
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
