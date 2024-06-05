import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'
import { AsyncPipe, NgFor } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatRadioModule } from '@angular/material/radio'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import {
  DataService,
  Vehicle,
  VehicleBrand,
  VehicleType,
} from '../../services/data.service'
import { InputTextComponent } from '../input-text/input-text.component'
import { MatInputModule } from '@angular/material/input'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { firstValueFrom } from 'rxjs'

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
    NgFor,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() vehicleAdded = new EventEmitter<Vehicle>()

  userToken: string
  userId: number
  addVehicleForm!: FormGroup
  vehicleBrands: VehicleBrand[] = []
  vehicleTypes: VehicleType[] = []

  constructor(
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { userToken: string; userId: number },
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.userToken = data.userToken
    this.userId = data.userId
  }

  ngOnInit(): void {
    this.initializeForm()
    this.loadVehicleTypes()
    this.loadVehiclesBrand()
  }

  private loadVehiclesBrand(): void {
    this.dataService.getVehicleBrands(this.userToken).subscribe((brands) => {
      this.vehicleBrands = brands
    })
  }

  private loadVehicleTypes(): void {
    this.dataService.getVehicleTypes(this.userToken).subscribe((types) => {
      this.vehicleTypes = types
    })
  }

  private initializeForm(): void {
    this.addVehicleForm = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      description: new FormControl<string>(''),
      type: new FormControl<number | null>(0, Validators.required),
      brand: new FormControl<number | null>(0, Validators.required),
      year: new FormControl<number | null>(0, Validators.required),
      license_plate: new FormControl<string>('', Validators.required),
      owner: new FormControl<number | null>(0, Validators.required),
    })
  }

  private createVehicleData(): Vehicle {
    return {
      name: this.addVehicleForm.value.name || '',
      description: this.addVehicleForm.value.description || '',
      type: this.addVehicleForm.value.type || 0,
      brand: this.addVehicleForm.value.brand || 0,
      year: this.addVehicleForm.value.year || 0,
      license_plate: this.addVehicleForm.value.license_plate || '',
      owner: this.userId,
    }
  }

  public async handleAddVehicle(): Promise<void> {
    if (!this.addVehicleForm.valid) {
      console.error('Formulário inválido.')
      return
    }
    try {
      const vehicle = await firstValueFrom(
        this.dataService.addVehicle(this.createVehicleData(), this.userToken)
      )
      this.vehicleAdded.emit(vehicle)
      console.log('Veículo adicionado com sucesso.', vehicle)
      this.dialogRef.close()
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error)
    }
  }
}
