import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-format-main',
  templateUrl: './format-main.component.html',
  styleUrls: ['./format-main.component.css']
})
export class FormatMainComponent {
  constructor(private router: Router) {
  }
  addNewFormat() {
    this.router.navigate(['/addFormat']);
    }
    allFormats() {
      this.router.navigate(['/allFormats']);
      }

}
