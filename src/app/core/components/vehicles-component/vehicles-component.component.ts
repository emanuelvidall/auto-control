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
import { SubmitButtonComponent } from '../submit-button/submit-button.component'
import { Router } from '@angular/router'
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component'
import { Subscription, firstValueFrom } from 'rxjs'
import { ChangeDetectorRef } from '@angular/core';

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
  displayedColumns: string[] = ['name']
  displayedColumnsWithExpand = [...this.displayedColumns, 'expand']

  columnHeaders: { [key: string]: string } = {
    name: 'Nome',
    type_name: 'Tipo',
    brand_name: 'Marca',
    owner_name: 'Proprietário',
    expand: 'Expandir',
  }

  private dialogSubscription: Subscription | null = null

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['incomingData']) {
      console.log('Dados recebidos no ngOnChanges:', changes['incomingData'].currentValue);
      this.vehicles = changes['incomingData'].currentValue.vehicles;
  
      // Forçar detecção de mudanças (opcional)
      if (this.cdr) {
        this.cdr.detectChanges();
      }
    }
  }

  private async loadVehicles(): Promise<void> {
    try {
      const vehiclesData = await firstValueFrom(
        this.dataService.getVehicleByOwner(
          this.incomingData.userId,
          this.incomingData.userToken
        )
      )
      this.vehicles = vehiclesData
      console.log('Veículos carregados com sucesso: ', this.vehicles)
    } catch (error) {
      console.error('Erro ao tentar carregar veículos: ', error)
      throw error
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

  public openEditDialog(vehicleId: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        userToken: this.incomingData.userToken,
        userId: this.incomingData.userId,
        vehicle: this.vehicles.find((vehicle) => vehicle.id === vehicleId),
      },
    })

    this.dialogSubscription =
      dialogRef.componentInstance.vehicleEdited.subscribe(() => {
        this.loadVehicles()
      })
  }

  public goToSelectedVehicle(vehicleId: number): void {
    this.router.navigate(['selected-vehicles', vehicleId], {
      state: {
        userToken: this.incomingData.userToken,
        vehicle: this.vehicles.find((vehicle) => vehicle.id === vehicleId),
      },
    })
  }
}
