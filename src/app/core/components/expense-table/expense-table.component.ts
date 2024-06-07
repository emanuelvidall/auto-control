import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Expense } from '../../services/data.service'

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent implements OnChanges {
  @Input() expenses: Expense[] = []
  displayedColumns: string[] = [
    'date',
    'name',
    'vehicle_name',
    'type_name',
    'value',
  ]
  dataSource = new MatTableDataSource<Expense>(this.expenses)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.dataSource.data = this.expenses
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
