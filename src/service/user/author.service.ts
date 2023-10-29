import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authUrl } from 'src/environment/environment.module';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl = authUrl;

  constructor(private http:HttpClient) { }
  public onGetAll()
  {
    const params = new HttpParams()
    return this.http.get(this.baseUrl+"Authors");
  }

//filter
onFilter(pageNumber?:number){
  let params=new HttpParams()
  if(pageNumber) params=params.append('PageNumber',pageNumber);
  return this.http.get(this.baseUrl+'AuthorsFilter',{params:params,observe: 'response',headers:{skip:"true"}})
}
}
