import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { showError } from 'src/app/core/notify';
import { Category, Worker } from 'src/app/models/api.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.css'],
  standalone: false,
})
export class ListWorkersComponent implements OnInit {
  private service = inject(UserService);
  private route = inject(Router);

  id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  worker: Worker[] = [];
  category: Category[] = [];
  filteredWorkers: Worker[] = [];
  search = '';

  ngOnInit(): void {
    this.viewWorkers(this.id);
    this.service.fetchCategory().subscribe({
      next: ({ result }) => (this.category = result),
      error: (err: unknown) => showError(err),
    });
  }

  viewWorkers(categoryId: string): void {
    this.service.fetchWorkers(categoryId).subscribe({
      next: ({ data }) => {
        this.worker = data;
        this.applySearchFilter();
      },
      error: (err: unknown) => showError(err),
    });
  }

  filterWorkersByCategory(categoryId: string): void {
    this.viewWorkers(categoryId);
  }

  viewWorkerDetails(id: string): void {
    void this.route.navigate(['/viewWorker', id]);
  }

  applySearchFilter(): void {
    const term = this.search.toLowerCase();
    this.filteredWorkers = this.worker.filter((w) =>
      [w.firstName, w.lastName, w.district].some((field) => field.toLowerCase().includes(term)),
    );
  }

  clearSearch(): void {
    this.search = '';
    this.filteredWorkers = this.worker;
  }
}
