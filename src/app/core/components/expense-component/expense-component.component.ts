import { Component } from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-expense-component',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './expense-component.component.html',
  styleUrl: './expense-component.component.scss',
})
export class ExpenseComponentComponent {}
