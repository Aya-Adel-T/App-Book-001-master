import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { authUrl } from 'src/environment/environment.module';
import { changePasswordRequest } from 'src/models/authModels/changePasswordRequest';
import { forgetPasswordRequest } from 'src/models/authModels/forgetPasswordRequest';
import { loginRequest, loginResponse } from 'src/models/authModels/loginRequest';
import { registrationRequest } from 'src/models/authModels/registrationRequest';
import { resetPasswordRequest } from 'src/models/authModels/resetPasswordRequest';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl=authUrl
  userPayload:any
  changePassword :changePasswordRequest ;
  constructor(private  http: HttpClient,)
  {
    this.userPayload=this.decodeToken();
    console.log(this.userPayload)
    this.getToken()!;
    console.log(this.getToken()!)
  }
  //dealing with api
public onRegister(registerRequest:registrationRequest)
{
  return this.http.post(this.baseUrl+'register',registerRequest);
}
public onLogin(loginRequest:loginRequest){
  return this.http.post(this.baseUrl+'login',loginRequest);
}
public onForgetPassword(forgetPasswordRequest:forgetPasswordRequest){
  return this.http.post(this.baseUrl+'forgetpassword',forgetPasswordRequest,{headers:{skip:"true"}});
}
public onResetPassword(resetPasswordRequest:resetPasswordRequest){
  return this.http.post(this.baseUrl+'resetpassword',resetPasswordRequest,{headers:{skip:"true"}});
}
  //dealing with jwtToken
public storeToken(jwtToken:string){
  return sessionStorage.setItem('Bearer',jwtToken);
}
public deleteToken(){
  return sessionStorage.removeItem('Bearer');
}
public getToken(){
  return sessionStorage.getItem('Bearer');
}
public checkLogin():boolean{
return !!sessionStorage.getItem('Bearer');
}
 //decode Token
 decodeToken(){
  const jwtHelper=new JwtHelperService();
  const token=this.getToken()!;
  return jwtHelper.decodeToken(token);
 }
 getFullNameFromToken(){
  if(this.userPayload)
  //console.log(this.userPayload);
  return this.userPayload.unique_name;
}
getIdFromToken(){
  if(this.userPayload)
  return this.userPayload.nameid;
}
getUserRoleFromToken(){
  if(this.userPayload)
  return this.userPayload.role;
}

getImageFromToken(){
  if(this.userPayload)
  return this.userPayload.Image;
}

getUserIdFromToken(){
  if(this.userPayload)
  return this.userPayload.nameIdentifier;
}

logOut(){
   sessionStorage.removeItem('Bearer')
  ////this.router.navigate('/login') example
}

onChangePassword(changepass:changePasswordRequest){
  return this.http.post(this.baseUrl+'ChangePassword',changepass);
 }
}
