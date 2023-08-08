import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(){
    
  }

  logOut(){
    localStorage.removeItem("token");
    console.log("rmeoved");
  }
}
