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
  worker:any[] = []
  category:any
  filteredWorkers!: any[]; 
  search: string = '';

  constructor(private activateRoute: ActivatedRoute, private service: UserService, private route: Router) {
    this.id = this.activateRoute.snapshot.paramMap.get('id') || ''    
  }

  ngOnInit(): void {
    this.viewWorkers(this.id);
    this.getCategory()
  }

  viewWorkers(id:any){
    this.service.fetchWorkers(id).subscribe((value)=>{
      this.worker = value.data      
      this.filteredWorkers = this.worker;
      this.applySearchFilter(); 
    })
  }

  filterWorkersByCategory(categoryId: string) {
    this.viewWorkers(categoryId);
  }

  viewWorkerDetails(id:string){
    this.route.navigate(['/viewWorker',id])
  }

  getCategory() {
    this.service.fetchCategory().subscribe((value)=> {
      console.log(value.result);
      this.category = value.result
    })
  }

  applySearchFilter(): void {
    this.filteredWorkers = this.worker.filter(worker =>
      worker.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(this.search.toLowerCase()) ||
      worker.district.toLowerCase().includes(this.search.toLowerCase())
    );
  }
  
  clearSearch(): void {
    this.search = '';
    this.filteredWorkers = this.worker;
  }
}
