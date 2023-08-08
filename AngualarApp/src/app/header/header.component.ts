import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/ProductsModel';
import { ProductServiceService } from '../Services/product-service.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  islogin:boolean;
  product:Products[];

 constructor(private productdataService: ProductServiceService, private router : Router, private userService : UserService){
    this.userService.checklogin.subscribe(x=>this.islogin=x);
    this.productdataService.getAllProducts().subscribe(data=>
      this.product=data);
  }

  checkLogin(){
    if(!this.islogin)
      this.router.navigateByUrl('authenticate');
    else{
      this.userService.islogin.next(false);
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      this.router.navigate(['/']);
    }
  }

  searchproduct(event : any)
 {
  this.product.forEach(element => { 
    if(element.productName === event.target.value){
      this.router.navigate(['/search', element.productName]);
      event.target.value=""
    }
  });
  
 }
}
