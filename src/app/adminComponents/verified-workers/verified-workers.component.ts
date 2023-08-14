import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import  { workerData }  from '../../model/workeModel'
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verified-workers',
  templateUrl: './verified-workers.component.html',
  styleUrls: ['./verified-workers.component.css']
})
export class VerifiedWorkersComponent implements OnInit{
  displayedColumns: string[] = ['rowNumber', 'firstName', 'lastName', 'email', 'category','action'];
  dataSource: MatTableDataSource<workerData>;
  delete: boolean  = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: AdminServiceService, private route: Router) {
    this.dataSource = new MatTableDataSource<workerData>;
  }

  ngOnInit(): void {
      this.getWorker()
  }

  getWorker() {
    this.service.getVerifiedWorkers().subscribe((value)=>{          
      this.dataSource = new MatTableDataSource(value.workers)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  block(data:any) {
    const requestData = { id: data };
    console.log(requestData);
    this.service.blockWorker(requestData).subscribe((value)=>{
      console.log(value);
      if(value == 'done'){
        this.getWorker()
      }
    })
  }

  unBlock(data:any) {
    const requestData = { id: data };
    console.log(requestData);
    this.service.unBlockWorker(requestData).subscribe((value)=>{
      console.log(value);
      if(value == 'done'){
        this.getWorker()
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
