import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  spinnerFlag:boolean=true;
  totalAmount:number=0
  cartItems:any;
  constructor(private cartService:HomeService,
    private confirmationService:ConfirmationService,
    private toaster:MessageService,
    private router:Router
    ){

  }
  ngOnInit(): void {
    this.loadCart()

  }
  loadCart(){
     this.cartService.getAllItemsInCart().subscribe({
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
       this.cartService.setStoredCartCount(res.data.length)
      },
      error:(err:any)=>{
        this.spinnerFlag=false
        console.log(err)
        //handle error redirect
      }
    })
  
  }
  onDelete(bookId:any){
    this.confirmationService.confirm({
      message: 'Remove Book From Shopping Cart?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.cartService.deleteItemFromCart(bookId).subscribe({
          next:(res:any)=>{
            //console.log(res)
            this.toaster.add({severity:'success', summary:res.message})
           this.loadCart();
           //window.location.reload()
          },error:(err=>{
            //console.log(err)
          })
         })

      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }
 proceed(){
  this.router.navigate(['/cart/summary'])
 }
}
