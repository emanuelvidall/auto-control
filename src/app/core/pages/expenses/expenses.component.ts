import { Component } from '@angular/core'
import { ExpenseSidebarComponent } from '../../components/expense-sidebar/expense-sidebar.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpenseSidebarComponent, NavbarComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {}
