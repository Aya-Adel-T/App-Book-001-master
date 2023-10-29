import { BoookFitlerRequest } from 'src/models/bookModels/bookRequest.model';
import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/service/Book/book.service';
import { HttpResponse } from '@angular/common/http';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { AuthorService } from 'src/service/user/author.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-main-dashboard',
templateUrl:'./main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit  {
  pageNumber:number;
  result:PageInfo;
  searchResult:any=[]
  key:string
  DashBoard:any;
  book:any;
  no:number = 1;
  bookFilter :BoookFitlerRequest = {
    PageNumber :this.no,
    PageSize:15,

  };
constructor(private bookService : BookService,private activatedRoute:ActivatedRoute,private router:Router){}
ngOnInit(): void {
  this.activatedRoute.queryParamMap.subscribe(p=>{
    this.pageNumber=Number(p.get('page'))
    this.key=p.get('order')!;

this.onGetAllFiltered()
this.onGetCounts()
;})


}

onGetAllFiltered(){
  this.bookService.getBooksFilter(this.pageNumber).subscribe(
    (response: HttpResponse<any>) => {
      if(response.body.meta){
        this.result=response.body.meta;
        console.log(response.body.meta)
      }
      this.searchResult=response.body.data;
   },    (error: any) => {
     console.log('There is an error ', error);
   });
}


onPageChange($event:any){
  this.pageNumber=$event.page+1
  this.router.navigate(['/mainDashBoard'],{queryParams:{page:this.pageNumber}})
}
onGetCounts(){
  this.bookService.CountDashbaord().subscribe(
    (data: any) => {
      console.log(data); //all items
      this.DashBoard = data.data;
      console.log(this.DashBoard );
    },
    (error: any) => {
      console.log('There is an error ', error);
    }
  );

}


// onPageChange($event:any){
//   this.no = this.no+1
//   this.bookFilter.PageNumber=this.no
//   console.log($event)
//   this.bookService.getBooksFilter(this.bookFilter).subscribe(
//     (data: any) => {
//   this.book = data
//     },
//     (error: any) => {
//       console.log('There is an error ', error);

//     }
//   );
  // this.router.navigate(['/search'],{queryParams:{title:this.searchTitle,page:this.pageNumber}})

// }


// NextPage(){
//   this.no = this.no +1
//   this.bookFilter.PageNumber= this.no
// this.bookService.getBooksFilter(this.bookFilter).subscribe(
//   (data: any) => {
//     console.log(data); //all items
// this.book = data
// let id = 1;
//   },
//   (error: any) => {
//     console.log('There is an error ', error);

//   }
// );
// }
// PreviousPage(){
// if(this.no != 0){
//   this.no = this.no -1
//   this.bookFilter.PageNumber= this.no
// this.bookService.getBooksFilter(this.bookFilter).subscribe(
//   (data: any) => {
//     console.log(data); //all items
// this.book = data
// let id = 1;
//   },
//   (error: any) => {
//     console.log('There is an error ', error);

//   }
// );
// }else this.no=1
// }
}
