import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  spinnerFlag:boolean=true;
  wishListItems:any;
  constructor(private wishListService:HomeService,
    private confirmationService:ConfirmationService,
    private toaster:MessageService,){}
  ngOnInit(): void {
   this.loadWishList()
  }
  loadWishList(){
  return  this.wishListService.getAllItemsInWishList().subscribe({
      next:(res:any)=>{
        this.spinnerFlag=false;
        this.wishListItems=res.data
       this.wishListService.setWishListCount(res.data.length)
      },
      error:(err:any)=>{
        this.spinnerFlag=false

        //handle error redirect
      }
    })
  }
  onDelete(bookId:any){
    this.confirmationService.confirm({
      message: 'Remove Book From Wish List?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
         this.wishListService.deleteItemFromWishList(bookId).subscribe({
          next:(res:any)=>{
            console.log(res)
            this.toaster.add({severity:'success', summary:res.message})
            this.loadWishList()
          },error:(err=>{
            console.log(err)
          })
         })

      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }
}
