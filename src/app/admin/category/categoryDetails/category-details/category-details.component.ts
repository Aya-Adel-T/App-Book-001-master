import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryService } from 'src/service/Book/category.service';
import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  category: any ;

constructor(private activatedRoute:ActivatedRoute, private CategoryService:CategoryService){}

ngOnInit(): void {
this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
  console.log(+params.get('id')!);
  this.CategoryService.getCategorybyID(+params.get('id')!).subscribe(
   ( response:any) => { console.log(response);
    this.category = response
  }
  );
});
}
}
