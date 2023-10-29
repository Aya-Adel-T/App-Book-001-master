import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/service/Book/category.service';
import { CategoryEdit } from 'src/models/bookModels/category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  constructor(private _categoryservice: CategoryService, private router:Router,  private route: ActivatedRoute,
    ){}
  categoryById: any;
  category: CategoryEdit = new CategoryEdit(0,'', null);
  categoryId:number;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });
    // Call a method to fetch the category details using this.categoryId
    this.getCategoryDetails();
  }
  getCategoryDetails(): void {
    this._categoryservice.getCategorybyID(this.categoryId)
      .subscribe(
        (response: any) => {
          // Assign the category details to the component property
          this.categoryById = response.data;
        },
        (error) => {
          console.error('Error retrieving category details:', error);
        }
      );
  }
  onSubmit(): void {
    console.log(this.categoryById)

    this.category.id = this.categoryById.id
    this._categoryservice.editCategory( this.category)
      .subscribe(
        () => {
          // Handle success response
          console.log('Category updated successfully');
          this.router.navigate(['/allCategories']);
        },
        (error) => {
          // Handle error response
          console.error('Error updating category:', error);
        }
      );
  }
  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.category.categoryImage = files[0];
    }
  }
}
