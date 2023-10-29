import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { loginResponse } from 'src/models/authModels/loginRequest';
import { UserService } from 'src/service/auth/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isSuccess:boolean=false;
errorMessage:any;
errors:any;
   constructor(private _loginService: AuthenticationService,
    private router:Router,
    private storedUser:UserService) {}
    result?:loginResponse;
   public get loginService(): AuthenticationService {
    return this._loginService;
  }
  public set loginService(value: AuthenticationService) {
    this._loginService = value;
  }
  loginForm:FormGroup= new FormGroup
  (
    {
      emailOrUsername:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(4)])
    }
  )
  get emailControl(){
    return this.loginForm.controls['emailOrUsername']
  }
  get passwordControl(){
    return this.loginForm.controls['password']
  }

  login(){
    if(this.loginForm.valid){
      this.isSuccess=true;
      this.loginService.onLogin(this.loginForm.value).subscribe({
        next:(response:any)=>
        {
          //console.log(response.meta.token)
          this.loginService.storeToken(response.meta.token)
          var tokenPayLoad=this.loginService.decodeToken()
          //console.log(userPayLoad)
          this.storedUser.setStoredFullName(tokenPayLoad.unique_name)
          this.storedUser.setStoredRole(tokenPayLoad.role)
          if( tokenPayLoad.role == "Admin"){
            this.router.navigate(['/mainDashBoard']);
            window.location.replace('/mainDashBoard')
          }
          else this.router.navigate(['/home']);
          window.location.replace('/home')
          //console.log(tokenPayLoad.role)
        },
        error:(err:any)=>
        {
          this.isSuccess=false;
          console.log(err)
          this.errorMessage=err.error.message
          this.errors=err.error.errors

          //handle error
        }
      })
    }
  }
}
