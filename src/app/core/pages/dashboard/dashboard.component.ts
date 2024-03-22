import { Component } from '@angular/core'
import { Car } from '../../components/car-component/car-interface'
import { NgFor, NgIf } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'

import { CarComponentComponent } from '../../components/car-component/car-component.component'
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component'
import { DialogComponent } from '../../components/dialog/dialog.component'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarComponentComponent, NgFor, NgIf, SubmitButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {},
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }

  AlternateLogoPath: string = 'assets/logo-alternate.png'

  cars: Car[] = [
    // { id: 1, make: 'Toyota', model: 'Corolla', year: 2020, type: 'car' },
    // { id: 2, make: 'Honda', model: 'Civic', year: 2019, type: 'car' },
    // { id: 3, make: 'Ford', model: 'Mustang', year: 2021, type: 'car' },
  ]
}
