import { Component, OnInit } from '@angular/core';
// import { Product } from '../models/model';
// import { ProductdataService } from '../productdata.service'
import { ProductServiceService } from "../Services/product-service.service";
import { Observable, map, filter } from 'rxjs';
import { Products,MatchedProduct } from '../models/ProductsModel';
import { Router } from '@angular/router';
import { FavModel } from '../models/FavProductsModel';
import { AuthService } from '../shared/auth.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit{
  public allProducts: Products[];
  public allFavProducts : Products[]; //for the intial rendering the page
  public favProducts : Products[];
  public userId:number;
  //there are no favourite products
  public noFavProductsFound = false;
  //duplicate check
  public duplicate=false;
  public order:FavModel;
  category:string="";
  //to change favColor
  // public favColor=false;
  public categories:string[] = ["Apparels","Electronics","Footwear","Home Needs","Sports","Stationery"];
  
  constructor(private productdataservice: ProductServiceService,private router:Router,private auth:AuthService,private userService:UserService) {
    //getting all fav products at intial rendering
    this.productdataservice.getAllFavProducts().subscribe(Response => {
      this.allFavProducts = Response;
    });
    
    //getting all products
    this.productdataservice.getAllProducts().subscribe(response => 
      this.allProducts = response
      );
      this.userId = Number(localStorage.getItem("userId")); 
  }

  ngOnInit(){
    
  }


  /*<--------------------------------favorites-------------------------------> */

  //two challenges
  //1.while intial page render should show the fav products after user login
  //2.while adding/removing the product from fav should change the icon color

  onClickFavProduct(product:Products){
    if(this.auth.isAuthenticated()){
      this.userId = Number(localStorage.getItem("userId"));
      let productId = product.productId;
      this.addTFavouriteProducts({productId,userId:this.userId});  
      this.matchedProdcut(product); 
    }
    else{alert("Please Login");}
  }

  //Adding favProducts 
  addTFavouriteProducts(favProduct:FavModel){
    this.productdataservice.addToFavourites(favProduct).subscribe(Response =>{
      this.allFavProducts=Response;
    });
  }

  //To change the color of whilist icon
  matchedProdcut(product:Products):Boolean{
    // console.log("start of matchProduct");
    // console.log("allFavProducts :",this.allFavProducts);  
    let p,isLoggedIn;
    // setTimeout(() => {
      this.userService.islogin.subscribe(Response => 
        isLoggedIn = Response
        );
        // console.log("userlogin :",isLoggedIn);
      if(isLoggedIn){
        // p = this.allFavProducts.includes(product);
        this.allFavProducts.forEach(function(favProd){
          // console.log("favProd :",favProd);
          // console.log("product :",product);
          if(favProd.productId == product.productId){
            p=true;
            // console.log("found favProduct value p: ",p);
          }
        });
        
      }
    // });
    if(p){
      // console.log("inside true matchProduct");
      // this.favColor=true;
      return true;
    }
    // console.log("outside false matchProduct");
    return false;
  }


  /**If there is a color to the whiteList
   * 1.It should add the color 
   * 2.Else remove the color 
  */
 addOrRemoveFavColor(){}

  //this endpoint is using to check whether the current product is in Favourite list or not
  // getAllFavouriteProducts(){
  //   this.productdataservice.getAllFavProducts().subscribe(response => {
  //     this.favProducts = response;
  //   }) 
  //   console.log("favProducts: ",this.favProducts);
  //   this.favProducts.forEach(element => {
  //     console.log("productName :",element.productName);
  //   });
  // }

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
