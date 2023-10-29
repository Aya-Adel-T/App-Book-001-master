import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BearerInterceptor } from './bearer.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  
})
export class SecurityModule { }
