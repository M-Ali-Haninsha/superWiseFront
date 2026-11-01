import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { errorMessage } from 'src/app/core/http';
import { showError } from 'src/app/core/notify';
import { Category } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';

const digit = ['', [Validators.required, Validators.pattern(/^\d$/)]];

@Component({
  selector: 'app-worker-signup',
  templateUrl: './worker-signup.component.html',
  styleUrls: ['./worker-signup.component.css'],
  standalone: false,
})
export class WorkerSignupComponent implements OnInit {
  private service = inject(WorkerService);
  private route = inject(Router);
  private fb = inject(FormBuilder).nonNullable;

  @ViewChild('stepper') stepper!: MatStepper;
  next = false;
  isEditable = false;
  signupError = '';
  receivedCat: Category[] = [];
  private proofFile: File | null = null;

  secondFormGroup = this.fb.group({ otp1: digit, otp2: digit, otp3: digit, otp4: digit });
  thirdFormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    file: ['', Validators.required],
    department: ['', Validators.required],
    phoneNo: ['', [Validators.required, Validators.minLength(10)]],
    district: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit(): void {
    this.service.fetchCategory().subscribe({
      next: ({ recievedCat }) => (this.receivedCat = recievedCat),
      error: (err: unknown) => showError(err),
    });
  }

  fileChange(event: Event): void {
    this.proofFile = (event.target as HTMLInputElement).files?.[0] ?? null;
  }

  sendOtp(): void {
    if (this.thirdFormGroup.invalid || !this.proofFile) {
      void Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fill out the form correctly.' });
      return;
    }
    const { file: _file, ...fields } = this.thirdFormGroup.getRawValue();
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) formData.append(key, value);
    formData.append('file', this.proofFile);

    this.signupError = '';
    this.service.workerSignup(formData).subscribe({
      next: () => this.stepper.next(),
      error: (err: unknown) => (this.signupError = errorMessage(err)),
    });
  }

  verify(): void {
    if (this.secondFormGroup.invalid) return;
    const { otp1, otp2, otp3, otp4 } = this.secondFormGroup.getRawValue();
    const email = this.thirdFormGroup.getRawValue().email;

    this.service.otpVerify({ email, otp: `${otp1}${otp2}${otp3}${otp4}` }).subscribe({
      next: () => {
        void Swal.fire({
          icon: 'success',
          title: 'OTP Verified',
          text: 'Your account will be active once an admin verifies your ID proof.',
        }).then(() => (this.next = true));
      },
      error: (err: unknown) => showError(err, 'Please check the OTP and try again.'),
    });
  }

  toLogin(): void {
    void this.route.navigate(['/workerLogin']);
  }
}
