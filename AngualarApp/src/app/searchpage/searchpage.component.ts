import { Component } from '@angular/core';
import { product} from '../models/model'
import { ActivatedRoute } from '@angular/router'
import { ProductdataService } from '../productdata.service';
@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent {
  name:string=""
  price=0;
  notFound:boolean=false;
  data:any;
 constructor(private route: ActivatedRoute,private productdataservice: ProductdataService) {
  this.data = this.route.params.subscribe(params=>{
    this.getProduct(params['name']) })
 }
 ngOninit(){}
 getProduct(name:string)
 {
    this.productdataservice.product.find(x=>{
      if(x.name==name){ 
        this.name=x.name;
        this.price=x.price;
        this.data.Unsubscribe()
      }
    });   
 }

 ngOnDestroy(){
 // this.data.Unsubscribe()
 }
}
