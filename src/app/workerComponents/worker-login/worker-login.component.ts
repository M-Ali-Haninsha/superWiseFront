import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css']
})
export class WorkerLoginComponent implements OnInit{

  passCheckErr: boolean = false
  wrongEmail: boolean = false


  workerLoginForm!: FormGroup
  formData!: FormData
  constructor(private formBuilder: FormBuilder, private service: WorkerService, private route: Router) {}

  ngOnInit(): void {
      this.workerLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
  })
  }

  workerLogin(){
    if(this.workerLoginForm.valid){
      this.formData = this.workerLoginForm.value
      console.log('data', this.formData);
      this.service.workerLogin(this.formData).subscribe((value)=>{
        if(value.msg == 'passwordWrong') {
          this.passCheckErr = true

        } else if(value.msg == 'wrongEmail') {
          this.wrongEmail = true
        } 
        else {
          const strValue = JSON.stringify(value)
          sessionStorage.setItem('workerValue', strValue)
          this.route.navigate(['/workerHome'])
        }
      })
    }
  }
}
