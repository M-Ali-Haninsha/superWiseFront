import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  category:any

  currentPage: number = 1;
  itemsPerPage: number = 6; 

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.category.length - 1);
  }

  constructor(private service: UserService, private route: Router) {}

  ngOnInit(): void {
      this.listCategory()
      if (this.category.length <= this.itemsPerPage) {
        this.itemsPerPage = this.category.length;
      }
  }

  listCategory() {
    this.service.fetchCategory().subscribe((value)=>{
      this.category = value.result
    })
  }

  view(id:string) {
    this.route.navigate(['/listWorkers',id])
  }
}
