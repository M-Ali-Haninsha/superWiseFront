import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.css']
})
export class AdminDialogComponent implements OnInit {

  tittle = 'add category'
  buttonName = 'add'
  categoryForm!: FormGroup
  constructor( private formBuilder: FormBuilder, private service: AdminServiceService, private ref: MatDialogRef<AdminDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any) {}

  ngOnInit(): void {
      this.categoryForm = this.formBuilder.group({
        categoryName: ['', Validators.required],
        file: [''],
        description: ['', Validators.required]
      })

      if(this.editData) {
        this.tittle = 'edit category'
        this.buttonName = 'update'
        this.categoryForm.controls['categoryName'].setValue(this.editData.name)
        this.categoryForm.controls['description'].setValue(this.editData.description)
      }      
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];    
    this.categoryForm.get('file')?.setValue(file);
  }

  addCategory() {
    if(!this.editData){
    const fileC = this.categoryForm.get('file')
    const formData = new FormData();
    formData.append('categoryName', this.categoryForm.value.categoryName)
    formData.append('file', fileC?.value);
    formData.append('description', this.categoryForm.value.description)
    this.service.addCategory(formData).subscribe((value) => {
      this.ref.close('add')
    } )
    }else {
      this.updateCategory()
    }
  }

  updateCategory() {
    const fileC = this.categoryForm.get('file')
    const formData = new FormData();
    formData.append('categoryName', this.categoryForm.value.categoryName)
    formData.append('file', fileC?.value);
    formData.append('description', this.categoryForm.value.description)
    this.service.editCategory(formData, this.editData._id).subscribe((value)=>{
      this.ref.close('edit')
    })
  }

  
}
