import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ServiceModule } from 'src/service/service.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SharedModule } from '../shared/shared.module';
import { HomeBookDetailComponent } from './home-book-detail/home-book-detail.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SummaryComponent } from './summary/summary.component';
import { PaymentComponent } from './payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { SearchResultComponent } from './search-result/search-result.component';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { ExploreComponent } from './explore/explore.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from 'src/service/auth/authentication.service';
@NgModule({
  declarations: [
    HomeComponent,
    HomeBookDetailComponent,
    SummaryComponent,
    PaymentComponent,
    SearchResultComponent,
    ExploreComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    ServiceModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    ImageModule,
    CarouselModule,
    PaginatorModule,
    RatingModule,
    DialogModule,
    ButtonModule,
   
  ],
  exports:[HomeComponent,HomeBookDetailComponent],
  providers:[ConfirmationService,MessageService]
})
export class HomeModule { }
