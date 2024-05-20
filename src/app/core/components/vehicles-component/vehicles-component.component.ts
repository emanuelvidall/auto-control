import { Component, Input, OnInit } from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { CommonModule, NgFor, NgIf } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { DataService, Vehicle } from '../../services/data.service'
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component'

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
export class VehiclesComponentComponent implements OnInit {
  @Input() vehicles: Vehicle[] = []

  userName: string = ''
  displayedColumns: string[] = ['name', 'type_name', 'brand_name', 'owner_name']
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand']
  dataSource: Vehicle[] = []
  expandedVehicle: Vehicle | null = null

  columnHeaders: {[key: string]: string} = {
    name: 'Nome',
    type_name: 'Tipo',
    brand_name: 'Marca',
    owner_name: 'Proprietário',
    expand: 'Expandir'
  }

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUserData()
  }

  private loadUserData(): void {
    const userData = this.dataService.getUserData()
    if (userData) {
      this.userName = userData.user_name
      this.loadVehicles(userData.user_id, userData.token)
    }
  }

  private loadVehicles(userId: number, token: string): void {
    this.dataService.getVehiclesById(userId, token).subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles
        this.dataSource = vehicles
      },
      (error) => {
        console.error('Erro ao tentar encontrar veículos: ', error)
      }
    )
  }

  openExpenseDialog(vehicleId: number): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '500px',
      data: {
        vehicleId: vehicleId,
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed. Result:', result)
    })
  }
}
