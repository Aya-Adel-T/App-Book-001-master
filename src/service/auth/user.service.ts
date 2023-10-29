import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  private role$=new BehaviorSubject<string>("");
  private fullName$=new BehaviorSubject<string>("");

  public getStoredRole(){
    return this.role$.asObservable();
  }
  public getStoredFullName(){
    return this.fullName$.asObservable();
  }
  public setStoredRole(role:string){
    this.role$.next(role);
  }
  public setStoredFullName(fullname:string){
    this.fullName$.next(fullname)
  }
}
