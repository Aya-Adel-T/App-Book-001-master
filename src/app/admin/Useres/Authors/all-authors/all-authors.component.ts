import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { AuthorService } from 'src/service/user/author.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css']
})
export class AllAuthorsComponent  implements OnInit {
  pageNumber:number;
  result:PageInfo;
  searchResult:any=[]
  key:string
   constructor(private authorService : AuthorService,private activatedRoute:ActivatedRoute,private router:Router){}
   ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(p=>{
      this.pageNumber=Number(p.get('page'))
      this.key=p.get('order')!;

this.onGetAllFiltered();})
   }
  onGetAllFiltered(){
    this.authorService.onFilter(this.pageNumber).subscribe(
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
    this.router.navigate(['/allAuthors'],{queryParams:{page:this.pageNumber}})
  }
}
