import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/service/shared.service';
import { FormatService } from 'src/service/Book/format.service';

@Component({
  selector: 'app-all-formats',
  templateUrl: './all-formats.component.html',
  styleUrls: ['./all-formats.component.css']
})
export class AllFormatsComponent implements OnInit {
  Formats: any = [];
  constructor(public formatService: FormatService,) {}
  ngOnInit(): void {
    this.formatService.GetAllFormats().subscribe(
      (data: any) => {
        console.log(data); //all items
        this.Formats = data;
      },
      (error: any) => {
        console.log('There is an error ', error);
      }
    );
  }
}
