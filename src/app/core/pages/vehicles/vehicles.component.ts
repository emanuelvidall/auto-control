import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VehiclesComponentComponent } from '../../components/vehicles-component/vehicles-component.component'
import { NavbarComponent } from '../../components/navbar/navbar.component'
import { DataService, Vehicle } from '../../services/data.service'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../../components/dialog/dialog.component'
// import { Subscription } from 'rxjs'
import { forkJoin, of, switchMap } from 'rxjs'

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

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.loadData()
    this.loadUserData()
  }

  // private loadData() {
  //   this.dataService.getUserData().pipe(
  //     switchMap(userData => {
  //       if (userData) {
  //         this.userId = userData.user_id ?? 0;
  //         this.userToken = userData.token ?? '';
  //         this.userName = userData.user_name ?? '';
  //         return this.dataService.getVehiclesById(this.userId, this.userToken);
  //       } else {
  //         // Retorna um observable vazio ou lança um erro se os dados do usuário não estiverem disponíveis
  //         return of([]);
  //       }
  //     })
  //   ).subscribe({
  //     next: (vehicles) => {
  //       this.vehicles = vehicles;
  //       console.log('Dados do usuário e veículos carregados com sucesso.');
  //     },
  //     error: (error) => {
  //       console.error('Erro ao tentar carregar dados: ', error);
  //     },
  //   });
  // }

  private async loadUserData() {
    this.dataService
      .getUserData()
      .toPromise()
      .then((userData) => {
        this.userId = userData?.user_id ?? 0
        this.userToken = userData?.token ?? ''
        this.userName = userData?.user_name ?? ''
        console.log('token ', this.userToken)
        console.log('userdata ', userData)
        this.loadVehicles()
      })
      .catch((error) => {
        console.error('Erro ao tentar carregar dados do usuário: ', error)
      })
  }

  // private async loadUserData() {
  //   try {
  //     const userData = await this.dataService.getUserData().toPromise()
  //     this.userId = userData?.user_id ?? 0
  //     this.userToken = userData?.token ?? ''
  //     this.userName = userData?.user_name ?? ''
  //   } catch (error) {
  //     console.error('Erro ao tentar carregar dados do usuário: ', error)
  //   }
  // }

  private async loadVehicles() {
    console.log('token: ', this.userToken)
    this.dataService.getVehiclesById(this.userId, this.userToken).subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles = vehicles
        console.log('Veículos encontrados com sucesso: ', vehicles)
      },
      error: (error) => {
        console.error('Erro ao tentar encontrar veículos: ', error)
        console.log('userId: ', this.userId)
        console.log('userToken: ', this.userToken)
      },
    })
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
