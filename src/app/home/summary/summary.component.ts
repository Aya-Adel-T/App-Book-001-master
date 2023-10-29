import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { StripePK } from 'src/environment/environment.module';
import { ICouponResponse } from 'src/models/paymentModels/coupon-response.model';
import { HomeService } from 'src/service/home/home.service';

declare const Stripe: any;
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  spinnerFlag:boolean=true;
  totalAmount:number=0
  totalAmountAfterDiscount:number=0
  cartItems:any;
  couponErrorMessage:any
  couponInfo:ICouponResponse
  constructor(private summaryService:HomeService,
    private toaster:MessageService){}
  ngOnInit(): void {
    console.log(this.couponInfo)
    this.summaryService.getAllItemsInCart().subscribe({
      next:(res:any)=>{
        this.spinnerFlag=false;
        this.cartItems=res.data
        res.data.forEach((element:any) =>
        {
          if(element.book.discountPrice>0){
            this.totalAmount +=element.book.discountPrice
          }else{
            this.totalAmount +=element.book.price
          }
        } );
       //console.log(this.totalAmount)
        //console.log(this.cartItems)
      },
      error:(err:any)=>{
        this.spinnerFlag=false
        console.log(err)
        //handle error redirect
      }
    })
  }
  promoCodeForm:FormGroup=new FormGroup({
    couponCode:new FormControl('',[Validators.minLength(4)])
  })
  get promoCodeControl(){
    return this.promoCodeForm.controls['couponCode']
  }
 fetch(){
  if(this.promoCodeForm.valid){
    this.summaryService.OnConsumeCoupon(this.promoCodeForm.get('couponCode')?.value).subscribe({
      next:(res:any)=>{
        this.couponInfo=res.data
        if(this.couponInfo.code.length>0){
          this.totalAmountAfterDiscount= this.totalAmount - (this.totalAmount*(this.couponInfo.percentage / 100))
        }
        console.log(this.couponInfo)
      },
      error:(err:any)=>{
        console.log(err)
        this.toaster.add({severity:'warn', summary:err.error.message})
        this.couponErrorMessage=err.error.message
      }
    })
  }
 }
checkout(){
  if(this.couponInfo){
    //if>0

    let checkoutRequest={
      totalAmount:this.totalAmountAfterDiscount
    }
    this.summaryService.onCheckout(checkoutRequest).subscribe({
      next:(res:any)=>{
        this.redirectToCheckout(res.data.sessionId)
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }else{

   let checkoutRequest={
      totalAmount:this.totalAmount
    }
    this.summaryService.onCheckout(checkoutRequest).subscribe({
      next:(res:any)=>{
        this.redirectToCheckout(res.data.sessionId)
        console.log(res)
      },
      error:(err:any)=>{
        console.log(err)

      }
    })
  }
}
redirectToCheckout(sessionId:string){
  const stripeSession=Stripe(StripePK)
  stripeSession.redirectToCheckout({
    sessionId:sessionId,
  })
}
}
