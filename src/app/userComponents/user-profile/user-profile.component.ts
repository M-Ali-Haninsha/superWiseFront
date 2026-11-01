import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { Client, HiredWorker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent, UserDialogData } from '../user-dialog/user-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  private service = inject(UserService);
  private dialog = inject(MatDialog);
  private route = inject(Router);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  data?: Client;
  workerData: HiredWorker[] = [];

  ngOnInit(): void {
    this.getUserDetails();
    this.service.listHiredWorkers().subscribe({
      next: ({ worker }) => (this.workerData = worker),
      error: (err: unknown) => showError(err),
    });
  }

  getUserDetails(): void {
    this.service.fetchUserData().subscribe({
      next: ({ fetchedData }) => (this.data = fetchedData),
      error: (err: unknown) => showError(err),
    });
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    this.service.uploadFile(formData).subscribe({
      next: () => this.getUserDetails(),
      error: (err: unknown) => showError(err),
    });
  }

  editUserDetails(): void {
    if (!this.data) return;
    this.openDialog({ mode: 'userDetails', data: this.data }, '30%').subscribe((result) => {
      if (result === 'detailsUpdated') this.getUserDetails();
    });
  }

  viewProgress(id: string): void {
    void this.route.navigate(['workProgress', id]);
  }

  viewHistory(): void {
    this.openDialog({ mode: 'userViewHistory' }, '30%');
  }

  private openDialog(data: UserDialogData, width: string) {
    return this.dialog.open<UserDialogComponent, UserDialogData, string>(UserDialogComponent, { width, data }).afterClosed();
  }
}
