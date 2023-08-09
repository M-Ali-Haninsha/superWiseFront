import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  hide = true;
  adminLoginForm:any = FormGroup

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.adminLoginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
