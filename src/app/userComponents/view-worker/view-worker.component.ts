import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-worker',
  templateUrl: './view-worker.component.html',
  styleUrls: ['./view-worker.component.css']
})
export class ViewWorkerComponent implements OnInit{

  workerData:any
  id:string

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private activateRoute: ActivatedRoute, private service: UserService) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''  
    console.log('tessssssssssssssssss', this.id);
          
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      console.log(value.data);
      this.workerData = value.data
    })
  }
}

