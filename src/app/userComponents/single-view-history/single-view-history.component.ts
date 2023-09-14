import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-view-history',
  templateUrl: './single-view-history.component.html',
  styleUrls: ['./single-view-history.component.css']
})
export class SingleViewHistoryComponent implements OnInit{
  @ViewChild('printMe', { static: false }) printMe!: ElementRef;

  id:string
  paymentDetails:any
  clientData:any
  workerData:any

  constructor(private activateRoute: ActivatedRoute, private renderer: Renderer2, private service: UserService) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || '' 
  }

  ngOnInit(): void {
      this.getDetails()
  }

  getDetails() {
    this.service.historyDetails(this.id).subscribe((value)=> {
      console.log(value);
      this.paymentDetails = value.payments[0]
      this.clientData = value.clientData
      this.workerData = value.workerData
      
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
