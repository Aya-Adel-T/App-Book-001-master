import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private id: string | null = null;
  private custId: string | null = null;
  private name: string | null = null;
  // private status:boolean = false;
  private status:any = "pending";



  setId(id: string): void {
    localStorage.setItem("storeId",id)
    // this.id = id;
  }

  getId(): string | null {
    return localStorage.getItem("storeId")
    // return this.id;
  }

  setCustId(id: string): void {
    localStorage.setItem("custId",id)
    // this.id = id;
  }

  getCustId(): string | null {
    return localStorage.getItem("custId")
    // return this.id;
  }


  setName(name: string): void {
    this.name = name;
  }

  geName(): string | null {
    return this.name;
  }
  setcartRestId(id: number): void {
    localStorage.setItem("RestCartId", id.toString());
  }

  getcartRestId(): number | null {
    const cartRestId = localStorage.getItem("RestCartId");
    if (cartRestId) {
      return parseInt(cartRestId, 10);
    }
    return null;
  }



  setStatus(sts:any){
    localStorage.setItem('orderStatus',sts)
  }
  getStatus(): any {
    let savedStatus = localStorage.getItem('orderStatus');
    if (savedStatus) {
      this.status = savedStatus;
      console.log('order status', this.status);
      return this.status;
    } else {
      console.log('there is no status');
      return null;
    }
  }

  // delete status
  cancelStatus() {
    this.status = false;
  }

}

