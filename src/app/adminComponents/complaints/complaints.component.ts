import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { Complaint } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  standalone: false,
})
export class ComplaintsComponent implements OnInit {
  private service = inject(AdminServiceService);
  private route = inject(Router);

  displayedColumns = ['rowNumber', 'firstName', 'lastName', 'email', 'phoneNo', 'reportedWorker'];
  dataSource = new MatTableDataSource<Complaint>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.service.getComplaints().subscribe({
      next: ({ complaints }) => {
        this.dataSource = createTableSource(
          complaints,
          (c) => [c.clientId?.firstName, c.clientId?.lastName, c.clientId?.email, c.workerId?.firstName, c.issue],
          this.paginator,
          this.sort,
        );
      },
      error: (err: unknown) => showError(err),
    });
  }

  showDetails(worker: Complaint['workerId'], client: Complaint['clientId']): void {
    void this.route.navigate(['/adminHome/viewComplaint', worker._id, client._id]);
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
