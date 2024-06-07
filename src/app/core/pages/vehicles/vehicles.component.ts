import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService, Vehicle } from '../../services/data.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../components/dialog/dialog.component'
import { Subscription, firstValueFrom } from 'rxjs'
import { EnvironmentService } from '../../services/environmentService/environment-service.service'
import { ExpenseDialogComponent } from '../../components/expense-dialog/expense-dialog.component'

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent, NavbarComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit, OnDestroy {
  userToken: string = ''
  userId: number = 0
  userName: string = ''
  vehicles: Vehicle[] = []
  loading: boolean = false

  private dialogSubscription: Subscription | null = null

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private envService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.envService.runInBrowser(() => {
      this.initializeData()
    })
  }

  ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe()
  }

  private async initializeData(): Promise<void> {
    this.loading = true
    try {
      await this.loadUserData()
      await this.loadVehicles()
      this.loading = false
    } catch (error) {
      console.error('Erro ao tentar inicializar dados: ', error)
      this.loading = false
    }
  }

  private async loadUserData(): Promise<void> {
    try {
      const userData = await firstValueFrom(this.dataService.getUserData())
      this.userId = userData?.user_id ?? 0
      this.userToken = userData?.token ?? ''
      this.userName = userData?.user_name ?? ''
      console.log('Dados do usuário carregados com sucesso: ', userData)
    } catch (error) {
      console.error('Erro ao tentar carregar dados do usuário: ', error)
      throw error
    }
  }

  private async loadVehicles(): Promise<void> {
    try {
      const vehiclesData = await firstValueFrom(
        this.dataService.getVehicleByOwner(this.userId, this.userToken)
      )
      this.vehicles = vehiclesData
      console.log('Veículos carregados com sucesso: ', this.vehicles)
    } catch (error) {
      console.error('Erro ao tentar carregar veículos: ', error)
      throw error
    }
  }

  public openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        userToken: this.userToken,
        userId: this.userId,
      },
    })

    this.dialogSubscription =
      dialogRef.componentInstance.vehicleAdded.subscribe(
        (newVehicle: Vehicle) => {
          this.addVehicle(newVehicle)
        }
      )
  }

  private addVehicle(newVehicle: Vehicle): void {
    this.vehicles = [...this.vehicles, newVehicle]
  }
}
