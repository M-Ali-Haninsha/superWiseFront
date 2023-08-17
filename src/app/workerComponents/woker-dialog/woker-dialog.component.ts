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

  workerProfileForm!: FormGroup

  constructor( private formBuilder: FormBuilder,private service: WorkerService ,private ref: MatDialogRef<WokerDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any) {

  }

  ngOnInit(): void {
      this.workerProfileForm = this.formBuilder.group({
        file: ['']
      })
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
      console.log(value);
    })
  }
}
