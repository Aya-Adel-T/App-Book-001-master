import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/service/Book/book.service';
import { uploadBook } from 'src/models/bookModels/upload-book';
import { ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{
  constructor(private bookService: BookService, private router:Router,private activatedRoute:ActivatedRoute){}
err :string
files:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.book.BookId = +params.get('id')!
      this.bookService.getBookFiles( +params.get('id')!).subscribe(
        (data: any) => {
          console.log(data); //all items
      this.files = data
      console.log(this.files);
      let id = 1;
        },
        (error: any) => {
          console.log('There is an error ', error);

        }
      );
    });
  }

  book: uploadBook = new uploadBook(0, null);
  onSubmit() {
    this.bookService.uploadBook(this.book)
      .subscribe(
        () => {
          // Handle success response
          console.log('Book uploaded successfully');
          this.router.navigate(['/allBooks'])

        },
        (error) => {
          // Handle error response
          console.error('Error uploading Book:', error);
        this.err= error.error.message
        }
      );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.book.BookFile = files[0];
    }
  }


}



