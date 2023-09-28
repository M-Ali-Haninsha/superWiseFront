import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-worker',
  templateUrl: './view-worker.component.html',
  styleUrls: ['./view-worker.component.css']
})
export class ViewWorkerComponent implements OnInit{

  workerBookedDates: Date[] = [];
  workerData:any
  id:string
  hireForm!: FormGroup
  rating:any
  selectedPhoto: File | undefined;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }



  constructor(private activateRoute: ActivatedRoute, private service: UserService, private formBuilder: FormBuilder, private route: Router, private snackBar: MatSnackBar) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''            
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.viewRating()
      this.hireForm = this.formBuilder.group({
        description:['', Validators.required],
        date:['', Validators.required],
        file: ['']
      })
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      this.workerData = value.data
    })
  }
  onPhotoSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedPhoto = event.target.files[0];
    }
  }

  hire(id:string) {
    if(sessionStorage.getItem('userValue')) {
if(this.hireForm.valid ) {
    let formData = new FormData()
    if (this.selectedPhoto) {
      formData.append('file', this.selectedPhoto);
    }

    formData.append('description', this.hireForm.get('description')?.value);
    formData.append('date', this.hireForm.get('date')?.value)

    this.service.workerHire(formData, id).subscribe((value)=>{
      if(value.error){
        this.showSnackbar('request already sended');
      }
      if(value.done) {
        this.showSnackbar('Request sended successfully');
      }
    })
    }
    } else {
      alert('plz login')
      this.route.navigate(['/userLogin'])
    }
  }

  viewRating() {
    this.service.showRating(this.id).subscribe((value)=> {
      this.rating = value.rating
    })
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    
    return !this.workerBookedDates.some(bookedDate =>
      new Date(bookedDate).toDateString() === date.toDateString()
    );
  };

  getDates() {
    this.service.bookedDates(this.id).subscribe((value)=> {
      console.log(value);
    })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

