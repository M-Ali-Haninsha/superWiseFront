import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
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
  Amount: number = 2000
  active: boolean = false
  inActive: boolean = false
  amountForm!: FormGroup

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private fb: FormBuilder) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''     
    this.amountForm = this.fb.group({
      amount:this.Amount
    })
  }

  ngOnInit(): void {
      this.viewWorkerDetails(this.id)
      this.getProgressValue()
      
  }

  getProgressValue() {
    this.service.getProgressData(this.id).subscribe(data => {
      if(!data.data) {
        this.inActive = true
      } else {
        const workStatus = data.data.workStatus;
      this.progressBar = workStatus[0].progressBar 
      if(this.progressBar) {
        this.active = true
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

  initiateRazorpayPayment() {
    this.service.razorpay(this.Amount).subscribe((res)=> {
      this.razorPayOptions.key = res['key']
      this.razorPayOptions.amount = res['value'] ['amount']
      this.razorPayOptions.name = res['name']
      this.razorPayOptions.order_id = res['value'] ['id']
      this.razorPayOptions.handler = this.razorPayResponseHandler
      var rzp1 = new Razorpay(this.razorPayOptions)
      rzp1.open()
      console.log('opened');
      console.log('response',res);  
    })
  }

  razorPayResponseHandler(response:any) {
    console.log(response);
    
  }

  // initiateRazorpayPayment() {
  //   const options = {
  //     key: 'rzp_test_TDRJfd82mop9MS',
  //     amount: this.Amount * 100,
  //     currency: 'INR',
  //     name: 'superWise',
  //     // image:'',
  //     description: 'Test Transaction',
  //     prefill: {
  //       name: 'Gaurav Kumar',
  //       email: 'gaurav.kumar@example.com',
  //       contact: '9000090000'
  //     },
  //     // theme: {
  //     //   color:''
  //     // },
  //     modal: {
  //       ondismiss: () => {
  //         console.log('dismissed');
          
  //       }
  //     }
  //   };
    
  //   const success = (paymentId: any)=> {
  //     console.log('entered');
  //     console.log(paymentId); 
      
  //     const paymentData = {
  //       payment_id: paymentId,
  //       razorpay_signature: 'your_signature_here' // Replace with your actual signature
  //     };
      
  //     fetch('/razorpay', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(paymentData)
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log(data); 
  //       })
  //       .catch(error => {
  //         console.error('Error sending payment data:', error);
  //       });
      

  //   }

  //   const failure = (error: any) => {
  //     console.log('failure',error);
  //   }
  //   Razorpay.open(options, success.bind(this), failure)
  // }
  

}
