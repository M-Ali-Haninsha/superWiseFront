import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { showError } from 'src/app/core/notify';
import { WorkerSelf } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';
import { WokerDialogComponent, WorkerDialogData } from '../woker-dialog/woker-dialog.component';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css'],
  standalone: false,
})
export class WorkerProfileComponent implements OnInit {
  private service = inject(WorkerService);
  private dialog = inject(MatDialog);

  workerData?: WorkerSelf;

  ngOnInit(): void {
    this.getWorkerDetails();
  }

  getWorkerDetails(): void {
    // An expired session is handled (and redirected) by the interceptor.
    this.service.fetchWorkerData().subscribe({
      next: ({ data }) => (this.workerData = data),
      error: (err: unknown) => showError(err),
    });
  }

  editButton(): void {
    this.openDialog({ mode: 'photo' }, '30%', 'photoUpdated');
  }

  editDetails(): void {
    if (this.workerData) this.openDialog({ mode: 'details', workerData: this.workerData }, '20%', 'detailsUpdated');
  }

  editDescription(): void {
    if (this.workerData) {
      this.openDialog({ mode: 'description', workerData: this.workerData }, '30%', 'descriptionUpdated');
    }
  }

  private openDialog(data: WorkerDialogData, width: string, refreshOn: string): void {
    this.dialog
      .open<WokerDialogComponent, WorkerDialogData, string>(WokerDialogComponent, { width, data })
      .afterClosed()
      .subscribe((result) => {
        if (result === refreshOn) this.getWorkerDetails();
      });
  }
}
