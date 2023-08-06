import { Component } from '@angular/core';
import { FormGroup,FormControl, FormArray, RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent {

  public authForm: FormGroup;
  aleardyUser=false;

    ngOnInit(){
      this.authForm = new FormGroup({
        username: new FormControl(RequiredValidator),
        email : new FormControl(),
        password : new FormControl(),
        confirmPassword : new FormControl()
      });
    }


}
