import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-work-progress',
  templateUrl: './work-progress.component.html',
  styleUrls: ['./work-progress.component.css']
})
export class WorkProgressComponent implements OnInit{

  workerData:any
  id:any
  progressBar: number = 0;
  Amount: number = 0
  active: boolean = false
  inActive: boolean = false

  constructor(private activateRoute: ActivatedRoute, private service: UserService) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''     
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.getProgressValue()
  }

  getProgressValue() {
    this.service.getProgressData(this.id).subscribe(data => {
      console.log(data.data);
      if(!data.data) {
        this.inActive = true
      } else {
        const workStatus = data.data.workStatus;
      this.progressBar = workStatus[0].progressBar 
      if(this.progressBar) {
        this.active = true
      } 
      }
    });
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      this.workerData = value.data
    })
  }

}
