import { forgetPasswordRequest } from 'src/models/authModels/forgetPasswordRequest';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  isSuccess:boolean=false;
  errorFlag:boolean=false
  errorMessage:any
constructor(private forgetPasswordServive:AuthenticationService,private router:Router){}
forgetPasswordForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.email,Validators.required])
})
get emailControl(){
  return this.forgetPasswordForm.controls['email']
}
onConfirm(){
  if(this.forgetPasswordForm.valid){
    this.isSuccess=true;
    this.forgetPasswordServive.onForgetPassword(this.forgetPasswordForm.value).subscribe({
      next:Response=>{
        this.isSuccess=false;
        //console.log(Response)
        this.router.navigate
        ([
          '/resetPassword',this.forgetPasswordForm.value.email
         ])
      },
      error:err=>{
        this.isSuccess=false;
        this.errorFlag=true;
        console.log(err.error)
        this.errorMessage=err.error.message
      }
    })
  }

}
}
