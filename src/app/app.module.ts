import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BearerInterceptor } from './security/bearer.interceptor';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
//import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorModule } from 'primeng/paginator';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    LoginModule,
    HomeModule,
    RouterModule,
    SharedModule,
    PaginatorModule,
    UserModule,
    AdminModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:BearerInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
