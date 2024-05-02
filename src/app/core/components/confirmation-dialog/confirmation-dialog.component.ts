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
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
    this.dataService
      .deleteVehicle(this.data.vehicleId, userData.token)
      .subscribe(
        (response) => {
          this.vehicleDeleted.emit()
          console.log('vehicle deleted successfully', response)
        },
        (error) => {
          console.error('Error deleting vehicle: ', error)
        }
      )
  }
}
