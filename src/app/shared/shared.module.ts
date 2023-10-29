import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { MainSpinnerComponent } from './main-spinner/main-spinner.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    MainSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[SpinnerComponent,MainSpinnerComponent]
})
export class SharedModule { }
