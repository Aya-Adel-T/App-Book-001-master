import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bookUrll, categoryUrl, domain } from 'src/environment/environment.module';
import { RateRequest } from 'src/models/review/rate-request.model';
import { ReplyRequest } from 'src/models/review/reply-request.model';
import { ReviewRequest, updateReviewRequest } from 'src/models/review/review-request.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
bookBaseUrl=bookUrll;
baseDomain=domain;
spinFlag:boolean

  constructor(private http:HttpClient) { }

  getBookById(id:any,userId?:string){
    let params = new HttpParams();
    if(userId) params=params.append('UserId',userId)
    return this.http.get(`${this.baseDomain}api/Home/BookDetails/${id}`,{params:params,headers:{skip:"true"}})
  }
  getAllBooks(){
    return this.http.get(this.baseDomain+'api/Home/Books',{headers:{skip:"true"}})
  }
  //review
  getBookReviews(bookId:number,pageNumber?:number){
    let params=new HttpParams();
    if(pageNumber) params=params.append('PageNumber',pageNumber)
   return this.http.get(this.baseDomain+`api/Review/${bookId}`,{params:params,headers:{skip:"true"}})
  }
  onAddComment(reviewRequest:ReviewRequest){
    return this.http.post(this.baseDomain+'api/Review/review',reviewRequest)
  }
  onAddRate(rateRequest:RateRequest){
    return this.http.post(this.baseDomain+'api/Review/rate',rateRequest)
  }
  onAddReply(replyRequest:ReplyRequest){
    return this.http.post(this.baseDomain+'api/Review/reply',replyRequest)
  }
  onGetAllRepies(reviewId:number){
    return this.http.get(this.baseDomain+`api/Review/Replies/${reviewId}`)
  }
  onGetUserReview(bookId:number){
    return this.http.get(this.baseDomain+`api/Review/User/${bookId}`)
  }
  onUpdateUserReview(reviewRequest:updateReviewRequest){
    return this.http.put(this.baseDomain+'api/Review/review',reviewRequest)
  }
//search
onSearch(search:string,orderBy?:string,pageNumber?:number,pageSize?:number){
  let params=new HttpParams();
   params=params.append('SearchString',search);
  if(orderBy) params=params.append('OrderBy',orderBy);
  if(pageNumber) params=params.append('PageNumber',pageNumber);
  // ${PageNumber=2&PageSize=20&SearchString=c&OrderBy=averagerate&CategoryName=c' \
  return this.http.get(this.baseDomain + 'api/Book/Search', { params: params, observe: 'response',headers:{skip:"true"} })
}
//filter
onFilter(authorId?:string,categoryId?:number,orderBy?:string,pageNumber?:number){
  let params=new HttpParams()
  if(authorId) params=params.append('AuthorId',authorId)
  if(categoryId) params=params.append('CategoryId',categoryId)
  if(orderBy) params=params.append('OrderBy',orderBy);
  if(pageNumber) params=params.append('PageNumber',pageNumber);
  return this.http.get(this.baseDomain+'api/Book/Filter',{params:params,observe: 'response',headers:{skip:"true"}})
}
//Cart
private cartItems$=new BehaviorSubject<number>(0);
setStoredCartCount(count:number){
return this.cartItems$.next(count)
}
getStoredCartCount(){
  return this.cartItems$.asObservable();
}

  addToCart(bookId:any){
    return this.http.get(this.baseDomain+'ShoppingCart/'+bookId);
  }
  getAllItemsInCart(){
    return this.http.get(this.baseDomain+'ShoppingCart')
    // .subscribe({
    //   next:(res:any)=>{
    //     this.cartItems.next(res.data)
    //   },
    //   error:(err:any)=>{

    //   }
    // })
  }
  deleteItemFromCart(bookId:any){
    return this.http.delete(this.baseDomain+`ShoppingCart/${bookId}`)
  }
  //WishList
  private wishListItem$=new BehaviorSubject<number>(0);
  setWishListCount(count:number){
    return this.wishListItem$.next(count)
  }
  getWishListCount(){
    return this.wishListItem$.asObservable()
  }
  addToWishList(bookId:any){
    return this.http.get(this.baseDomain+'WishList/'+bookId);
  }
  getAllItemsInWishList(){
    return this.http.get(this.baseDomain+'WishList')
  }
  deleteItemFromWishList(bookId:any){
    return this.http.delete(this.baseDomain+`WishList/${bookId}`)
  }
  //ConsumeCoupon
  OnConsumeCoupon(promoCode:string){
    return this.http.post(this.baseDomain+`Payment/Coupon/User?couponCode=${promoCode}`,null)
  }
  //PAYMENT
  onCheckout(checkOutRequest:any){
    return this.http.post(this.baseDomain+'Payment/',checkOutRequest)
  }
  onConfirmPayment(transactionId:any){
    return this.http.get(this.baseDomain+`Payment/Confirm/${transactionId}`)
  }
  //Categories
  onGetAllCategories(){
    return this.http.get(this.baseDomain+'api/Category/Categories',{headers:{skip:"true"}})
  }
  //Authors
  onGetAllAuthors(){
    return this.http.get(this.baseDomain+'api/Account/Authors',{headers:{skip:"true"}})
  }
}
