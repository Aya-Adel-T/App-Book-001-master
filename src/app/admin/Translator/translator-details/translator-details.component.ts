import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Translator } from 'src/models/translatorModels/translator-request.model';
import { TranslatorService } from 'src/service/Book/translator.service';

@Component({
  selector: 'app-translator-details',
  templateUrl: './translator-details.component.html',
  styleUrls: ['./translator-details.component.css']
})
export class TranslatorDetailsComponent implements OnInit{

  translator:Translator;
  id:number;
  constructor(private activatedRoute:ActivatedRoute,private translatorService:TranslatorService) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
      console.log(+params.get('id')!);
      this.id = +params.get('id')!
      this.translatorService.translatorDetails(+params.get('id')!).subscribe(
       ( response:any) => { console.log(response);
        this.translator = response.data

      }
      );
     });
    }

}
