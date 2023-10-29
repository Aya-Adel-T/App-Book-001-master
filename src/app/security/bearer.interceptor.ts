import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(private auth:AuthenticationService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var existToken=this.auth.getToken();

    if (request.headers.get("skip"))
    return next.handle(request);
    if(existToken){
      request=request.clone({
        setHeaders:{Authorization:`Bearer ${existToken}`}
      })
    }else{
      this.router.navigate(['/login'])
    }
    return next.handle(request);
  }
}
