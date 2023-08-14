import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit{

  login: boolean = true
  logged: boolean = false

  constructor(private route: Router) {
    if(sessionStorage.getItem('userValue')) {
      this.login = false
      this.logged = true
    }
  }

  ngOnInit(): void {
      
  }

  signout() {    
    if(sessionStorage.getItem('userValue')){
      sessionStorage.removeItem('userValue')
      this.login = true
      this.logged = false
      this.route.navigate(['/'])
    }
  }

  profile() {
    this.route.navigate(['/userProfile'])
  }
}
