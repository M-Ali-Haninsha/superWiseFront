import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
})
export class ComplaintsComponent implements OnInit {

  displayedColumns: string[] = [
    'rowNumber',
    'firstName',
    'lastName',
    'email',
    'phoneNo',
    'reportedWorker',
  ];
  dataSource: MatTableDataSource<any>;
  delete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AdminServiceService, private route: Router) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.complaints();
  }

  complaints() {
    this.service.getComplaints().subscribe((value) => {
      if (value) {
        this.dataSource = new MatTableDataSource(value.complaints);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  showDetails(worker:any, client:any) {    
    this.route.navigate(['/adminHome/viewComplaint',worker._id, client._id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
