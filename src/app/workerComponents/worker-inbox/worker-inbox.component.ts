import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-worker-inbox',
  templateUrl: './worker-inbox.component.html',
  styleUrls: ['./worker-inbox.component.css']
})
export class WorkerInboxComponent implements OnInit{
  displayedColumns: string[] = ['rowNumber', 'firstName', 'lastName', 'email', 'category','action'];
  dataSource: MatTableDataSource<any>;
  delete: boolean  = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
