import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-worker-inbox',
  templateUrl: './worker-inbox.component.html',
  styleUrls: ['./worker-inbox.component.css']
})
export class WorkerInboxComponent implements OnInit{
  displayedColumns: string[] = ['rowNumber', 'email', 'phone', 'details','action'];
  dataSource: MatTableDataSource<any>;
  delete: boolean  = false
  result:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service: WorkerService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      this.getRequests()
  }

  getRequests() {
    this.service.fetchRequests().subscribe((value)=>{
      if(value.requests){
        console.log('done');
        console.log(value.requests);
        this.result = value.requests
        this.dataSource = new MatTableDataSource(value.requests)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      }

      if(value.error) {
        console.log('err');
        
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
