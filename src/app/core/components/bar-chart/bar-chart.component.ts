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
            label: 'Despesa no mês (R$)',
            data: Object.values(monthlyTotals),
            backgroundColor: '#FC6736',
            borderRadius: 5,
            barThickness: 40,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              stepSize: 800,
              color: 'rgba(128, 128, 128, 0.69)',
              font: {
                size: 12,
                weight: 'bold',
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            max: Math.max(...Object.values(monthlyTotals)) + 100,
            beginAtZero: true,
          },
          x: {
            ticks: {
              maxRotation: 0,
              minRotation: 0,
              stepSize: 800,
              color: 'rgba(128, 128, 128, 0.69)',
              font: {
                size: 12,
                weight: 'bold',
              },
            },
            grid: {
              display: false,
            },
          },
        },
      },
    })
  }

  private aggregateMonthlyExpenses(): { [key: string]: number } {
    const monthlyTotals: { [key: string]: number } = {}
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]

    monthNames.forEach((month) => {
      monthlyTotals[month] = 0
    })

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
