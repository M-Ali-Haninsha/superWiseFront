import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  category:any

  constructor(private service: UserService) {}

  ngOnInit(): void {
      this.listCategory()
  }

  listCategory() {
    this.service.fetchCategory().subscribe((value)=>{
      this.category = value.result
    })
  }
}
