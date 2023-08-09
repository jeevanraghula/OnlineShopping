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
  public order:FavModel;
  category:string="";
  public categories:string[] = ["Apparels","Electronics","Footwear","Home Needs","Sports","Stationery"];
  
  constructor(private productdataservice: ProductServiceService,private router:Router) {
    this.productdataservice.getAllProducts().subscribe(response => 
      this.allProducts = response
      );
      this.userId = Number(localStorage.getItem("userId"));
  }

  ngOnInit(){

  }

  /*<--------------------------------favorites-------------------------------> */

  onClickFavProduct(productId:number){
    this.userId = Number(localStorage.getItem("userId"));
    this.addTFavouriteProducts({productId,userId:this.userId});
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

/*<--------------------------categoery---------------------------->*/

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


/* <------------------------------------- Orders -------------------------------------> */

//to add order
addOrder(productId:number){
  this.order = {
    productId:productId,
    userId:this.userId
  }
  this.productdataservice.addOrderService(this.order).subscribe(response => {
    console.log("order response",response)
  });
}

}
