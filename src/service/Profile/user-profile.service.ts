import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authUrl } from 'src/environment/environment.module';
import { Observable } from 'rxjs';
import { ProfileEditRequest } from 'src/models/profileModels/profile-edit-request';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  baseUrl = authUrl;
  constructor(private http:HttpClient) { }
  getUserDetails(id:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}user/${id}`);
  }
  editUserProfile(profileEdit:ProfileEditRequest){
    {
      const formData: FormData = new FormData();
      formData.append('Id', profileEdit.Id.toString());
      formData.append('UserName', profileEdit.UserName);
      formData.append('Email', profileEdit.Email);
      formData.append('PhoneNumber', profileEdit.PhoneNumber);
      formData.append('FirstName', profileEdit.FirstName);
      formData.append('LastName', profileEdit.LastName);
      formData.append('BirthPlace', profileEdit.BirthPlace);
      formData.append('Religion', profileEdit.Religion);
      formData.append('Nationality', profileEdit.Nationality);
      formData.append('Gender', profileEdit.Gender);
      formData.append('BirthDate', profileEdit.BirthDate.toString());
      if (profileEdit.Image) {
        formData.append('Image', profileEdit.Image, profileEdit.Image.name);
      }
      console.log(formData)
      console.log(profileEdit)

      return this.http.put(`${this.baseUrl}Profile/`, formData);
    }
  }

}

