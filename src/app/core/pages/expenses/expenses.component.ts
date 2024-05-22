import { Component } from '@angular/core'
import { ExpenseSidebarComponent } from '../../components/expense-sidebar/expense-sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { ExpenseTableComponent } from '../../components/expense-table/expense-table.component'
import { ExpenseChartComponent } from '../../components/expense-chart/expense-chart.component'

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    ExpenseSidebarComponent,
    NavbarComponent,
    ExpenseTableComponent,
    ExpenseChartComponent,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  openModal() {
    // Open modal
  }
}
