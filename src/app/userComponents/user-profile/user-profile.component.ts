import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  data:any
  workerData:any

  constructor(private service: UserService, private dialog: MatDialog, private route: Router) {}

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
      this.getUserDetails()
      this.listWorkers()
  }

  getUserDetails() {
    this.service.fetchUserData().subscribe((value)=> {
      this.data = value.fetchedData
      console.log(this.data);
    })
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0]
    if(selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      this.service.uploadFile(formData).subscribe((value)=>{
        console.log(value);
        this.getUserDetails()
      })
    }
  }

  listWorkers(){
    this.service.listHiredWorkers().subscribe((value)=> {
      console.log('testing',value);
      this.workerData = value.worker
    })
  }  

  editUserDetails() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width:'30%',
      data: {mode: 'userDetails', data: this.data}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'detailsUpdated') {
        this.getUserDetails()
      }
    });
  }

  viewProgress(id:string) {
    this.route.navigate(['workProgress',id])
  }
  
}
