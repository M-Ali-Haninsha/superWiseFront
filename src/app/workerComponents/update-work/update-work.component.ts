import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from 'src/app/services/worker.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrls: ['./update-work.component.css']
})
export class UpdateWorkComponent implements OnInit{

  id!:string
  progressValue = 0;
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  selectedType: string = 'normal';
  clientData:any

  paymentForm!: FormGroup

  constructor(private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder, private service: WorkerService, private snackBar: MatSnackBar) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''  
    this.paymentForm = this._formBuilder.group({
      selectedType: ['normal'],
      reason: [''], 
      amount: ['', [Validators.required, Validators.min(0)]]
    })
  }
  
  ngOnInit(): void {
      this.viewProgress()
  }

  viewProgress() {
    this.service.showProgress(this.id).subscribe((value) => {
      console.log(value);
      this.progressValue = value.workStatus[0].progressBar;
      this.clientData = value
    })
  }


  updateProgress(stage: number): void {
    if(stage===0) {
      this.progressValue = 0; 
    }else if (stage === 1) {
      this.progressValue = 20; 
      
    } else if (stage === 2) {
      this.progressValue = 50; 
    } else if (stage === 3) {
      this.progressValue = 100; 
    }    
    this.service.updateProgress(this.id, this.progressValue).subscribe((value)=> {
      console.log(value);
      if(value.updated == 'status updated') {
        this.showSnackbar('Progress updated successfully');
      }
    })
  }

  sendAmount() {
    this.service.postAmount(this.id, this.paymentForm.value).subscribe({next:
      (value)=> {
      console.log('done',value);
      this.showSnackbar('amount updated');
    },
    error:(value)=>{
      if(value) {
        console.log(value);
        this.showSnackbar('work not completed');
      }
    } })

  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
