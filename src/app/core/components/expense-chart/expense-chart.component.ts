import { Component } from '@angular/core'
import { BarChartComponent } from '../bar-chart/bar-chart.component'

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.scss',
})
export class ExpenseChartComponent {}
