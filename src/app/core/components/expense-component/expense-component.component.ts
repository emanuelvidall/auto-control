import { Component, Input, OnInit } from '@angular/core'
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-expense-component',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './expense-component.component.html',
  styleUrls: ['./expense-component.component.scss'],
})
export class ExpenseComponentComponent implements OnInit {
  @Input() expenses: any[] = []

  displayedColumns: string[] = ['despesa', 'description', 'date', 'value']
  dataSource: any[] = []

  ngOnInit(): void {
    this.dataSource = this.expenses
  }

  ngOnChanges(): void {
    this.dataSource = this.expenses
  }
}
