import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';
import { CategoryService } from 'src/service/Book/category.service';
@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories: any = [];
  categoryName: string = '';
  categoryimage: string = '';
  constructor(
    public catService: CategoryService,
    private shared: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.catService.onGetAll().subscribe(
      (data: any) => {
        console.log(data); //all items
        this.categories = data;
      },
      (error: any) => {
        console.log('There is an error ', error);
      }
    );
  }
}
