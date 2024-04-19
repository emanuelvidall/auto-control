import { Component, Input } from '@angular/core'
import { Vehicle } from '../../services/data.service'
import { DataService } from '../../services/data.service'
import { MatIcon } from '@angular/material/icon'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-car-component',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './car-component.component.html',
  styleUrl: './car-component.component.scss',
})
export class CarComponentComponent {
  defaultCar: string = '/assets/defaultcar.jpg'
  constructor(private dataService: DataService, private dialog: MatDialog) {}
  @Input() car!: Vehicle

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { vehicleId: this.car.id },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }

  // deleteVehicle(vehicleId: any) {
  //   console.log('clicked')
  //   const userData = JSON.parse(sessionStorage.getItem('userData') || '{}')
  //   console.log(vehicleId, 'vehicleId')
  //   console.log(userData.token, 'token')
  //   this.dataService.deleteVehicle(vehicleId, userData.token).subscribe(
  //     (response) => {
  //       console.log('vehicle deleted successfully', response)
  //     },
  //     (error) => {
  //       console.error('Error deleting vehicle: ', error)
  //     }
  //   )
  // }
}
