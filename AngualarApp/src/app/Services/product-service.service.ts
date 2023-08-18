import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Products } from '../models/ProductsModel';
import { FavModel } from '../models/FavProductsModel';
import { OrderResponseModel } from '../models/OrderResponseModel';

"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmFtZSI6Im5hdmVlbiIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTY5MTM4NDM1MCwiZXhwIjoxNjkxMzg0OTUwLCJpYXQiOjE2OTEzODQzNTAsImlzcyI6Iklzc3VlciIsImF1ZCI6IkF1ZGllbmNlIn0.d1Jc25I8Cktd9YJHgn8lg0Ssf5q3Iig1xPuORbAHzGy6S865f5ENfEZd68OlC7cu7-nZoxYpJrlFs4tCIMiNIQ`"

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private token:string;
  private userId:number;

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("jwt");
    this.userId = Number(localStorage.getItem("userId"));
   }

  api_path_product = "http://localhost:5119/api/Product/GetAllProducts";

  api_path_favourite = "http://localhost:5119/api/FavouriteProducts/";

  api_path_orders = "http://localhost:5119/api/Order/";

/*<-----------------------------------ALL Products -------------------------------->*/
  //to get all products 
  getAllProducts():Observable<Products[]>{
    return this.http.get<Products[]>(this.api_path_product);
  }

/*<-----------------------------------Favourites -------------------------------->*/

  //Add to favourites 
  addToFavourites(Favproduct:FavModel):Observable<any>{
    console.log("jwt token :",this.token);
    return this.http.post(this.api_path_favourite+"AddFavProduct",Favproduct,{
      headers : new HttpHeaders({
       // "content-Type":"text", //it is set by default to json
        'Authorization': `Bearer ${this.token}`,
        responseType: 'text'
      })
    });
  }

  //Remove fav product
  removeFavProduct(FavProdcut:FavModel):Observable<Products[]>{
    return this.http.post<Products[]>(this.api_path_favourite+"RemoveFromFav",FavProdcut,{
      headers:new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

  //get all favourite products
  getAllFavProducts():Observable<Products[]>{
    return this.http.post<Products[]>(this.api_path_favourite+"GetAllFavouriteProducts",this.userId,{
      headers : new HttpHeaders({
        "content-Type":"application/json",
        'Authorization': `Bearer ${this.token}`
      })
    });
  }

/*<-----------------------------------Order Products -------------------------------->*/

//Orderproduct==new changes
addOrderService(order : FavModel):Observable<string>{
  return this.http.post<string>(this.api_path_orders+"AddOrder",order,{
    headers:new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  });
}


//get all orders : accessing Orders component
getAllOrdersService():Observable<OrderResponseModel[]>{
  return this.http.get<OrderResponseModel[]>(this.api_path_orders+"GetAllOrders/"+localStorage.getItem("userId"),{
    headers:new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  })
}

}
