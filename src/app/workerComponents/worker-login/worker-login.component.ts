import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { errorMessage } from 'src/app/core/http';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.css'],
  standalone: false,
})
export class WorkerLoginComponent {
  private service = inject(WorkerService);
  private auth = inject(AuthService);
  private route = inject(Router);

  loginError = '';
  workerLoginForm = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  workerLogin(): void {
    if (this.workerLoginForm.invalid) return;
    this.loginError = '';
    this.service.workerLogin(this.workerLoginForm.getRawValue()).subscribe({
      next: ({ token }) => {
        this.auth.login('worker', token);
        void this.route.navigate(['/workerHome']);
      },
      error: (err: unknown) => (this.loginError = errorMessage(err)),
    });
  }
}
