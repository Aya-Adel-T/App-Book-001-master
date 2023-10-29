import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { UserService } from 'src/service/auth/user.service';
import { HomeService } from 'src/service/home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private storedUser:UserService,
    private authService:AuthenticationService,
    private homeService:HomeService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ){}
  userName?:string;
  userRole?:string;
  userId:string;
  image?: string;
  searcTitle:any;
  userImage?:string
  cartItems:number;
  wishListItems:number;
  ngOnInit(): void {
    this.storedUser.getStoredFullName().subscribe(namee=>{
      let name=this.authService.getFullNameFromToken();
      this.userName=namee||name;
      this.storedUser.getStoredRole().subscribe(role=>{
      let userRolee=this.authService.getUserRoleFromToken();
      this.userRole=userRolee||role;
      let userID = this.authService.getIdFromToken();
      this.userId = userID;
      let Image = this.authService.getImageFromToken();
      this.image = Image;
      })
      this.userImage=this.authService.decodeToken().Image
    });
    this.loadCart()
    this.loadWishList()
    this.activatedRoute.queryParamMap.subscribe(p=>{
      this.searcTitle=p.get('t')

    })

  }
  searchForm:FormGroup= new FormGroup
  (
    {
      search:new FormControl('',[Validators.required]),
    }
  )
  get searchControl(){
   return this.searchForm.controls['search']

  }
  logout(){
    this.authService.logOut()
    window.location.replace('/login')
    //this.router.navigate(['/login'])
  }
  redirect(){
    if(this.searchForm.valid){
      this.router.navigate(['/search'],{queryParams:{t:this.searchForm.get('search')?.value}})
    }
  }
   loadCart(){
     this.homeService.getAllItemsInCart().subscribe({
      next:(res:any)=>{
        this.homeService.setStoredCartCount(res.data.length)
        this.homeService.getStoredCartCount().subscribe(
          length=>this.cartItems=length
        )
        console.log(this.cartItems)
      },
      error:(err:any)=>{
        //console.log(err)
        //handle error redirect
      }
    })
  }
  loadWishList(){
    return  this.homeService.getAllItemsInWishList().subscribe({
        next:(res:any)=>{

         this.homeService.setWishListCount(res.data.length)
         this.homeService.getWishListCount().subscribe(
          length=>this.wishListItems=length
         )
        },
        error:(err:any)=>{
        }
      })
    }
}
