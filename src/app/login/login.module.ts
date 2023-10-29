import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from 'src/service/service.module';
import { ModelsModule } from 'src/models/models.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [

    RegisterComponent,
         LoginComponent,
         ForgetPasswordComponent,
         ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceModule,
    ModelsModule,
    RouterModule,
    SharedModule

  ],
  exports:[RegisterComponent,LoginComponent,ForgetPasswordComponent,ResetPasswordComponent]
})
export class LoginModule { }
