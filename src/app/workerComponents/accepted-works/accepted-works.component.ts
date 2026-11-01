import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { WorkRequest } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-accepted-works',
  templateUrl: './accepted-works.component.html',
  styleUrls: ['./accepted-works.component.css'],
  standalone: false,
})
export class AcceptedWorksComponent implements OnInit {
  private service = inject(WorkerService);
  private route = inject(Router);

  displayedColumns = ['rowNumber', 'firstName', 'email', 'phone', 'details'];
  dataSource = new MatTableDataSource<WorkRequest>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.service.fetchAcceptedWorks().subscribe({
      next: ({ accepted }) => {
        this.dataSource = createTableSource(
          accepted,
          (r) => [r.userInfo?.firstName, r.userInfo?.lastName, r.userInfo?.email, r.userInfo?.phone],
          this.paginator,
          this.sort,
        );
      },
      error: (err: unknown) => showError(err),
    });
  }

  viewWorkStatus(clientId: string): void {
    void this.route.navigate(['/workerHome/updateWorks', clientId]);
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
