import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService, Vehicle } from '../../services/data.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../components/dialog/dialog.component'
// import { Subscription } from 'rxjs'
import { firstValueFrom } from 'rxjs'
import { EnvironmentService } from '../../services/environmentService/environment-service.service'

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, VehiclesComponentComponent, NavbarComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit {
  userToken: string = ''
  userId: number = 0
  userName: string = ''
  vehicles: Vehicle[] = []

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private envService: EnvironmentService
  ) {}

  ngOnInit(): void {
    this.envService.runInBrowser(() => {
      this.loadUserData()
    })
  }

  private async loadUserData() {
    try {
      const userData = await firstValueFrom(this.dataService.getUserData())
      this.userId = userData?.user_id ?? 0
      this.userToken = userData?.token ?? ''
      this.userName = userData?.user_name ?? ''
      this.loadVehicles()
    } catch (error) {
      console.error('Erro ao tentar carregar dados do usuário: ', error)
    }
  }

  private async loadVehicles() {
    try {
      const vehiclesData = await firstValueFrom(
        this.dataService.getVehiclesById(this.userId, this.userToken)
      )
      this.vehicles = vehiclesData
    } catch (error) {
      console.error('Erro ao tentar carregar veículos: ', error)
    }
  }

  public openAddVehicleDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '500px',
      data: {
        userToken: this.userToken,
        userId: this.userId,
      },
    })

    // const subscription: Subscription =
    //   dialogRef.componentInstance.vehicleAdded.subscribe({
    //     next: (newVehicle: Vehicle) => {
    //       this.vehicles.push(newVehicle)
    //       console.log('Novo veículo adicionado com sucesso: ', newVehicle)
    //     },
    //     error: (error: any) => {
    //       console.error('Erro ao tentar adicionar novo veículo: ', error)
    //     },
    //   })

    dialogRef.afterClosed().subscribe({
      next: () => {
        console.log('Formulário fechado com sucesso.')
        // this.loadVehicles()
        // subscription.unsubscribe()
      },
      error: (error) => {
        console.error('Error ao fechar formulário: ', error)
      },
    })
  }
}
