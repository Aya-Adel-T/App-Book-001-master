import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatUrl } from 'src/environment/environment.module';
import { FormatRequest } from 'src/models/bookModels/format-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  baseUrl = formatUrl

  constructor(private http :HttpClient) { }
  addFormat(format:FormatRequest) {
    return this.http.post(this.baseUrl, format);
  }
  GetAllFormats(){
    return this.http.get(this.baseUrl);
   }
   onDelete(id:any):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
  formatDetails(id:number):Observable<any> {
      return this.http.get<any>(`${this.baseUrl}${id}`)
  }
  editFormat(format:any):Observable<any> {
    return this.http.put<any>(this.baseUrl,format)
}
}

