import { Component } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'

import { DataService } from '../../services/data.service'

import { Expense } from '../../services/data.service'

import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core'

@Component({
  selector: 'app-expense-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
})
export class ExpenseDialogComponent {
  constructor(private dataService: DataService) {}

  addExpenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl(0, Validators.required),
    date: new FormControl(new Date(), Validators.required),
    description: new FormControl(''),
    file: new FormControl(''),
    vehicleId: new FormControl(0, Validators.required),
  })

  handleAddExpense() {
    if (this.addExpenseForm.valid) {
      // this.dataService.addExpense(this.addExpenseForm.value as Expense)
      console.log('Expense Data:', this.addExpenseForm.value)
    } else {
      console.log('Form is not valid')
    }
  }
}
