import { Component, Input, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { DataService, Vehicle } from '../../services/data.service'
import { MatDialog } from '@angular/material/dialog'
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component'

@Component({
  selector: 'app-vehicles-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
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
export class VehiclesComponentComponent implements OnInit {
  @Input() vehicles: Vehicle[] = [] // Initialize with an empty array
  userName: string = ''

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'type_name', 'brand_name', 'owner_name']
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand']
  dataSource: Vehicle[] = [] // Initialize with the correct type
  expandedVehicle: Vehicle | null = null

  ngOnInit() {
    const userData = this.dataService.getUserData()
    if (userData) {
      this.userName = userData.user_name
      this.dataService
        .getVehiclesById(userData.user_id, userData.token)
        .subscribe(
          (vehicles: Vehicle[]) => {
            this.vehicles = vehicles
            this.dataSource = vehicles
          },
          (error) => {
            console.error('Error fetching vehicles: ', error)
          }
        )
    }
  }

  openExpenseDialog(vehicleId: number): void {
    const testId = vehicleId
    console.log(testId)
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '500px',
      data: {
        testId: testId
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }
}
