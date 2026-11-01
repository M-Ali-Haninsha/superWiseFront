import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { showError, showSuccess } from 'src/app/core/notify';
import { UserService } from 'src/app/services/user.service';

const digit = ['', [Validators.required, Validators.pattern(/^\d$/)]];

@Component({
  selector: 'app-user-otp',
  templateUrl: './user-otp.component.html',
  styleUrls: ['./user-otp.component.css'],
  standalone: false,
})
export class UserOtpComponent implements OnInit {
  private service = inject(UserService);
  private auth = inject(AuthService);
  private route = inject(Router);

  private email = '';
  otpForm = inject(FormBuilder).nonNullable.group({
    otp1: digit,
    otp2: digit,
    otp3: digit,
    otp4: digit,
  });

  ngOnInit(): void {
    const email = this.auth.getPendingSignup();
    if (!email) {
      void this.route.navigate(['/userSignup']);
      return;
    }
    this.email = email;
  }

  verify(): void {
    if (this.otpForm.invalid) return;
    const { otp1, otp2, otp3, otp4 } = this.otpForm.getRawValue();
    // Kept as a string so OTPs that start with 0 still match.
    const otp = `${otp1}${otp2}${otp3}${otp4}`;

    this.service.userOtp({ email: this.email, otp }).subscribe({
      next: () => {
        this.auth.clearPendingSignup();
        void showSuccess('OTP Verified', 'Your account is ready. Please log in.').then(() =>
          this.route.navigate(['/userLogin']),
        );
      },
      error: (err: unknown) => showError(err, 'Please check the OTP and try again.'),
    });
  }
}
