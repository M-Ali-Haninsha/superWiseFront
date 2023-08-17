import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.css']
})
export class ListWorkersComponent implements OnInit{

  id!:string
  worker:any

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private route: Router) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''    
  }

  ngOnInit(): void {
      this.viewWorkers(this.id)
  }

  viewWorkers(id:any){
    this.service.fetchWorkers(id).subscribe((value)=>{
      this.worker = value.data      
    })
  }

  viewWorkerDetails(id:string){
    this.route.navigate(['/viewWorker',id])
  }
}
