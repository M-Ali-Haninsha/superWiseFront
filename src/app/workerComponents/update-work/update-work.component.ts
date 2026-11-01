import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { errorMessage } from 'src/app/core/http';
import { ClientForWorker } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';
import { WokerDialogComponent, WorkerDialogData } from '../woker-dialog/woker-dialog.component';

const PROGRESS_BY_STAGE = [0, 20, 50, 100];

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css'],
  standalone: false,
})
export class UpdateWorkComponent implements OnInit {
  private service = inject(WorkerService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  progressValue = 0;
  selectedType = 'normal';
  clientData?: ClientForWorker;
  firstFormGroup = this.fb.group({ firstCtrl: [''] });
  secondFormGroup = this.fb.group({ secondCtrl: [''] });
  paymentForm = this.fb.nonNullable.group({
    selectedType: ['normal'],
    reason: [''],
    amount: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.service.showProgress(this.id).subscribe({
      next: ({ data, newData }) => {
        this.progressValue = newData ?? 0;
        this.clientData = data;
      },
      error: (err: unknown) => this.showSnackbar(errorMessage(err)),
    });
  }

  updateProgress(stage: number): void {
    this.progressValue = PROGRESS_BY_STAGE[stage] ?? this.progressValue;
    this.service.updateProgress(this.id, this.progressValue).subscribe({
      next: () => this.showSnackbar('Progress updated successfully'),
      error: (err: unknown) => this.showSnackbar(errorMessage(err)),
    });
  }

  sendAmount(): void {
    if (this.paymentForm.invalid) {
      this.showSnackbar('Please enter an amount greater than 0');
      return;
    }
    const { selectedType, reason, amount } = this.paymentForm.getRawValue();
    this.service.postAmount(this.id, { selectedType, type: reason, amount: Number(amount) }).subscribe({
      next: () => this.showSnackbar('Amount sent to the client'),
      error: (err: unknown) => this.showSnackbar(errorMessage(err)),
    });
  }

  handleFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!files?.length) return;
    const formData = new FormData();
    for (const file of Array.from(files)) formData.append('files', file);
    this.service.pushImage(this.id, formData).subscribe({
      next: () => this.showSnackbar('Images uploaded'),
      error: (err: unknown) => this.showSnackbar(errorMessage(err)),
    });
  }

  sendMessage(): void {
    if (!this.clientData) return;
    this.dialog.open<WokerDialogComponent, WorkerDialogData>(WokerDialogComponent, {
      width: '80%',
      data: { mode: 'sendMessageByWorker', data: this.clientData },
    });
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
