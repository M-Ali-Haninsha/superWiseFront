import { Component, OnInit, inject } from '@angular/core';
import { showError } from 'src/app/core/notify';
import { WorkRequest } from 'src/app/models/api.models';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: false,
})
export class LandingPageComponent implements OnInit {
  private service = inject(WorkerService);

  count = 0;
  income = 0;
  clients: WorkRequest[] = [];
  rating = 0;

  ngOnInit(): void {
    this.service.countData().subscribe({
      next: ({ data, count, avg }) => {
        this.count = count;
        this.income = data.income ?? 0;
        this.clients = data.requests;
        this.rating = avg;
      },
      error: (err: unknown) => showError(err),
    });
  }
}
