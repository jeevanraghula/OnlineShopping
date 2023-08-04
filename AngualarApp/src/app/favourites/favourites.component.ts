import { Component } from '@angular/core';
import { product } from '../models/model';
import { ProductdataService } from '../productdata.service'
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {

  constructor(private productdataservice: ProductdataService) { }
  favoritesData: product[] = this.productdataservice.getFavorites();

  removeFavorite(name: string) {
    this.productdataservice.updateFavorites(name);
  }

}
