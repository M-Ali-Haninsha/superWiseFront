import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  count:number = 0
  income: number = 0
  clients: any
  amount:any
  rating: number = 0
  constructor(private service: WorkerService) {}

  ngOnInit(): void {
      this.getCount()
  }

  getCount() {
    this.service.countData().subscribe((value)=> {
      this.count = value.count
      this.income = value.data.income
      this.clients = value.data.requests
      this.rating = value.avg  
    })
  }

}
