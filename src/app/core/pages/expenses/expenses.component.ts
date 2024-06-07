import { Component, OnInit } from '@angular/core'
import { ExpenseSidebarComponent } from '../../components/expense-sidebar/expense-sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { ExpenseTableComponent } from '../../components/expense-table/expense-table.component'
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component'
import { DataService, Expense } from '../../services/data.service'
import { switchMap } from 'rxjs/internal/operators/switchMap'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    ExpenseSidebarComponent,
    NavbarComponent,
    ExpenseTableComponent,
    ExpenseChartComponent,
    NgIf,
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
  userId: number = 0
  userToken: string = ''
  loading: boolean = true
  openModal() {
    // Open modal
  }

  ngOnInit(): void {
    this.loadUserDataAndExpenses()
  }

  totalExpenses(): number {
    return (this.expensesTotal = this.expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.value),
      0
    ))
  }

  sortExpensesByDate(): void {
    this.expenses.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateA > dateB ? -1 : 1
    })
  }

  formatDate(date: string | Date): string {
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date:', date)
      return ''
    }
    return parsedDate.toLocaleDateString('en-GB')
  }

  getNextExpenseValue(): void {
    const firstExpenseDate = new Date(this.expenses[0].date)
    const currentDate = new Date()
    if (firstExpenseDate > currentDate) {
      this.nextExpense = parseFloat(this.expenses[0].value)
      this.nextExpenseDate = firstExpenseDate.toLocaleDateString()
      return
    }
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
          this.totalExpenses()
          this.sortExpensesByDate()
          this.getNextExpenseValue()
          this.nextExpenseDate = this.formatDate(this.expenses[0].date)
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
