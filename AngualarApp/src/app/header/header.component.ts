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
  public isloggedin:boolean;
  product:Products[];

 constructor(private productdataService: ProductServiceService, private router : Router, public userService : UserService){
    this.userService.islogin.subscribe(response =>{
      this.isloggedin = response
    });

    this.productdataService.getAllProducts().subscribe(data=>
      this.product = data
    );

  }

  checkLogin(){
    if(!this.isloggedin)  //changed
      this.router.navigateByUrl('authenticate');
    else{
      //  window.location.reload();
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      this.isloggedin = false;
      this.userService.islogin.next(false);
      // console.log("isLogin in service observble :",this.userService.islogin.subscribe(response => {
      //   return response
      // }));
      this.router.navigateByUrl('/');
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
