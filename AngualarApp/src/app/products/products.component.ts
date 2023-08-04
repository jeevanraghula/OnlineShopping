import { Component } from '@angular/core';
import { product } from '../models/model';
import { ProductdataService } from '../productdata.service'
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    
  constructor(private productdataservice: ProductdataService) { }
  productData: product[] = this.productdataservice.getData();

  pushFavorite(pname: string) {
    this.productdataservice.updateFavorites(pname);
  }
}
