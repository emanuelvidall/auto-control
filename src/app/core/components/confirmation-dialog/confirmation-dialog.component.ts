import { Component, EventEmitter, Inject, Output } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  @Output() vehicleDeleted = new EventEmitter<void>()

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: string }
  ) {}

  deleteVehicle() {
    const userData = this.dataService.getUserData()
    if (!userData || userData.token === undefined) {
      console.error('No user data available or user is not logged in')
      return
    }

    const vehicleId = this.data.vehicleId
    if (typeof vehicleId !== 'number') {
      console.error('Vehicle ID must be a number')
      return
    }

    this.dataService.deleteVehicle(vehicleId, userData.token).subscribe(
      (response) => {
        this.vehicleDeleted.emit()
        console.log('Vehicle deleted successfully', response)
      },
      (error) => {
        console.error('Error deleting vehicle: ', error)
      }
    )
  }
}
