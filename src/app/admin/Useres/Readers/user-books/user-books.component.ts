import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { ReaderService } from 'src/service/user/reader.service';
import { HttpResponse } from '@angular/common/http';
import { PageInfo } from 'src/models/bookModels/searchResponse';


@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  readers :any;
  readersFilter:any
  pageNumber:number;
  result:PageInfo;
  searchResult:any=[]
  key:string
  readerid : string;
constructor(private readerService: ReaderService,private activatedRoute:ActivatedRoute,private router:Router){}
ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
    console.log(params.get('id')!);
    this.readerid = params.get('id')!
  });

  this.activatedRoute.queryParamMap.subscribe(p=>{
    this.pageNumber=Number(p.get('page'))
    this.key=p.get('order')!;
  // this.onGetAll()
     this.onGetAllFiltered();})

    // this.BookService.getBookDetails(params.get('id')!).subscribe(
    //  ( response:any) => { console.log(response);
    //   this.book = response
    // }
    // );
 }

 onGetAllFiltered(){
  this.readerService.ongetAllBooksForAUser(this.readerid,this.pageNumber).subscribe(
    (response: HttpResponse<any>) => {
      if(response.body.meta){
        this.result=response.body.meta;
        console.log(response.body.meta)
      }
      this.searchResult=response.body.data;
      console.log(response.body.data)

   },    (error: any) => {
     console.log('There is an error ', error);
   });
 }
 onPageChange($event:any){
  this.pageNumber=$event.page+1
  this.router.navigate(['/userBooks',this.readerid],{queryParams:{page:this.pageNumber}})
}

}









