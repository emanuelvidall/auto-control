import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { CommonModule } from '@angular/common'
import { Expense } from '../../services/data.service'
Chart.register(...registerables)

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() expenses: Expense[] = []
  chart: Chart | undefined

  ngOnInit(): void {
    this.buildChart()
  }

  monthNames = [
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

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['expenses'] &&
      changes['expenses'].currentValue !== changes['expenses'].previousValue
    ) {
      console.log('Expenses: ', this.expenses)
      this.buildChart()
    }
  }

  buildChart(): void {
    if (this.chart) {
      this.chart.destroy()
    }

    const monthlyTotals = this.aggregateMonthlyExpenses()
    console.log('Monthly Totals for Chart:', monthlyTotals)

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

    const labels = monthNames.map((month) =>
      month in monthlyTotals ? month : ''
    )

    this.chart = new Chart('canvasId', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Despesa no mês (R$)',
            data: monthNames.map((month) => monthlyTotals[month] || 0),
            backgroundColor: ['#FC6736'],
            borderRadius: 5,
            barThickness: 20,
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
      const date = new Date(expense.date)
      const monthIndex = date.getMonth()
      const monthName = monthNames[monthIndex]
      const value =
        typeof expense.value === 'number'
          ? expense.value
          : parseFloat(expense.value)

      monthlyTotals[monthName] += value
    })

    console.log('Aggregated Monthly Totals:', monthlyTotals)

    return monthlyTotals
  }
}
