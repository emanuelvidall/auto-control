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
import { DataService, Expense } from '../../services/data.service'
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
    NgFor
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
  @Input() token!: string

  addExpenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    value: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/),
    ]),
    date: new FormControl(new Date(), Validators.required),
    description: new FormControl(''),
    file: new FormControl(''),
    vehicleId: new FormControl(0, Validators.required),
    typeId: new FormControl(null, Validators.required),
  })
  expenseTypes: { id: number; name: string; description: string }[] = []

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addExpenseForm.patchValue({
      vehicleId: this.data.vehicleId // Defina o vehicleId ao inicializar o formulário
    });

    this.dataService.getExpensesType().subscribe(types => {
      this.expenseTypes = types;
    });

    this.addExpenseForm.get('type')?.valueChanges.subscribe(typeId => {
      if (typeId) {
        const selectedType = this.expenseTypes.find(type => type.id === typeId);
        if (selectedType) {
          this.addExpenseForm.patchValue({ description: selectedType.description });
        }
      }
    });
  }

  handleAddExpense() {
    if (this.addExpenseForm.valid) {
      const expenseData: Expense = this.addExpenseForm.value as Expense;
      this.dataService.addExpense(expenseData, this.token).subscribe(
        response => {
          this.expenseAdded.emit(response);
          console.log('Expense added successfully', response);
        },
        error => {
          console.error('Error adding expense:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
