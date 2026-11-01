import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { errorMessage } from 'src/app/core/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
  standalone: false,
})
export class UserSignupComponent {
  private service = inject(UserService);
  private auth = inject(AuthService);
  private route = inject(Router);

  signupError = '';
  userSignupForm = inject(FormBuilder).nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phoneNo: ['', [Validators.required, Validators.minLength(10)]],
    location: ['', Validators.required],
  });

  onSignup(): void {
    if (this.userSignupForm.invalid) return;
    this.signupError = '';
    const data = this.userSignupForm.getRawValue();
    this.service.userSignupPost(data).subscribe({
      next: () => {
        this.auth.setPendingSignup(data.email);
        void this.route.navigate(['/userOtp']);
      },
      error: (err: unknown) => (this.signupError = errorMessage(err)),
    });
  }
}
