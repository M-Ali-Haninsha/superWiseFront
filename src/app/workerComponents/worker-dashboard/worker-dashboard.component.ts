import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css']
})
export class WorkerDashboardComponent implements OnInit{


  constructor(private route: Router) {}

  ngOnInit(): void {
      
  }

  logout(){
    if(sessionStorage.getItem('workerValue')){
      sessionStorage.removeItem('workerValue')
      this.route.navigate(['/workerLogin'])
    }
  }
}
