import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { CommonModule } from '@angular/common'
Chart.register(...registerables)

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() expenses: any[] = []
  chart: Chart | undefined

  ngOnInit(): void {
    this.buildChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['expenses'] &&
      changes['expenses'].currentValue !== changes['expenses'].previousValue
    ) {
      this.buildChart()
    }
  }

  buildChart(): void {
    if (this.chart) {
      this.chart.destroy() // Destroy the existing chart before creating a new one
    }

    const monthlyTotals = this.aggregateMonthlyExpenses()

    this.chart = new Chart('canvasId', {
      type: 'bar',
      data: {
        labels: Object.keys(monthlyTotals), // Months as labels
        datasets: [
          {
            label: 'Total Monthly Expense (R$)',
            data: Object.values(monthlyTotals),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  }

  private aggregateMonthlyExpenses(): { [key: string]: number } {
    const monthlyTotals: { [key: string]: number } = {}
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    this.expenses.forEach((expense) => {
      const date = new Date(expense.created_at) // Parse the date string into a Date object
      const monthIndex = date.getMonth() // Get the month index from the date (0 = January, 11 = December)
      const monthName = monthNames[monthIndex] // Convert month index to month name

      if (monthlyTotals[monthName]) {
        monthlyTotals[monthName] += parseFloat(expense.value) // Add to existing month total
      } else {
        monthlyTotals[monthName] = parseFloat(expense.value) // Initialize month total
      }
    })

    return monthlyTotals
  }
}
