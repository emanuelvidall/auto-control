import { Component } from '@angular/core'
import {
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
  constructor(public dialog: MatDialog, private dataService: DataService) {}

  deleteVehicle(vehicleId: any) {
    const id = console.log(vehicleId, 'vehicle id no modal')
    console.log('clicked')
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
    console.log(vehicleId, 'vehicleId')
    console.log(userData.token, 'token')
    this.dataService.deleteVehicle(vehicleId, userData.token).subscribe(
      (response) => {
        console.log('vehicle deleted successfully', response)
      },
      (error) => {
        console.error('Error deleting vehicle: ', error)
      }
    )
  }
}
