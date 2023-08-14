import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate{

  constructor(private route: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem('workerValue')) {
      return true;
    } else {
      this.route.navigate(['/workerLogin']); 
      return false; 
    }
  }
}