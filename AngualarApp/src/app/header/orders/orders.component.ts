import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { OrderResponseModel } from 'src/app/models/OrderResponseModel';
import { Products } from 'src/app/models/ProductsModel';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  public orderedProducts: OrderResponseModel[];

  //getting all fav products
  constructor(private productService:ProductServiceService,private router:Router){
    this.productService.getAllOrdersService().subscribe(response => 
      this.orderedProducts = response
      );
  }
}
