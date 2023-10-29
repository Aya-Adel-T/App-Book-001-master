import { Component, OnInit } from '@angular/core';
import { TranslatorService } from 'src/service/Book/translator.service';

@Component({
  selector: 'app-all-translators',
  templateUrl: './all-translators.component.html',
  styleUrls: ['./all-translators.component.css']
})
export class AllTranslatorsComponent implements OnInit {
 translators :any;
  constructor(private translatorService : TranslatorService){}
  ngOnInit(): void {
    this.translatorService.getTranslators().subscribe(
      (data: any) => {
        console.log(data.data); //all items
        this.translators = data.data;
      },    (error: any) => {
        console.log('There is an error ', error);
      });
  }
}
