import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { DataService, Vehicle } from '../../services/data.service'
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component'
import { DialogComponent } from '../dialog/dialog.component'
import { SubmitButtonComponent } from '../submit-button/submit-button.component'

@Component({
  selector: 'app-vehicles-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf,
    SubmitButtonComponent,
  ],
  templateUrl: './vehicles-component.component.html',
  styleUrls: ['./vehicles-component.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class VehiclesComponentComponent implements OnInit, OnChanges {
  @Input() incomingData: {
    userId: number
    userToken: string
    userName: string
    vehicles: Vehicle[]
  } = {
    userId: 0,
    userToken: '',
    userName: '',
    vehicles: [],
  }

  vehicles: Vehicle[] = []
  expandedVehicle: Vehicle | null = null
  displayedColumns: string[] = ['name', 'type_name', 'brand_name', 'owner_name']
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand']
  columnHeaders: { [key: string]: string } = {
    name: 'Nome',
    type_name: 'Tipo',
    brand_name: 'Marca',
    owner_name: 'Proprietário',
    expand: 'Expandir',
  }

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomingData']) {
      this.vehicles = this.incomingData.vehicles
    }
  }

  public openExpenseDialog(vehicleId: number): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '400px',
      data: {
        vehicleId: vehicleId,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }

  // public openAddVehicleDialog(): void {
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: '350px',
  //     data: {
  //       userToken: this.incomingData.userToken,
  //       userId: this.incomingData.userId,
  //     },
  //   })

  //   const sub = dialogRef.componentInstance.vehicleAdded.subscribe({
  //     next: (newVehicle: Vehicle) => {
  //       this.addVehicle(newVehicle)
  //     },
  //     error: (error: any) => console.error('Error when adding vehicle:', error),
  //   })

  //   dialogRef.afterClosed().subscribe({
  //     next: (result) => {
  //       console.log('The dialog was closed. Result:', result)
  //       sub.unsubscribe()
  //     },
  //     error: (error) => console.error('Error on dialog close:', error),
  //   })
  // }

  // private addVehicle(newVehicle: Vehicle): void {
  //   this.incomingData.vehicles.push(newVehicle)
  //   console.log('New vehicle added:', newVehicle)
  // }
}
