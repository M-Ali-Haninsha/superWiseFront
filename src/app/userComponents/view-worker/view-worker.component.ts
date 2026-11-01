import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { errorMessage } from 'src/app/core/http';
import { showError } from 'src/app/core/notify';
import { Rating, Worker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-worker',
  templateUrl: './view-worker.component.html',
  styleUrls: ['./view-worker.component.css'],
  standalone: false,
})
export class ViewWorkerComponent implements OnInit {
  private service = inject(UserService);
  private auth = inject(AuthService);
  private route = inject(Router);
  private snackBar = inject(MatSnackBar);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  workerData?: Worker;
  rating: Rating[] = [];
  selectedPhoto?: File;
  step = 0;
  hireForm = inject(FormBuilder).nonNullable.group({
    description: ['', Validators.required],
    date: ['', Validators.required],
    file: [''],
  });

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  ngOnInit(): void {
    this.service.userViewWorkerDetails(this.id).subscribe({
      next: ({ data }) => (this.workerData = data),
      error: (err: unknown) => showError(err),
    });
    this.service.showRating(this.id).subscribe({
      next: ({ rating }) => (this.rating = rating),
      error: (err: unknown) => showError(err),
    });
  }

  onPhotoSelected(event: Event): void {
    this.selectedPhoto = (event.target as HTMLInputElement).files?.[0];
  }

  hire(id: string | undefined): void {
    if (!id) return;
    if (!this.auth.isLoggedIn('user')) {
      this.showSnackbar('Please log in to hire a worker');
      void this.route.navigate(['/userLogin']);
      return;
    }
    if (this.hireForm.invalid) return;

    const { description, date } = this.hireForm.getRawValue();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    if (this.selectedPhoto) formData.append('file', this.selectedPhoto);

    this.service.workerHire(formData, id).subscribe({
      next: () => this.showSnackbar('Request sent successfully'),
      error: (err: unknown) => this.showSnackbar(errorMessage(err)),
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
