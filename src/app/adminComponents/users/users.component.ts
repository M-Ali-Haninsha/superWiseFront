import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['rowNumber', 'firstName', 'lastName', 'email','action'];
  dataSource: MatTableDataSource<any>;
  delete: boolean  = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AdminServiceService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      this.getUsers()
  }

  getUsers() {
    this.service.fetchUser().subscribe((value)=>{
      this.dataSource = new MatTableDataSource(value.user)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      
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
