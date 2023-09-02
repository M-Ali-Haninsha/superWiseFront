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
  ratingForm: any
  formData:any
  formData2:any
  selectedRating: number | null = null;

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

      if(this.editData.mode == 'rating') {        
        this.ratingForm = this.formBuilder.group({
          comment: ['', Validators.required]
        })
      }
  }

  updateUserData() {
    this.formData = this.userDetailsForm.value
    console.log(this.formData);
    this.service.editUserDetails(this.formData).subscribe((value)=> {
      this.ref.close('detailsUpdated')
    })
  }

  

  rate(rating: number) {
    this.selectedRating = rating;
  }

  getStarClass(starNumber: number): string {
    if (this.selectedRating !== null && starNumber <= this.selectedRating) {
      return 'w-12 h-12 text-yellow-500 cursor-pointer';
    } else {
      return 'w-12 h-12 text-gray-500 cursor-pointer';
    }
  }

  subnitRating() {
    console.log('submit',this.selectedRating);
    this.formData2 = this.ratingForm.value
    console.log(this.formData2);
    this.service.rating(this.formData2, this.editData.data, this.selectedRating).subscribe((value)=> {
      console.log(value);
      
    })
  }
}
