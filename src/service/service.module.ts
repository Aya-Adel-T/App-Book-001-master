import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './auth/authentication.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
   
    HttpClientModule
  ],exports:[]
})
export class ServiceModule { }
