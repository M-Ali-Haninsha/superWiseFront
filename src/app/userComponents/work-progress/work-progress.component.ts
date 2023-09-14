import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var Razorpay: any;

@Component({
  selector: 'app-work-progress',
  templateUrl: './work-progress.component.html',
  styleUrls: ['./work-progress.component.css']
})
export class WorkProgressComponent implements OnInit{

  workerData:any
  id:any
  progressBar: number = 0;
  Amount: number = 0
  active: boolean = false
  inActive: boolean = false
  amountForm!: FormGroup
  ratingButtonActive: any
  detail:any
  payActive:boolean = true

  constructor(private route: Router,private activateRoute: ActivatedRoute, private service: UserService, private fb: FormBuilder, private dialog: MatDialog, private ngZone: NgZone) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''     
    this.amountForm = this.fb.group({
      amount:this.Amount
    })
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.getProgressValue()
      this.getAmount()
  }

  getAmount() {    
    this.service.showAmount(this.id).subscribe((value)=> {
      if(value.amount == null) {
        this.payActive = false
      } else {
        this.payActive = true
        this.Amount = value.amount
      }
    })
  }

  getProgressValue() {
    this.service.getProgressData(this.id).subscribe(data => {
      if(data.data == null) {
        this.inActive = true
      } else {
      this.progressBar = data.data
      if(this.progressBar) {
        this.active = true
        if(this.progressBar == 100) {
          this.ratingButtonActive = true
        }
      } 
      }
    });
  }

  viewWorkerDetails(id:string){
    this.service.userViewWorkerDetails(id).subscribe((value)=> {
      this.workerData = value.data
    })
  }

  razorPayOptions = {
    "key":'rzp_test_TDRJfd82mop9MS',
    "amount":this.Amount * 100,
    "currency": 'INR',
    "name":"superWise",
    "description": 'Test Transaction',
    "order_id":'',
    "handler": (res:any) => {
      console.log(res);
    }
  };

  initiateRazorpayPayment(workerId:string) {
    this.service.razorpay(this.Amount, workerId).subscribe((res)=> {
      this.razorPayOptions.key = res['key']
      this.razorPayOptions.amount = res['value'] ['amount']
      this.razorPayOptions.name = res['name']
      this.razorPayOptions.order_id = res['value'] ['id']
      this.razorPayOptions.handler = (response: any) => {
        console.log(response);
  
        if (response.razorpay_payment_id) {
          this.ngZone.run(() => {
            this.route.navigate(['/successPage', this.id]);
          });
        } else {
          console.log('payment failed');
        }
      };
      

      var rzp1 = new Razorpay(this.razorPayOptions)
      rzp1.open()
      console.log('opened');
      console.log('response',res);  
    })
  }



  ratingModal() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width:'30%',
      data: {mode: 'rating', data: this.id}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'ratingSubmitted'){
        
      }
    });
  }

  message() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width:'80%',
      data: {mode: 'message', data:this.workerData}
    })

    dialogRef.afterClosed().subscribe(result => {
 
    });
  }

  viewImages() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width:'60%',
      data: {mode: 'progressImage', data:this.workerData._id}
    })

    dialogRef.afterClosed().subscribe(result => {
 
    });
  }
}
