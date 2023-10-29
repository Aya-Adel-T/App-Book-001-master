import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/service/Book/book.service';
import { HttpResponse } from '@angular/common/http';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { AuthorService } from 'src/service/user/author.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit  {
  pageNumber:number;
  result:PageInfo;
  searchResult:any=[]
  key:string


constructor(private bookService : BookService,private activatedRoute:ActivatedRoute,private router:Router){}
ngOnInit(): void {
  this.activatedRoute.queryParamMap.subscribe(p=>{
    this.pageNumber=Number(p.get('page'))
    this.key=p.get('order')!;

this.onGetAllFiltered();})
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
  this.router.navigate(['/allBooks'],{queryParams:{page:this.pageNumber}})
}

}
