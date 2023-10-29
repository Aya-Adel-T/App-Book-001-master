import { Component ,OnInit} from '@angular/core';
import { CouponServiceService } from 'src/service/Book/coupon.service';
@Component({
  selector: 'app-all-coupons',
  templateUrl: './all-coupons.component.html',
  styleUrls: ['./all-coupons.component.css']
})
export class AllCouponsComponent implements OnInit {

  constructor(public _couponService:CouponServiceService){}
  coupons: any = [];

  ngOnInit(): void {
    this._couponService.GetAllCoupons().subscribe(
      (data: any) => {
        this.coupons = data;
      },
      (error: any) => {
        console.log('There is an error ', error);
      }
    );
  }

}
