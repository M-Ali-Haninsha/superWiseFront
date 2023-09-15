import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit{

  workerId:string
  clientId:string

  constructor(private activateRoute: ActivatedRoute, private service:AdminServiceService) {
    this.workerId = this.activateRoute.snapshot.paramMap.get('workerId') || ''  
    this.clientId = this.activateRoute.snapshot.paramMap.get('clientId') || ''
  }

  ngOnInit(): void {
      // this.workerDetails()
      
  }

  // workerDetails() {
  //   this.service.getReportedWorker(this.workerId, this.clientId).subscribe((value)=> {
  //     console.log(value);
      
  //   })
  // }
}
