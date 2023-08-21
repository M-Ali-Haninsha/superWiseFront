import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-woker-dialog',
  templateUrl: './woker-dialog.component.html',
  styleUrls: ['./woker-dialog.component.css']
})
export class WokerDialogComponent implements OnInit{

  hide = true;
  formData2:any
  workerProfileForm!: FormGroup
  workerDetailsForm!: FormGroup

  constructor( private formBuilder: FormBuilder,private service: WorkerService ,private ref: MatDialogRef<WokerDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any) {

  }

  ngOnInit(): void {
      this.workerProfileForm = this.formBuilder.group({
        file: ['']
      })
      if (this.editData.mode === 'details') {
        console.log(this.editData);
      }

      if (this.editData.mode === 'details') {
        this.workerDetailsForm = this.formBuilder.group({
          firstName: [this.editData.workerData.firstName],
          lastName: [this.editData.workerData.lastName],
          department: [this.editData.workerData.department.name],
          phoneNo: [this.editData.workerData.phoneNo],
          location: [this.editData.workerData.district]
        });
      }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];    
    this.workerProfileForm.get('file')?.setValue(file);
  }

  updatePhoto(){
    const fileC = this.workerProfileForm.get('file')
    const formData = new FormData();
    formData.append('file', fileC?.value);
    this.service.editPhoto(formData).subscribe((value)=>{
      this.ref.close('photoUpdated')
    })
  }

  updateDetails() {
    this.formData2 = this.workerDetailsForm.value
    console.log(this.formData2);
    this.service.editDetails(this.formData2).subscribe((value)=>{
      console.log(value); 
      this.ref.close('detailsUpdated')
    })
  }
}
