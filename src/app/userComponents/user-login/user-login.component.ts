import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { errorMessage } from 'src/app/core/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  standalone: false,
})
export class UserLoginComponent {
  private service = inject(UserService);
  private auth = inject(AuthService);
  private route = inject(Router);

  loginError = '';
  // No minimum length here: older accounts may have shorter passwords.
  userSigninForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  togglePasswordVisibility(): void {}

  onSubmit(): void {
    if (this.userSigninForm.invalid) return;
    this.loginError = '';
    this.service.userLogin(this.userSigninForm.getRawValue()).subscribe({
      next: ({ token }) => {
        this.auth.login('user', token);
        void this.route.navigate(['/']);
      },
      error: (err: unknown) => (this.loginError = errorMessage(err)),
    });
  }
}
