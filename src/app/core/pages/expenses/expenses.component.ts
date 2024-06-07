import { Component, OnInit } from '@angular/core'
import { ExpenseSidebarComponent } from '../../components/expense-sidebar/expense-sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { ExpenseTableComponent } from '../../components/expense-table/expense-table.component'
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component'
import { DataService, Expense } from '../../services/data.service'
import { switchMap } from 'rxjs/internal/operators/switchMap'
import { NgIf } from '@angular/common'
import { MatProgressBarModule } from '@angular/material/progress-bar'

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    ExpenseSidebarComponent,
    NavbarComponent,
    ExpenseTableComponent,
    ExpenseChartComponent,
    NgIf,
    MatProgressBarModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit {
  constructor(private dataService: DataService) {}
  expenses: Expense[] = []
  expensesTotal: number = 0
  nextExpense: number = 0
  nextExpenseDate: string = ''
  averageExpense: number = 0
  lastSixMonthsTotal: number = 0
  // lastYearsTotal: number = 0
  userId: number = 0
  userToken: string = ''
  loading: boolean = true
  percentageTicket: number = 0
  percentageMaintance: number = 0
  percentageTaxes: number = 0
  percentageServices: number = 0
  percentageFuel: number = 0
  ticketTotal: number = 0
  maintanceTotal: number = 0
  taxesTotal: number = 0
  servicesTotal: number = 0
  fuelTotal: number = 0
  openModal() {
    // Open modal
  }

  ngOnInit(): void {
    this.loadUserDataAndExpenses()
  }

  sortExpensesByDate(): void {
    this.expenses.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA > dateB ? -1 : 1
    })
  }

  formatDate(date: any): string {
    const parsedDate = new Date(date.split('-'))
    if (isNaN(parsedDate.getDate())) {
      console.error('Invalid date:', date)
      return ''
    }
    return parsedDate.toLocaleDateString('pt-BR')
  }

  getExpensesSummary(): void {
    this.dataService.getExpensesSummary(this.userToken, this.userId).subscribe({
      next: (summary) => {
        console.log('Expenses summary:', summary)
        this.expensesTotal = summary.total_of_expenses.toFixed(2)
        this.nextExpense = summary.future_expenses.toFixed(2)
        this.nextExpenseDate = this.formatDate(summary.date_of_the_next_expense)
        this.averageExpense =
          summary.average_value_of_expenses_by_month.toFixed(2)
        this.lastSixMonthsTotal =
          summary.total_of_expense_last_six_months.toFixed(2)
        // this.lastYearsTotal = summary.total_of_expenses_last_year
      },
      error: (error) => {
        console.error('Error getting expenses summary:', error)
      },
    })
  }

  getExpensesPercentage(): void {
    const total = this.expensesTotal

    const ticket = this.expenses.filter(
      (expense) => expense.type_name === 'Multa'
    )
    const maintance = this.expenses.filter(
      (expense) => expense.type_name === 'Manutenção'
    )
    const taxes = this.expenses.filter(
      (expense) => expense.type_name === 'Impostos'
    )
    const services = this.expenses.filter(
      (expense) => expense.type_name === 'Revisão'
    )
    const fuel = this.expenses.filter(
      (expense) => expense.type_name === 'Abastecimento'
    )

    const sumValues = (expensesArray: Expense[]) => {
      return expensesArray.reduce(
        (acc, expense) => acc + parseFloat(expense.value),
        0
      )
    }

    const ticketTotal = sumValues(ticket)
    const maintanceTotal = sumValues(maintance)
    const taxesTotal = sumValues(taxes)
    const servicesTotal = sumValues(services)
    const fuelTotal = sumValues(fuel)

    this.percentageTicket = (ticketTotal / total) * 100
    this.percentageMaintance = (maintanceTotal / total) * 100
    this.percentageTaxes = (taxesTotal / total) * 100
    this.percentageServices = (servicesTotal / total) * 100
    this.percentageFuel = (fuelTotal / total) * 100

    this.ticketTotal = ticketTotal
    this.maintanceTotal = maintanceTotal
    this.taxesTotal = taxesTotal
    this.servicesTotal = servicesTotal
    this.fuelTotal = fuelTotal
  }

  private loadUserDataAndExpenses(): void {
    this.dataService
      .getUserData()
      .pipe(
        switchMap((userData) => {
          this.userId = userData?.user_id ?? 0
          this.userToken = userData?.token ?? ''
          return this.dataService.getExpensesByUser(this.userId, this.userToken)
        })
      )
      .subscribe({
        next: (expenses) => {
          this.expenses = expenses
          this.expenses = expenses.map((expense) => {
            return {
              ...expense,
              date: this.formatDate(expense.date),
            }
          })
          this.getExpensesSummary()
          this.sortExpensesByDate()
          this.getExpensesPercentage()
        },
        complete: () => {
          this.loading = false
        },
        error: (error) => {
          console.error('Error getting expenses:', error)
        },
      })
  }
}
