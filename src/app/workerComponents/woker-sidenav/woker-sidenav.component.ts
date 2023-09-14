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
  reqCount: number = 0

  constructor(private route: Router, private service: WorkerService) {}

  ngOnInit(): void {
      this.workerProfile()
      this.inboxCount()
  }

  workerProfile() {
    this.service.fetchWorkerData().subscribe((value)=>{
      this.worker = value.data
    })
  }

  inboxCount(){
    this.service.countData().subscribe((value)=> {
      console.log(value.lengthOfReq);
      this.reqCount = value.lengthOfReq
    })
  }

  logout(){
    if(sessionStorage.getItem('workerValue')){
      sessionStorage.removeItem('workerValue')
      this.route.navigate(['/workerLogin'])
    }
  }
}
