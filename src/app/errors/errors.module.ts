import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorServerDownComponent } from './error-server-down/error-server-down.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';



@NgModule({
  declarations: [
    ErrorServerDownComponent,
    ErrorNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ErrorsModule { }
