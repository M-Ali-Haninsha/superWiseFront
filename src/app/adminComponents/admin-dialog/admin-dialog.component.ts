import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  categoryForm!: FormGroup
  constructor( private formBuilder: FormBuilder, private service: AdminServiceService, private ref: MatDialogRef<AdminDialogComponent>) {}

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        categoryName: ['', Validators.required],
        file: ['', Validators.required],
        description: ['', Validators.required]
      })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];    
    this.categoryForm.get('file')?.setValue(file);
  }

  addCategory() {
    const fileC = this.categoryForm.get('file')
    const formData = new FormData();
    formData.append('categoryName', this.categoryForm.value.categoryName)
    formData.append('file', fileC?.value);
    formData.append('description', this.categoryForm.value.description)
    this.service.addCategory(formData).subscribe((value) => {
      this.ref.close('add')
    } )
  }

  
}
