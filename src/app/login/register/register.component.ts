import { Router } from '@angular/router';
import { Component ,OnInit,ViewEncapsulation} from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from 'src/service/auth/authentication.service';

// import Keyboard from "simple-keyboard";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isSuccess:boolean=false;
  errorMessage?:string
  errors?:string;

  constructor(private registerService: AuthenticationService, private router:Router){}
  registerForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ]),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
  })
  get fnamecontrol() {
    return this.registerForm.controls['firstName'];
  }
  get lnamecontrol() {
    return this.registerForm.controls['lastName'];
  }
  get emailcontrol() {
    return this.registerForm.controls['email'];
  }
  get passwordcontrol() {
    return this.registerForm.controls['password'];
  }
  get userNamecontrol() {
    return this.registerForm.controls['userName'];
  }
  register() {
    if (this.registerForm.valid) {
      this.isSuccess=true;
      let subscriber = this.registerService.onRegister(this.registerForm.value).subscribe({
        next: (response) => {
          this.isSuccess=false;
          this.router.navigate(['/login'])
          subscriber.unsubscribe();
          //console.log(response);
        },
        error: (err) => {
          this.isSuccess=false;
          this.errorMessage=err.error.message
          this.errors=err.error.errors
        },
      });
    }
  }
}
