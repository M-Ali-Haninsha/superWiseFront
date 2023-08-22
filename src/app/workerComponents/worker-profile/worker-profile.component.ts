import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WorkerService } from 'src/app/services/worker.service';
import { WokerDialogComponent } from '../woker-dialog/woker-dialog.component'

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css']
})
export class WorkerProfileComponent implements OnInit{

  workerData: any

  constructor(private service: WorkerService, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.getWorkerDetails()
  }

  getWorkerDetails() {
    this.service.fetchWorkerData().subscribe((value)=>{      
      this.workerData = value.data                  
    })
  }
  editButton(){
    const dialogRef = this.dialog.open(WokerDialogComponent, {
      width:'30%',
      data: {mode: 'photo'}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'photoUpdated'){
        this.getWorkerDetails()
      }
    });
  }

  editDetails(){
    const dialogRef = this.dialog.open(WokerDialogComponent, {
      width:'20%',
      data: {
        mode: 'details',
        workerData: this.workerData 
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'detailsUpdated') {
        this.getWorkerDetails()
      }
    });
  }

  editDescription() {
    const dialogRef = this.dialog.open(WokerDialogComponent, {
      width:'30%',
      data: {
        mode: 'description',
        workerData: this.workerData 
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'descriptionUpdated') {
        this.getWorkerDetails()
      }
    });
  }
}
