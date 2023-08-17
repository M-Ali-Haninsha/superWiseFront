import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-woker-sidenav',
  templateUrl: './woker-sidenav.component.html',
  styleUrls: ['./woker-sidenav.component.css']
})
export class WokerSidenavComponent implements OnInit{

  worker:any

  constructor(private route: Router, private service: WorkerService) {}

  ngOnInit(): void {
      this.workerProfile()
  }

  workerProfile() {
    this.service.fetchWorkerData().subscribe((value)=>{
      this.worker = value.data
    })
  }

  logout(){
    if(sessionStorage.getItem('workerValue')){
      sessionStorage.removeItem('workerValue')
      this.route.navigate(['/workerLogin'])
    }
  }
}
