import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedPhoto: File | undefined;
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

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private formBuilder: FormBuilder, private route: Router) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''            
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.hireForm = this.formBuilder.group({
        description:['', Validators.required],
        file: ['']
      })
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      this.workerData = value.data
    })
  }
  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedPhoto = event.target.files[0];
    }
  }

  hire(id:string) {
    if(sessionStorage.getItem('userValue')) {
if(this.hireForm.valid ) {
    let formData = new FormData()
    if (this.selectedPhoto) {
      formData.append('file', this.selectedPhoto);
    }

    formData.append('description', this.hireForm.get('description')?.value);

    console.log('checkinnnnnng',formData);
    
    this.service.workerHire(formData, id).subscribe((value)=>{
      if(value.error){
        alert('already request sended')
      }
      if(value.done) {
        alert('request sended')
      }
    })
    }
    } else {
      alert('plz login')
      this.route.navigate(['/userLogin'])
    }
    
  }
}

