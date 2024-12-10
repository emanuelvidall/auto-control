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
    const monthsWithExpenses = Object.keys(monthlyTotals)
    const expensesData = monthsWithExpenses.map((month) => monthlyTotals[month])
  
    this.chart = new Chart('canvasId', {
      type: 'bar',
      data: {
        labels: monthsWithExpenses, // Apenas meses reais, ordenados corretamente
        datasets: [
          {
            label: 'Despesa no mês (R$)',
            data: expensesData,
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
              color: 'rgba(128, 128, 128, 0.69)',
              font: {
                size: 12,
                weight: 'bold',
              },
            },
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          x: {
            ticks: {
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
  
    this.expenses.forEach((expense) => {
      const dateStr = typeof expense.date === 'string' ? expense.date : expense.date.toISOString().split('T')[0]
      const [year, month, _] = dateStr.split('-') // Extrair ano e mês diretamente do campo date
      const monthYearKey = dateStr // Use a data diretamente no formato "YYYY-MM-DD"
  
      const value =
        typeof expense.value === 'number'
          ? expense.value
          : parseFloat(expense.value)
  
      if (!monthlyTotals[monthYearKey]) {
        monthlyTotals[monthYearKey] = 0
      }
      monthlyTotals[monthYearKey] += value
    })
  
    // Ordenar os meses pelo formato "Mês Ano"
    const orderedTotals = Object.keys(monthlyTotals)
    .sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime() // Ordena as datas do mais antigo para o mais recente
    })
    .reduce((acc, key) => {
      acc[key] = monthlyTotals[key]
      return acc
    }, {} as { [key: string]: number })  
  
    console.log('Aggregated Monthly Totals:', orderedTotals)
  
    return orderedTotals
  }
}
