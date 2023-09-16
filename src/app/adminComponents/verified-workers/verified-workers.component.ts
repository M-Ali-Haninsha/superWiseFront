import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { workerData } from '../../model/workeModel';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verified-workers',
  templateUrl: './verified-workers.component.html',
  styleUrls: ['./verified-workers.component.css'],
})
export class VerifiedWorkersComponent implements OnInit {
  displayedColumns: string[] = [
    'rowNumber',
    'firstName',
    'lastName',
    'email',
    'category',
    'action',
  ];
  dataSource: MatTableDataSource<workerData>;
  delete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AdminServiceService, private route: Router) {
    this.dataSource = new MatTableDataSource<workerData>();
  }

  ngOnInit(): void {
    this.getWorker();
  }

  getWorker() {
    this.service.getVerifiedWorkers().subscribe((value) => {
      console.log(value);

      this.dataSource = new MatTableDataSource(value.workers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  block(data: any) {
    const requestData = { id: data };
    console.log(requestData);

    Swal.fire({
      title: 'Confirm Block',
      text: 'Are you sure you want to block this worker?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, block it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.blockWorker(requestData).subscribe((value) => {
          console.log(value);
          if (value === 'done') {
            this.getWorker();
            Swal.fire('Success', 'Worker has been blocked!', 'success');
          } else {
            Swal.fire('Error', 'Failed to block worker', 'error');
          }
        });
      } else {
        Swal.fire('Canceled', 'The worker was not blocked.', 'info');
      }
    });
  }

  unBlock(data: any) {
    const requestData = { id: data };
    console.log(requestData);

    Swal.fire({
      title: 'Confirm Unblock',
      text: 'Are you sure you want to unblock this worker?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unblock it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.unBlockWorker(requestData).subscribe((value) => {
          console.log(value);
          if (value === 'done') {
            this.getWorker();
            Swal.fire('Success', 'Worker has been unblocked!', 'success');
          } else {
            Swal.fire('Error', 'Failed to unblock worker', 'error');
          }
        });
      } else {
        Swal.fire('Canceled', 'The worker was not unblocked.', 'info');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
