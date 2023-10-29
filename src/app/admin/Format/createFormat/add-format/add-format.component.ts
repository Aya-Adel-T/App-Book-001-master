import { FormatRequest } from 'src/models/bookModels/format-request.model';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormatService } from 'src/service/Book/format.service';
import { SharedService } from 'src/service/shared.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-add-format',
  templateUrl: './add-format.component.html',
  styleUrls: ['./add-format.component.css']
})
export class AddFormatComponent {
  addFormat= new FormGroup({
    formatName: new FormControl("",[Validators.minLength(2),Validators.maxLength(30),Validators.required]),
    })
    constructor(public myService:FormatService , private route:Router ){
    }
  AddFormat(formatHTML: string) {
      let newItem:FormatRequest={
        name: formatHTML
        }
    if (this.addFormat.valid) {
      console.log(newItem);
        this.myService.addFormat(newItem).subscribe(
          (data: any) => {
                    console.log(data);
                    alert(`${formatHTML} added successfully`)
                    this.route.navigate(['/allFormats'])
                  },
                  (err: any) => {
                    console.log('Error', err);
                  }
        );
      }
    }
}
