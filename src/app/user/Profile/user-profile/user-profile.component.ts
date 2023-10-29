import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { UserProfileService } from 'src/service/Profile/user-profile.service';
import { ProfileEditRequest } from 'src/models/profileModels/profile-edit-request';
import { resetPasswordRequest } from 'src/models/authModels/resetPasswordRequest';
import { AuthenticationService } from 'src/service/auth/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user: any ;
  mode: 'edit' | 'locked' = 'locked';
  buttonText: 'Save Changes' | 'Edit' = 'Edit';
  resetPassHTML :any;
editedUser :ProfileEditRequest =new ProfileEditRequest('','','','','','','','','','','',null)
constructor(private activatedRoute:ActivatedRoute, private userProfileService:UserProfileService,private authenticationService: AuthenticationService){}

ngOnInit(): void {
this.activatedRoute.paramMap.subscribe((params:ParamMap)=> {
  console.log(params.get('id')!);
  this.userProfileService.getUserDetails(params.get('id')!).subscribe(
   ( response:any) => { console.log(response);
    this.user = response.data
  }
  );
});
}
onSubmit(): void {
  console.log(this.user)
  this.editedUser.Id = this.user.id;

  console.log(this.editedUser)
  this.userProfileService.editUserProfile( this.editedUser)
    .subscribe(
      () => {
        // Handle success response
        console.log('user updated successfully');
        // this.router.navigate(['/userDetails']);
        alert("Updated Successfully")
      },
      (error) => {
        // Handle error response
        console.error('Error updating user:', error);
      }
    );
}
onFileChange(event: any) {
  const files = event.target.files;
  if (files && files.length > 0) {
    this.editedUser.Image = files[0];
  }
}


changeMode(mode?: 'edit' | 'locked'): void {
  console.log(mode);
  this.mode = this.mode === 'locked' ? 'edit' : 'locked';
  this.buttonText = this.buttonText === 'Edit' ? 'Save Changes' : 'Edit';
  if(mode === 'edit') {
    this.onSubmit()
    console.log('Updating using on the back end');
  }
}


}


