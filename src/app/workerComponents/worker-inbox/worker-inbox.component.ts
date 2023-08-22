import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerService } from 'src/app/services/worker.service';
import { WokerDialogComponent } from '../woker-dialog/woker-dialog.component'
import { MatDialog } from '@angular/material/dialog';

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


  constructor(private service: WorkerService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<any>;
  }

  ngOnInit(): void {
      this.getRequests()
  }

  getRequests() {
    this.service.fetchRequests().subscribe((value)=>{
      if(value.requests){
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

  acceptWork(id:any) {    
    const requestData = { id: id };
    this.service.requestAccept(requestData).subscribe((value)=> {
      console.log(value);
      this.getRequests()
    })
  }

  rejectWork(id:any) {    
    const requestData = { id: id };
    this.service.requestReject(requestData).subscribe((value)=> {
      console.log(value);
      this.getRequests()
    })
  }

  showDetails(data:any) {
    const dialogRef = this.dialog.open(WokerDialogComponent, {
      width:'30%',
      data: {
        mode: 'userRequirements',
        requirement: data
      }
    })

    dialogRef.afterClosed().subscribe(result => {

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
