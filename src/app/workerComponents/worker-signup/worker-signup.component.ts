import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-worker-signup',
  templateUrl: './worker-signup.component.html',
  styleUrls: ['./worker-signup.component.css']
})
export class WorkerSignupComponent implements OnInit {

  workerSignupForm:any = FormGroup
  formData:any

  constructor(private service: WorkerService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.workerSignupForm = this.formBuilder.group({
        firstName: ['', Validators.required]
      })
  }

}
