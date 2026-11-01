import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
// chart.js/auto registers every chart type; plain 'chart.js' would need
// Chart.register(...) before a doughnut chart can be created.
import Chart from 'chart.js/auto';
import { showError } from 'src/app/core/notify';
import { WorkerWithIncome } from 'src/app/models/api.models';
import { AdminServiceService } from 'src/app/services/admin-service.service';

const PALETTE = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed', '#0891b2', '#db2777', '#65a30d'];

@Component({
  selector: 'app-admin-chart-area',
  templateUrl: './admin-chart-area.component.html',
  styleUrls: ['./admin-chart-area.component.css'],
  standalone: false,
})
export class AdminChartAreaComponent implements AfterViewInit, OnDestroy {
  private service = inject(AdminServiceService);

  @ViewChild('myChart') canvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'doughnut', number[], string>;
  incomeValue = 0;
  workerCount = 0;
  clientCount = 0;
  workerData: WorkerWithIncome[] = [];

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',
      data: { labels: [], datasets: [{ label: 'Workers', data: [], backgroundColor: PALETTE }] },
    });

    this.service.getIncomeData().subscribe({
      next: ({ income }) => (this.incomeValue = income),
      error: (err: unknown) => showError(err),
    });
    this.service.countDetails().subscribe({
      next: ({ workerCount, clientCount, workerData }) => {
        this.workerCount = workerCount;
        this.clientCount = clientCount;
        this.workerData = workerData;
      },
      error: (err: unknown) => showError(err),
    });
    this.service.chartValue().subscribe({
      next: (rows) => {
        if (!this.chart) return;
        this.chart.data.labels = rows.map((r) => r.departmentName);
        this.chart.data.datasets[0].data = rows.map((r) => r.workerCount);
        this.chart.update();
      },
      error: (err: unknown) => showError(err),
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
