import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { errorMessage } from 'src/app/core/http';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: false,
})
export class AdminLoginComponent {
  private service = inject(AdminServiceService);
  private auth = inject(AuthService);
  private route = inject(Router);

  hide = true;
  loginError = '';
  adminLoginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    if (this.auth.isLoggedIn('admin')) {
      void this.route.navigate(['/adminHome']);
    }
  }

  onSubmit(): void {
    if (this.adminLoginForm.invalid) return;
    this.loginError = '';
    this.service.adminLogin(this.adminLoginForm.getRawValue()).subscribe({
      next: ({ token }) => {
        this.auth.login('admin', token);
        void this.route.navigate(['/adminHome']);
      },
      error: (err: unknown) => (this.loginError = errorMessage(err)),
    });
  }
}
