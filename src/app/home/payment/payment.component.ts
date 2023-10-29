import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  spinnerFlag:boolean=true;
 error:boolean=false
  Success:boolean=false
  constructor(private activatedRoute:ActivatedRoute,private successService:HomeService){
  }
  ngOnInit(): void {
   let transactionId=this.activatedRoute.snapshot.paramMap.get('id')
    this.successService.onConfirmPayment(transactionId).subscribe({
      next:res=>{
        this.spinnerFlag=false; 
        this.Success=true  
        console.log(res)
      },
      error:err=>{
        this.spinnerFlag=false;  
        this.error=true 
        console.log(err)
      }
    })
  }

}
