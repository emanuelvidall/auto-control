import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatIconModule } from '@angular/material/icon'
import { DataService, Expense, ExpenseType } from '../../services/data.service'
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core'
import { NgFor } from '@angular/common'

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
    NgFor,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
})
export class ExpenseDialogComponent implements OnInit {
  @Output() expenseAdded = new EventEmitter<Expense>()

  vehicleId: number
  userToken: string = ''
  expenseTypes: ExpenseType[] = []
  addExpenseForm!: FormGroup

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: number }
  ) {
    this.vehicleId = data.vehicleId
  }

  ngOnInit(): void {
    this.initializeForm()
    this.loadUserData()
    this.loadExpenseTypes()
  }

  private initializeForm(): void {
    this.addExpenseForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      value: new FormControl<number>(0, [
        Validators.required,
        Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
      ]),
      date: new FormControl<Date | string>(new Date(), Validators.required),
      description: new FormControl<string>(''),
      typeId: new FormControl<number | null>(null, Validators.required),
    })
  }

  private loadUserData(): void {
    const userData = this.dataService.getUserData()
    this.userToken = userData?.token ?? ''
  }

  private loadExpenseTypes(): void {
    this.dataService.getExpensesType(this.userToken).subscribe((types) => {
      this.expenseTypes = types
    })
  }

  private createExpenseData(): Expense {
    return {
      name: this.addExpenseForm.value.name || '',
      value: this.addExpenseForm.value.value || 0,
      date: this.formatDate(this.addExpenseForm.value.date || new Date()),
      type: this.addExpenseForm.value.typeId || 0,
      description: this.addExpenseForm.value.description || '',
      vehicle: this.vehicleId,
    }
  }

  private addExpense(expenseData: Expense): void {
    this.dataService.addExpense(expenseData, this.userToken).subscribe(
      (response) => {
        this.expenseAdded.emit(response)
        console.log('Despesa adicionada com sucesso.', response)
      },
      (error) => {
        console.error('Erro ao adicionar despesa: ', error)
      }
    )
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date
    }
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    return `${year}-${month}-${day}`
  }

  public handleAddExpense(): void {
    if (this.addExpenseForm.valid) {
      const expenseData: Expense = this.createExpenseData()
      this.addExpense(expenseData)
      console.log('teste aqui ', expenseData)
    } else {
      console.log('Formulário não válido.')
    }
  }
}
