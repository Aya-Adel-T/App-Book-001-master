import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { PageInfo } from 'src/models/bookModels/searchResponse';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  @ViewChild('selectedCategory') selectedCategory:ElementRef;
  @ViewChild('selectedAuthor') selectedAuthor:ElementRef;
  @ViewChild('selectedSort') selectedSort:ElementRef;
  @ViewChild('paginator',{ static: false }) paginator: Paginator;
  searchResult:any=[]
  result:PageInfo;
  authorId?:string
  categoryId?:number
  pageNumber:number;
  orderBy?:string;
  key:string
  spin:boolean=true;
  sortObj=[
    {key:'Top Rated  ' , value:'RateDesc'},
    {key:'Low Price  ' ,value: 'PriceAsc'},
    {key:'High Price  ' ,value: 'PriceDesc'}
  ]
  authors:any
  categories:any
  constructor(private searchService:HomeService,
              private activatedRoute:ActivatedRoute,
              private toaster:MessageService,
              private router:Router){}

  ngOnInit(): void {
    this.getAuthors();
    this.getCategories();
    this.activatedRoute.queryParamMap.subscribe(p=>{
      //this.searchTitle=p.get('title')
      this.authorId=p.get('a')!
      this.categoryId=Number(p.get('c'))
      this.pageNumber=Number(p.get('p'))
      this.orderBy=p.get('o')!;
      this.key=p.get('o')!;
      //console.log(p.get('page'));
      this.filter();
    })
    setTimeout(() => {
      if(this.pageNumber ){
        this.paginator.changePage(this.pageNumber - 1)
      }
    }, 1000);
  }
  ngAfterViewChecked(){
    if(this.categoryId)
         this.selectedCategory.nativeElement.value=this.categoryId;
    if(this.orderBy)
        this.selectedSort.nativeElement.value=this.orderBy;
    if(this.authorId)
        this.selectedAuthor.nativeElement.value=this.authorId;
  }
  filter(){
    this.searchService.onFilter(this.authorId,this.categoryId,this.orderBy,this.pageNumber).subscribe(
      (response: HttpResponse<any>) => {
        this.spin=false
        if(response.body.meta){
          this.result=response.body.meta;
        }
        this.searchResult=response.body.data;
         console.log(response.body)
        // console.log(this.result)
      },
      (error) => {
        this.spin=false
        //console.error(error);
      }
    );
  }
  getCategories(){
    this.searchService.onGetAllCategories().subscribe({
      next:(res:any)=>{
        this.categories=res.data;
        console.log(this.categories)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  getAuthors(){
    this.searchService.onGetAllAuthors().subscribe({
      next:(res:any)=>{
        this.authors=res.data;
        console.log(this.authors)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
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
     this.router.navigate(['/home/explore'],{queryParams:{p:this.pageNumber},queryParamsHandling:'merge'})

  }
  sort(event:any){
    this.orderBy=event.target.value
    this.router.navigate(['/home/explore'],
        {queryParams:{o:event.target.value},queryParamsHandling:'merge'})
  }
  filterByCategory(event:any){
    this.categoryId=event.target.value;
    this.router.navigate(['/home/explore'],{queryParams:{c:this.categoryId},queryParamsHandling:'merge'})
  }
  filterByAuthor(event:any){
    this.authorId=event.target.value;
    this.router.navigate(['/home/explore'],{queryParams:{a:this.authorId}, queryParamsHandling:'merge'})
  }
}
