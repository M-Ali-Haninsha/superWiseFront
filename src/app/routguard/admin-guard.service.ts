import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private route: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('adminValue')) {
      return true;
    } else {
      this.route.navigate(['/admin']); 
      return false; 
    }
  }
}
