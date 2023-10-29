import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SideNavComponent,
    CartComponent,
    WishListComponent,
    FooterComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  exports:[NavbarComponent,SideNavComponent,HeaderComponent,FooterComponent],
  providers:[ConfirmationService,MessageService]
})
export class CoreModule { }
