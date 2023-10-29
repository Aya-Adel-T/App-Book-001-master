import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authUrl } from 'src/environment/environment.module';
import { PaymenUrl } from 'src/environment/environment.module';
@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  baseUrl = authUrl;
  paymentUrl = PaymenUrl;

  constructor(private http:HttpClient) { }

 addBookToUser(bookToUser:any)
  {
    console.log("Asdasdasdasdasd")
    console.log(bookToUser)
     return this.http.post(`${this.paymentUrl}BookUser`,bookToUser);
  // return this.http.post(this.paymentUrl+'BookUser',bookToUser)

}
//filter
onFilter(pageNumber?:number){
  let params=new HttpParams()
  if(pageNumber) params=params.append('PageNumber',pageNumber);
  return this.http.get(this.baseUrl+'Readers',{params:params,observe: 'response',headers:{skip:"true"}})
}
ongetAllBooksForAUser(readerId:string,pageNumber?:number){
  let params=new HttpParams()
  if(pageNumber) params=params.append('PageNumber',pageNumber);
  if(readerId) params=params.append('ReaderId',readerId);
  return this.http.get(this.paymentUrl+'api/Readers/Books',{params:params,observe: 'response',headers:{skip:"true"}})
}




}
