import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookUrl, authUrl } from 'src/environment/environment.module';
import { Boook, BookRequest,BoookFitlerRequest } from 'src/models/bookModels/bookRequest.model';
import { uploadBook } from 'src/models/bookModels/upload-book';
import { domain } from 'src/environment/environment.module';
@Injectable({
  providedIn: 'root'
})
export class BookService {
baseUrl = bookUrl;
AuthUrl = authUrl;
domainUrl = domain;

  constructor(private http:HttpClient) { }
  //Fetch books
  getBooks(size:number =10):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}books/?results=${size}`)
  }
  getBooksFilter(pageNumber?:number):Observable<any>{
    let params=new HttpParams()
    if(pageNumber) params=params.append('PageNumber',pageNumber);
    return this.http.get<any>(`${this.baseUrl}FilterAdmin`,{params:params,observe: 'response',headers:{skip:"true"}})
  }
  // 'http://ayaelhashash-001-site1.itempurl.com/'
  // 'api/Book/'

  // http://ayaelhashash-001-site1.itempurl.com/api/Book/FilterAdmin

  getBookFiles(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}BookFiles/${id}`)
  }


  getBook(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}${id}`,{headers:{skip:"true"}})
  }
  getBookDetails(id:any):Observable<any>{
    return this.http.get<any>(`${this.domainUrl}api/Book/${id}`,{headers:{skip:"true"}})
    // return this.http.get<any>(`${this.domainUrl}api/Home/BookDetails/${id}`,{headers:{skip:"true"}})

  }
  getAuthors():Observable<any>{
    return this.http.get<any>(`${this.AuthUrl}Authors`)

  }
  addBook(book: Boook): Observable<any> {

    const formData: FormData = new FormData();

    // Append string values
    formData.append('Title', book.Title);
    formData.append('ISBN', book.ISBN);
   formData.append('OriginalTitle', book.OriginalTitle);
    formData.append('Description', book.Description);
    formData.append('NumberOfPages', book.NumberOfPages.toString());
    formData.append('Year', book.Year.toString());
    formData.append('Edition', book.Edition.toString());
    formData.append('Publisher', book.Publisher);
    formData.append('OriginalLanguage', book.OriginalLanguage);
    formData.append('TranslatedToLanguage', book.TranslatedToLanguage);
    formData.append('Price', book.Price.toString());
    formData.append('AuthorId', book.AuthorId);
    const numbers: number[] = book.CategoriesIds;
    const transIds: number[] = book.TranslatorsIds;
    numbers.forEach((number) => {
      formData.append('CategoriesIds', number.toString());
    });
      transIds.forEach((number) => {
        formData.append('TranslatorsIds', number.toString()); });

     if (book.BookCoverFile) {
     formData.append('BookCoverFile', book.BookCoverFile, book.BookCoverFile.name);
     }
    return this.http.post(`${this.baseUrl}BookInfo`, formData);

  }
  uploadBook(book:uploadBook):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('BookId', book.BookId.toString());

  if (book.BookFile) {
    formData.append('BookFile', book.BookFile, book.BookFile.name);
  }
  return this.http.post(`${this.baseUrl}Upload`, formData);
  }
  deleteBookFile(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}BookFile/${id}`)
  }

  CountDashbaord(){
    return this.http.get<any>(`${this.baseUrl}CountDashBoard`,{headers:{skip:"true"}})
  }

}

















    // const formData: FormData = new FormData();

    // formData.append('Title', book.Title);
    // if (book.ISBN !== null) {
    //   formData.append('ISBN', book.ISBN.toString());
    // } else {
    //   formData.append('ISBN', '');
    // }
    // // formData.append('OriginalTitle', book.OriginalTitle);
    // // formData.append('Description', book.Description);
    // // formData.append('NumberOfPages', book);
    // // formData.append('Year', book.Year);
    // // formData.append('Edition', book.Edition);
    // // formData.append('Publisher', book.Publisher);
    // // formData.append('OriginalLanguage', book.OriginalLanguage);
    // // formData.append('TranslatedToLanguage', book.TranslatedToLanguage);
    // formData.append('Price', book.Price.toString());
    // formData.append('AuthorId', book.AuthorId);
    // // formData.append('CategoriesIds', book.CategoriesIds);
    // // formData.append('TranslatorsIds', book.TranslatorsIds);

    // if (book.BookCoverFile) {
    //   formData.append('BookCoverFile', book.BookCoverFile, book.BookCoverFile.name);
    // }

  // }


// addCategory(category: Category): Observable<any> {
//   const formData: FormData = new FormData();
//   formData.append('name', category.name);
//   if (category.categoryImage) {
//     formData.append('categoryImage', category.categoryImage, category.categoryImage.name);
//   }
//   return this.http.post(this.baseUrl, formData);
// }

