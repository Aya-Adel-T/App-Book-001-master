import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { BookService } from 'src/service/Book/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book:any;
constructor(private BookService: BookService,private activatedRoute:ActivatedRoute){}
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
    console.log(+params.get('id')!);
    this.BookService.getBookDetails(+params.get('id')!).subscribe(
     ( response:any) => { console.log(response);
      this.book = response
      console.log(this.book)
    }
    );
  });
}

}
