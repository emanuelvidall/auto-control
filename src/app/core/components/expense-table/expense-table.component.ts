import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Expense } from '../../services/data.service'
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'

export interface PeriodicElement {
  name: string
  position: number
  weight: number
  symbol: string
}

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent implements AfterViewInit {
  @Input() expenses: Expense[] = []
  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  @ViewChild(MatSort)
  sort!: MatSort
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
