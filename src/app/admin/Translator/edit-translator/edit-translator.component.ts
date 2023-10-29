import { TranslatorService } from 'src/service/Book/translator.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Translator ,EditTranslator} from 'src/models/translatorModels/translator-request.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit-translator',
  templateUrl: './edit-translator.component.html',
  styleUrls: ['./edit-translator.component.css']
})
export class EditTranslatorComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute, private translatorService:TranslatorService,private router :Router) {}
  translator :EditTranslator = new EditTranslator(0,'',null,'')
  translatorbyId :any;
  id:number;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      // console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.translatorService.translatorDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.translatorbyId = response.data

      }
      );
     });
    }
  onSubmit() {
    this.translator.id = this.id
    if(this.translator.name ==''){
      this.translator.name = this.translatorbyId.name
    }
    // if(this.translator.description ==null){
    //   this.translator.description = this.translatorbyId.description
    // }
    this.translatorService.editTranslator(this.translator)
      .subscribe(
        () => {
          // Handle success response
          console.log('Translator updated successfully');
          this.router.navigate(['/allTranslators'])

        },
        (error) => {
          // Handle error response
          console.error('Error updating Translator:', error);
        }
      );
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.translator.image = files[0];
    }
  }
}

