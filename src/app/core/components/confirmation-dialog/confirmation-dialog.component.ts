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
import {
  DataService,
  userDataSessionStorage,
} from '../../services/data.service'
import { Subscription } from 'rxjs'

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

  userToken: string = ''

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: string }
  ) {}

  deleteVehicle() {
    const userData: Subscription = this.dataService.getUserData().subscribe({
      next: (userData: userDataSessionStorage | null) => {
        this.userToken = userData?.token ?? ''
        console.log('User data: ', userData)
      },
      error: (error) => {
        console.error('Error getting user data: ', error)
      },
    })

    const vehicleId = this.data.vehicleId
    if (typeof vehicleId !== 'number') {
      console.error('Vehicle ID must be a number')
      return
    }

    this.dataService.deleteVehicle(vehicleId, this.userToken).subscribe({
      next: (response) => {
        this.vehicleDeleted.emit()
        console.log('Vehicle deleted successfully', response)
      },
      error: (error) => {
        console.error('Error deleting vehicle: ', error)
      },
    })
  }
}
