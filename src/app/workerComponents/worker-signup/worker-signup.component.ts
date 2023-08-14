import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from 'src/app/services/worker.service';
import { MatStepper } from '@angular/material/stepper';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-signup',
  templateUrl: './worker-signup.component.html',
  styleUrls: ['./worker-signup.component.css'],
})
export class WorkerSignupComponent implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;


  next:boolean = false

  formData: any;
  formData2: any;
  isEditable: boolean = false;
  workerExists: boolean = false;

  public receivedCat: any[] = [];

  secondFormGroup!: FormGroup
  thirdFormGroup!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private service: WorkerService, private route: Router) {}

  ngOnInit(): void {
  
    this.secondFormGroup = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required]
    })

    this.thirdFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      file: ['', Validators.required],
      department: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.minLength(10)]],
      district: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.getCategory()

  }

  getCategory(){
    this.service.fetchCategory().subscribe((value) => {
      console.log('cats',value);
      this.receivedCat = value.recievedCat
    })
  }

  fileChange(event: any) {
    const file = event.target.files[0];
    this.thirdFormGroup.get('file')?.setValue(file);
  }
  

  sendOtp(){
    const fileC = this.thirdFormGroup.get('file')
    if(this.thirdFormGroup.valid) {
      const formDatas = new FormData();
      formDatas.append('firstName', this.thirdFormGroup.value.firstName);
      formDatas.append('lastName', this.thirdFormGroup.value.lastName);
      formDatas.append('email', this.thirdFormGroup.value.email);
      formDatas.append('password', this.thirdFormGroup.value.password);
      formDatas.append('file',fileC?.value);
      formDatas.append('department', this.thirdFormGroup.value.department);
      formDatas.append('phoneNo', this.thirdFormGroup.value.phoneNo);
      formDatas.append('district', this.thirdFormGroup.value.district);
      console.log('x', formDatas);
      this.service.workerSignup(formDatas).subscribe((value:any)=> {
        if(value.otpGen){
          this.stepper.next();
        }
        if(value.checked){
          this.workerExists = true
        }
      });       
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out the form correctly.',
      });
    }
  }

  verify() {
    const otp1 = this.secondFormGroup.get('otp1')?.value;
    const otp2 = this.secondFormGroup.get('otp2')?.value;
    const otp3 = this.secondFormGroup.get('otp3')?.value;
    const otp4 = this.secondFormGroup.get('otp4')?.value;
  
    if (otp1 && otp2 && otp3 && otp4) {
      const combinedOtp = otp1 + otp2 + otp3 + otp4;
      console.log('combined otp', combinedOtp);
      this.formData2 = parseInt(combinedOtp, 10)
      console.log('noakaaan',this.formData2);
      this.service.otpVerify(this.formData2).subscribe((value: any) => {        
        if(value.otpDone == true) {
          Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'OTP verified, click next to proceed.',
          }).then(() => {
            this.next = true;
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Otp login Error',
            text: 'Please check the otp or resend otp.',
          });
        }
      });
    }
  }

  toLogin(){
    this.route.navigate(['/workerLogin'])
  }
}
