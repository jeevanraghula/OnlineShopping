import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, filter, BehaviorSubject} from 'rxjs';
import { UserModel } from '../models/UserModel';
import { AuthReponseModel } from '../models/AuthResponseModel';
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  islogin  =new BehaviorSubject<boolean>(false);
  checklogin= this.islogin.asObservable();

  constructor(private http:HttpClient,private authService:AuthService) { 

    this.islogin.next(this.authService.isAuthenticated());

  }

  api_path = "http://localhost:5119/api/User/";
  //validating,user is a valid user or not 
  validateUser(user:UserModel):Observable<AuthReponseModel> {
    return this.http.post<AuthReponseModel>(this.api_path+"Authentication",user);
  }
}
