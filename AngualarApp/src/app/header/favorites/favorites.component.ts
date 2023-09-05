import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/models/ProductsModel';
import { ProductServiceService } from "../../Services/product-service.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent {
  public onlyFavProducts : Products[];
  public userId = Number(localStorage.getItem("userId"));


  //getting all fav products
  constructor(private productService:ProductServiceService,private router:Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.productService.getUserFavProducts(this.userId).subscribe(response =>{
      this.onlyFavProducts = response
    })
  }

  //remove from favourites
  removeFromFavProduct(productId:number){
    this.productService.removeFavProduct({productId,userId:this.userId}).subscribe(response => {
      this.onlyFavProducts = response;
      console.log("after response",this.onlyFavProducts.length);
      // window.location.reload();
      // this.router.navigate(["/favorites"]);
    });
    //delete operator makes element null, but not remove from array
  //   for(var fav of this.onlyFavProducts){
  //     console.log("favproduct :",fav);
  //     if(fav.productId!=undefined){
  //       let check = this.onlyFavProducts.findIndex(x => x.productId == productId);
  //       if(check!=-1){
  //         delete this.onlyFavProducts[check];
  //         console.log("favourites :",this.onlyFavProducts);
  //       }
  //     }
  //   }
  }
}
