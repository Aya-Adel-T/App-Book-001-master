import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { ReaderService } from 'src/service/user/reader.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-all-readers',
  templateUrl: './all-readers.component.html',
  styleUrls: ['./all-readers.component.css']
})
export class AllReadersComponent implements OnInit {
  readers :any;
  readersFilter:any
  pageNumber:number;
  result:PageInfo;
  searchResult:any=[]
  key:string
   constructor(private readerService : ReaderService,private activatedRoute:ActivatedRoute,private router:Router){}
   ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(p=>{
      this.pageNumber=Number(p.get('page'))
      this.key=p.get('order')!;

// this.onGetAll()
this.onGetAllFiltered();})
   }
  onGetAllFiltered(){
    this.readerService.onFilter(this.pageNumber).subscribe(
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
    this.router.navigate(['/allReaders'],{queryParams:{page:this.pageNumber}})
  }

}
