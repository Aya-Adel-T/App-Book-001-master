import { CategoryService } from 'src/service/Book/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private categoryService:CategoryService,private router:Router) {}
category:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.categoryService.getCategorybyID(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.category = response
      }
      );
     });
    }
  onDelete() {
    this.categoryService.onDelete(this.id).subscribe(
      () => {
        // Handle success response
        console.log('translator deleted successfully');
        alert("deleted Succefully")
        this.router.navigate(['/allCategories'])

      },
      (error) => {
        // Handle error response
        console.error('Error deleting translator:', error);
      }
    );

  }

}
