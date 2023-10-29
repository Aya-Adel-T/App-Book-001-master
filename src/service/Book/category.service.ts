import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryUrl } from 'src/environment/environment.module';
import { Observable } from 'rxjs';
import { Category,CategoryEdit } from 'src/models/bookModels/category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl=categoryUrl
  userPayload:any

  constructor(private  http: HttpClient){ }

addCategory(category: Category): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('name', category.name);
  if (category.categoryImage) {
    formData.append('categoryImage', category.categoryImage, category.categoryImage.name);
  }
  return this.http.post(this.baseUrl, formData);
}
public onGetAll()
{
  console.log(this.baseUrl+"Categries")
  return this.http.get(this.baseUrl+"Categories");
}
editCategory(category: CategoryEdit ) {
  const formData: FormData = new FormData();
  formData.append('id', category.id.toString());
  formData.append('name', category.name);
  if (category.categoryImage) {
    formData.append('categoryImage', category.categoryImage, category.categoryImage.name);
  }
  return this.http.put(`${this.baseUrl}`, formData);
}
getCategorybyID(id:any):Observable<any> {
  // const url = `${this.baseUrl}/${id}`;
  return this.http.get<any>(`${this.baseUrl}${id}`);

}
onDelete(id:any):Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}${id}`);
}
}











