import { Component, OnInit, Input } from '@angular/core'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  @Input() expenses: any[] = []

  constructor() {}

  ngOnInit(): void {
    if (this.expenses) {
      this.createDoughnutChart()
    }
  }

  ngOnChanges(): void {
    if (this.expenses) {
      this.createDoughnutChart()
    }
  }

  private createDoughnutChart(): void {
    const { labels, data } = this.aggregateExpensesByType()

    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement
    const doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Expenses by Type',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    })
  }

  private aggregateExpensesByType(): { labels: string[]; data: number[] } {
    const expenseTotals = new Map<string, number>()

    this.expenses.forEach((expense) => {
      const value = parseFloat(expense.value)
      if (expenseTotals.has(expense.type)) {
        expenseTotals.set(
          expense.type,
          (expenseTotals.get(expense.type) ?? 0) + value
        )
      } else {
        expenseTotals.set(expense.type, value)
      }
    })

    const labels = Array.from(expenseTotals.keys())
    const data = Array.from(expenseTotals.values())
    return { labels, data }
  }
}
