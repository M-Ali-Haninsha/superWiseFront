import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-accepted-works',
  templateUrl: './accepted-works.component.html',
  styleUrls: ['./accepted-works.component.css']
})
export class AcceptedWorksComponent implements OnInit{
  displayedColumns: string[] = ['rowNumber','firstName', 'email', 'phone', 'details'];
  dataSource: MatTableDataSource<any>;

  result:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: WorkerService, private route: Router) {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      this.showWorks()
  }

  showWorks() {
    this.service.fetchAcceptedWorks().subscribe((value)=> {
      console.log(value);
      this.result = value.accepted
      this.dataSource = new MatTableDataSource(value.accepted)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    })
  }

  viewWorkStatus(id:string) {    
    this.route.navigate(['/workerHome/updateWorks',id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
