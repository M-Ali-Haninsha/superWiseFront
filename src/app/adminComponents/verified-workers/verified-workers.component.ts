import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { confirmAction, showError, showSuccess } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { AdminWorker } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AdminWorkersActions } from 'src/app/state/admin-workers/admin-workers.actions';
import { selectVerified } from 'src/app/state/admin-workers/admin-workers.reducer';

@Component({
  selector: 'app-verified-workers',
  templateUrl: './verified-workers.component.html',
  styleUrls: ['./verified-workers.component.css'],
  standalone: false,
})
export class VerifiedWorkersComponent implements OnInit {
  private service = inject(AdminServiceService);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  displayedColumns = ['rowNumber', 'firstName', 'lastName', 'email', 'category', 'action'];
  dataSource = new MatTableDataSource<AdminWorker>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.store
      .select(selectVerified)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((workers) => {
        this.dataSource = createTableSource(
          workers,
          (w) => [w.firstName, w.lastName, w.email, w.department],
          this.paginator,
          this.sort,
        );
      });
    this.store.dispatch(AdminWorkersActions.loadVerified());
  }

  block(id: string): void {
    void this.changeBlock(this.service.blockWorker(id), 'block');
  }

  unBlock(id: string): void {
    void this.changeBlock(this.service.unBlockWorker(id), 'unblock');
  }

  private async changeBlock(request: Observable<unknown>, verb: 'block' | 'unblock'): Promise<void> {
    const confirmed = await confirmAction(
      `Confirm ${verb}`,
      `Are you sure you want to ${verb} this worker?`,
      `Yes, ${verb} it!`,
    );
    if (!confirmed) return;
    request.subscribe({
      next: () => {
        this.store.dispatch(AdminWorkersActions.loadVerified());
        void showSuccess('Success', `Worker has been ${verb}ed.`);
      },
      error: (err: unknown) => showError(err),
    });
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
