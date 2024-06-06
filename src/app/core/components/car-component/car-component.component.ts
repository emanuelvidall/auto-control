import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Vehicle } from '../../services/data.service'
import { DataService } from '../../services/data.service'
import { MatIcon } from '@angular/material/icon'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component'
import { BarChartComponent } from '../bar-chart/bar-chart.component'
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component'

@Component({
  selector: 'app-car-component',
  standalone: true,
  imports: [MatIcon, BarChartComponent, DoughnutChartComponent],
  templateUrl: './car-component.component.html',
  styleUrl: './car-component.component.scss',
})
export class CarComponentComponent {
  @Input() vehicle!: Vehicle
  @Output() vehicleDeleted = new EventEmitter<void>()
  
  defaultCar: string = '/assets/defaultcar.jpg'
  
  constructor(private dataService: DataService, private dialog: MatDialog) {}

  openDialog(): void {
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

  openExpenseDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '350px',
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }
}
