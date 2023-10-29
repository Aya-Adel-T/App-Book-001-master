import { ReviewRequest, updateReviewRequest } from './../../../models/review/review-request.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EMPTY } from 'rxjs';
import { RateRequest } from 'src/models/review/rate-request.model';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { UserService } from 'src/service/auth/user.service';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-home-book-detail',
  templateUrl: './home-book-detail.component.html',
  styleUrls: ['./home-book-detail.component.css']
})

export class HomeBookDetailComponent implements OnInit {
  book:any;
  spinnerFlag:boolean=true;
  reviews:any;
  bookId:number;
  pageNumber?:number;
  dialogFlag1:boolean=false;
  dialogFlag2:boolean=false;
  isSuccess:boolean=false;
  rateFlag:boolean=false;
  editRateFlag:boolean=false;
  replies:any;
  userId?:string;
  userReview:any;
  selectedReviewId?:number
  constructor(private bookService:HomeService,
    private activatedRoute:ActivatedRoute,
    private toaster:MessageService,
    private userService:AuthenticationService){}
  ngOnInit(): void {
    this.bookId=Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.bookId){
      this.loadBook();
    }
    setTimeout(() => {
      console.log(this.book)
    }, 2000);
  }
  ngAfterViewInit() {
    this.getUserId()
    this.loadReviews();
  }
  rateForm:FormGroup=new FormGroup({
    bookId:new FormControl('',[Validators.required]),
    review:new FormControl(''),
    rate:new FormControl('',[Validators.required])
  })
  editRateForm:FormGroup=new FormGroup({
    bookId:new FormControl('',[Validators.required]),
    review:new FormControl(''),
  })
  replyForm:FormGroup=new FormGroup({
    text:new FormControl(' ',[Validators.required,Validators.minLength(2)]),
    reviewId:new FormControl('',[Validators.required])
  })
  getUserId(){
  this.userId= this.userService.decodeToken().nameid
  if(this.userId){
    this.loadBook()
  }
  }
  refreshCart(){
    this.bookService.getAllItemsInCart().subscribe({
      next:(res:any)=>{
       this.bookService.setStoredCartCount(res.data.length)
      },
      error:(err:any)=>{
        //handle error redirect
      }
    })
  }
  refreshWishList(){
    return  this.bookService.getAllItemsInWishList().subscribe({
        next:(res:any)=>{
         this.bookService.setWishListCount(res.data.length)
        },
        error:(err:any)=>{
          //handle error redirect
        }
      })
    }
  addToCart(bookTitle:string){
  if(this.book.id){
    this.bookService.addToCart(this.book.id).subscribe({
      next:(res:any)=>{
        //console.log(res)
        this.toaster.add({severity:'success',summary:bookTitle + res.message + ' in Cart'})
        this.loadBook()
        this.refreshCart()
      },
      error:(err:any)=>{
        this.toaster.add({severity:'error',summary:bookTitle + err.error.message + ' in Cart'})
        //console.log(err)
      }
    })
  }
  }
  addToWishList(bookTitle:string){
  if(this.book.id){
    this.bookService.addToWishList(this.book.id).subscribe({
      next:(res:any)=>{
        this.toaster.add({severity:'success',summary:bookTitle + res.message + ' in Wish List'})
        this.loadBook()
        this.refreshWishList()
        //console.log(res)
      },
      error:(err:any)=>{
        this.toaster.add({severity:'error',summary:bookTitle + err.error.message+ ' in Wish List'})
        //console.log(err)
      }
    })
  }
  }
  loadBook(){
    this.bookService.getBookById(this.bookId,this.userId).subscribe({
      next:(res:any)=>{
        this.spinnerFlag=false
        this.book=res.data;
        //console.log(this.book);
      },
      error:err=>{
        //console.log(err)
        this.spinnerFlag=false
        //handle error
      }
    })
  }
  loadReviews(){
  if(this.bookId){
    this.bookService.getBookReviews(this.bookId,this.pageNumber).subscribe({
      next:(res:any)=>{
        this.reviews=res.data
        //console.log(this.reviews)
      },
      error:(err:any)=>{
        //console.log(err.error)
      }
    })
   }
  }
  showDialog1(reviewId:number) {
    this.dialogFlag1=true;
    this.selectedReviewId=reviewId
  }
  showDialog2(reviewId:number) {
    this.dialogFlag2=true;
    //console.log(reviewId)
    this.bookService.onGetAllRepies(reviewId).subscribe({
      next:(res:any)=>{
        this.replies=res.data
        console.log(this.replies)
      },
      error:(err:any)=>{

      }
    })
  }
addReply(){
  this.isSuccess=true;
  this.bookService.onAddReply(this.replyForm.value).subscribe({
    next:(res:any)=>{
      this.isSuccess=false
      this.toaster.add({severity:'success',summary:  res.message})
      this.dialogFlag1=false
      this.loadReviews()
    },error:(err:any)=>{
      this.isSuccess=false
      this.toaster.add({severity:'error',summary:err.error.message})
    }
  })
}
openRate(isPurchased:boolean,isReviewed:boolean,bookId:number){
  if(isPurchased && isReviewed){
    this.editRateFlag=true

    this.bookService.onGetUserReview(bookId).subscribe({
      next:(res:any)=>{this.userReview=res.data},
      error:(err:any)=>{}
    })

  }
  if(isPurchased && !isReviewed){
    this.rateFlag=true;
  }
}
addRate(){
  this.isSuccess=true;
  if(this.rateForm.valid){
    if(this.rateForm.get('review')!.value.length >0){
      let reviewObj:ReviewRequest={
        bookId:Number(this.rateForm.get('bookId')!.value),
        text:this.rateForm.get('review')!.value}
        //console.log(reviewObj)
        this.loadReviews()
        this.bookService.onAddComment(reviewObj).subscribe({
          next:(res:any)=>{
            // this.toaster.add({severity:'success',summary:'Your Comment On Review Has Been Added'})
          },
          error:(err:any)=>{
            //
            this.toaster.add({severity:'error',summary:err.error.message})
          }
        })
    }

    let rateObj:RateRequest=  {
     rate:Number(this.rateForm.get('rate')!.value),
     bookId:Number(this.rateForm.get('bookId')!.value)
    }
    //console.log(rateObj)
    this.bookService.onAddRate(rateObj).subscribe({
      next:(res:any)=>{
        this.rateFlag=false;
        this.isSuccess=false;
        this.toaster.add({severity:'success',summary:'Your Review Has Been Added'})
        this.loadReviews()
      },
      error:(err:any)=>{
        this.isSuccess=false
        this.toaster.add({severity:'error',summary:err.error.message})
      }
    })

  }
}
editRate(){
  this.isSuccess=true
  if(this.editRateForm.valid){
    let updateReview:updateReviewRequest= {id:Number(this.editRateForm.get('bookId')!.value),
    text:this.editRateForm.get('review')!.value}
    console.log(updateReview)
    this.bookService.onUpdateUserReview(updateReview).subscribe({
      next:(res:any)=>{
        this.toaster.add({severity:'success',summary:'Your Comment On Review Has Been Updated'})
        this.editRateFlag=false;
        this.isSuccess=false;
        this.loadReviews();
      },error:err=>{
        this.isSuccess=false;
        console.log(err.error)
      }
    })
    console.log(updateReview)
  }
}
}
