import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { showError, showSuccess } from 'src/app/core/notify';
import { ChatMessage, Client, ProgressImage, Worker, WorkStatus } from 'src/app/models/api.models';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

export type UserDialogData =
  | { mode: 'userDetails'; data: Client }
  | { mode: 'rating'; data: string }
  | { mode: 'message'; data: Worker }
  | { mode: 'progressImage'; data: string }
  | { mode: 'reportWorker'; data: string }
  | { mode: 'userViewHistory' };

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
  standalone: false,
})
export class UserDialogComponent implements OnInit {
  private service = inject(UserService);
  private chatService = inject(ChatService);
  private ref = inject<MatDialogRef<UserDialogComponent, string>>(MatDialogRef);
  private route = inject(Router);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder).nonNullable;
  editData = inject<UserDialogData>(MAT_DIALOG_DATA);

  // Every form exists up front: the template binds some of them outside the
  // mode checks, and a missing FormGroup throws NG01052.
  userDetailsForm = this.fb.group({ firstName: '', lastName: '', phoneNo: '', location: '' });
  ratingForm = this.fb.group({ comment: ['', Validators.required] });
  messageForm = this.fb.group({ typedMessage: '' });
  reportForm = this.fb.group({ reason: ['', Validators.required] });

  selectedRating: number | null = null;
  progressImages: ProgressImage[] = [];
  mClientData?: Client;
  mWorkerData?: Worker;
  sendedMessageByClient: ChatMessage[] = [];
  historyWorkStatus: WorkStatus<Worker>[] = [];

  ngOnInit(): void {
    const data = this.editData;
    switch (data.mode) {
      case 'userDetails':
        this.userDetailsForm.setValue({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          phoneNo: String(data.data.phone ?? ''),
          location: data.data.location ?? '',
        });
        break;
      case 'message':
        this.startChat(data.data._id);
        break;
      case 'progressImage':
        this.service.getprogressPhotos(data.data).subscribe({
          next: ({ progressImages }) => (this.progressImages = progressImages),
          error: (err: unknown) => showError(err),
        });
        break;
      case 'userViewHistory':
        this.service.userViewHistory().subscribe({
          next: ({ user }) => (this.historyWorkStatus = user.workStatus),
          error: (err: unknown) => showError(err),
        });
        break;
    }
  }

  private startChat(workerId: string): void {
    this.chatService.connect('user');
    this.chatService
      .conversation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((messages) => (this.sendedMessageByClient = messages));
    this.service.clientDetails().subscribe({
      next: ({ clientDataMessage }) => (this.mClientData = clientDataMessage),
      error: (err: unknown) => showError(err),
    });
    this.service.workerDetails(workerId).subscribe({
      next: ({ workerDataMessage }) => (this.mWorkerData = workerDataMessage),
      error: (err: unknown) => showError(err),
    });
  }

  updateUserData(): void {
    this.service.editUserDetails(this.userDetailsForm.getRawValue()).subscribe({
      next: () => this.ref.close('detailsUpdated'),
      error: (err: unknown) => showError(err),
    });
  }

  rate(rating: number): void {
    this.selectedRating = rating;
  }

  getStarClass(starNumber: number): string {
    const selected = this.selectedRating !== null && starNumber <= this.selectedRating;
    return `w-12 h-12 cursor-pointer ${selected ? 'text-yellow-500' : 'text-gray-500'}`;
  }

  subnitRating(): void {
    if (this.editData.mode !== 'rating' || this.selectedRating === null) return;
    const { comment } = this.ratingForm.getRawValue();
    this.service.rating(comment, this.editData.data, this.selectedRating).subscribe({
      next: () => this.ref.close('ratingSubmitted'),
      error: (err: unknown) => showError(err),
    });
  }

  selectWorker(worker?: Worker): void {
    if (!worker) return;
    this.chatService.openConversation(worker._id).subscribe({ error: (err: unknown) => showError(err) });
  }

  sendMessageToWorker(): void {
    const content = this.messageForm.getRawValue().typedMessage.trim();
    if (!content || !this.mClientData || !this.mWorkerData) return;
    this.chatService
      .sendMessage({ sender: this.mClientData.firstName, recieverId: this.mWorkerData._id, content })
      .subscribe({ error: (err: unknown) => showError(err) });
    this.messageForm.reset();
  }

  viewMoreHistory(workerId: string): void {
    this.ref.close();
    void this.route.navigate(['singleViewHistory', workerId]);
  }

  reportWorkerPost(): void {
    if (this.editData.mode !== 'reportWorker' || this.reportForm.invalid) return;
    this.service.reportWorkerCall(this.editData.data, this.reportForm.getRawValue().reason).subscribe({
      next: () => {
        this.ref.close('reported');
        void showSuccess('Report sent', 'Thank you, an admin will review it.');
      },
      error: (err: unknown) => showError(err),
    });
  }
}
