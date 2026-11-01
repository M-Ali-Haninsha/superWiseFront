import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { openRazorpayCheckout } from 'src/app/core/razorpay';
import { Worker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent, UserDialogData } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-work-progress',
  templateUrl: './work-progress.component.html',
  styleUrls: ['./work-progress.component.css'],
  standalone: false,
})
export class WorkProgressComponent implements OnInit {
  private route = inject(Router);
  private service = inject(UserService);
  private dialog = inject(MatDialog);
  private ngZone = inject(NgZone);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  workerData?: Worker;
  progressBar = 0;
  Amount = 0;
  active = false;
  inActive = false;
  ratingButtonActive = false;
  payActive = true;
  paying = false;
  amountForm = inject(FormBuilder).nonNullable.group({ amount: 0 });

  ngOnInit(): void {
    this.service.userViewWorkerDetails(this.id).subscribe({
      next: ({ data }) => (this.workerData = data),
      error: (err: unknown) => showError(err),
    });
    this.getProgressValue();
    this.getAmount();
  }

  getAmount(): void {
    this.service.showAmount(this.id).subscribe({
      next: ({ amount }) => {
        this.payActive = amount != null;
        this.Amount = amount ?? 0;
      },
      error: (err: unknown) => showError(err),
    });
  }

  getProgressValue(): void {
    this.service.getProgressData(this.id).subscribe({
      next: ({ data }) => {
        // 0 means the worker accepted but has not started yet.
        this.progressBar = data ?? 0;
        this.active = this.progressBar > 0;
        this.inActive = !this.active;
        this.ratingButtonActive = this.progressBar === 100;
      },
      error: (err: unknown) => showError(err),
    });
  }

  initiateRazorpayPayment(workerId: string | undefined): void {
    if (!workerId || this.paying) return;
    this.paying = true;
    this.service.razorpay(workerId).subscribe({
      next: ({ key, value: order }) => {
        openRazorpayCheckout({
          key,
          amount: order.amount,
          currency: order.currency ?? 'INR',
          name: 'SuperWise',
          description: 'Payment for completed work',
          order_id: order.id,
          handler: (result) => this.ngZone.run(() => this.confirmPayment(workerId, result)),
          modal: { ondismiss: () => this.ngZone.run(() => (this.paying = false)) },
        });
      },
      error: (err: unknown) => {
        this.paying = false;
        showError(err);
      },
    });
  }

  private confirmPayment(workerId: string, result: Parameters<UserService['verifyPayment']>[1]): void {
    this.service.verifyPayment(workerId, result).subscribe({
      next: () => void this.route.navigate(['/successPage', this.id]),
      error: (err: unknown) => {
        this.paying = false;
        showError(err, 'We could not confirm your payment. If money was deducted, please contact support.');
      },
    });
  }

  ratingModal(): void {
    this.openDialog({ mode: 'rating', data: this.id }, '30%');
  }

  message(): void {
    if (this.workerData) this.openDialog({ mode: 'message', data: this.workerData }, '80%');
  }

  viewImages(): void {
    if (this.workerData) this.openDialog({ mode: 'progressImage', data: this.workerData._id }, '60%');
  }

  reportWorker(): void {
    if (this.workerData) this.openDialog({ mode: 'reportWorker', data: this.workerData._id }, '30%');
  }

  private openDialog(data: UserDialogData, width: string): void {
    this.dialog.open<UserDialogComponent, UserDialogData, string>(UserDialogComponent, { width, data });
  }
}
