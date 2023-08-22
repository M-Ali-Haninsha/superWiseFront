import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit{

  userDetailsForm:any
  formData:any

  constructor(private formBuilder: FormBuilder,private ref: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData:any, private service: UserService) {}

  ngOnInit(): void {
     if (this.editData.mode === 'userDetails') {
        this.userDetailsForm = this.formBuilder.group({
          firstName: [this.editData.data.firstName],
          lastName: [this.editData.data.lastName],
          phoneNo: [this.editData.data.phone],
          location: [this.editData.data.location]
        });
      }
  }

  updateUserData() {
    this.formData = this.userDetailsForm.value
    console.log(this.formData);
    this.service.editUserDetails(this.formData).subscribe((value)=> {
      console.log(value);
      this.ref.close('detailsUpdated')
    })
  }
}
