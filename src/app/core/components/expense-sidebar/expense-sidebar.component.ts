import { Component, OnInit, NgModule } from '@angular/core'
import { NgFor } from '@angular/common'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSliderModule } from '@angular/material/slider'
import { MatExpansionModule } from '@angular/material/expansion'
import { FormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-expense-sidebar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatSliderModule,
    MatExpansionModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    NgFor,
  ],
  templateUrl: './expense-sidebar.component.html',
  styleUrl: './expense-sidebar.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ExpenseSidebarComponent implements OnInit {
  checked = false
  indeterminate = false
  expensesTypes: any[] = []
  selectedTypes: any[] = []

  token: string | null = null
  expenseTypes: any[] = []

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUserData()
    this.loadExpenseTypes()
    // const userData = this.dataService.getUserData()
    // if (userData) {
    //   this.token = userData.token
    //   this.dataService.getExpensesType(this.token).subscribe((response) => {
    //     this.expensesTypes = response
    //   })
    // }
  }

  private loadUserData(): void {
    this.dataService.getUserData().subscribe({
      next: (userData) => {
        this.token = userData?.token ?? ''
      },
      error: (error) => {
        console.error('Error getting user data: ', error)
      },
    })
  }

  private loadExpenseTypes(): void {
    this.dataService.getExpensesType(this.token).subscribe({
      next: (expenseTypes: any[]) => {
        this.expenseTypes = expenseTypes
      },
      error: (error) => {
        console.error('Error getting expense types: ', error)
      },
    })
  }

  onTypeChange(type: any): void {
    if (type.selected) {
      this.selectedTypes.push(type)
    } else {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type)
    }
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k'
    }

    return `${value}`
  }
  panelOpenState = false
}
