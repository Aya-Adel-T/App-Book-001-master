import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { UserService } from 'src/service/auth/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private storedUser:UserService,
    private authService:AuthenticationService,
    private activatedRoute:ActivatedRoute,
    private router:Router){}
  userName:string;
  userRole?:string;
  userImage?:string
  userId:string;
  searcTitle:any;

  ngOnInit(): void {
    var userNamee=this.authService.getFullNameFromToken();
    var userRolee=this.authService.getUserRoleFromToken();
    var name=this.storedUser.getStoredFullName();
    var role=this.storedUser.getStoredRole();
    this.userName=userNamee||name;
    this.userRole=userRolee||role;
    this.userImage=this.authService.userPayload.Image
    this.userId= this.authService.getIdFromToken();
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
}
