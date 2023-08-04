import { Component } from '@angular/core';
import { ProductdataService } from '../productdata.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private productdataService: ProductdataService, private router : Router){}
 searchproduct(event : any)
 {
  this.productdataService.product.forEach(element => { 
    if(element.name === event.target.value) 
     this.router.navigate(['/search', element.name]);
  });
 }
 
}
