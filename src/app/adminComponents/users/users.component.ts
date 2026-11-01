import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { confirmAction, showError, showSuccess } from 'src/app/core/notify';
import { applyTableFilter, createTableSource } from 'src/app/core/table';
import { Client } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false,
})
export class UsersComponent implements OnInit {
  private service = inject(AdminServiceService);

  displayedColumns = ['rowNumber', 'firstName', 'lastName', 'email', 'action'];
  dataSource = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.service.fetchUser().subscribe({
      next: ({ user }) => {
        this.dataSource = createTableSource(user, (u) => [u.firstName, u.lastName, u.email], this.paginator, this.sort);
      },
      error: (err: unknown) => showError(err),
    });
  }

  block(id: string): void {
    void this.changeBlock(this.service.blockUser(id), 'block');
  }

  unBlock(id: string): void {
    void this.changeBlock(this.service.unBlockUser(id), 'unblock');
  }

  private async changeBlock(request: Observable<unknown>, verb: 'block' | 'unblock'): Promise<void> {
    const confirmed = await confirmAction(
      `Confirm ${verb}`,
      `Are you sure you want to ${verb} this user?`,
      `Yes, ${verb} it!`,
    );
    if (!confirmed) return;
    request.subscribe({
      next: () => {
        this.getUsers();
        void showSuccess('Success', `User has been ${verb}ed.`);
      },
      error: (err: unknown) => showError(err),
    });
  }

  applyFilter(event: Event): void {
    applyTableFilter(this.dataSource, event);
  }
}
