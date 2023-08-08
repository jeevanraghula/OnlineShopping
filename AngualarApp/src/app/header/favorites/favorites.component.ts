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
    this.productService.getAllFavProducts().subscribe(response =>{
      this.onlyFavProducts = response
    })
  }

  //remove from favourites
  removeFromFavProduct(productId:number){
    this.productService.removeFavProduct({productId,userId:this.userId}).subscribe(response => {
      console.log("remove response :",response);
      this.router.navigate(["/favorites"]);
    });
  }
}
