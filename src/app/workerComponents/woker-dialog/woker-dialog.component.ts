import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { showError } from 'src/app/core/notify';
import { ChatMessage, ClientForWorker, WorkerSelf, WorkRequest } from 'src/app/models/api.models';
import { ChatService } from 'src/app/services/chat.service';
import { WorkerService } from 'src/app/services/worker.service';

export type WorkerDialogData =
  | { mode: 'photo' }
  | { mode: 'details'; workerData: WorkerSelf }
  | { mode: 'description'; workerData: WorkerSelf }
  | { mode: 'userRequirements'; requirement: WorkRequest }
  | { mode: 'sendMessageByWorker'; data: ClientForWorker };

@Component({
  selector: 'app-woker-dialog',
  templateUrl: './woker-dialog.component.html',
  styleUrls: ['./woker-dialog.component.css'],
  standalone: false,
})
export class WokerDialogComponent implements OnInit {
  private service = inject(WorkerService);
  private chatService = inject(ChatService);
  private ref = inject<MatDialogRef<WokerDialogComponent, string>>(MatDialogRef);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder).nonNullable;
  editData = inject<WorkerDialogData>(MAT_DIALOG_DATA);

  hide = true;
  private photo: File | null = null;
  workerProfileForm = this.fb.group({ file: '' });
  workerDetailsForm = this.fb.group({ firstName: '', lastName: '', department: '', phoneNo: '', location: '' });
  workerDescriptionForm = this.fb.group({ description: '' });
  workerMessageForm = this.fb.group({ typedMessage: '' });

  details?: { requirement: WorkRequest };
  mWorkerData?: WorkerSelf;
  mClientData?: ClientForWorker;
  sendedMessageByWorker: ChatMessage[] = [];

  ngOnInit(): void {
    const data = this.editData;
    switch (data.mode) {
      case 'details':
        this.workerDetailsForm.setValue({
          firstName: data.workerData.firstName,
          lastName: data.workerData.lastName,
          department: data.workerData.department?.name ?? '',
          phoneNo: String(data.workerData.phoneNo),
          location: data.workerData.district,
        });
        break;
      case 'description':
        this.workerDescriptionForm.setValue({ description: data.workerData.description ?? '' });
        break;
      case 'userRequirements':
        this.details = { requirement: data.requirement };
        break;
      case 'sendMessageByWorker':
        this.mClientData = data.data;
        this.startChat();
        break;
    }
  }

  private startChat(): void {
    this.chatService.connect('worker');
    this.chatService
      .conversation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((messages) => (this.sendedMessageByWorker = messages));
    this.service.fetchWorkerData().subscribe({
      next: ({ data }) => (this.mWorkerData = data),
      error: (err: unknown) => showError(err),
    });
  }

  onFileSelected(event: Event): void {
    this.photo = (event.target as HTMLInputElement).files?.[0] ?? null;
  }

  updatePhoto(): void {
    if (!this.photo) return;
    const formData = new FormData();
    formData.append('file', this.photo);
    this.service.editPhoto(formData).subscribe({
      next: () => this.ref.close('photoUpdated'),
      error: (err: unknown) => showError(err),
    });
  }

  updateDetails(): void {
    this.service.editDetails(this.workerDetailsForm.getRawValue()).subscribe({
      next: () => this.ref.close('detailsUpdated'),
      error: (err: unknown) => showError(err),
    });
  }

  editDescription(): void {
    this.service.editDescription(this.workerDescriptionForm.getRawValue().description).subscribe({
      next: () => this.ref.close('descriptionUpdated'),
      error: (err: unknown) => showError(err),
    });
  }

  selectClient(client?: ClientForWorker): void {
    if (!client) return;
    this.chatService.openConversation(client._id).subscribe({ error: (err: unknown) => showError(err) });
  }

  sendMessageToClient(): void {
    const content = this.workerMessageForm.getRawValue().typedMessage.trim();
    if (!content || !this.mWorkerData || !this.mClientData) return;
    this.chatService
      .sendMessage({ sender: this.mWorkerData.firstName, recieverId: this.mClientData._id, content })
      .subscribe({ error: (err: unknown) => showError(err) });
    this.workerMessageForm.reset();
  }
}
