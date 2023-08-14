import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import {MatDialog} from '@angular/material/dialog';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {
  displayedColumns: string[] = ['rowNumber', 'name', 'image','description', 'action'];
  dataSource: MatTableDataSource<any>;
  delete: boolean  = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: AdminServiceService) {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      this.getCategory()
  }

  openDialog(){
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      width:'22%'
    })

    dialogRef.afterClosed().subscribe(result => {
        this.getCategory()
    });
  }

  getCategory() {
    this.service.fetchCategory().subscribe((value) => {
      console.log(value);
      this.dataSource = new MatTableDataSource(value.recievedCat)
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
