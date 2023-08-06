import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Products } from '../models/ProductsModel';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

  api_path = "http://localhost:5119/api/Product/";



  //to get all products 
  getAllProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.api_path+"GetAllProducts");
  }

  
}
