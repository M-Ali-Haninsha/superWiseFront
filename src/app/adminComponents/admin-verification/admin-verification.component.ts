import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { showError } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { AdminWorker } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AdminWorkersActions } from 'src/app/state/admin-workers/admin-workers.actions';
import { selectUnverified } from 'src/app/state/admin-workers/admin-workers.reducer';

@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css'],
  standalone: false,
})
export class AdminVerificationComponent implements OnInit {
  private service = inject(AdminServiceService);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  displayedColumns = ['rowNumber', 'firstName', 'lastName', 'email', 'category', 'file', 'action'];
  dataSource = new MatTableDataSource<AdminWorker>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.store
      .select(selectUnverified)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((workers) => {
        this.dataSource = createTableSource(
          workers,
          (w) => [w.firstName, w.lastName, w.email, w.department],
          this.paginator,
          this.sort,
        );
      });
    this.store.dispatch(AdminWorkersActions.loadUnverified());
  }

  /** Opens the worker's private ID proof through a short-lived signed link. */
  proof(workerId: string): void {
    this.service.viewProof(workerId).subscribe({
      next: ({ url }) => window.open(url, '_blank', 'noopener'),
      error: (err: unknown) => showError(err),
    });
  }

  accept(email: string): void {
    this.service.acceptWorker(email).subscribe({
      next: () => this.store.dispatch(AdminWorkersActions.loadUnverified()),
      error: (err: unknown) => showError(err),
    });
  }

  reject(email: string): void {
    this.service.rejectWorker(email).subscribe({
      next: () => this.store.dispatch(AdminWorkersActions.loadUnverified()),
      error: (err: unknown) => showError(err),
    });
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
