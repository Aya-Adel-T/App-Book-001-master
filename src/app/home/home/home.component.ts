import { bookResponse } from './../../../models/bookModels/bookResponse.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  booksList:any;   //bookResponse[]=[]
  spinnerFlag:boolean=true;
  categoryList:any;
constructor(private homeService:HomeService,
  private toaster:MessageService,private router:Router){}
  ngOnInit(): void {
    this.homeService.getAllBooks().subscribe({
      next:(res:any)=>{
        this.spinnerFlag=false;
        this.booksList=res.data;
        //console.log(this.booksList)
      },
      error:err=>{
        this.spinnerFlag=false;
        //redirect to error page
      }
    })
    this.homeService.onGetAllCategories().subscribe({
      next:(res:any)=>{
        this.categoryList=res.data
        console.log(this.categoryList)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  refreshCart(){
    this.homeService.getAllItemsInCart().subscribe({
      next:(res:any)=>{
        //this.spinnerFlag=false;
       this.homeService.setStoredCartCount(res.data.length)
      },
      error:(err:any)=>{
        //this.spinnerFlag=false
        //console.log(err)
        //handle error redirect
      }
    })
  }
  refreshWishList(){
    return  this.homeService.getAllItemsInWishList().subscribe({
        next:(res:any)=>{
         this.homeService.setWishListCount(res.data.length)
        },
        error:(err:any)=>{
          //handle error redirect
        }
      })
    }
  addToCart(bookId:any,bookTitle:string){
    if(bookId){
      this.homeService.addToCart(bookId).subscribe({
        next:(res:any)=>{
          //console.log(res)
          this.toaster.add({severity:'success',summary:bookTitle + res.message+' in Cart'})
          this.refreshCart()
        },
        error:(err:any)=>{
          this.toaster.add({severity:'error',summary:bookTitle + err.error.message +' in Cart'})
          //console.log(err)
        }
      })
    }
  }
  addToWishList(bookId:any,bookTitle:string){
    if(bookId){
      this.homeService.addToWishList(bookId).subscribe({
        next:(res:any)=>{
          this.toaster.add({severity:'success',summary:bookTitle + res.message +' in Wish List'})
          this.refreshWishList()
          //console.log(res)
        },
        error:(err:any)=>{
          this.toaster.add({severity:'error',summary:bookTitle + err.error.message +' in Wish List'})
          //console.log(err)
        }
      })
    }
  }
  view(categoryId:number){
    this.router.navigate(['/home/explore'],{queryParams:{c:categoryId},queryParamsHandling:'merge'})
  }
}
