import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { couponURL } from 'src/environment/environment.module';
import { CouponRequest } from 'src/models/paymentModels/coupon-request.model';
@Injectable({
  providedIn: 'root'
})
export class CouponServiceService {
  baseUrl = couponURL

  constructor(private http :HttpClient) { }
  addcoupn(coupon:any) {
    return this.http.post(`${this.baseUrl}Coupon`, coupon);
  }
  GetAllCoupons(){
    return this.http.get(`${this.baseUrl}Coupons`);
   }
   onDelete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Coupon/${id}`);
  }
  couponDetails(id:number):Observable<any> {
      return this.http.get<any>(`${this.baseUrl}Coupon/${id}`)
  }
  editCoupn(coupon:any):Observable<any> {
    return this.http.put<any>(this.baseUrl,coupon)
}
}
