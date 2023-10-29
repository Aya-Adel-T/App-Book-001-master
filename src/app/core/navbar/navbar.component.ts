import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { UserService } from 'src/service/auth/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
constructor(private storedUser:UserService,private authService:AuthenticationService){}
  userName?:string;
  userRole?:string;
  userImage?:string

  ngOnInit(): void {
    var userNamee=this.authService.getFullNameFromToken();
    var userRolee=this.authService.getUserRoleFromToken();
    var name=this.storedUser.getStoredFullName();
    var role=this.storedUser.getStoredRole();
    this.userName=userNamee||name;
    this.userRole=userRolee||role;
   
    //console.log(this.userRole)
  }

}
