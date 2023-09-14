import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  userSigninForm!: FormGroup
  formData:any

  passCheckErr:boolean = false
  wrongEmail:boolean = false

  constructor(private formBuilder: FormBuilder, private service: UserService, private route: Router) {}

  ngOnInit(): void {
      this.userSigninForm = this.formBuilder.group({
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(8)]]
      })
  }

  togglePasswordVisibility(){
    
  }

  onSubmit(){
    if(this.userSigninForm.valid) {
      this.formData= this.userSigninForm.value;
      
      this.service.userLogin(this.formData).subscribe((value:any)=>{
        if(value.msg == 'passwordWrong') {
          this.passCheckErr = true

        } else if(value.msg == 'wrongEmail') {
          this.wrongEmail = true
        } 
        else {
          const strValue = JSON.stringify(value)
          sessionStorage.setItem('userValue', strValue)
          this.route.navigate(['/'])
        }
      })
    }
  }
}
