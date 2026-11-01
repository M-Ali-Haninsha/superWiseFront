import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { showError } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { Category } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
  standalone: false,
})
export class AdminCategoryComponent implements OnInit {
  private service = inject(AdminServiceService);
  dialog = inject(MatDialog);

  displayedColumns = ['rowNumber', 'name', 'image', 'description', 'action'];
  dataSource = new MatTableDataSource<Category>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getCategory();
  }

  openDialog(): void {
    this.openCategoryDialog(null, '22%');
  }

  edit(category: Category): void {
    this.openCategoryDialog(category, '30%');
  }

  private openCategoryDialog(category: Category | null, width: string): void {
    this.dialog
      .open<AdminDialogComponent, Category | null, string>(AdminDialogComponent, { width, data: category })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'add' || result === 'edit') this.getCategory();
      });
  }

  getCategory(): void {
    this.service.fetchCategory().subscribe({
      next: ({ recievedCat }) => {
        this.dataSource = createTableSource(recievedCat, (c) => [c.name, c.description], this.paginator, this.sort);
      },
      error: (err: unknown) => showError(err),
    });
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
