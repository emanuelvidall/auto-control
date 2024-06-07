import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
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
import { DialogComponent } from '../dialog/dialog.component'
import { firstValueFrom } from 'rxjs'
import { EnvironmentService } from '../../services/environmentService/environment-service.service'

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
  vehicleId: number
  userToken: string = ''
  expenseTypes: ExpenseType[] = []
  addExpenseForm!: FormGroup
  loading: boolean = false
  @Output() expenseAdded = new EventEmitter<void>()

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private envService: EnvironmentService,
    @Inject(MAT_DIALOG_DATA)
    public data: { userToken: string; vehicleId: number }
  ) {
    this.userToken = data.userToken
    this.vehicleId = data.vehicleId
  }

  ngOnInit(): void {
    this.initializeForm()
    this.envService.runInBrowser(() => {
      this.initializeData()
    })
  }

  private async initializeData(): Promise<void> {
    this.loading = true
    try {
      await this.loadExpenseTypes()
      this.loading = false
    } catch (error) {
      console.error('Erro ao tentar inicializar dados: ', error)
      this.loading = false
    }
  }

  private async loadExpenseTypes(): Promise<void> {
    try {
      const expenseTypes = await firstValueFrom(
        this.dataService.getExpensesType(this.userToken)
      )
      this.expenseTypes = expenseTypes
      console.log('Tipos de despesas carregados com sucesso: ', expenseTypes)
    } catch (error) {
      console.error('Erro ao tentar carregar tipos de despesas: ', error)
      throw error
    }
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
      type: new FormControl<number | null>(null, Validators.required),
    })
  }

  private createExpenseData(): Expense {
    return {
      name: this.addExpenseForm.value.name || '',
      value: this.addExpenseForm.value.value || 0,
      date: this.formatDate(this.addExpenseForm.value.date || new Date()),
      description: this.addExpenseForm.value.description || '',
      type: this.addExpenseForm.value.type || 0,
      vehicle: this.vehicleId,
    }
  }

  public async handleAddExpense(): Promise<void> {
    if (this.addExpenseForm.valid) {
      try {
        const expense = await firstValueFrom(
          this.dataService.addExpense(this.createExpenseData(), this.userToken)
        )
        this.expenseAdded.emit()
        console.log('Despesa adicionada com sucesso.', expense)
        this.dialogRef.close()
      } catch (error) {
        console.error('Erro ao tentar adicionar despesa: ', error)
      }
    } else {
      console.log('Formulário inválido.')
      return
    }
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
}
