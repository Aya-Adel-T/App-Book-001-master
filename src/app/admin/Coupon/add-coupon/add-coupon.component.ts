import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SharedService } from 'src/service/shared.service';
import { Route, Router } from '@angular/router';
import { CouponRequest } from 'src/models/paymentModels/coupon-request.model';
import { CouponServiceService } from 'src/service/Book/coupon.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent {
   currentDate = new Date();
   datePipe = new DatePipe('en-US');
   currentDateString = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

  addCoupon= new FormGroup({
    code: new FormControl("",[Validators.minLength(4),Validators.maxLength(30),Validators.required]),
    ExpirationDate: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), // Assuming date format is 'yyyy-MM-dd'
      (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = new Date(control.value);
        return selectedDate <= this.currentDate ? { dateInvalid: true } : null

      }

    ]),
    percentage: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(100|[1-9][0-9]?)$/), // Percentage between 1 and 100
    ])})
    constructor(public myService:CouponServiceService , private route:Router ){
    }
  AddCoupon(coupon: CouponRequest) {
      console.log(coupon);
        // this.myService.addcoupn(this.c).subscribe(
          this.myService.addcoupn(coupon).subscribe(
          (data: any) => {
                    console.log(data);
                    alert(`${coupon.code} added successfully`)
                    this.route.navigate(['/AllCoupons'])
                  },
                  (err: any) => {
                    console.log('Error', err);
                  }
        );
   }
}
