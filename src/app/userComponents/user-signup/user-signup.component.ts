import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit{

  userSignupForm!: FormGroup
  formData:any
  userExists:boolean = false

  constructor(private formBuilder:FormBuilder, private service: UserService, private route: Router) {}

  ngOnInit(): void {
      this.userSignupForm = this.formBuilder.group({
        firstName:['', [Validators.required, Validators.minLength(3)]],
        lastName:['', Validators.required],
        email:['', Validators.required],
        password:['', [Validators.required, Validators.minLength(8)]],
        phoneNo:['', [Validators.required, Validators.minLength(10)]]
      })
  }

  onSignup() {
    if(this.userSignupForm.valid) {
      this.formData= this.userSignupForm.value;
      this.service.userSignupPost(this.formData).subscribe((value:any)=>{      
        if(value.otpGen){          
          this.route.navigate(['/userOtp'])
        }
        if(value.checked){
          this.userExists = true
        }
        
          
        
      })      
    }
  }
}
