import { Component } from '@angular/core';
import { Products } from '../models/ProductsModel';
import { ActivatedRoute } from '@angular/router'
import { ProductServiceService } from '../Services/product-service.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent {
  searchItem : Products;
  notFound:boolean=false;
  data:any;
 constructor(private route: ActivatedRoute,private productdataservice: ProductServiceService) {
  this.data = this.route.params.subscribe(params=>{
    this.getProduct(params['name']) })
 }
 ngOninit(){}
 getProduct(name:string)
 {
    this.productdataservice.getAllProducts().subscribe(data=>
      data.find(x=>{
      if(x.productName === name)
          this.searchItem=x;   
    }));
 }

 ngOnDestroy(){
 // this.data.Unsubscribe()
 }
}
