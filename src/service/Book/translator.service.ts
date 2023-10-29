import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookUrl } from 'src/environment/environment.module';
import { Translator,EditTranslator } from 'src/models/translatorModels/translator-request.model';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  baseUrl = bookUrl;

    constructor(private http:HttpClient) { }
    //Fetch translators
     //Fetch books
  getTranslators(size:number =10):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Translators`)

  }
  deleteTranslator(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}Translator/${id}`)

  }
  translatorDetails(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Translator/${id}`)
  }
  addTranslator(translator:Translator):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('name', translator.name);
    formData.append('description', translator.description);
    if (translator.image) {
      formData.append('image', translator.image, translator.image.name);
    }
    return this.http.post<any>(`${this.baseUrl}Translator/`,formData)
  }
  editTranslator(translator:EditTranslator):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('id', translator.id.toString());
    formData.append('name', translator.name);
    formData.append('description', translator.description);
    if (translator.image) {
      formData.append('image', translator.image, translator.image.name);
      console.log(translator.image)
      console.log(translator.image.name)
    }
    return this.http.put<any>(`${this.baseUrl}Translator/`,formData)
  }

}
