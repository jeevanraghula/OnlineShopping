import { Injectable } from '@angular/core';
import { product } from './models/model';

@Injectable({
  providedIn: 'root'
})
export class ProductdataService {

  constructor() { }

  product: product[] = [{ name: "pen", price: 15 },
    { name: "book", price: 25 },
    { name: "watch", price: 1215 }, { name: "ball", price: 79 }, { name: "box", price: 63 }, { name: "bottle", price: 59 }, { name: "phone", price: 15 }, { name: "pencil", price: 15 }]

  favorites: product[] = []
  
  updateFavorites(name:string) {
    const matchedProduct = this.product.find((x) => x.name === name);
    if (matchedProduct) {
      matchedProduct.isfavorite = !matchedProduct.isfavorite;
      if (!this.favorites.includes(matchedProduct))
        this.favorites.push(matchedProduct);
     else
       {
        this.favorites.forEach((item,index)=>{
          if(item==matchedProduct) this.favorites.splice(index,1)
        });
       }
    }
  }

  getData() {
    return this.product;
  }

  getFavorites() {
    return this.favorites;
  }
}
