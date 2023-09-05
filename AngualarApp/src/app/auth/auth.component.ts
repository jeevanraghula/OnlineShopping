import { Component } from '@angular/core';
import { FormGroup,FormControl, FormArray, RequiredValidator } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthReponseModel } from '../models/AuthResponseModel';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {

  public authForm: FormGroup;
  aleardyUser=false;

  constructor(private userService:UserService,private router:Router){

  }

    ngOnInit(){
      this.authForm = new FormGroup({
        username: new FormControl(),
        password : new FormControl(),
        email : new FormControl(),
        confirmPassword : new FormControl()
      });
    }


    LoginUser(){
      //printing to console
      console.log("username :"+this.authForm.get('username').value);
      console.log("username :"+this.authForm.get('password').value);
      let username = this.authForm.get('username').value;
      let password = this.authForm.get('password').value;

      this.userService.validateUser({username,password}).subscribe(response=>{
        const token = response.token;
        let id = response.userId;
        localStorage.setItem("userId",String(id));
        localStorage.setItem("jwt",token);
        console.log("userId :",Number(localStorage.getItem("userId")));
        console.log("Token :",localStorage.getItem("jwt"));

        //storing the JWT token response in the localStorage
        
        this.aleardyUser=true;
        this.userService.islogin.next(true);
        // window.location.reload();
        this.router.navigate(["/"]);
      },

      error => {
        this.aleardyUser=false;
      });
      

    }


}
