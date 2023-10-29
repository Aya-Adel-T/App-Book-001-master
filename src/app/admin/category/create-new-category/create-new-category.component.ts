import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/service/Book/category.service';
import { Category } from 'src/models/bookModels/category-request.model';


@Component({
  selector: 'app-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrls: ['./create-new-category.component.css']
})
export class CreateNewCategoryComponent {
  constructor(private _categoryservice: CategoryService, private router:Router){}
  category: Category = new Category('', null);
  onSubmit() {
    this._categoryservice.addCategory(this.category)
      .subscribe(
        () => {
          // Handle success response
          console.log('Category added successfully');
          this.router.navigate(['/allCategories'])

        },
        (error) => {
          // Handle error response
          console.error('Error adding category:', error);
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







