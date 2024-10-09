import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';  // Import PieController

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],  // Explicitly typed as number[]
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: [] as string[]  // Explicitly typed as string[]
  };

  constructor(private http: HttpClient) {
    // Register the necessary Chart.js components
    Chart.register(ArcElement, Tooltip, Legend, PieController);
  }

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log("API Response: ", res);  // Log the API response

        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }

        console.log("Updated dataSource: ", this.dataSource);  // Log the updated dataSource

        this.createChart();  // Create the chart after updating data
      });
  }

  createChart() {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (!ctx) {
      console.error("Canvas element not found");  // Log if canvas is missing
      return;
    }

    console.log("Creating chart with data: ", this.dataSource);  // Log the data used to create the chart

    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource  // Pass the updated dataSource
    });
  }
}
