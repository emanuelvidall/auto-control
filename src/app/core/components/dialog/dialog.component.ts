import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, startWith } from 'rxjs/operators'

import { AsyncPipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { Observable, catchError, of } from 'rxjs'
import { DataService, VehicleBrand } from '../../services/data.service'
import { InputTextComponent } from '../input-text/input-text.component'
import { MatInputModule } from '@angular/material/input'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    InputTextComponent,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() token!: string
  addVehicleForm = new FormGroup({
    type: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  })
  myControl = new FormControl('')
  vehicleBrands: VehicleBrand[] = []
  brand: any

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  options: VehicleBrand[] = []
  filteredOptions: Observable<VehicleBrand[]> = of([])

  ngOnInit() {
    this.dataService
      .getVehicleBrands(this.data.token)
      .pipe(
        catchError((err) => {
          console.error('Erro ao pegar marcas', err)
          return of([])
        })
      )
      .subscribe((brands) => {
        this.options = brands as VehicleBrand[]
        console.log(this.options)
      })
    this.filteredOptions = this.addVehicleForm.controls.brand.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || ''))
    )
  }

  teste() {
    console.log(this.data.id)
    console.log(this.myControl.value)
  }

  handleAddVehicle(): void {
    if (this.addVehicleForm.valid) {
      const vehicleData = {
        type: this.addVehicleForm.value.type,
        brand: '1',
        name: this.addVehicleForm.value.name,
        description: this.addVehicleForm.value.description,
        owner: this.data.id,
      }
      console.log(vehicleData, 'dados a serem enviados')
      this.dataService.addVehicle(vehicleData, this.data.token).subscribe({
        next: (response) => {
          console.log('Vehicle added successfully', response)
        },
        error: (error) => console.error('Error adding vehicle:', error),
      })
    } else {
      console.error('Form is not valid:', this.addVehicleForm.value)
    }
  }

  private _filter(value: string): VehicleBrand[] {
    const filterValue = value.toLowerCase()
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    )
  }
}
