import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css']
})
export class SuccesspageComponent implements OnInit{
  @ViewChild('printMe', { static: false }) printMe!: ElementRef;

  id:string
  workerDetails:any
  userDetails:any
  clientDataP:any
  paymentP:any

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private renderer: Renderer2) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''     
  }

  ngOnInit(): void {
  this.workerData()      
  this.paymentDetails()
  }

  workerData() {
    this.service.userViewWorkerDetails(this.id).subscribe((value)=> {
      this.workerDetails = value.data
    })
  }

  paymentDetails() {    
    console.log(this.id);
    
    this.service.getPaymentData(this.id).subscribe((value)=> {      
      this.clientDataP = value.paymentData
      this.paymentP = value.details      
    })
  }

  downloadPdf(){
    const printContents = this.printMe.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;

    this.renderer.setProperty(document.body, 'innerHTML', printContents);
    window.print();
    this.renderer.setProperty(document.body, 'innerHTML', originalContents);
  }
}
