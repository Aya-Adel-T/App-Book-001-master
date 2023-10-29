import { CouponServiceService } from 'src/service/Book/coupon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-coupon',
  templateUrl: './delete-coupon.component.html',
  styleUrls: ['./delete-coupon.component.css']
})
export class DeleteCouponComponent implements OnInit {
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private couponService:CouponServiceService,private router:Router) {}
coupon:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.couponService.couponDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.coupon = response
      }
      );
     });
    }
  onDelete() {
    this.couponService.onDelete(this.id).subscribe(
      () => {
        // Handle success response
        console.log('coupon deleted successfully');
        alert(`deleted Succefully`)
        this.router.navigate(['/AllCoupons'])

      },
      (error) => {
        // Handle error response
        console.error('Error deleting coupon:', error);
      }
    );
  }

}
