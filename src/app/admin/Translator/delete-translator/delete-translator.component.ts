import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/service/Book/translator.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-translator',
  templateUrl: './delete-translator.component.html',
  styleUrls: ['./delete-translator.component.css']
})
export class DeleteTranslatorComponent implements OnInit {
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private translatorService:TranslatorService,private router:Router) {}
translator:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.translatorService.translatorDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.translator = response
      }
      );
     });
    }
  onDelete() {
    this.translatorService.deleteTranslator(this.id).subscribe(
      () => {
        // Handle success response
        console.log('translator deleted successfully');
        alert("deleted Succefully")
        this.router.navigate(['/allTranslators'])

      },
      (error) => {
        // Handle error response
        console.error('Error deleting translator:', error);
      }
    );
  }
}
