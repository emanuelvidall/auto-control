import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'
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
  @Output() expenseAdded = new EventEmitter<any>()

  testId: number
  myToken = ''
  myId = 0
  expenseTypes: ExpenseType[] = []

  addExpenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
    ]),
    date: new FormControl(new Date(), Validators.required),
    description: new FormControl(''),
    file: new FormControl(''),
    // vehicleId: new FormControl(0, Validators.required),
    typeId: new FormControl(null, Validators.required),
  })

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.testId = data.testId // Acessar o testId passado
  }

  ngOnInit(): void {
    this.loadExpenseTypes()
    // this.addExpenseForm.patchValue({
    //   vehicleId: this.data.vehicleId
    // });

    // this.dataService.getExpensesType(this.data.token).subscribe(types => {
    //   this.expenseTypes = types;
    //   console.log(this.expenseTypes)
    // });

    // this.addExpenseForm.get('type')?.valueChanges.subscribe(typeId => {
    //   if (typeId) {
    //     const selectedType = this.expenseTypes.find(type => type.id === typeId);
    //     if (selectedType) {
    //       this.addExpenseForm.patchValue({ description: selectedType.description });
    //     }
    //   }
    // });
  }

  loadExpenseTypes(): void {
    const userData = this.dataService.getUserData()
    const id = userData?.user_id ?? 0
    const token = userData?.token ?? ''

    this.myId = id
    this.myToken = token

    this.dataService.getExpensesType(token).subscribe((types) => {
      this.expenseTypes = types
    })
  }

  handleAddExpense(): void {
    const userData = this.dataService.getUserData()
    const id = userData?.user_id ?? 0
    const token = userData?.token ?? ''

    this.myId = id
    this.myToken = token

    if (this.addExpenseForm.valid) {
      const expenseData: Expense = {
        name: this.addExpenseForm.value.name || '',
        value: this.addExpenseForm.value.value || 0,
        date: this.formatDate(this.addExpenseForm.value.date || new Date()),
        type: this.addExpenseForm.value.typeId || 0,
        description: this.addExpenseForm.value.description || '',
        vehicle: this.testId,
      }

      console.log(expenseData, ' dados a serem enviados')

      this.dataService.addExpense(expenseData, token).subscribe(
        (response) => {
          this.expenseAdded.emit(response)
          console.log('Expense added successfully', response)
        },
        (error) => {
          console.error('Error adding expense:', error)
        }
      )
    } else {
      console.log('Form is not valid')
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
