import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { HomeService } from 'src/service/home/home.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @ViewChild("selectedSort") selectedSort :ElementRef
  @ViewChild('paginator',{ static: false }) paginator: Paginator;
  searchResult:any=[]
  result:PageInfo;
  searchTitle:any;
  pageNumber:number;
  orderBy?:string
  spin:boolean=true;
  sortObj=[
    {key:'Top Rated  ' , value:'RateDesc'},
    {key:'Low Price  ' ,value: 'PriceAsc'},
    {key:'High Price  ' ,value: 'PriceDesc'}
  ]

  constructor(private searchService:HomeService,
              private activatedRoute:ActivatedRoute,
              private toaster:MessageService,
              private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(p=>{
      this.searchTitle=p.get('t')
      this.pageNumber=Number(p.get('p'))
      this.orderBy=p.get('o')!;
      this.search();
    })
    setTimeout(() => {
      if(this.pageNumber ){
        this.paginator.changePage(this.pageNumber - 1)
      }
    }, 1000);
  }
  ngAfterViewChecked(){
    if(this.orderBy)
    this.selectedSort.nativeElement.value=this.orderBy
  }
  search(){
    this.searchService.onSearch(this.searchTitle,this.orderBy,this.pageNumber).subscribe(
      (response: HttpResponse<any>) => {
        this.spin=false
        if(response.body.meta){
          this.result=response.body.meta;

        }
        this.searchResult=response.body.data;
        // console.log(response.body)
        // console.log(this.result)
      },
      (error) => {
        this.spin=false
        //console.error(error);
      }
    );

  }
  addToCart(bookId:any,bookTitle:string){
    if(bookId){
      this.searchService.addToCart(bookId).subscribe({
        next:(res:any)=>{
          //console.log(res)
          this.toaster.add({severity:'success',summary:bookTitle + res.message+' in Cart'})
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
      this.searchService.addToWishList(bookId).subscribe({
        next:(res:any)=>{
          this.toaster.add({severity:'success',summary:bookTitle + res.message +' in Wish List'})
          //console.log(res)
        },
        error:(err:any)=>{
          this.toaster.add({severity:'error',summary:bookTitle + err.error.message +' in Wish List'})
          //console.log(err)
        }
      })
    }
  }
  onPageChange($event:any){
     this.pageNumber=$event.page+1
     this.router.navigate(['/search'],{queryParams:{p:this.pageNumber},queryParamsHandling: 'merge'})

  }
  sort(event:any){
    this.orderBy=event.target.value
    this.router.navigate(['/search'],
        {queryParams:{o:event.target.value},queryParamsHandling:'merge'})
  }
}
