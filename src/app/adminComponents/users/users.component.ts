import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';

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

  block(data: any) {
    const requestData = { id: data };
    console.log(requestData);
  
    Swal.fire({
      title: 'Confirm Block',
      text: 'Are you sure you want to block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, block it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.blockUser(requestData).subscribe((value) => {
          console.log(value);
          if (value === 'done') {
            this.getUsers();
            Swal.fire('Success', 'User has been blocked!', 'success');
          } else {
            Swal.fire('Error', 'Failed to block user', 'error');
          }
        });
      } else {
        Swal.fire('Canceled', 'The user was not blocked.', 'info');
      }
    });
  }
  
  unBlock(data: any) {
    const requestData = { id: data };
    console.log(requestData);
  
    Swal.fire({
      title: 'Confirm Unblock',
      text: 'Are you sure you want to unblock this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, unblock it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.unBlockUser(requestData).subscribe((value) => {
          console.log(value);
          if (value === 'done') {
            this.getUsers();
            Swal.fire('Success', 'User has been unblocked!', 'success');
          } else {
            Swal.fire('Error', 'Failed to unblock user', 'error');
          }
        });
      } else {
        Swal.fire('Canceled', 'The user was not unblocked.', 'info');
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
