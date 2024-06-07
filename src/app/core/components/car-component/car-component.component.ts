import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Vehicle } from '../../services/data.service'
import { DataService } from '../../services/data.service'
import { MatIcon } from '@angular/material/icon'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component'
import { BarChartComponent } from '../bar-chart/bar-chart.component'
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-car-component',
  standalone: true,
  imports: [MatIcon, BarChartComponent, DoughnutChartComponent, NgIf],
  templateUrl: './car-component.component.html',
  styleUrl: './car-component.component.scss',
})
export class CarComponentComponent {
  @Input() vehicle!: Vehicle
  @Input() userToken: string = ''
  @Output() vehicleDeleted = new EventEmitter<void>()
  @Output() expenseAdded = new EventEmitter<void>()

  defaultCar: string = '/assets/defaultcar.jpg'
  userId: number | undefined

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { vehicleId: this.vehicle.id },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })

    dialogRef.componentInstance.vehicleDeleted.subscribe(() => {
      this.vehicleDeleted.emit()
    })
  }

  private loadUserData(): void {
    this.dataService.getUserData().subscribe({
      next: (userData) => {
        this.userId = userData?.user_id ?? 0
        this.userToken = userData?.token ?? ''
      },
      error: (error) => {
        console.error('Error getting user data:', error)
      },
    })
  }

  openExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '350px',
      data: { vehicleId: this.vehicle.id, userToken: this.userToken },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })

    dialogRef.componentInstance.expenseAdded.subscribe(() => {
      console.log('adicionado no enviar doEMITTER DO BAUGLHO')
      this.expenseAdded.emit()
    })
  }
}
