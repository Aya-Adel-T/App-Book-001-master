import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormatRequestEdit } from 'src/models/bookModels/format-request.model';
import { FormatService } from 'src/service/Book/format.service';

@Component({
  selector: 'app-edit-format',
  templateUrl: './edit-format.component.html',
  styleUrls: ['./edit-format.component.css']
})
export class EditFormatComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute, private formatService:FormatService,private router :Router) {}

   format:FormatRequestEdit;
  id:number;
  formatbyId :any;
  editFormat= new FormGroup({
    formatName: new FormControl("",[Validators.minLength(2),Validators.maxLength(30),Validators.required]),
    })
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      // console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.formatService.formatDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.formatbyId = response.data
      }
      );
     });
    }
  onSubmit(formatName:string) {
     this.format={
      id : this.id ,
      name: formatName
      }
    if(this.format.name ==''){
      this.format.name = this.formatbyId.name
    }
    this.formatService.editFormat(this.format)
      .subscribe(
        () => {
          // Handle success response
          console.log('format updated successfully');
          this.router.navigate(['/allFormats'])

        },
        (error) => {
          // Handle error response
          console.error('Error updating format:', error);
        }
      );
   }

}
