import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register necessary chart components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() expenses: any[] = []
  private chart?: Chart<'doughnut', number[], string>

  constructor() {}

  ngOnInit(): void {
    this.createDoughnutChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['expenses'] &&
      changes['expenses'].currentValue !== changes['expenses'].previousValue
    ) {
      this.updateChartData()
    }
  }

  private createDoughnutChart(): void {
    const { labels, data } = this.aggregateExpensesByType()

    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement
    if (!ctx) return

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'R$ Total',
            data: data,
            backgroundColor: [
              '#FC6736',
              '#DCCA27',
              '#0C2D57',
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

  private updateChartData(): void {
    if (!this.chart) {
      this.createDoughnutChart() // Ensure the chart exists
      return
    }

    const { labels, data } = this.aggregateExpensesByType()
    this.chart.data.labels = labels
    this.chart.data.datasets.forEach((dataset, index) => {
      dataset.data = data
    })
    this.chart.update()
  }

  private aggregateExpensesByType(): { labels: string[]; data: number[] } {
    const expenseTotals = new Map<string, number>()
    this.expenses.forEach((expense) => {
      const value = parseFloat(expense.value)
      const typeLabel = expense.type_name
      if (expenseTotals.has(typeLabel)) {
        expenseTotals.set(
          typeLabel,
          (expenseTotals.get(typeLabel) ?? 0) + value
        )
      } else {
        expenseTotals.set(typeLabel, value)
      }
    })

    return {
      labels: Array.from(expenseTotals.keys()),
      data: Array.from(expenseTotals.values()),
    }
  }
}
