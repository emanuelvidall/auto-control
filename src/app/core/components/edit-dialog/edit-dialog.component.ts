import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { EnvironmentService } from '../../services/environmentService/environment-service.service'
import { DataService, Vehicle } from '../../services/data.service'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-edit-dialog',
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
    MatIconModule,
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent implements OnInit {
  @Output() vehicleEdited = new EventEmitter<Vehicle>()
  
  vehicle: Vehicle = {
    name: '',
    type: 0,
    brand: 0,
    year: 0,
    license_plate: '',
    owner: 0,
  }
  userToken: string
  userId: number
  editVehicleForm!: FormGroup

  constructor(
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    private envService: EnvironmentService,
    @Inject(MAT_DIALOG_DATA)
    public data: { userToken: string; userId: number; vehicle: Vehicle }
  ) {
    this.userToken = data.userToken
    this.vehicle = data.vehicle
    this.userId = data.userId
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.editVehicleForm = new FormGroup({
      name: new FormControl<string>(this.vehicle.name, Validators.required),
      type: new FormControl<number>(this.vehicle.type, Validators.required),
      brand: new FormControl<number>(this.vehicle.brand, Validators.required),
      year: new FormControl<number>(this.vehicle.year, Validators.required),
      license_plate: new FormControl<string>(this.vehicle.license_plate, Validators.required),
      description: new FormControl<string>(this.vehicle.description || '') ,
      owner: new FormControl<number>(this.vehicle.owner, Validators.required),
    })
  }
  
  private createEditVehicle(): Vehicle {
    return {
      name: this.editVehicleForm.get('name')?.value,
      type: this.editVehicleForm.get('type')?.value,
      brand: this.editVehicleForm.get('brand')?.value,
      year: this.editVehicleForm.get('year')?.value,
      license_plate: this.editVehicleForm.get('license_plate')?.value,
      description: this.editVehicleForm.get('description')?.value,
      owner: this.userId
    }
  }

  public async handleEditVehicle(): Promise<void> {
    if (this.editVehicleForm.valid) {
      try {
        const vehicle = await firstValueFrom(
          this.dataService.updateVehicle(this.createEditVehicle(), this.vehicle.id!, this.userToken)
        )
        this.vehicleEdited.emit(vehicle)
        console.log('Veículo atualizado com sucesso: ', vehicle)
        this.dialogRef.close()
      } catch (error) {
        console.error('Erro ao tentar atualizar veículo: ', error)
      }
    } else {
      console.error('Formulário inválido')
      return
    }
  }

}
