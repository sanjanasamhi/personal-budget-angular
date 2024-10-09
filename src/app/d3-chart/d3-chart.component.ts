import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'app-d3-chart',
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss']
})
export class D3ChartComponent implements OnInit {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.createChart(data);
    });
  }

  private createChart(data: { title: string; budget: number }[]): void {
    const width = 500;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Clear previous SVG if any
    d3.select(this.chartContainer.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ title: string; budget: number }>()
      .value(d => d.budget); // Change to budget

    const arc = d3.arc<d3.PieArcDatum<{ title: string; budget: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.title)); // Change to title

    // Adding labels
    g.append('text')
  .attr('transform', d => {
    const [x, y] = arc.centroid(d);
    const angle = (d.startAngle + d.endAngle) / 2; // Mid-angle for better alignment
    const offset = 10; // Increase this value to move labels further from the pie
    const xOffset = x + (offset * Math.cos(angle));
    const yOffset = y + (offset * Math.sin(angle));
    return `translate(${xOffset}, ${yOffset})`;
  })
  .attr('text-anchor', d => {
    const angle = (d.startAngle + d.endAngle) / 2;
    return angle < Math.PI ? 'start' : 'end'; // Dynamically set anchor to avoid clipping
  })
  .attr('dy', '.35em')
  .text(d => d.data.title);

  }
}
