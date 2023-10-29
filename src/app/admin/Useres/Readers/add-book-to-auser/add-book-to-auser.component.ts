import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/service/Book/book.service';
import { AddBookToUser } from 'src/models/paymentModels/final-payment.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReaderService } from 'src/service/user/reader.service';


@Component({
  selector: 'app-add-book-to-auser',
  templateUrl: './add-book-to-auser.component.html',
  styleUrls: ['./add-book-to-auser.component.css']
})
export class AddBookToAUserComponent implements OnInit  {
  public page = 1;
  public pageSiza = 10;

constructor(private bookService : BookService,private activatedRoute:ActivatedRoute,private readerService:ReaderService,private router :Router){}
bookUser:AddBookToUser = new AddBookToUser('',1);
book:any
id: string;
err:string

ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
    console.log(params.get('id')!);
    this.id = params.get('id')!;
  });

  this.bookService.getBooks(15).subscribe(
    (data: any) => {
      console.log(data); //all items
  this.book = data
    },
    (error: any) => {
      console.log('There is an error ', error);

    }
  );
}
add(id:number) {
  this.bookUser.BookId =  id;
  this.bookUser.CustomerId =this.id;
this.readerService.addBookToUser(this.bookUser)
    .subscribe(
      (data:any) => {
        // Handle success response
        console.log('Book added successfully');
        alert("Book added successfully")
        this.router.navigate(['/userBooks',this.id])

      },
      (error) => {
        // Handle error response
        console.error('Error adding Book:', error);
        this.err= error.error.message
      }
    );
}
}
