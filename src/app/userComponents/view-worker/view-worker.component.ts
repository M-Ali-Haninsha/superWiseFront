import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  hireForm!: FormGroup

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

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private formBuilder: FormBuilder) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''            
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.hireForm = this.formBuilder.group({
        description:['', Validators.required]
      })
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      this.workerData = value.data
    })
  }

  hire(id:string) {
    if(this.hireForm.valid) {
    let formData = new FormData()
    formData = this.hireForm.value
    this.service.workerHire(formData, id).subscribe((value)=>{
      if(value.error){
        alert('already request sended')
      }
      if(value.done) {
        alert('request sended')
      }
    })
    }
  }
}

