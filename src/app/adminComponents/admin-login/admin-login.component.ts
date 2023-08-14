import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  hide = true;
  adminLoginForm:any = FormGroup
  formData: any
  passCheckErr: boolean = false
  wrongEmail: boolean = false

  constructor(private formBuilder: FormBuilder, private service: AdminServiceService, private route: Router) {
    if(sessionStorage.getItem('adminValue')) {
      this.route.navigate(['/adminHome'])
    }
  }

  ngOnInit(): void {
      this.adminLoginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  // togglePasswordVisibility(event: Event) {
  //   event.preventDefault();
  //   this.hide = !this.hide;
  // }

  onSubmit(){
    if(this.adminLoginForm.valid) {
      this.formData= this.adminLoginForm.value;
      this.service.adminSignup(this.formData).subscribe((value:any)=>{
        console.log('login',value);
        if(value.msg == 'passwordWrong') {
          this.passCheckErr = true

        } else if(value.msg == 'wrongEmail') {
          this.wrongEmail = true
        } 
        else {
          const strValue = JSON.stringify(value)
          sessionStorage.setItem('adminValue', strValue)
          console.log("logged");
          this.route.navigate(['/adminHome'])
        }
      })
    }
  }
}
