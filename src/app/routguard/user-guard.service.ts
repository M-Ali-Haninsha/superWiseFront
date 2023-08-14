import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate{

  constructor(private route: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('userValue')) {
      return true;
    } else {
      this.route.navigate(['/']); 
      return false; 
    }
  }
}
