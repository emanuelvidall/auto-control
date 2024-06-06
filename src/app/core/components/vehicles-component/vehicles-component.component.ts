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
// import { DialogComponent } from '../dialog/dialog.component'
import { SubmitButtonComponent } from '../submit-button/submit-button.component'
import { Router } from '@angular/router'

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

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomingData']) {
      this.vehicles = this.incomingData.vehicles
    }
  }

  public openExpenseDialog(vehicleId: number): void {
    this.dialog.open(ExpenseDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        userToken: this.incomingData.userToken,
        vehicleId: vehicleId,
      },
    })
  }

  public goToSelectedVehicle(vehicleId: number): void {
    const vehicle = this.vehicles.find((vehicle) => vehicle.id === vehicleId)
    this.router.navigate(['selected-vehicles', vehicleId], {
      state: {
        userToken: this.incomingData.userToken,
        vehicle: vehicle,
      },
    })
  }
}
