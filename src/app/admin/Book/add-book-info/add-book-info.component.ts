import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/service/Book/book.service';
import { CategoryService } from 'src/service/Book/category.service';
import { TranslatorService } from 'src/service/Book/translator.service';
import { BookRequest, Boook } from 'src/models/bookModels/bookRequest.model';

@Component({
  selector: 'app-add-book-info',
  templateUrl: './add-book-info.component.html',
  styleUrls: ['./add-book-info.component.css']
})
export class AddBookInfoComponent implements OnInit {
  addBook= new FormGroup({
    bookName: new FormControl("",[Validators.minLength(2),Validators.maxLength(30),Validators.required]),
    })
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  bookf: Boook = {
    Title: '',
    ISBN: '',
    OriginalTitle: '',
    Description: '',
    NumberOfPages: 1,
    Edition:1,
    Year: 2023,
    Publisher: '',
    OriginalLanguage: '',
    TranslatedToLanguage:'',
    Price: 1,
    AuthorId: '',
    CategoriesIds: [],
    TranslatorsIds:[]
  };
  fileInput: File;

 bookk: Boook;
Authors:any;
categories:any;
translators:any
  constructor(private activatedRoute: ActivatedRoute, private BookService: BookService, private router:Router,private catService: CategoryService, private translatorService: TranslatorService) { }

ngOnInit(): void {

 this.BookService.getAuthors().subscribe({
      next:(authors: any) => {
    this.Authors = authors.data
    console.log(this.Authors); //all items

    let id = 1;
      },
      error:(error: any) => {
        console.log('There is an error ', error);
      }
    }
 );
 this.catService.onGetAll().subscribe(
  (data: any) => {
    console.log(data.data); //all items
    this.categories = data.data;
  },
  (error: any) => {
    console.log('There is an error ', error);
  });
  this.translatorService.getTranslators().subscribe(
    (data: any) => {
      console.log(data.data); //all items
      this.translators = data.data;
    },
    (error: any) => {
      console.log('There is an error ', error);
    });

}

  onSubmit() {
    console.log(this.bookf)
    this.BookService.addBook(this.bookf)
      .subscribe(
        () => {
          (response: any) =>{
              console.log('Book added successfully');
              console.log('Response:', response); // Access the response data here
          }
          // Handle success response
          console.log('book added successfully');
          this.router.navigate(['/allBooks'])
        },
        (error) => {
          // Handle error response
          console.error('Error adding book:', error);
        }
      );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.bookf.BookCoverFile = files[0];
    }
  }

  handleCategoryChange(event: any, categoryId: number): void {
    const checked = event.target.checked;
    if (checked) {
      this.bookf.CategoriesIds.push(categoryId);
    } else {
      const index = this.bookf.CategoriesIds.indexOf(categoryId);
      if (index > -1) {
        this.bookf.CategoriesIds.splice(index, 1);
      }
    }

  }

  handleTranslatorChange(event: any, translatorId: number): void {
    const checked = event.target.checked;
    if (checked) {
      this.bookf.TranslatorsIds.push(translatorId);
    } else {
      const index = this.bookf.TranslatorsIds.indexOf(translatorId);
      if (index > -1) {
        this.bookf.TranslatorsIds.splice(index, 1);
      }
    }
  }
  isAtLeastOneCategorySelected(): boolean {
    return this.bookf.CategoriesIds.length > 0;
  }

  isChecked(categoryId: number): boolean {
    return this.bookf.CategoriesIds.includes(categoryId);
  }
  }


