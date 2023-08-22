import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit{

  login: boolean = true
  logged: boolean = false
  data:any

  constructor(private route: Router, private service: UserService) {
    if(sessionStorage.getItem('userValue')) {
      this.login = false
      this.logged = true
    }
  }

  ngOnInit(): void {
    if(this.logged){
      this.getUserName()
    }
  }

  getUserName() {
    this.service.fetchUserData().subscribe((value)=> {
      console.log(value);
      this.data = value.fetchedData
    })
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
