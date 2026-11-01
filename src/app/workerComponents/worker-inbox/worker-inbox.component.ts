import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { showError } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { WorkRequest } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';
import { WokerDialogComponent, WorkerDialogData } from '../woker-dialog/woker-dialog.component';

@Component({
  selector: 'app-worker-inbox',
  templateUrl: './worker-inbox.component.html',
  styleUrls: ['./worker-inbox.component.css'],
  standalone: false,
})
export class WorkerInboxComponent implements OnInit {
  private service = inject(WorkerService);
  private dialog = inject(MatDialog);

  displayedColumns = ['rowNumber', 'email', 'phone', 'details', 'expected date', 'action'];
  dataSource = new MatTableDataSource<WorkRequest>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    this.service.fetchRequests().subscribe({
      next: ({ requests }) => {
        this.dataSource = createTableSource(
          requests,
          (r) => [r.userInfo?.firstName, r.userInfo?.lastName, r.userInfo?.email, r.userInfo?.phone, r.requirement],
          this.paginator,
          this.sort,
        );
      },
      error: (err: unknown) => showError(err),
    });
  }

  acceptWork(id: string): void {
    this.service.requestAccept(id).subscribe({
      next: () => this.getRequests(),
      error: (err: unknown) => showError(err),
    });
  }

  rejectWork(id: string): void {
    this.service.requestReject(id).subscribe({
      next: () => this.getRequests(),
      error: (err: unknown) => showError(err),
    });
  }

  showDetails(request: WorkRequest): void {
    this.dialog.open<WokerDialogComponent, WorkerDialogData>(WokerDialogComponent, {
      width: '30%',
      data: { mode: 'userRequirements', requirement: request },
    });
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
