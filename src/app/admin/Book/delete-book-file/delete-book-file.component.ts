import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from 'src/service/Book/book.service';
@Component({
  selector: 'app-delete-book-file',
  templateUrl: './delete-book-file.component.html',
  styleUrls: ['./delete-book-file.component.css']
})
export class DeleteBookFileComponent  implements OnInit {
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private bookService:BookService,private router:Router) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
     });
    }
  onDelete() {
    this.bookService.deleteBookFile(this.id).subscribe(
      () => {
        // Handle success response
        console.log('translator deleted successfully');
        alert("deleted Succefully")
        this.router.navigate(['/allBooks'])

      },
      (error) => {
        // Handle error response
        console.error('Error deleting book:', error);
      }
    );
  }
}
