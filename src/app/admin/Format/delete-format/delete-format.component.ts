import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { FormatService } from 'src/service/Book/format.service';

@Component({
  selector: 'app-delete-format',
  templateUrl: './delete-format.component.html',
  styleUrls: ['./delete-format.component.css']
})
export class DeleteFormatComponent implements OnInit {
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private formatService:FormatService,private router:Router) {}
format:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.formatService.formatDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.format = response
      }
      );
     });
    }
  onDelete() {
    this.formatService.onDelete(this.id).subscribe(
      () => {
        // Handle success response
        console.log('format deleted successfully');
        alert("deleted Succefully")
        this.router.navigate(['/allFormats'])

      },
      (error) => {
        // Handle error response
        console.error('Error deleting format:', error);
      }
    );
  }
}
