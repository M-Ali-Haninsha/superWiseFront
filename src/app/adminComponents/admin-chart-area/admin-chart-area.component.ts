import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartData, ChartTypeRegistry } from 'chart.js';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-chart-area',
  templateUrl: './admin-chart-area.component.html',
  styleUrls: ['./admin-chart-area.component.css']
})
export class AdminChartAreaComponent implements OnInit{

  chart!:any
  incomeValue!: number
  workerCount: number = 0
  clientCount!:number
  workerData:any

  constructor(private service: AdminServiceService) {}

  ngOnInit(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Workers',
            data: [10, 20, 30],
            backgroundColor: ['red', 'blue', 'green','orange','yellow','pink'],
          }
        ]
      },
      options: {
      }
    });


    this.getIncome()
    this.counts()
    this.getChartValue()
  }

  getIncome() {
    this.service.getIncomeData().subscribe((value)=> {
      this.incomeValue = value.income   
    })
  }

  counts() {
    this.service.countDetails().subscribe((value)=> {
      this.workerCount = value.workerCount
      this.clientCount = value.clientCount
      this.workerData = value.workerData
    })
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  getChartValue() {
    this.service.chartValue().subscribe((value)=> {
      console.log(value);
      const departmentNames = value.map((item:any) => item.departmentName);
      const workerCounts = value.map((item:any) => item.workerCount);

      const backgroundColors: string[] = departmentNames.map(() => this.getRandomColor());
  
      this.chart.data.labels = departmentNames;
      this.chart.data.datasets[0].data = workerCounts;
      this.chart.data.datasets[0].backgroundColor = backgroundColors;
  
      this.chart.update();
      
    })
  }
}
