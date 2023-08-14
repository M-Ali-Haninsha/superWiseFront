import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-otp',
  templateUrl: './user-otp.component.html',
  styleUrls: ['./user-otp.component.css']
})
export class UserOtpComponent implements OnInit {

  otpForm!: FormGroup
  formData!:any

  constructor(private formBuilder: FormBuilder, private service: UserService, private route: Router) {}

  ngOnInit(): void {
      this.otpForm = this.formBuilder.group({
        otp1: ['', Validators.required],
        otp2: ['', Validators.required],
        otp3: ['', Validators.required],
        otp4: ['', Validators.required]
      })
  }

  verify() {
    console.log(this.otpForm);
    
    const otp1 = this.otpForm.get('otp1')?.value;
    const otp2 = this.otpForm.get('otp2')?.value;
    const otp3 = this.otpForm.get('otp3')?.value;
    const otp4 = this.otpForm.get('otp4')?.value;
  
    if (otp1 && otp2 && otp3 && otp4) {
      const combinedOtp = otp1 + otp2 + otp3 + otp4;
      console.log('combined otp', combinedOtp);
      this.formData = parseInt(combinedOtp, 10)
      console.log('noakaaan',this.formData);
      this.service.userOtp(this.formData).subscribe((value: any) => {        
        if(value.otpDone == true) {
          Swal.fire({
            icon: 'success',
            title: 'OTP Verified',
            text: 'OTP verified, you will directed to login page.',
          }).then(() => {
            this.route.navigate(['/userLogin'])
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
}
