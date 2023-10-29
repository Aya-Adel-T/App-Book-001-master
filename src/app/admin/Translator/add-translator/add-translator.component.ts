import { Component } from '@angular/core';
import { TranslatorService } from 'src/service/Book/translator.service';
import { Router } from '@angular/router';
import { Translator } from 'src/models/translatorModels/translator-request.model';



@Component({
  selector: 'app-add-translator',
  templateUrl: './add-translator.component.html',
  styleUrls: ['./add-translator.component.css']
})
export class AddTranslatorComponent {
translator :Translator = new Translator('',null,'')
constructor(private translatorService:TranslatorService,private router :Router) {}
onSubmit() {
  this.translatorService.addTranslator(this.translator)
    .subscribe(
      () => {
        // Handle success response
        console.log('Translator added successfully');
        this.router.navigate(['/allTranslators'])

      },
      (error) => {
        // Handle error response
        console.error('Error adding Translator:', error);
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
