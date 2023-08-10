import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private route: Router) {}

  signout() {
    console.log("keriiiiiiiiiii");
    
    if(sessionStorage.getItem('adminValue')){
      sessionStorage.removeItem('adminValue')
      this.route.navigate(['/admin'])
    }
  }
}
