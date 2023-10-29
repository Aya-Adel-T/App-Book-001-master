import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { changePasswordRequest } from 'src/models/authModels/changePasswordRequest';
import { AuthenticationService } from 'src/service/auth/authentication.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  {
  constructor(private changePasswordService:AuthenticationService,private router:Router,private route:ActivatedRoute){}
  isSuccess:boolean=false;
  userEmail:any
  errorFlag:boolean=false
  errorMessage:any
  //form
  resetPasswordForm:FormGroup=new FormGroup({
    NewPassword: new FormControl('',[Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
        confirmNewPassword: new FormControl('',[Validators.required]),
    CurrentPassword: new FormControl('',[Validators.required])
  })
  get NewPasswordControl(){
    return this.resetPasswordForm.controls['NewPassword']
  }
  get confirmNewPasswordControl(){
    return this.resetPasswordForm.controls['confirmNewPassword']
  }

  get tokenControl(){
    return this.resetPasswordForm.controls['CurrentPassword']
  }
  onChangePassword(){

    if(this.resetPasswordForm.valid){
    const changePassword = new changePasswordRequest();
  changePassword.newPassword =this.resetPasswordForm.value.NewPassword
  changePassword.confirmNewPassword =this.resetPasswordForm.value.confirmNewPassword
  changePassword.currentPassword =this.resetPasswordForm.value.CurrentPassword
   changePassword.Id = this.changePasswordService.getIdFromToken()

      this.isSuccess=true;
      this.changePasswordService.onChangePassword(changePassword).subscribe({
        next:res=>{
          this.isSuccess=false;
          //console.log(res)
alert("Password changed successfully")
   this.router.navigate(['/home'])
          //redirect
        },
        error:err=>{
          //console.log(err)
          this.isSuccess=false;
          this.errorFlag=true;
          this.errorMessage=err.error.message
          //handle errors
          //show error
        }
      })
    }
  }

}
