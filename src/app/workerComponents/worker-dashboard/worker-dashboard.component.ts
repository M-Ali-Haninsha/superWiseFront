import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.css']
})
export class WorkerDashboardComponent implements OnInit{


  constructor(private route: Router, private service: WorkerService) {}

  ngOnInit(): void {
      
  }

  

  
}
