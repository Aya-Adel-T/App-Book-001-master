import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.css']
})
export class BookMainComponent {
  constructor(private router: Router) {
  }
  addNewBook() {
    this.router.navigate(['/addBookInfo']);
    }
    allBooks() {
      this.router.navigate(['/allBooks']);
      }
}
