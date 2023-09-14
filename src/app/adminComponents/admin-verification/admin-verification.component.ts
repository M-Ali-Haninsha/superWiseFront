import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { workerData } from '../../model/workeModel';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-verification',
  templateUrl: './admin-verification.component.html',
  styleUrls: ['./admin-verification.component.css'],
})
export class AdminVerificationComponent implements OnInit {
  displayedColumns: string[] = [
    'rowNumber',
    'firstName',
    'lastName',
    'email',
    'category',
    'file',
    'action',
  ];
  dataSource: MatTableDataSource<workerData>;
  delete: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AdminServiceService, private route: Router) {
    if (!sessionStorage.getItem('adminValue')) {
      this.route.navigate(['/admin']);
    }
    this.dataSource = new MatTableDataSource<workerData>();
  }

  ngOnInit() {
    this.getWorker();
  }

  getWorker() {
    this.service.getWorkers().subscribe((value) => {
      console.log('test',value);
      
      this.dataSource = new MatTableDataSource(value.workers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  proof(proof: string) {
    this.service
      .viewProof(proof, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        saveAs(response, proof);
      });
  }

  accept(data: any) {
    const requestData = { email: data };
    console.log(requestData);

    this.service.acceptWorker(requestData).subscribe((value) => {
      console.log(value);
      if (value == 'done') {
        this.getWorker();
      }
    });
  }

  reject(data: any) {
    const requestData = { email: data };
    console.log(requestData);

    this.service.rejectWorker(requestData).subscribe((value) => {
      console.log(value);
      if (value == 'done') {
        this.getWorker();
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
