import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/service/auth/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
constructor(private resetPassword:AuthenticationService,private router:Router,private route:ActivatedRoute){}
isSuccess:boolean=false;
userEmail:any
errorFlag:boolean=false
errorMessage:any
ngOnInit(): void {
  this.userEmail=this.route.snapshot.paramMap.get('email')
  console.log(this.userEmail)
  }
//form
resetPasswordForm:FormGroup=new FormGroup({
  newPassword: new FormControl('',[Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
  confirmPassword: new FormControl('',[Validators.required]),
  email: new FormControl('',[Validators.email,Validators.required]),
  token: new FormControl('',[Validators.required])
})
get newPasswordControl(){
  return this.resetPasswordForm.controls['newPassword']
}
get confirmPasswordControl(){
  return this.resetPasswordForm.controls['confirmPassword']
}
get emailControl(){
  return this.resetPasswordForm.controls['email']
}
get tokenControl(){
  return this.resetPasswordForm.controls['token']
}
onReset(){
  if(this.resetPasswordForm.valid){
    this.isSuccess=true;
    this.resetPassword.onResetPassword(this.resetPasswordForm.value).subscribe({
      next:res=>{
        this.isSuccess=false;
        //console.log(res)
        this.router.navigate(['/login'])

        //redirect
        //toaster success
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

